import { LogIn, LogOut, User as UserIcon, Zap } from 'lucide-react';

interface NavbarProps {
  user: any;
  userProfile: any;
  handleLogin: () => void;
  isLoggingIn: boolean;
  setActiveView: (view: any) => void;
  isAdmin: boolean;
  handleLogout: () => void;
}

export default function Navbar({ user, userProfile, handleLogin, isLoggingIn, setActiveView, isAdmin, handleLogout }: NavbarProps) {
  return (
    <header className="bg-white border-b-4 border-black p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveView('lessons')}
            className="flex flex-col text-left"
          >
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">R-Mastery</h1>
            <span className="text-[8px] font-black uppercase tracking-widest text-black/60">By Rushika Patt</span>
          </button>
        </div>

        <nav className="hidden xl:flex items-center gap-6 font-black uppercase text-xs tracking-widest">
          <button onClick={() => setActiveView('lessons')} className="hover:text-brutal-blue transition-colors">Home</button>
          <button onClick={() => setActiveView('leaderboard')} className="hover:text-brutal-pink transition-colors">Leaderboard</button>
          <button onClick={() => setActiveView('library')} className="hover:text-brutal-blue transition-colors">Library</button>
          <button onClick={() => setActiveView('daily-quest')} className="hover:text-brutal-green transition-colors">Daily Quest</button>
          <button onClick={() => setActiveView('quizzes')} className="hover:text-brutal-yellow transition-colors">Quizzes</button>
          <button onClick={() => setActiveView('about')} className="hover:text-black/40 transition-colors">About</button>
          {isAdmin && (
            <button 
              onClick={() => setActiveView('admin')} 
              className="bg-brutal-yellow px-2 py-1 brutal-border hover:bg-black hover:text-white transition-colors"
            >
              Admin
            </button>
          )}
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 sm:gap-3 bg-white brutal-border px-2 sm:px-4 py-1 sm:py-2 font-black brutal-shadow text-[10px] sm:text-sm uppercase tracking-tighter">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brutal-yellow brutal-border flex items-center justify-center">
                <UserIcon size={14} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="flex flex-col">
                <span className="leading-none truncate max-w-[60px] sm:max-w-[120px]">{userProfile?.displayName || 'Learner'}</span>
                <span className="text-[8px] sm:text-[10px] text-black/50">Level {userProfile?.level || 1}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-white brutal-border px-3 py-1 font-bold">
              <div className="flex items-center gap-1 text-brutal-blue">
                <Zap size={16} />
                <span>{userProfile?.xp || 0} XP</span>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="bg-white brutal-border p-2 brutal-3d"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="bg-black text-white brutal-border px-6 py-2 font-black brutal-3d flex items-center gap-2 disabled:opacity-50 uppercase tracking-tighter text-sm"
          >
            <LogIn size={18} />
            {isLoggingIn ? 'LOGGING IN...' : 'JOIN THE MASTERY'}
          </button>
        )}
      </div>
    </header>
  );
}
