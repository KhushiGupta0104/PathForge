import { Zap } from 'lucide-react'

function Footer() {
  return (
    <nav className="bg-[#262626] border-t border-[#3c3c3c] px-16 py-8 flex items-center justify-between text-[#eff1f6] w-full">
      <div className="flex items-center gap-2">
        <div className="bg-[#ffa116] p-1.5 rounded-lg">
          <Zap size={14} className="text-[#1a1a1a]" fill="#1a1a1a" />
        </div>
        <span className="text-white font-black">Path<span className="text-[#ffa116]">Forge</span></span>
      </div>
      <p className="text-[#8a8a8a] text-sm font-semibold">© 2024 PathForge. All rights reserved.</p>
      <div className="flex gap-6 font-semibold">
        <a href="#" className="text-[#8a8a8a] hover:text-white text-sm">Privacy</a>
        <a href="#" className="text-[#8a8a8a] hover:text-white text-sm">Terms</a>
        <a href="#" className="text-[#8a8a8a] hover:text-white text-sm">Contact</a>
      </div>
    </nav>
  )
}

export default Footer