import { Code, MessageSquare, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-4xl font-black tracking-tighter uppercase">R-Mastery</h2>
          </div>
          <p className="text-xl font-bold text-white/60 max-w-md uppercase leading-tight mb-8">
            Empowering the next generation of data scientists with the most interactive R learning platform.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/10 brutal-border flex items-center justify-center hover:bg-brutal-blue transition-colors cursor-pointer">
              <Code size={20} />
            </div>
            <div className="w-10 h-10 bg-white/10 brutal-border flex items-center justify-center hover:bg-brutal-pink transition-colors cursor-pointer">
              <MessageSquare size={20} />
            </div>
            <div className="w-10 h-10 bg-white/10 brutal-border flex items-center justify-center hover:bg-brutal-green transition-colors cursor-pointer">
              <Code size={20} />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-brutal-yellow font-black uppercase mb-6 tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 font-bold uppercase text-xs tracking-widest">
            <li><a href="#" className="hover:text-brutal-blue">Home</a></li>
            <li><a href="#" className="hover:text-brutal-pink">Leaderboard</a></li>
            <li><a href="#" className="hover:text-brutal-green">Daily Quest</a></li>
            <li><a href="#" className="hover:text-brutal-yellow">Quizzes</a></li>
            <li><a href="#" className="hover:text-white/40">About</a></li>
          </ul>
        </div>

        <div className="md:col-span-6">
          <h4 className="text-brutal-pink font-black uppercase mb-6 tracking-widest text-sm">Student Message</h4>
          <div className="space-y-4">
            <textarea 
              placeholder="SEND US A MESSAGE..."
              className="w-full bg-white/5 brutal-border p-4 font-black uppercase text-sm focus:outline-none focus:bg-white/10 min-h-[120px]"
            />
            <button className="bg-brutal-green text-black brutal-border px-8 py-3 font-black uppercase tracking-widest text-sm brutal-3d flex items-center gap-2">
              <Send size={18} />
              Send Message
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t-4 border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-bold uppercase text-sm text-white/40">© 2026 R-Mastery Platform. All rights reserved.</p>
        <div className="flex gap-8 font-bold uppercase text-sm text-white/40">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
