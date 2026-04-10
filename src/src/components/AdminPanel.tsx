import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs, writeBatch, updateDoc, query, where } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Users, BookOpen, Save, X, AlertTriangle, FileText, Upload, Loader2, Zap, Download, Table, Lock as LucideLock, Unlock as LucideUnlock } from 'lucide-react';
import * as XLSX from 'xlsx';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AdminPanel() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'lessons' | 'users' | 'stats' | 'content' | 'daily-quest'>('lessons');
  const [activeContentSubTab, setActiveContentSubTab] = useState<'variables' | 'data_types' | 'data_structures'>('variables');
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [questQuestions, setQuestQuestions] = useState<any[]>([]);
  const [questCategories, setQuestCategories] = useState<any[]>([]);
  const [selectedUploadCategory, setSelectedUploadCategory] = useState<string>('');
  const [isSeeding, setIsSeeding] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [processingLog, setProcessingLog] = useState<string[]>([]);
  const [questAttempts, setQuestAttempts] = useState<any[]>([]);

  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  const handleEditQuestion = (q: any) => {
    setEditingQuestion(q);
  };

  const handleUpdateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'quest_questions', editingQuestion.id), editingQuestion);
      setEditingQuestion(null);
      alert('Question updated!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'quest_questions');
    }
  };

  const toggleDailyQuest = async () => {
    const firstTestCat = questCategories.find(c => c.name === "First Test");
    const isCurrentlyLocked = firstTestCat ? firstTestCat.isLocked : true;
    const action = isCurrentlyLocked ? 'Open' : 'Close';

    if (window.confirm(`This will ${action} the Daily Quest for students. Continue?`)) {
      setIsSeeding(true);
      setProcessingLog([`${action}ing Daily Quest...`]);
      try {
        // If it doesn't exist, we need to seed it first
        if (!firstTestCat) {
          const { INITIAL_QUEST_DATA } = await import('../data/initial_quest_data');
          const batch = writeBatch(db);
          
          for (let i = 0; i < INITIAL_QUEST_DATA.length; i++) {
            const cat = INITIAL_QUEST_DATA[i];
            const catId = `cat-${i + 1}`;
            const catRef = doc(db, 'quest_categories', catId);
            
            batch.set(catRef, {
              id: catId,
              name: cat.category,
              isLocked: false, // Start as open when first created
              order: i + 1
            });
            
            for (const q of cat.questions) {
              const qId = `q-seed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              const qRef = doc(db, 'quest_questions', qId);
              batch.set(qRef, {
                ...q,
                categoryId: catId,
                uploadedAt: new Date().toISOString()
              });
            }
          }
          await batch.commit();
          setProcessingLog(prev => [...prev, "Daily Quest seeded and OPENED!"]);
        } else {
          // If it exists, check if it has questions. If not, re-seed them.
          const qSnap = await getDocs(query(collection(db, 'quest_questions'), where('categoryId', '==', firstTestCat.id)));
          
          if (qSnap.empty && isCurrentlyLocked) {
            setProcessingLog(prev => [...prev, "Pool is empty. Re-seeding questions..."]);
            const { INITIAL_QUEST_DATA } = await import('../data/initial_quest_data');
            const batch = writeBatch(db);
            const catData = INITIAL_QUEST_DATA.find(c => c.category === "First Test");
            
            if (catData) {
              for (const q of catData.questions) {
                const qId = `q-seed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                const qRef = doc(db, 'quest_questions', qId);
                batch.set(qRef, {
                  ...q,
                  categoryId: firstTestCat.id,
                  uploadedAt: new Date().toISOString()
                });
              }
              await batch.commit();
              setProcessingLog(prev => [...prev, "Questions re-seeded."]);
            }
          }

          // Just toggle the lock
          await updateDoc(doc(db, 'quest_categories', firstTestCat.id), { 
            isLocked: !isCurrentlyLocked 
          });
          setProcessingLog(prev => [...prev, `Daily Quest is now ${isCurrentlyLocked ? 'OPEN' : 'CLOSED'}!`]);
        }
      } catch (error) {
        console.error(error);
        setProcessingLog(prev => [...prev, `Error ${action}ing Daily Quest.`]);
      } finally {
        setIsSeeding(false);
      }
    }
  };

  const toggleCategoryLock = async (catId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'quest_categories', catId), { isLocked: !currentStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'quest_categories');
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        Question: "What is the result of 2 + 2 in R?",
        "Option A": "3",
        "Option B": "4",
        "Option C": "5",
        "Option D": "6",
        Answer: "B",
        CodeSnippet: "2 + 2"
      }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "R_Mastery_MCQ_Template.xlsx");
  };

  const clearAllAttempts = async () => {
    if (window.confirm('Are you sure you want to DELETE ALL student results? This cannot be undone.')) {
      setIsProcessingFile(true);
      setProcessingLog(["Deleting all student attempts..."]);
      try {
        const qSnap = await getDocs(collection(db, 'quest_attempts'));
        const batch = writeBatch(db);
        qSnap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        setProcessingLog(prev => [...prev, "All attempts deleted."]);
      } catch (error) {
        setProcessingLog(prev => [...prev, "Error deleting attempts."]);
      } finally {
        setIsProcessingFile(false);
      }
    }
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!selectedUploadCategory) {
      alert('Please select a category first!');
      return;
    }

    setIsProcessingFile(true);
    setProcessingLog(["Reading Excel file..."]);

    try {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const dataBuffer = evt.target?.result;
          if (!dataBuffer) throw new Error("No data read from file.");
          
          const wb = XLSX.read(dataBuffer, { type: 'array' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);

          setProcessingLog(prev => [...prev, `Successfully parsed Excel. Found ${data.length} rows.`]);

          if (data.length === 0) {
            setProcessingLog(prev => [...prev, "Error: Excel file is empty or has no data rows."]);
            setIsProcessingFile(false);
            return;
          }

          let count = 0;
          let currentBatch = writeBatch(db);
          let batchCount = 0;

          for (const row of data as any[]) {
            const question = row.Question || row.question || row.Q || row.Text;
            const optA = row["Option A"] || row.OptionA || row.A || row.option1;
            const optB = row["Option B"] || row.OptionB || row.B || row.option2;
            const optC = row["Option C"] || row.OptionC || row.C || row.option3;
            const optD = row["Option D"] || row.OptionD || row.D || row.option4;
            const answerRaw = row.Answer || row.answer || row.Correct || row.Ans;

            if (!question || !optA || answerRaw === undefined) {
              setProcessingLog(prev => [...prev, `Skipping row ${count + 1}: Missing required fields.`]);
              continue;
            }

            let answerIndex = -1;
            if (typeof answerRaw === 'number') {
              answerIndex = answerRaw;
            } else if (typeof answerRaw === 'string') {
              const cleanAnswer = answerRaw.trim().toUpperCase();
              if (cleanAnswer === 'A') answerIndex = 0;
              else if (cleanAnswer === 'B') answerIndex = 1;
              else if (cleanAnswer === 'C') answerIndex = 2;
              else if (cleanAnswer === 'D') answerIndex = 3;
            }

            if (answerIndex < 0 || answerIndex > 3) {
              setProcessingLog(prev => [...prev, `Skipping row ${count + 1}: Invalid Answer.`]);
              continue;
            }

            const qId = `q-xl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const qRef = doc(db, 'quest_questions', qId);
            
            currentBatch.set(qRef, {
              question: question,
              options: [optA, optB || "", optC || "", optD || ""],
              correctAnswer: answerIndex,
              codeSnippet: row.CodeSnippet || "",
              categoryId: selectedUploadCategory,
              uploadedAt: new Date().toISOString()
            });
            count++;
            batchCount++;

            if (batchCount === 450) {
              await currentBatch.commit();
              currentBatch = writeBatch(db);
              batchCount = 0;
            }
          }

          if (batchCount > 0) await currentBatch.commit();
          setProcessingLog(prev => [...prev, `Upload complete! Successfully added ${count} MCQs.`]);
          setIsProcessingFile(false);
        } catch (err) {
          console.error(err);
          setProcessingLog(prev => [...prev, `Error processing Excel: ${err instanceof Error ? err.message : 'Unknown error'}`]);
          setIsProcessingFile(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setProcessingLog(prev => [...prev, `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      setIsProcessingFile(false);
    }
  };

  const handleExcelUploadAndCreateQuizzes = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    setProcessingLog(["Reading Excel file for 5 Quizzes..."]);

    try {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const dataBuffer = evt.target?.result;
          if (!dataBuffer) throw new Error("No data read from file.");

          const wb = XLSX.read(dataBuffer, { type: 'array' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);

          if (data.length < 20) {
            alert(`Need at least 20 questions to create 5 quizzes. Found only ${data.length}.`);
            setProcessingLog(prev => [...prev, `Error: Not enough questions (${data.length}).`]);
            setIsProcessingFile(false);
            return;
          }

          setProcessingLog(prev => [...prev, `Successfully parsed Excel. Found ${data.length} questions. Shuffling...`]);

          const validQuestions: any[] = [];
          for (const row of data as any[]) {
            const question = row.Question || row.question || row.Q || row.Text;
            const optA = row["Option A"] || row.OptionA || row.A || row.option1;
            const optB = row["Option B"] || row.OptionB || row.B || row.option2;
            const optC = row["Option C"] || row.OptionC || row.C || row.option3;
            const optD = row["Option D"] || row.OptionD || row.D || row.option4;
            const answerRaw = row.Answer || row.answer || row.Correct || row.Ans;

            if (!question || !optA || answerRaw === undefined) continue;

            let answerIndex = -1;
            if (typeof answerRaw === 'number') {
              answerIndex = answerRaw;
            } else if (typeof answerRaw === 'string') {
              const cleanAnswer = answerRaw.trim().toUpperCase();
              if (cleanAnswer === 'A') answerIndex = 0;
              else if (cleanAnswer === 'B') answerIndex = 1;
              else if (cleanAnswer === 'C') answerIndex = 2;
              else if (cleanAnswer === 'D') answerIndex = 3;
            }

            if (answerIndex < 0 || answerIndex > 3) continue;

            validQuestions.push({
              question,
              options: [optA, optB || "", optC || "", optD || ""],
              correctAnswer: answerIndex,
              codeSnippet: row.CodeSnippet || ""
            });
          }

          if (validQuestions.length < 20) {
            alert(`Only ${validQuestions.length} valid questions found. Need at least 20.`);
            setIsProcessingFile(false);
            return;
          }

          const batch = writeBatch(db);
          
          for (let i = 1; i <= 5; i++) {
            const catId = `quiz-${i}-${Date.now()}`;
            const catRef = doc(db, 'quest_categories', catId);
            
            batch.set(catRef, {
              id: catId,
              name: `Quiz ${i}`,
              isLocked: true,
              order: i
            });

            const shuffled = [...validQuestions].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 20);

            for (const q of selected) {
              const qId = `q-quiz-${i}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              const qRef = doc(db, 'quest_questions', qId);
              batch.set(qRef, {
                ...q,
                categoryId: catId,
                uploadedAt: new Date().toISOString()
              });
            }
            setProcessingLog(prev => [...prev, `Created Quiz ${i} with 20 questions.`]);
          }

          await batch.commit();
          setProcessingLog(prev => [...prev, "Successfully created 5 Quizzes! Students can now take them."]);
          setIsProcessingFile(false);
        } catch (err) {
          console.error(err);
          setProcessingLog(prev => [...prev, `Error processing Excel: ${err instanceof Error ? err.message : 'Unknown error'}`]);
          setIsProcessingFile(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setProcessingLog(prev => [...prev, `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      setIsProcessingFile(false);
    }
  };

  const downloadResultsExcel = () => {
    // Individual Attempts
    const attemptsData = questAttempts.map(attempt => ({
      StudentName: attempt.userName,
      Email: attempt.userEmail || 'N/A',
      Score: attempt.score,
      Total: attempt.total,
      RightQuestions: attempt.score,
      WrongQuestions: attempt.total - attempt.score,
      Percentage: `${Math.round((attempt.score / attempt.total) * 100)}%`,
      ScreenChanges: attempt.tabSwitchCount || 0,
      Date: new Date(attempt.attemptedAt).toLocaleString()
    }));

    const wb = XLSX.utils.book_new();
    const wsAttempts = XLSX.utils.json_to_sheet(attemptsData);
    XLSX.utils.book_append_sheet(wb, wsAttempts, "Student Records");
    XLSX.writeFile(wb, `R_Mastery_Records_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const clearAllQuestions = async () => {
    if (window.confirm('Are you sure you want to DELETE ALL questions from the database? This cannot be undone.')) {
      setIsProcessingFile(true);
      setProcessingLog(["Deleting all questions..."]);
      try {
        const qSnap = await getDocs(collection(db, 'quest_questions'));
        const batch = writeBatch(db);
        qSnap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        setProcessingLog(prev => [...prev, "All questions deleted."]);
      } catch (error) {
        setProcessingLog(prev => [...prev, "Error deleting questions."]);
      } finally {
        setIsProcessingFile(false);
      }
    }
  };

  const handleUpdateStats = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'global_stats', 'platform'), globalStats);
      alert('Global stats updated successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'global_stats/platform');
    }
  };

  const handleResetStats = async () => {
    if (window.confirm('Are you sure you want to reset the manual override stats?')) {
      const resetData = { totalUsers: users.length, totalXP: users.reduce((acc, u) => acc + (u.xp || 0), 0) };
      setGlobalStats(resetData);
      try {
        await setDoc(doc(db, 'global_stats', 'platform'), resetData);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'global_stats/platform');
      }
    }
  };

  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  const [globalStats, setGlobalStats] = useState<any>(null);

  const [newLesson, setNewLesson] = useState({
    id: '',
    title: '',
    description: '',
    content: '',
    codeExample: '',
    quiz: {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  });

  const [newContent, setNewContent] = useState({
    id: '',
    name: '',
    definition: '',
    explanation: '',
    syntax: '',
    firstLevel: { code: '', output: '', explanation: '' },
    secondLevel: { code: '', output: '', explanation: '' }
  });

  useEffect(() => {
    const lessonsUnsubscribe = onSnapshot(collection(db, 'lessons'), (snapshot) => {
      setLessons(snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'lessons'));

    const usersUnsubscribe = onSnapshot(collection(db, 'users_public'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'users_public'));

    const statsUnsubscribe = onSnapshot(doc(db, 'global_stats', 'platform'), (docSnap) => {
      if (docSnap.exists()) {
        setGlobalStats(docSnap.data());
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'global_stats/platform'));

    const contentUnsubscribe = onSnapshot(collection(db, activeContentSubTab), (snapshot) => {
      setContentItems(snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, activeContentSubTab));

    const attemptsUnsubscribe = onSnapshot(collection(db, 'quest_attempts'), (snapshot) => {
      setQuestAttempts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'quest_attempts'));

    const questionsUnsubscribe = onSnapshot(collection(db, 'quest_questions'), (snapshot) => {
      setQuestQuestions(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'quest_questions'));

    const categoriesUnsubscribe = onSnapshot(collection(db, 'quest_categories'), (snapshot) => {
      setQuestCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'quest_categories'));

    return () => {
      lessonsUnsubscribe();
      usersUnsubscribe();
      statsUnsubscribe();
      contentUnsubscribe();
      attemptsUnsubscribe();
      questionsUnsubscribe();
      categoriesUnsubscribe();
    };
  }, [activeContentSubTab]);

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const contentId = editingContentId || newContent.id;
      await setDoc(doc(db, activeContentSubTab, contentId), { ...newContent, id: contentId });
      setIsAddingContent(false);
      setEditingContentId(null);
      setNewContent({
        id: '',
        name: '',
        definition: '',
        explanation: '',
        syntax: '',
        firstLevel: { code: '', output: '', explanation: '' },
        secondLevel: { code: '', output: '', explanation: '' }
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, activeContentSubTab);
    }
  };

  const handleEditContent = (item: any) => {
    setNewContent({
      id: item.id,
      name: item.name,
      definition: item.definition,
      explanation: item.explanation,
      syntax: item.syntax || '',
      firstLevel: item.firstLevel,
      secondLevel: item.secondLevel
    });
    setEditingContentId(item.docId);
    setIsAddingContent(true);
  };

  const handleDeleteContent = async (docId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, activeContentSubTab, docId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `${activeContentSubTab}/${docId}`);
      }
    }
  };

  const handleEditLesson = (lesson: any) => {
    setNewLesson({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      codeExample: lesson.codeExample,
      quiz: lesson.quiz
    });
    setEditingLessonId(lesson.docId);
    setIsAddingLesson(true);
  };

  const handleClearAllLessons = async () => {
    if (window.confirm('DANGER: This will delete ALL lessons from the platform. Are you absolutely sure?')) {
      try {
        const querySnapshot = await getDocs(collection(db, 'lessons'));
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        alert('All lessons deleted.');
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, 'lessons');
      }
    }
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const lessonId = editingLessonId || newLesson.id || `lesson-${Date.now()}`;
      await setDoc(doc(db, 'lessons', lessonId), { ...newLesson, id: lessonId });
      setIsAddingLesson(false);
      setEditingLessonId(null);
      setNewLesson({
        id: '',
        title: '',
        description: '',
        content: '',
        codeExample: '',
        quiz: { question: '', options: ['', '', '', ''], correctAnswer: 0 }
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'lessons');
    }
  };

  const handleDeleteLesson = async (docId: string) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await deleteDoc(doc(db, 'lessons', docId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `lessons/${docId}`);
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action is permanent.')) {
      try {
        await deleteDoc(doc(db, 'users_public', userId));
        await deleteDoc(doc(db, 'users_private', userId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `users/${userId}`);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-comic">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Professor Panel</h1>
          <p className="text-gray-600 font-bold">Manage platform content and users</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`px-6 py-2 brutal-border brutal-shadow font-black uppercase transition-colors ${activeTab === 'lessons' ? 'bg-brutal-yellow' : 'bg-white'}`}
          >
            <BookOpen className="inline-block mr-2" size={20} /> Lessons
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 brutal-border brutal-shadow font-black uppercase transition-colors ${activeTab === 'users' ? 'bg-brutal-pink text-white' : 'bg-white'}`}
          >
            <Users className="inline-block mr-2" size={20} /> Users
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-2 brutal-border brutal-shadow font-black uppercase transition-colors ${activeTab === 'stats' ? 'bg-brutal-blue text-white' : 'bg-white'}`}
          >
            <Save className="inline-block mr-2" size={20} /> Stats
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2 brutal-border brutal-shadow font-black uppercase transition-colors ${activeTab === 'content' ? 'bg-brutal-green text-white' : 'bg-white'}`}
          >
            <BookOpen className="inline-block mr-2" size={20} /> Content
          </button>
          <button 
            onClick={() => setActiveTab('daily-quest')}
            className={`px-6 py-2 brutal-border brutal-shadow font-black uppercase transition-colors ${activeTab === 'daily-quest' ? 'bg-brutal-yellow' : 'bg-white'}`}
          >
            <FileText className="inline-block mr-2" size={20} /> Daily Quest
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'lessons' ? (
          <motion.div 
            key="lessons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase">Platform Lessons ({lessons.length})</h2>
              <div className="flex gap-2">
                <button 
                  onClick={handleClearAllLessons}
                  className="bg-red-600 text-white px-4 py-2 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 hover:bg-black transition-colors"
                >
                  <Trash2 size={20} /> Clear All
                </button>
                <button 
                  onClick={() => setIsAddingLesson(true)}
                  className="bg-brutal-green text-white px-4 py-2 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 hover:bg-black transition-colors"
                >
                  <Plus size={20} /> Add New Lesson
                </button>
              </div>
            </div>

            {isAddingLesson && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="bg-white brutal-border p-6 mb-8 brutal-shadow-lg"
              >
                <form onSubmit={handleAddLesson} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      disabled={!!editingLessonId}
                      placeholder="Lesson ID (e.g. intro-to-r)"
                      className="p-3 brutal-border outline-none font-bold disabled:bg-gray-100"
                      value={newLesson.id}
                      onChange={e => setNewLesson({...newLesson, id: e.target.value})}
                    />
                    <input 
                      required
                      placeholder="Lesson Title"
                      className="p-3 brutal-border outline-none font-bold"
                      value={newLesson.title}
                      onChange={e => setNewLesson({...newLesson, title: e.target.value})}
                    />
                  </div>
                  <textarea 
                    required
                    placeholder="Brief Description"
                    className="w-full p-3 brutal-border outline-none font-bold h-20"
                    value={newLesson.description}
                    onChange={e => setNewLesson({...newLesson, description: e.target.value})}
                  />
                  <textarea 
                    required
                    placeholder="Lesson Content (Markdown supported)"
                    className="w-full p-3 brutal-border outline-none font-bold h-40"
                    value={newLesson.content}
                    onChange={e => setNewLesson({...newLesson, content: e.target.value})}
                  />
                  <textarea 
                    required
                    placeholder="Initial R Code Example"
                    className="w-full p-3 brutal-border outline-none font-mono font-bold h-32 bg-gray-50"
                    value={newLesson.codeExample}
                    onChange={e => setNewLesson({...newLesson, codeExample: e.target.value})}
                  />
                  
                  <div className="bg-gray-100 p-4 brutal-border">
                    <h3 className="font-black uppercase mb-4">Quiz Configuration</h3>
                    <input 
                      required
                      placeholder="Quiz Question"
                      className="w-full p-3 brutal-border outline-none font-bold mb-4"
                      value={newLesson.quiz.question}
                      onChange={e => setNewLesson({...newLesson, quiz: {...newLesson.quiz, question: e.target.value}})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      {newLesson.quiz.options.map((opt, idx) => (
                        <input 
                          key={idx}
                          required
                          placeholder={`Option ${idx + 1}`}
                          className={`p-3 brutal-border outline-none font-bold ${newLesson.quiz.correctAnswer === idx ? 'bg-brutal-green/20' : 'bg-white'}`}
                          value={opt}
                          onChange={e => {
                            const newOpts = [...newLesson.quiz.options];
                            newOpts[idx] = e.target.value;
                            setNewLesson({...newLesson, quiz: {...newLesson.quiz, options: newOpts}});
                          }}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="font-black uppercase text-sm">Correct Option Index:</span>
                      <select 
                        className="p-2 brutal-border font-bold"
                        value={newLesson.quiz.correctAnswer}
                        onChange={e => setNewLesson({...newLesson, quiz: {...newLesson.quiz, correctAnswer: parseInt(e.target.value)}})}
                      >
                        {[0,1,2,3].map(i => <option key={i} value={i}>Option {i + 1}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="bg-black text-white px-8 py-3 brutal-border brutal-shadow font-black uppercase flex items-center gap-2">
                      <Save size={20} /> {editingLessonId ? 'Update Lesson' : 'Save Lesson'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsAddingLesson(false);
                        setEditingLessonId(null);
                      }}
                      className="bg-white px-8 py-3 brutal-border brutal-shadow font-black uppercase flex items-center gap-2"
                    >
                      <X size={20} /> Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="grid gap-4">
              {lessons.map(lesson => (
                <div key={lesson.docId} className="bg-white brutal-border p-4 flex justify-between items-center brutal-shadow hover:translate-x-1 transition-transform">
                  <div>
                    <h3 className="text-xl font-black uppercase">{lesson.title}</h3>
                    <p className="text-sm text-gray-500 font-bold">{lesson.id} • {(lesson.description || '').substring(0, 100)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditLesson(lesson)}
                      className="p-3 bg-brutal-yellow/20 text-black brutal-border hover:bg-brutal-yellow transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                    <button 
                      onClick={() => handleDeleteLesson(lesson.docId)}
                      className="p-3 bg-red-100 text-red-600 brutal-border hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
              {lessons.length === 0 && (
                <div className="text-center py-12 bg-white brutal-border border-dashed">
                  <p className="font-bold text-gray-400">No lessons found in database. Add one to get started!</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : activeTab === 'users' ? (
          <motion.div 
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-brutal-pink/10 p-4 brutal-border mb-6 flex items-center gap-3">
              <AlertTriangle className="text-brutal-pink" />
              <p className="font-bold text-sm">Be careful! Deleting a user will permanently remove their profile and progress.</p>
            </div>

            <div className="grid gap-4">
              {users.map(user => (
                <div key={user.id} className="bg-white brutal-border p-4 flex justify-between items-center brutal-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brutal-yellow brutal-border flex items-center justify-center font-black text-xl">
                      {user.displayName?.[0] || '?'}
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase">{user.displayName || 'Anonymous'}</h3>
                      <p className="text-xs text-gray-500 font-bold">UID: {user.id} • Level {user.level} • {user.xp} XP</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-3 bg-red-100 text-red-600 brutal-border hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              {users.length === 0 && (
                <div className="text-center py-12 bg-white brutal-border border-dashed">
                  <p className="font-bold text-gray-400">No users found.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : activeTab === 'content' ? (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex gap-4 mb-8">
              {(['variables', 'data_types', 'data_structures'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveContentSubTab(tab); setIsAddingContent(false); }}
                  className={`flex-1 p-3 brutal-border brutal-shadow font-black uppercase transition-all ${activeContentSubTab === tab ? 'bg-brutal-yellow' : 'bg-white'}`}
                >
                  {tab.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase">{activeContentSubTab.replace('_', ' ')} ({contentItems.length})</h2>
              <button 
                onClick={() => setIsAddingContent(true)}
                className="bg-brutal-green text-white px-4 py-2 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 hover:bg-black transition-colors"
              >
                <Plus size={20} /> Add New {activeContentSubTab.slice(0, -1).replace('_', ' ')}
              </button>
            </div>

            {isAddingContent && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="bg-white brutal-border p-6 mb-8 brutal-shadow-lg"
              >
                <form onSubmit={handleAddContent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      disabled={!!editingContentId}
                      placeholder="ID (e.g. numeric)"
                      className="p-3 brutal-border outline-none font-bold disabled:bg-gray-100"
                      value={newContent.id}
                      onChange={e => setNewContent({...newContent, id: e.target.value})}
                    />
                    <input 
                      required
                      placeholder="Name (e.g. Numeric)"
                      className="p-3 brutal-border outline-none font-bold"
                      value={newContent.name}
                      onChange={e => setNewContent({...newContent, name: e.target.value})}
                    />
                  </div>
                  <textarea 
                    required
                    placeholder="Definition"
                    className="w-full p-3 brutal-border outline-none font-bold h-20"
                    value={newContent.definition}
                    onChange={e => setNewContent({...newContent, definition: e.target.value})}
                  />
                  <textarea 
                    required
                    placeholder="Explanation & Syntax"
                    className="w-full p-3 brutal-border outline-none font-bold h-32"
                    value={newContent.explanation}
                    onChange={e => setNewContent({...newContent, explanation: e.target.value})}
                  />
                  <input 
                    required
                    placeholder="Syntax Example"
                    className="w-full p-3 brutal-border outline-none font-mono font-bold bg-gray-50"
                    value={newContent.syntax}
                    onChange={e => setNewContent({...newContent, syntax: e.target.value})}
                  />
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4 p-4 bg-brutal-blue/5 brutal-border">
                      <h3 className="font-black uppercase text-sm">Level 1 (Easy)</h3>
                      <textarea 
                        required
                        placeholder="Code"
                        className="w-full p-2 brutal-border font-mono text-sm h-24"
                        value={newContent.firstLevel.code}
                        onChange={e => setNewContent({...newContent, firstLevel: {...newContent.firstLevel, code: e.target.value}})}
                      />
                      <input 
                        required
                        placeholder="Output"
                        className="w-full p-2 brutal-border font-mono text-sm"
                        value={newContent.firstLevel.output}
                        onChange={e => setNewContent({...newContent, firstLevel: {...newContent.firstLevel, output: e.target.value}})}
                      />
                      <textarea 
                        required
                        placeholder="Explain Example"
                        className="w-full p-2 brutal-border text-sm h-20"
                        value={newContent.firstLevel.explanation}
                        onChange={e => setNewContent({...newContent, firstLevel: {...newContent.firstLevel, explanation: e.target.value}})}
                      />
                    </div>
                    <div className="space-y-4 p-4 bg-brutal-pink/5 brutal-border">
                      <h3 className="font-black uppercase text-sm">Level 2 (Hard)</h3>
                      <textarea 
                        required
                        placeholder="Code"
                        className="w-full p-2 brutal-border font-mono text-sm h-24"
                        value={newContent.secondLevel.code}
                        onChange={e => setNewContent({...newContent, secondLevel: {...newContent.secondLevel, code: e.target.value}})}
                      />
                      <input 
                        required
                        placeholder="Output"
                        className="w-full p-2 brutal-border font-mono text-sm"
                        value={newContent.secondLevel.output}
                        onChange={e => setNewContent({...newContent, secondLevel: {...newContent.secondLevel, output: e.target.value}})}
                      />
                      <textarea 
                        required
                        placeholder="Explain Example"
                        className="w-full p-2 brutal-border text-sm h-20"
                        value={newContent.secondLevel.explanation}
                        onChange={e => setNewContent({...newContent, secondLevel: {...newContent.secondLevel, explanation: e.target.value}})}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="bg-black text-white px-8 py-3 brutal-border brutal-shadow font-black uppercase flex items-center gap-2">
                      <Save size={20} /> {editingContentId ? 'Update Item' : 'Save Item'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsAddingContent(false);
                        setEditingContentId(null);
                      }}
                      className="bg-white px-8 py-3 brutal-border brutal-shadow font-black uppercase flex items-center gap-2"
                    >
                      <X size={20} /> Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="grid gap-4">
              {contentItems.map(item => (
                <div key={item.docId} className="bg-white brutal-border p-4 flex justify-between items-center brutal-shadow hover:translate-x-1 transition-transform">
                  <div>
                    <h3 className="text-xl font-black uppercase">{item.name}</h3>
                    <p className="text-sm text-gray-500 font-bold">{item.id} • {(item.definition || '').substring(0, 100)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditContent(item)}
                      className="p-3 bg-brutal-yellow/20 text-black brutal-border hover:bg-brutal-yellow transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                    <button 
                      onClick={() => handleDeleteContent(item.docId)}
                      className="p-3 bg-red-100 text-red-600 brutal-border hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
              {contentItems.length === 0 && (
                <div className="text-center py-12 bg-white brutal-border border-dashed">
                  <p className="font-bold text-gray-400">No items found in this category.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : activeTab === 'daily-quest' ? (
          <motion.div 
            key="daily-quest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Quest Management Section */}
            <div className="bg-white brutal-border p-8 brutal-shadow">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black uppercase italic">Daily Quest Management</h2>
                  <p className="text-sm font-bold text-gray-500">Total Questions in Pool: {questQuestions.length}</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={clearAllQuestions}
                    className="bg-red-600 text-white px-6 py-3 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 hover:bg-black transition-colors"
                  >
                    <Trash2 size={20} /> Clear Pool
                  </button>
                </div>
              </div>

              {/* Category Management */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {questCategories.map(cat => (
                  <div key={cat.id} className="p-6 brutal-border bg-white brutal-shadow flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black uppercase">{cat.name}</h3>
                      <button 
                        onClick={() => toggleCategoryLock(cat.id, cat.isLocked)}
                        className={cn(
                          "p-2 brutal-border transition-colors",
                          cat.isLocked ? "bg-red-100 text-red-600" : "bg-brutal-green text-white"
                        )}
                      >
                        {cat.isLocked ? <LucideLock size={20} /> : <LucideUnlock size={20} />}
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-xs font-bold text-gray-500 uppercase">
                        {questQuestions.filter(q => q.categoryId === cat.id).length} Questions
                      </p>
                      <p className={cn("text-[10px] font-black uppercase px-2 py-1 brutal-border", cat.isLocked ? "bg-gray-100" : "bg-brutal-green text-white")}>
                        {cat.isLocked ? "Locked" : "Unlocked"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload Section */}
              <div className="bg-brutal-blue/5 p-8 brutal-border border-dashed mb-12">
                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  <Upload size={24} /> Upload New MCQs
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Option 1: Upload to specific category */}
                  <div className="space-y-4 p-4 bg-white brutal-border">
                    <h4 className="font-black uppercase text-sm">Option 1: Upload to Category</h4>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase">Target Category</label>
                      <select 
                        className="w-full p-3 brutal-border font-bold outline-none"
                        value={selectedUploadCategory}
                        onChange={e => setSelectedUploadCategory(e.target.value)}
                      >
                        <option value="">Select Category...</option>
                        {questCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <label className={cn(
                      "w-full bg-brutal-green text-white px-8 py-3 brutal-border brutal-shadow font-black uppercase flex items-center justify-center gap-2 hover:bg-black transition-colors cursor-pointer",
                      (!selectedUploadCategory || isProcessingFile) && "opacity-50 pointer-events-none"
                    )}>
                      {isProcessingFile ? <Loader2 className="animate-spin" /> : <Upload size={20} />}
                      {isProcessingFile ? `Processing...` : 'Upload to Category'}
                      <input type="file" className="hidden" accept=".xlsx, .xls" onChange={handleExcelUpload} />
                    </label>
                  </div>

                  {/* Option 2: Upload and Create 5 Quizzes */}
                  <div className="space-y-4 p-4 bg-white brutal-border">
                    <h4 className="font-black uppercase text-sm">Option 2: Create 5 Random Quizzes</h4>
                    <p className="text-xs font-bold text-gray-500">Upload an Excel file with many questions. We will pick 20 random questions for 5 new quizzes.</p>
                    <label className={cn(
                      "w-full bg-brutal-blue text-white px-8 py-3 brutal-border brutal-shadow font-black uppercase flex items-center justify-center gap-2 hover:bg-black transition-colors cursor-pointer",
                      isProcessingFile && "opacity-50 pointer-events-none"
                    )}>
                      {isProcessingFile ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                      {isProcessingFile ? `Processing...` : 'Upload & Create 5 Quizzes'}
                      <input type="file" className="hidden" accept=".xlsx, .xls" onChange={handleExcelUploadAndCreateQuizzes} />
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={downloadTemplate}
                    className="bg-white text-black px-6 py-3 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 hover:bg-brutal-yellow transition-colors"
                  >
                    <Download size={20} /> Download Excel Template
                  </button>
                </div>

                {processingLog.length > 0 && (
                  <div className="mt-6 p-4 bg-black text-brutal-green font-mono text-xs brutal-border max-h-40 overflow-y-auto">
                    {processingLog.map((log, i) => (
                      <p key={i} className="mb-1">{`> ${log}`}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Student Results Table */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase flex items-center gap-2">
                    <Table size={24} /> Student Records
                  </h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={clearAllAttempts}
                      className="bg-red-600 text-white px-6 py-2 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 hover:bg-black transition-colors"
                    >
                      <Trash2 size={20} /> Clear All
                    </button>
                    <button 
                      onClick={downloadResultsExcel}
                      className="bg-brutal-yellow text-black px-6 py-2 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
                    >
                      <Download size={20} /> Export Excel
                    </button>
                  </div>
                </div>

                <div className="brutal-border overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-black text-white uppercase text-xs font-black">
                      <tr>
                        <th className="p-4 border-r border-white/20">Student</th>
                        <th className="p-4 border-r border-white/20">Test</th>
                        <th className="p-4 border-r border-white/20 text-center">Score</th>
                        <th className="p-4 border-r border-white/20 text-center">Percentage</th>
                        <th className="p-4 border-r border-white/20 text-center">Screen Changes</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                      {questAttempts.map(attempt => (
                        <tr key={attempt.id} className="hover:bg-gray-50 transition-colors font-bold text-sm">
                          <td className="p-4 border-r border-black/10">
                            <div>
                              <p className="uppercase">{attempt.userName}</p>
                              <p className="text-[10px] text-gray-400">{attempt.userEmail || 'No Email'}</p>
                            </div>
                          </td>
                          <td className="p-4 border-r border-black/10 uppercase text-xs">
                            {attempt.testName}
                          </td>
                          <td className="p-4 border-r border-black/10 text-center">
                            <span className={attempt.score >= attempt.total / 2 ? 'text-brutal-green' : 'text-red-600'}>
                              {attempt.score} / {attempt.total}
                            </span>
                          </td>
                          <td className="p-4 border-r border-black/10 text-center">
                            {Math.round((attempt.score / attempt.total) * 100)}%
                          </td>
                          <td className="p-4 border-r border-black/10 text-center">
                            <span className={cn(
                              "px-2 py-1 brutal-border font-black text-xs",
                              (attempt.tabSwitchCount || 0) > 0 ? "bg-red-100 text-red-600" : "bg-brutal-green/10 text-brutal-green"
                            )}>
                              {attempt.tabSwitchCount || 0}
                            </span>
                          </td>
                          <td className="p-4 text-gray-500 text-xs">
                            {new Date(attempt.attemptedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Question Pool Management */}
              <div className="space-y-6 mt-12 pt-12 border-t-4 border-black">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase flex items-center gap-2">
                    <FileText size={24} /> Question Pool ({questQuestions.length})
                  </h3>
                </div>
                
                {editingQuestion && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white brutal-border p-8 brutal-shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                      <h3 className="text-2xl font-black uppercase mb-6">Edit Question</h3>
                      <form onSubmit={handleUpdateQuestion} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase">Question Text</label>
                          <textarea 
                            required
                            className="w-full p-3 brutal-border font-bold h-24"
                            value={editingQuestion.question}
                            onChange={e => setEditingQuestion({...editingQuestion, question: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {editingQuestion.options.map((opt: string, idx: number) => (
                            <div key={idx} className="space-y-1">
                              <label className="text-[10px] font-black uppercase">Option {String.fromCharCode(65 + idx)}</label>
                              <input 
                                required
                                className="w-full p-2 brutal-border font-bold text-sm"
                                value={opt}
                                onChange={e => {
                                  const newOpts = [...editingQuestion.options];
                                  newOpts[idx] = e.target.value;
                                  setEditingQuestion({...editingQuestion, options: newOpts});
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="text-xs font-black uppercase">Correct Answer</label>
                          <select 
                            className="p-2 brutal-border font-bold"
                            value={editingQuestion.correctAnswer}
                            onChange={e => setEditingQuestion({...editingQuestion, correctAnswer: parseInt(e.target.value)})}
                          >
                            {[0,1,2,3].map(i => <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>)}
                          </select>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button type="submit" className="flex-1 bg-black text-white py-3 brutal-border brutal-shadow font-black uppercase">Save Changes</button>
                          <button type="button" onClick={() => setEditingQuestion(null)} className="flex-1 bg-white py-3 brutal-border brutal-shadow font-black uppercase">Cancel</button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}

                <div className="grid gap-4 max-h-[600px] overflow-y-auto p-2">
                  {questQuestions.map((q, idx) => (
                    <div key={q.id} className="bg-white brutal-border p-4 brutal-shadow flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 brutal-border">
                            {questCategories.find(c => c.id === q.categoryId)?.name || 'Unknown Category'}
                          </span>
                          <span className="text-[10px] font-black uppercase bg-brutal-yellow px-2 py-0.5 brutal-border">
                            Q{idx + 1}
                          </span>
                        </div>
                        <p className="font-bold text-sm mb-2">{q.question}</p>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-500">
                          {q.options.map((opt: string, i: number) => (
                            <div key={i} className={cn(i === q.correctAnswer && "text-brutal-green font-black")}>
                              {String.fromCharCode(65 + i)}: {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleEditQuestion(q)}
                          className="p-2 bg-brutal-blue/10 text-brutal-blue brutal-border hover:bg-brutal-blue hover:text-white transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={async () => {
                            if (window.confirm('Delete this question?')) {
                              await deleteDoc(doc(db, 'quest_questions', q.id));
                            }
                          }}
                          className="p-2 bg-red-100 text-red-600 brutal-border hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {questQuestions.length === 0 && (
                    <div className="text-center py-12 bg-white brutal-border border-dashed">
                      <p className="font-bold text-gray-400 italic">No questions in pool.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-white brutal-border p-8 brutal-shadow-lg max-w-md mx-auto">
              <h2 className="text-2xl font-black uppercase mb-6">Global Platform Stats</h2>
              {globalStats ? (
                <form onSubmit={handleUpdateStats} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase">Total Users</label>
                    <input 
                      type="number"
                      className="w-full p-3 brutal-border outline-none font-bold"
                      value={globalStats.totalUsers}
                      onChange={e => setGlobalStats({...globalStats, totalUsers: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase">Total XP Awarded</label>
                    <input 
                      type="number"
                      className="w-full p-3 brutal-border outline-none font-bold"
                      value={globalStats.totalXP}
                      onChange={e => setGlobalStats({...globalStats, totalXP: parseInt(e.target.value)})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-black text-white p-4 brutal-border brutal-shadow font-black uppercase flex items-center justify-center gap-2 hover:bg-brutal-blue transition-colors">
                    <Save size={20} /> Update Platform Stats
                  </button>
                  <button 
                    type="button"
                    onClick={handleResetStats}
                    className="w-full bg-red-100 text-red-600 p-4 brutal-border brutal-shadow font-black uppercase flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 size={20} /> Reset All Stats
                  </button>
                </form>
              ) : (
                <p className="text-center font-bold">Loading stats...</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
