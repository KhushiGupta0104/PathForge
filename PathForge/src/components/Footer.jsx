import { Zap } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#faf7f2] border-t border-[#e2d9c8] px-16 py-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-[#92400e] p-1.5 rounded-lg">
          <Zap size={14} className="text-white" fill="white" />
        </div>
        <span className="text-[#1c1917] font-bold">Path<span className="text-[#92400e]">Forge</span></span>
      </div>
      <p className="text-[#78716c] text-sm">© 2024 PathForge. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="text-[#78716c] hover:text-[#1c1917] text-sm">Privacy</a>
        <a href="#" className="text-[#78716c] hover:text-[#1c1917] text-sm">Terms</a>
        <a href="#" className="text-[#78716c] hover:text-[#1c1917] text-sm">Contact</a>
      </div>
    </footer>
  )
}

export default Footer