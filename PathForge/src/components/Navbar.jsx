import { Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-[#faf7f2] border-b border-[#e2d9c8] px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-[#92400e] p-1.5 rounded-lg">
          <Zap size={16} className="text-white" fill="white" />
        </div>
        <span className="text-[#1c1917] font-bold text-xl">
          Path<span className="text-[#92400e]">Forge</span>
        </span>
      </Link>

      <div className="flex items-center gap-8">
        <a href="#" className="text-[#78716c] hover:text-[#1c1917] text-sm font-medium">Features</a>
        <a href="#" className="text-[#78716c] hover:text-[#1c1917] text-sm font-medium">Pathways</a>
        <a href="#" className="text-[#78716c] hover:text-[#1c1917] text-sm font-medium">Dashboard</a>
        <a href="#" className="text-[#78716c] hover:text-[#1c1917] text-sm font-medium">About</a>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/login" className="text-[#92400e] hover:text-[#78350f] text-sm font-medium px-4 py-2">
          Login
        </Link>
        <Link to="/signup" className="bg-[#92400e] hover:bg-[#78350f] text-white text-sm px-5 py-2 rounded-lg font-medium">
          Get Started
        </Link>
      </div>

    </nav>
  )
}

export default Navbar