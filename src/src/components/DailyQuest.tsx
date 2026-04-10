import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, doc, setDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Clock, CheckCircle2, XCircle, ChevronRight, Lock, Play, AlertCircle, ArrowLeft, Download, AlertTriangle } from 'lucide-react';
import * as XLSX from 'xlsx';

interface DailyQuestProps {
  userProfile: any;
  setActiveView: (view: any) => void;
}

export default function DailyQuest({ userProfile, setActiveView }: DailyQuestProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!userProfile?.uid) return;

    let isMounted = true;
    const unsubscribe = onSnapshot(collection(db, 'quest_categories'), (snapshot) => {
      if (!isMounted) return;
      try {
        const cats = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as any[];
        setCategories(cats.sort((a, b) => (a.order || 0) - (b.order || 0)));
        setLoading(false);
      } catch (err) {
        console.error("Error processing categories:", err);
        setLoading(false);
      }
    }, (error) => {
      if (!isMounted) return;
      console.error("Firestore error in DailyQuest:", error);
      handleFirestoreError(error, OperationType.LIST, 'quest_categories');
      setLoading(false);
    });
    
    // Safety timeout to prevent infinite loading
    const timer = setTimeout(() => {
      if (isMounted && loading) {
        setLoading(false);
      }
    }, 5000);

    return () => {
      isMounted = false;
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!testStarted || isFinished) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
        setShowWarning(true);
      }
    };

    const handleBlur = () => {
      setTabSwitchCount(prev => prev + 1);
      setShowWarning(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [testStarted, isFinished]);

  const startTest = async (category: any) => {
    setLoading(true);
    try {
      const qRef = collection(db, 'quest_questions');
      const qQuery = query(qRef, where('categoryId', '==', category.id));
      
      const snapshot = await getDocs(qQuery);
      let allQuestions = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      if (allQuestions.length === 0) {
        alert("No questions found for this category. Please contact the professor.");
        setLoading(false);
        return;
      }

      // Shuffle and pick 20 (or all if less than 20)
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 20);
      
      setQuestions(selected);
      setSelectedCategory(category);
      setTestStarted(true);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setIsFinished(false);
      setShowReview(false);
      setScore(0);
      setTabSwitchCount(0);
      setShowWarning(false);
      setLoading(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'quest_questions');
      setLoading(false);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = async () => {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setIsFinished(true);

    // Save result
    if (userProfile?.uid) {
      try {
        const attemptId = `attempt-${Date.now()}-${userProfile.uid}`;
        await setDoc(doc(db, 'quest_attempts', attemptId), {
          userId: userProfile.uid,
          userName: userProfile.displayName,
          userEmail: userProfile.email,
          categoryId: selectedCategory.id,
          testName: selectedCategory.name,
          score: finalScore,
          total: questions.length,
          tabSwitchCount: tabSwitchCount,
          attemptedAt: new Date().toISOString()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'quest_attempts');
      }
    }
  };

  const downloadScoreExcel = () => {
    const data = [{
      StudentName: userProfile.displayName,
      Email: userProfile.email,
      QuizName: selectedCategory.name,
      Score: score,
      TotalQuestions: questions.length,
      Percentage: `${Math.round((score / questions.length) * 100)}%`,
      Date: new Date().toLocaleString(),
      ScreenChanges: tabSwitchCount
    }];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quiz Score");
    XLSX.writeFile(wb, `${userProfile.displayName}_${selectedCategory.name}_Score.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <div className="w-12 h-12 border-4 border-black border-t-brutal-yellow animate-spin mb-4" />
        <p className="font-black uppercase tracking-tighter">Loading Quests...</p>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">Daily Quests</h2>
          <p className="text-xl font-bold text-gray-600">Master R through daily challenges. Unlock new levels as you progress.</p>
        </div>

        <div className="grid gap-6">
          {categories.filter(cat => !cat.isLocked).map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white brutal-border p-8 brutal-shadow transition-all hover:-translate-y-1 hover:brutal-shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 brutal-border flex items-center justify-center text-2xl font-black bg-brutal-yellow">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-1">{cat.name}</h3>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                      Available Now
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => startTest(cat)}
                    className="bg-brutal-green text-white px-8 py-3 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 group-hover:bg-black transition-colors"
                  >
                    <Play size={18} /> Start Test
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {categories.filter(cat => !cat.isLocked).length === 0 && (
            <div className="text-center py-20 bg-white brutal-border border-dashed">
              <AlertCircle className="mx-auto mb-4 text-gray-300" size={48} />
              <p className="font-bold text-gray-400 italic">No quests are currently open. Please wait for the professor to open a test.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isFinished && !showReview) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white brutal-border p-12 brutal-shadow-lg"
        >
          <div className="w-24 h-24 bg-brutal-yellow brutal-border mx-auto mb-8 flex items-center justify-center">
            <Trophy size={48} />
          </div>
          <h2 className="text-4xl font-black uppercase mb-2">Test Completed!</h2>
          <p className="text-xl font-bold text-gray-500 mb-8 uppercase">{selectedCategory.name}</p>
          
          <div className="text-7xl font-black mb-4 tabular-nums">
            {score}<span className="text-3xl text-gray-400">/{questions.length}</span>
          </div>

          <div className="mb-8 p-4 bg-red-50 brutal-border border-red-200">
            <p className="text-red-600 font-black uppercase text-sm flex items-center justify-center gap-2">
              <AlertTriangle size={16} /> Screen Changes Detected: {tabSwitchCount}
            </p>
            <p className="text-[10px] text-red-400 font-bold mt-1 uppercase">Switching tabs or windows is recorded for anti-cheating.</p>
          </div>
          
          <div className="mb-12">
            <div className="h-4 bg-gray-100 brutal-border overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(score / questions.length) * 100}%` }}
                className="h-full bg-brutal-green"
              />
            </div>
            <p className="mt-2 font-black uppercase text-sm tracking-widest">
              {Math.round((score / questions.length) * 100)}% Accuracy
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={downloadScoreExcel}
              className="w-full bg-brutal-green text-white py-4 brutal-border brutal-shadow font-black uppercase hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <Download size={20} /> Download Score (Excel)
            </button>
            <button
              onClick={() => setShowReview(true)}
              className="w-full bg-brutal-blue text-white py-4 brutal-border brutal-shadow font-black uppercase hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} /> Review Answers
            </button>
            <button
              onClick={() => setTestStarted(false)}
              className="w-full bg-white text-black py-4 brutal-border brutal-shadow font-black uppercase hover:bg-gray-100 transition-colors"
            >
              Back to Quests
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Review Solutions</h2>
          <button
            onClick={() => setShowReview(false)}
            className="bg-black text-white px-6 py-2 brutal-border brutal-shadow font-black uppercase text-sm"
          >
            Back to Result
          </button>
        </div>

        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-white brutal-border p-8 brutal-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-black text-white px-3 py-1 brutal-border font-black text-xs uppercase">
                  Question {idx + 1}
                </span>
                {answers[idx] === q.correctAnswer ? (
                  <span className="text-brutal-green font-black uppercase text-xs flex items-center gap-1">
                    <CheckCircle2 size={14} /> Correct
                  </span>
                ) : (
                  <span className="text-red-600 font-black uppercase text-xs flex items-center gap-1">
                    <XCircle size={14} /> Incorrect
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-black mb-6">{q.question}</h3>
              
              <div className="grid gap-3">
                {q.options.map((opt: string, optIdx: number) => {
                  const isUserAnswer = answers[idx] === optIdx;
                  const isCorrectAnswer = q.correctAnswer === optIdx;
                  
                  return (
                    <div 
                      key={optIdx}
                      className={cn(
                        "p-4 brutal-border font-bold flex items-center justify-between",
                        isCorrectAnswer ? "bg-brutal-green/20 border-brutal-green" : 
                        isUserAnswer ? "bg-red-50 border-red-200" : "bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "w-8 h-8 brutal-border flex items-center justify-center text-sm font-black",
                          isCorrectAnswer ? "bg-brutal-green text-white" : 
                          isUserAnswer ? "bg-red-600 text-white" : "bg-white"
                        )}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className={cn(isCorrectAnswer && "text-brutal-green font-black")}>
                          {opt}
                        </span>
                      </div>
                      {isCorrectAnswer && <CheckCircle2 size={18} className="text-brutal-green" />}
                      {isUserAnswer && !isCorrectAnswer && <XCircle size={18} className="text-red-600" />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => setTestStarted(false)}
          className="flex items-center gap-2 font-black uppercase text-sm hover:text-brutal-pink transition-colors"
        >
          <ArrowLeft size={18} /> Quit Test
        </button>
        <div className="flex items-center gap-4">
          <div className="bg-white brutal-border px-4 py-2 font-black uppercase text-xs">
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className="flex items-center gap-2 bg-brutal-yellow brutal-border px-4 py-2 font-black uppercase text-xs">
            <Clock size={14} /> {Math.floor((questions.length * 60 - currentQuestionIndex * 30) / 60)}m left
          </div>
        </div>
      </div>

      <div className="bg-white brutal-border p-12 brutal-shadow mb-8">
        <h3 className="text-3xl font-black leading-tight mb-12">
          {currentQ.question}
        </h3>

        <div className="grid gap-4">
          {currentQ.options.map((option: string, idx: number) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={cn(
                "w-full text-left p-6 brutal-border font-bold text-lg transition-all flex items-center justify-between group",
                answers[currentQuestionIndex] === idx 
                  ? "bg-brutal-blue text-white brutal-shadow-sm translate-x-1" 
                  : "bg-white hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-4">
                <span className={cn(
                  "w-8 h-8 brutal-border flex items-center justify-center text-sm font-black",
                  answers[currentQuestionIndex] === idx ? "bg-white text-black" : "bg-gray-100"
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </div>
              {answers[currentQuestionIndex] === idx && <CheckCircle2 size={20} />}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-red-600 text-white p-6 brutal-border brutal-shadow-lg flex items-center gap-4">
              <div className="bg-white text-red-600 p-2 brutal-border">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <p className="font-black uppercase text-sm">Warning: Screen Change Detected!</p>
                <p className="text-xs font-bold opacity-90">Switching screens is recorded. Please stay on this page to complete your test.</p>
              </div>
              <button 
                onClick={() => setShowWarning(false)}
                className="bg-white text-black px-4 py-2 brutal-border font-black uppercase text-xs hover:bg-gray-100"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={answers[currentQuestionIndex] === undefined}
          className="bg-black text-white px-12 py-4 brutal-border brutal-shadow font-black uppercase flex items-center gap-2 disabled:opacity-50 hover:bg-brutal-green transition-colors"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
