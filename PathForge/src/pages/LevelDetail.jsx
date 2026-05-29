import { Zap, PlayCircle, HelpCircle, Code, CheckCircle, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const tasks = [
  { id: 1, type: 'video', title: 'Introduction to Arrays', desc: 'Watch this video to understand array fundamentals', xp: 50, completed: true },
  { id: 2, type: 'quiz', title: 'Arrays Quiz', desc: '10 MCQ questions on array operations', xp: 100, completed: true },
  { id: 3, type: 'project', title: 'Build a Todo List', desc: 'Create a todo list using arrays and DOM manipulation', xp: 200, completed: false },
  { id: 4, type: 'video', title: 'Loops Deep Dive', desc: 'For loops, while loops, forEach explained', xp: 50, completed: false },
  { id: 5, type: 'quiz', title: 'Loops Quiz', desc: '8 MCQ questions on loop concepts', xp: 100, completed: false },
]

const typeConfig = {
  video:   { icon: PlayCircle,  label: 'Video',   color: '#2563eb', bg: '#2563eb12' },
  quiz:    { icon: HelpCircle,  label: 'Quiz',    color: '#b45309', bg: '#b4530912' },
  project: { icon: Code,        label: 'Project', color: '#92400e', bg: '#92400e12' },
}

function LevelDetail() {
  return (
    <div className="bg-[#faf7f2] min-h-screen flex">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        <p className="text-[#78716c] text-sm mb-4">
          <Link to="/pathway/1" className="hover:text-[#92400e]">← Frontend Developer</Link>
        </p>
        <h1 className="text-2xl font-extrabold text-[#1c1917] mb-1">Level 2 — DSA Basics</h1>
        <p className="text-[#78716c] text-sm mb-8">Arrays, Loops · 750 XP · 5 tasks</p>

        <div className="bg-white border border-[#e2d9c8] rounded-2xl p-5 mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#1c1917] font-semibold">Level Progress</span>
            <span className="text-[#92400e] font-semibold">2 / 5 Tasks</span>
          </div>
          <div className="bg-[#f0e8dc] rounded-full h-2">
            <div className="bg-[#92400e] h-2 rounded-full" style={{width:'40%'}}></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {tasks.map((task, i) => {
            const config = typeConfig[task.type]
            return (
              <div key={i} className={`bg-white border rounded-2xl p-5 flex items-center justify-between ${task.completed ? 'border-[#92400e30]' : 'border-[#e2d9c8]'}`}>
                
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl" style={{background: config.bg}}>
                    <config.icon size={20} style={{color: config.color}} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[#1c1917] font-semibold text-sm">{task.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{color: config.color, background: config.bg}}>{config.label}</span>
                    </div>
                    <p className="text-[#78716c] text-xs">{task.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[#92400e] flex items-center gap-1">
                    <Zap size={12} /> +{task.xp} XP
                  </span>
                  {task.completed ? (
                    <div className="flex items-center gap-1 text-[#92400e] text-xs font-semibold">
                      <CheckCircle size={16} /> Done
                    </div>
                  ) : (
                    <button className="bg-[#92400e] hover:bg-[#78350f] text-white text-xs font-semibold px-4 py-2 rounded-lg">
                      Start
                    </button>
                  )}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default LevelDetail