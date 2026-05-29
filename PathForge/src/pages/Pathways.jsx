import { Clock, Zap, Code, Database, Layers, Brain, Cloud, BarChart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const pathways = [
  { icon: Code, title: 'Frontend Developer', difficulty: 'Beginner', duration: '6 months', xp: '5000 XP', tags: ['React', 'TypeScript', 'Tailwind'], diffColor: '#16a34a', diffBg: '#16a34a15' },
  { icon: Database, title: 'Backend Developer', difficulty: 'Intermediate', duration: '8 months', xp: '7500 XP', tags: ['Node.js', 'PostgreSQL', 'API'], diffColor: '#b45309', diffBg: '#b4530915' },
  { icon: Layers, title: 'Full Stack Developer', difficulty: 'Advanced', duration: '12 months', xp: '12000 XP', tags: ['MERN', 'Next.js', 'AWS'], diffColor: '#dc2626', diffBg: '#dc262615' },
  { icon: Brain, title: 'AI/ML Engineer', difficulty: 'Advanced', duration: '10 months', xp: '10000 XP', tags: ['Python', 'TensorFlow', 'ML'], diffColor: '#dc2626', diffBg: '#dc262615' },
  { icon: Cloud, title: 'DevOps Engineer', difficulty: 'Intermediate', duration: '7 months', xp: '8000 XP', tags: ['Docker', 'K8s', 'CI/CD'], diffColor: '#b45309', diffBg: '#b4530915' },
  { icon: BarChart, title: 'Data Scientist', difficulty: 'Advanced', duration: '11 months', xp: '11000 XP', tags: ['Python', 'Pandas', 'Stats'], diffColor: '#dc2626', diffBg: '#dc262615' },
]

function Pathways() {
  return (
    <div className="bg-[#faf7f2] min-h-screen flex">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-extrabold text-[#1c1917] mb-1">Choose Your Path</h1>
        <p className="text-[#78716c] text-sm mb-8">Select a career pathway and start your journey</p>

        <div className="grid grid-cols-3 gap-6">
          {pathways.map((p, i) => (
            <div key={i} className="bg-white border border-[#e2d9c8] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#92400e] transition-colors">
              <div className="flex items-start justify-between">
                <div className="bg-[#92400e12] p-3 rounded-xl">
                  <p.icon size={22} className="text-[#92400e]" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{color: p.diffColor, background: p.diffBg}}>
                  {p.difficulty}
                </span>
              </div>
              <div>
                <h3 className="text-[#1c1917] font-bold text-lg mb-3">{p.title}</h3>
                <div className="flex items-center gap-4 text-xs text-[#78716c]">
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                  <span className="flex items-center gap-1"><Zap size={12} className="text-[#92400e]" /> {p.xp}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag, j) => (
                  <span key={j} className="bg-[#faf7f2] border border-[#e2d9c8] text-[#78716c] text-xs px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <Link to="/pathway/1" className="w-full border border-[#e2d9c8] hover:border-[#92400e] hover:text-[#92400e] text-[#78716c] text-sm font-medium py-2.5 rounded-xl mt-auto text-center transition-colors">
                Start Pathway
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pathways