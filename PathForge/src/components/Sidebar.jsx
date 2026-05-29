import { Zap, Trophy, Code, Award, BarChart, Flame } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { icon: Trophy, label: 'Dashboard', path: '/dashboard' },
  { icon: Code, label: 'Pathways', path: '/pathways' },
  { icon: Award, label: 'Achievements', path: '/achievements' },
  { icon: BarChart, label: 'Certificates', path: '/certificates' },
]

function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-white border-r border-[#e2d9c8] p-6 flex flex-col gap-2 fixed h-full">
      
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="bg-[#92400e] p-1.5 rounded-lg">
          <Zap size={16} className="text-white" fill="white" />
        </div>
        <span className="text-[#1c1917] font-bold text-xl">
          Path<span className="text-[#92400e]">Forge</span>
        </span>
      </Link>

      <div className="bg-[#faf7f2] border border-[#e2d9c8] rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#92400e] flex items-center justify-center text-white font-bold">K</div>
          <div>
            <p className="text-[#1c1917] font-semibold text-sm">Khushi Gupta</p>
            <p className="text-[#78716c] text-xs">Level 12</p>
          </div>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#78716c]">XP</span>
          <span className="text-[#92400e] font-semibold">4,320</span>
        </div>
        <div className="bg-[#f0e8dc] rounded-full h-1.5">
          <div className="bg-[#92400e] h-1.5 rounded-full" style={{width:'86%'}}></div>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <Flame size={12} className="text-[#92400e]" />
          <span className="text-xs text-[#78716c]">7 day streak</span>
        </div>
      </div>

      {navItems.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            location.pathname === item.path
              ? 'bg-[#92400e] text-white'
              : 'text-[#78716c] hover:bg-[#faf7f2]'
          }`}
        >
          <item.icon size={18} />
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default Sidebar