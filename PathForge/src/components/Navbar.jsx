import { Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-[#262626] border-b border-[#3c3c3c] px-8 py-4 flex items-center justify-between sticky top-0 z-50 text-[#eff1f6]">
      
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-[#ffa116] p-1.5 rounded-lg">
          <Zap size={16} className="text-[#1a1a1a]" fill="#1a1a1a" />
        </div>
        <span className="text-white font-black text-xl">
          Path<span className="text-[#ffa116]">Forge</span>
        </span>
      </Link>

      <div className="flex items-center gap-8 font-semibold text-sm">
        <a href="#" className="text-[#8a8a8a] hover:text-white transition-colors">Features</a>
        <a href="#" className="text-[#8a8a8a] hover:text-white transition-colors">Pathways</a>
        <a href="#" className="text-[#8a8a8a] hover:text-white transition-colors">Dashboard</a>
        <a href="#" className="text-[#8a8a8a] hover:text-white transition-colors">About</a>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/login" className="text-[#ffa116] hover:text-[#ffb84d] text-sm font-bold px-4 py-2">
          Login
        </Link>
        <Link to="/signup" className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] text-sm px-5 py-2 rounded-lg font-bold cursor-pointer">
          Get Started
        </Link>
      </div>

    </nav>
  )
}

export default Navbar