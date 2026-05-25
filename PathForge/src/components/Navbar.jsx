import { Zap } from 'lucide-react'

function Navbar() {
  return (
    <nav className="bg-[#faf7f2] border-b border-[#e2d9c8] px-8 py-4 flex items-center justify-between">

      <div className="flex items-center gap-2">
        <div className="bg-[#92400e] p-1.5 rounded-lg">
  <Zap size={16} className="text-white" fill="white" />
</div>
        <span className="text-[#1c1917] font-bold text-xl">
  Path<span className="text-[#92400e]">Forge</span>
</span>
      </div>

      <div className="flex items-center gap-7">
        <a href="#" className="text-gray-400 hover:text-white text-sm">Features</a>
        <a href="#" className="text-gray-400 hover:text-white text-sm">Pathways</a>
        <a href="#" className="text-gray-400 hover:text-white text-sm">Dashboard</a>
        <a href="#" className="text-gray-400 hover:text-white text-sm">About</a>
      </div>

      <div className="flex items-center gap-4">
       <button className="text-[#92400e] hover:text-[#78350f] text-sm font-medium px-4 py-2">
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