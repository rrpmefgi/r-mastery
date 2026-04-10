import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, ArrowRight, Star, Sparkles, AlertCircle } from 'lucide-react';
import { loginWithEmail, registerWithEmail, auth } from '../firebase';
import { updateProfile } from 'firebase/auth';

interface PremiumLoginProps {
  onLogin: (data: { name: string; email: string; phone: string; isAdmin: boolean }) => void;
}

export default function PremiumLogin({ onLogin }: PremiumLoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (isLogin) {
        // Login with Firebase Auth
        const userCredential = await loginWithEmail(formData.email, formData.password);
        const user = userCredential.user;
        
        // Check if admin
        const staticAdmins = [
          'rushika@gmail.com',
          'tirthkumar.doshi126072@marwadiuniversity.ac.in',
          'admin@rmastery.com'
        ];
        const isAdmin = staticAdmins.includes(user.email || '');
        
        setIsSuccess(true);
        setTimeout(() => {
          onLogin({ 
            name: user.displayName || 'User', 
            email: user.email || '', 
            phone: formData.phone || '', 
            isAdmin 
          });
        }, 1000);
      } else {
        // Register with Firebase Auth
        const userCredential = await registerWithEmail(formData.email, formData.password);
        const user = userCredential.user;
        
        // Update profile with name
        await updateProfile(user, { displayName: formData.name });
        
        setIsSuccess(true);
        setTimeout(() => {
          onLogin({ 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone, 
            isAdmin: false 
          });
        }, 1000);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let message = 'An error occurred during authentication.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email is already registered.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/operation-not-allowed') {
        message = 'Email/Password login is not enabled in Firebase Console. Please enable it.';
      }
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden font-comic relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-brutal-yellow opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100, Math.random() * 100],
              rotate: 360,
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            <Star size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white brutal-border brutal-shadow-lg p-8 relative overflow-hidden">
          {/* Premium Header */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brutal-yellow via-brutal-pink to-brutal-blue animate-pulse" />
          
          <div className="text-center mb-8">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
              className="inline-block bg-brutal-yellow p-4 brutal-border mb-4"
            >
              <Sparkles size={40} className="text-black" />
            </motion.div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              {isLogin ? 'Login Access' : 'Create Account'}
            </h1>
            <p className="text-gray-600 font-bold">Welcome to R-Mastery Elite</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-24 h-24 bg-brutal-green rounded-full mx-auto flex items-center justify-center brutal-border mb-4"
                  >
                    <Star size={48} className="text-white fill-current" />
                  </motion.div>
                  <h3 className="text-3xl font-black uppercase italic">Access Granted!</h3>
                  <p className="text-gray-600 font-bold mt-2">Welcome to the elite platform.</p>
                </motion.div>
              ) : isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block mb-4"
                  >
                    <Star size={48} className="text-brutal-yellow fill-current" />
                  </motion.div>
                  <h3 className="text-2xl font-black uppercase italic">Authenticating...</h3>
                  <div className="w-full bg-gray-200 h-4 brutal-border mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-brutal-green"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {error && (
                    <div className="bg-brutal-pink text-white p-3 brutal-border flex items-center gap-2 text-sm font-bold">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase flex items-center gap-2">
                        <User size={16} /> Full Name
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full p-3 brutal-border focus:bg-brutal-yellow transition-colors outline-none font-bold"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase flex items-center gap-2">
                      <Mail size={16} /> Email Address
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full p-3 brutal-border focus:bg-brutal-pink focus:text-white transition-colors outline-none font-bold"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase flex items-center gap-2">
                      <Lock size={16} /> Password
                    </label>
                    <input
                      required
                      type="password"
                      className="w-full p-3 brutal-border focus:bg-brutal-blue focus:text-white transition-colors outline-none font-bold"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-black text-white p-4 brutal-border brutal-shadow font-black uppercase flex items-center justify-center gap-2 hover:bg-brutal-yellow hover:text-black transition-colors"
                  >
                    {isLogin ? 'Enter Platform' : 'Create Account'} <ArrowRight size={20} />
                  </motion.button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm font-black uppercase underline hover:text-brutal-pink transition-colors"
                    >
                      {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Premium Footer Decoration */}
          <div className="mt-8 flex justify-center gap-4 opacity-30">
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
          </div>
        </div>
      </motion.div>

      {/* Parallax Background Layers */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '10%', 
          left: '5%', 
          zIndex: 0 
        }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0] 
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="hidden lg:block"
      >
        <div className="w-32 h-32 bg-brutal-pink brutal-border -rotate-12" />
      </motion.div>

      <motion.div 
        style={{ 
          position: 'absolute', 
          bottom: '10%', 
          right: '5%', 
          zIndex: 0 
        }}
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0] 
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="hidden lg:block"
      >
        <div className="w-40 h-40 bg-brutal-blue brutal-border rotate-12" />
      </motion.div>
    </div>
  );
}
