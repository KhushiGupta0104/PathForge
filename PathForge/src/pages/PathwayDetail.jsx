import { Zap, Lock, CheckCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const levels = [
  { id: 1, title: 'Programming Basics', focus: 'Python / C', xp: 500, tasks: 8, unlocked: true, completed: true },
  { id: 2, title: 'DSA Basics', focus: 'Arrays, Loops', xp: 750, tasks: 10, unlocked: true, completed: false },
  { id: 3, title: 'Web Basics', focus: 'HTML, CSS', xp: 600, tasks: 7, unlocked: false, completed: false },
  { id: 4, title: 'Frontend', focus: 'JavaScript, React', xp: 1000, tasks: 12, unlocked: false, completed: false },
  { id: 5, title: 'Backend', focus: 'Node.js, MongoDB', xp: 1200, tasks: 14, unlocked: false, completed: false },
  { id: 6, title: 'Real Projects', focus: 'Full App', xp: 1500, tasks: 10, unlocked: false, completed: false },
]

function PathwayDetail() {
  return (
    <div className="bg-[#faf7f2] min-h-screen flex">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        <div className="mb-8">
          <p className="text-[#78716c] text-sm mb-1">← <Link to="/pathways" className="hover:text-[#92400e]">All Pathways</Link></p>
          <h1 className="text-2xl font-extrabold text-[#1c1917] mb-1">Frontend Developer</h1>
          <p className="text-[#78716c] text-sm">6 months · 5000 XP · Beginner</p>
        </div>

        <div className="bg-white border border-[#e2d9c8] rounded-2xl p-5 mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#1c1917] font-semibold">Overall Progress</span>
            <span className="text-[#92400e] font-semibold">1 / 6 Levels</span>
          </div>
          <div className="bg-[#f0e8dc] rounded-full h-2">
            <div className="bg-[#92400e] h-2 rounded-full" style={{width:'16%'}}></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {levels.map((level, i) => (
            <div key={i} className={`bg-white border rounded-2xl p-5 flex items-center justify-between ${level.unlocked ? 'border-[#e2d9c8]' : 'border-[#e2d9c8] opacity-60'}`}>
              
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${level.completed ? 'bg-[#92400e] text-white' : level.unlocked ? 'bg-[#92400e12] text-[#92400e] border-2 border-[#92400e]' : 'bg-[#f0e8dc] text-[#78716c]'}`}>
                  {level.completed ? <CheckCircle size={18} /> : level.unlocked ? level.id : <Lock size={16} />}
                </div>
                <div>
                  <p className="text-[#1c1917] font-semibold text-sm">Level {level.id} — {level.title}</p>
                  <p className="text-[#78716c] text-xs">{level.focus} · {level.tasks} tasks · {level.xp} XP</p>
                </div>
              </div>

              {level.unlocked ? (
                <Link to={`/level/${level.id}`} className="flex items-center gap-1 text-[#92400e] text-sm font-semibold hover:underline">
                  {level.completed ? 'Review' : 'Continue'} <ChevronRight size={16} />
                </Link>
              ) : (
                <span className="text-[#78716c] text-xs">Complete previous level</span>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PathwayDetail