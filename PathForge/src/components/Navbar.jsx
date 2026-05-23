import { Zap } from 'lucide-react'

function Navbar() {
  return (
    <nav className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-8 py-4 flex items-center justify-between">

      <div className="flex items-center gap-2">
        <div className="bg-[#059669] p-1.5 rounded-lg">
          <Zap size={16} className="text-white" fill="white" />
        </div>
        <span className="text-white font-bold text-xl">
          Path<span className="text-[#6ee7b7]">Forge</span>
        </span>
      </div>

      <div className="flex items-center gap-7">
        <a href="#" className="text-gray-400 hover:text-white text-sm">Features</a>
        <a href="#" className="text-gray-400 hover:text-white text-sm">Pathways</a>
        <a href="#" className="text-gray-400 hover:text-white text-sm">Dashboard</a>
        <a href="#" className="text-gray-400 hover:text-white text-sm">About</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-[#e8dfc4] hover:text-white text-sm border border-[#e8dfc430] px-4 py-2 rounded-lg">
          Login
        </button>
        <button className="bg-[#059669] hover:bg-[#047857] text-white text-sm px-4 py-2 rounded-lg font-medium">
          Get Started
        </button>
      </div>

    </nav>
  )
}

export default Navbar