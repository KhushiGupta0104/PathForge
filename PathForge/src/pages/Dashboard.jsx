import { Zap, Trophy, Flame, Code, CheckCircle, Award, BookOpen } from 'lucide-react'
import Sidebar from '../components/Sidebar'

function Dashboard() {
  return (
    <div className="bg-[#faf7f2] min-h-screen flex">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        <h1 className="text-2xl font-extrabold text-[#1c1917] mb-1">Your Command Center</h1>
        <p className="text-[#78716c] text-sm mb-8">Track your entire learning journey</p>

        <div className="bg-white border border-[#e2d9c8] rounded-2xl p-6 mb-6 flex items-start justify-between">
          <div>
            <p className="text-[#92400e] text-xs font-semibold mb-1">Next Task</p>
            <h2 className="text-[#1c1917] font-bold text-lg mb-1">Build a React Component Library</h2>
            <p className="text-[#78716c] text-sm mb-3">Create reusable components with TypeScript and Storybook</p>
            <div className="flex items-center gap-4 text-xs text-[#78716c]">
              <span className="flex items-center gap-1"><Zap size={12} className="text-[#92400e]" /> +250 XP</span>
              <span>2 days left</span>
            </div>
          </div>
          <span className="bg-[#92400e12] text-[#92400e] text-xs font-semibold px-3 py-1 rounded-full">In Progress</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Tasks Completed', value: '47', sub: '+12 this week' },
            { label: 'Certificates', value: '3', sub: '2 in progress' },
            { label: 'Learning Hours', value: '124', sub: '18h this month' },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-[#e2d9c8] rounded-2xl p-5">
              <p className="text-[#78716c] text-xs mb-1">{s.label}</p>
              <p className="text-[#1c1917] font-black text-3xl">{s.value}</p>
              <p className="text-[#92400e] text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#e2d9c8] rounded-2xl p-6">
          <h3 className="text-[#1c1917] font-bold mb-4">Recent Activity</h3>
          {[
            { action: 'Completed', task: 'Advanced TypeScript Patterns', time: '2 hours ago', xp: '+300 XP' },
            { action: 'Unlocked', task: 'React Master Badge', time: '1 day ago', xp: 'Achievement' },
            { action: 'Started', task: 'Backend Developer Pathway', time: '2 days ago', xp: 'New Path' },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#f0e8dc] last:border-0">
              <div className="flex items-center gap-3">
                <CheckCircle size={14} className="text-[#92400e]" />
                <div>
                  <p className="text-sm text-[#1c1917]">
                    <span className="text-[#92400e] font-semibold">{a.action}</span> {a.task}
                  </p>
                  <p className="text-xs text-[#78716c]">{a.time}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#92400e]">{a.xp}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard