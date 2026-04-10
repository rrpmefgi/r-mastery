import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LESSONS } from '../constants';
import { auth, db, handleFirestoreError, OperationType, signOutAuth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, increment, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

// Components
import Navbar from './Navbar';
import Hero from './Hero';
import Curriculum from './Curriculum';
import RealWorld from './RealWorld';
import StatsBar from './StatsBar';
import Footer from './Footer';
import ModuleNav from './ModuleNav';
import LessonContent from './LessonContent';
import Quiz from './Quiz';
import AITutor from './AITutor';
import Leaderboard from './Leaderboard';
import Library from './Library';
import DailyQuest from './DailyQuest';
import Quizzes from './Quizzes';
import { WebRProvider } from './WebRProvider';
import { arrayRemove, arrayUnion, collection, getDocs } from 'firebase/firestore';
import PremiumLogin from './PremiumLogin';
import AdminPanel from './AdminPanel';
import { VARIABLES_DATA_TYPES_DATA } from '../data/variablesDataTypes';
import VariablesDataTypes from './VariablesDataTypes';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [globalStats, setGlobalStats] = useState<any>({ totalUsers: 1200, totalXP: 45000 });
  const [activeView, setActiveView] = useState<'lessons' | 'leaderboard' | 'daily-quest' | 'quizzes' | 'about' | 'library' | 'admin' | 'variables-data-types'>('lessons');
  const [hasCompletedPremiumLogin, setHasCompletedPremiumLogin] = useState(false);
  
  // Derive isAdmin from multiple sources
  const isAdmin = (user && (
    user.email === 'rushika@gmail.com' || 
    user.email === 'tirthkumar.doshi126072@marwadiuniversity.ac.in' ||
    user.email === 'admin@rmastery.com' ||
    userProfile?.role === 'admin'
  )) || (typeof window !== 'undefined' && localStorage.getItem('is_admin') === 'true');

  const handlePremiumLogin = (data: { name: string; email: string; phone: string; isAdmin: boolean }) => {
    console.log('Premium Login Success:', data);
    localStorage.setItem('premium_login_complete', 'true');
    localStorage.setItem('is_admin', data.isAdmin ? 'true' : 'false');
    setHasCompletedPremiumLogin(true);
    if (data.isAdmin) {
      setActiveView('admin');
    }
  };

  const handleFullLogout = async () => {
    await signOutAuth();
    localStorage.removeItem('premium_login_complete');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('premium_user_data');
    setHasCompletedPremiumLogin(false);
    setUser(null);
    setUserProfile(null);
    setActiveView('lessons');
  };

  const currentLesson = lessons[currentLessonIndex] || LESSONS[0];

  useEffect(() => {
    const lessonsRef = collection(db, 'lessons');
    const unsubscribe = onSnapshot(lessonsRef, (snapshot) => {
      if (snapshot.empty) {
        // Seed initial lessons if empty
        LESSONS.forEach(async (lesson) => {
          try {
            await setDoc(doc(db, 'lessons', lesson.id), lesson);
          } catch (e) {
            // Silently fail for non-admins
          }
        });
      } else {
        setLessons(snapshot.docs.map(doc => doc.data()));
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'lessons'));

    // Seed Variables & Data Types data if empty
    const seedCollection = async (collName: string, data: any[]) => {
      try {
        const ref = collection(db, collName);
        const snap = await getDocs(ref);
        if (snap.empty) {
          // Only attempt to seed if we are likely an admin to avoid console spam
          if (isAdmin) {
            for (const item of data) {
              try {
                await setDoc(doc(db, collName, item.id), item);
              } catch (e) {
                console.log(`Failed to seed item ${item.id} in ${collName}`);
              }
            }
          }
        }
      } catch (e) {
        // Silently fail for non-admins who can't write or if read fails
        console.log(`Seeding ${collName} skipped or failed.`);
      }
    };

    seedCollection('variables', VARIABLES_DATA_TYPES_DATA.variables);
    seedCollection('data_types', VARIABLES_DATA_TYPES_DATA.dataTypes);
    seedCollection('data_structures', VARIABLES_DATA_TYPES_DATA.dataStructures);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const statsRef = doc(db, 'global_stats', 'platform');
    const unsubscribe = onSnapshot(statsRef, (docSnap) => {
      if (docSnap.exists()) {
        setGlobalStats(docSnap.data());
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'global_stats/platform'));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setHasCompletedPremiumLogin(false);
    localStorage.removeItem('premium_login_complete');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setHasCompletedPremiumLogin(localStorage.getItem('premium_login_complete') === 'true');
      } else {
        setUser(null);
        setHasCompletedPremiumLogin(false);
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      return;
    }

    const profileRef = doc(db, 'users_public', user.uid);
    const unsubscribe = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        // Initialize profile
        const newProfile = {
          displayName: user.displayName || 'New Learner',
          email: user.email,
          xp: 0,
          level: 1,
          badges: 0,
          completedLessons: [],
          completedChallenges: [],
          library: [],
          lastActive: serverTimestamp()
        };
        setDoc(profileRef, newProfile).catch(e => handleFirestoreError(e, OperationType.WRITE, `users_public/${user.uid}`));
        
        // Update global stats: increment total users
        updateDoc(doc(db, 'global_stats', 'platform'), {
          totalUsers: increment(1)
        }).catch(e => console.error('Failed to update global stats:', e));

        // Also set private data
        setDoc(doc(db, 'users_private', user.uid), {
          email: user.email,
          createdAt: serverTimestamp()
        }).catch(e => handleFirestoreError(e, OperationType.WRITE, `users_private/${user.uid}`));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users_public/${user.uid}`);
    });

    return () => unsubscribe();
  }, [user]);

  const handleNextLesson = () => {
    const total = lessons.length > 0 ? lessons.length : LESSONS.length;
    if (currentLessonIndex < total - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setQuizSubmitted(false);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setQuizSubmitted(false);
    }
  };

  const handleQuizSubmit = async () => {
    if (quizAnswer !== null) {
      setQuizSubmitted(true);
      
      if (quizAnswer === currentLesson.quiz.correctAnswer && user) {
        // Award XP
        const profileRef = doc(db, 'users_public', user.uid);
        const statsRef = doc(db, 'global_stats', 'platform');
        
        try {
          await updateDoc(profileRef, {
            xp: increment(50),
            completedLessons: arrayUnion(currentLesson.id),
            lastActive: serverTimestamp()
          });

          // Update global stats: increment total XP
          await updateDoc(statsRef, {
            totalXP: increment(50)
          });
          
          // Simple level up logic
          if ((userProfile?.xp + 50) >= (userProfile?.level * 200)) {
            await updateDoc(profileRef, {
              level: increment(1)
            });
          }
        } catch (e) {
          handleFirestoreError(e, OperationType.UPDATE, `users_public/${user.uid}`);
        }
      }
    }
  };

  const toggleBookmark = async (lessonId: string) => {
    if (!user) return;
    const profileRef = doc(db, 'users_public', user.uid);
    const isBookmarked = userProfile?.library?.includes(lessonId);

    try {
      await updateDoc(profileRef, {
        library: isBookmarked ? arrayRemove(lessonId) : arrayUnion(lessonId)
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users_public/${user.uid}`);
    }
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brutal-yellow">
        <div className="bg-white brutal-border p-8 brutal-shadow-lg flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-brutal-yellow brutal-border animate-bounce" />
          <h2 className="text-2xl font-black uppercase tracking-tighter">Initializing R-Mastery...</h2>
        </div>
      </div>
    );
  }

  if (!user || !hasCompletedPremiumLogin) {
    return <PremiumLogin onLogin={handlePremiumLogin} />;
  }

  return (
    <WebRProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar 
          user={user} 
          userProfile={userProfile} 
          handleLogin={handleLogin} 
          isLoggingIn={isLoggingIn} 
          setActiveView={setActiveView}
          isAdmin={isAdmin}
          handleLogout={handleFullLogout}
        />

        <main className="flex-1 flex flex-col">
          {user && (
            <ModuleNav 
              lessons={lessons.length > 0 ? lessons : LESSONS}
              currentLessonIndex={currentLessonIndex}
              setCurrentLessonIndex={setCurrentLessonIndex}
              setShowQuiz={setShowQuiz}
              setQuizAnswer={setQuizAnswer}
              setQuizSubmitted={setQuizSubmitted}
              userProfile={userProfile}
              setActiveView={setActiveView}
              activeView={activeView}
            />
          )}

          <section className="flex-1 p-0 overflow-y-auto bg-white">
            {!user ? (
              <div className="w-full">
                <Hero handleLogin={handleLogin} isLoggingIn={isLoggingIn} />
                <Curriculum handleLogin={handleLogin} />
                <RealWorld />
                <StatsBar globalStats={globalStats} />
                <Footer />
              </div>
            ) : (
              <>
                {activeView === 'lessons' && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentLesson.id + (showQuiz ? '-quiz' : '-content')}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="max-w-4xl mx-auto"
                    >
                      {!showQuiz ? (
                        <LessonContent 
                          currentLesson={currentLesson}
                          currentLessonIndex={currentLessonIndex}
                          totalLessons={lessons.length > 0 ? lessons.length : LESSONS.length}
                          handlePrevLesson={handlePrevLesson}
                          setShowQuiz={setShowQuiz}
                          isBookmarked={userProfile?.library?.includes(currentLesson.id)}
                          toggleBookmark={() => toggleBookmark(currentLesson.id)}
                        />
                      ) : (
                        <Quiz 
                          currentLesson={currentLesson}
                          quizAnswer={quizAnswer}
                          setQuizAnswer={setQuizAnswer}
                          quizSubmitted={quizSubmitted}
                          handleQuizSubmit={handleQuizSubmit}
                          handleNextLesson={handleNextLesson}
                          setShowQuiz={setShowQuiz}
                          currentLessonIndex={currentLessonIndex}
                          totalLessons={lessons.length > 0 ? lessons.length : LESSONS.length}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
                {activeView === 'admin' && isAdmin && <AdminPanel />}
                {activeView === 'variables-data-types' && <VariablesDataTypes setActiveView={setActiveView} />}
                {activeView === 'leaderboard' && <Leaderboard />}
                {activeView === 'library' && (
                  <Library 
                    lessons={lessons.length > 0 ? lessons : LESSONS} 
                    userProfile={userProfile} 
                    setCurrentLessonIndex={setCurrentLessonIndex}
                    setActiveView={setActiveView}
                  />
                )}
                {activeView === 'daily-quest' && (
                  <DailyQuest 
                    userProfile={{...userProfile, uid: user?.uid, email: user?.email}} 
                    setActiveView={setActiveView} 
                  />
                )}
                {activeView === 'quizzes' && (
                  <Quizzes 
                    lessons={lessons.length > 0 ? lessons : LESSONS} 
                    userProfile={userProfile} 
                    setCurrentLessonIndex={setCurrentLessonIndex}
                    setShowQuiz={setShowQuiz}
                    setActiveView={setActiveView}
                  />
                )}
                {activeView === 'about' && (
                  <div className="p-12 max-w-2xl mx-auto">
                    <h2 className="text-4xl font-black uppercase mb-8">About R-Mastery</h2>
                    <div className="space-y-6 font-bold text-lg leading-relaxed">
                      <p>R-Mastery is a brutalist-inspired learning platform designed to make R programming accessible and fun.</p>
                      <p>Built with React, Firebase, and webR, it provides a real-time interactive environment for students to learn data science fundamentals.</p>
                    </div>
                  </div>
                )}
                <AITutor currentLesson={currentLesson} />
              </>
            )}
          </section>
        </main>
      </div>
    </WebRProvider>
  );
}
