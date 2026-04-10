import { Activity, BarChart3, Globe } from 'lucide-react';

export default function RealWorld() {
  const items = [
    { title: "Epidemiology", icon: <Activity />, progress: 85, color: "bg-brutal-pink" },
    { title: "Quantitative Finance", icon: <BarChart3 />, progress: 70, color: "bg-brutal-yellow" },
    { title: "User Behavior", icon: <Globe />, progress: 95, color: "bg-brutal-blue" }
  ];

  return (
    <div className="bg-white py-24 px-6 md:px-12 border-t-8 border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter mb-16 text-center">
          R IN THE REAL WORLD
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <div key={i} className="bg-white brutal-border p-8 brutal-shadow-lg">
              <div className={`w-16 h-16 ${item.color} text-black flex items-center justify-center mb-6 brutal-border brutal-shadow`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{item.title}</h3>
              <div className="space-y-4">
                <div className="flex justify-between font-black text-sm uppercase">
                  <span>Industry Demand</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="w-full h-6 bg-black/10 brutal-border">
                  <div className={`${item.color} h-full`} style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
