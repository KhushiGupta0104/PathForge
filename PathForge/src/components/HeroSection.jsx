import { Zap, Trophy, Flame } from 'lucide-react'

function HeroSection() {
  return (
    <section className="bg-[#0a0a0a] min-h-screen px-8 py-20 flex items-center justify-between gap-12">
      
      <div className="flex-1 max-w-xl">
        <div className="inline-flex items-center gap-2 bg-[#05966912] border border-[#05966930] text-[#6ee7b7] text-sm px-4 py-2 rounded-full mb-6">
          <Zap size={14} />
          From confused student to job-ready, step by step.
        </div>

        <h1 className="text-6xl font-black text-white leading-tight mb-6">
          Level Up Your <br />
          <span className="text-[#6ee7b7]">Career Journey</span>
        </h1>

        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          A gamified roadmap platform that helps students become job-ready through structured learning pathways, tasks, XP, badges, and real projects.
        </p>

        <div className="flex gap-4">
          <button className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8 py-3 rounded-xl">
            Start Your Journey
          </button>
          <button className="border border-[#e8dfc430] text-[#e8dfc4] hover:text-white font-medium px-8 py-3 rounded-xl">
            Explore Pathways
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-sm">
        <div className="bg-[#111] border border-[#05966925] rounded-2xl p-6">
          
          <div className="bg-[#059669] w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <Trophy size={28} className="text-white" />
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Total XP</span>
            <span className="bg-[#05966918] text-[#6ee7b7] text-xs px-3 py-1 rounded-full">Level 12</span>
          </div>

          <div className="text-[#e8dfc4] text-sm mb-2">4,320 / 5,000</div>
          <div className="bg-[#1a1a1a] rounded-full h-2 mb-4">
            <div className="bg-[#059669] h-2 rounded-full" style={{width:'86%'}}></div>
          </div>

          <div className="text-gray-400 text-sm mb-3">Recent Badges</div>
          <div className="flex gap-2 mb-4">
            {['⭐','🏅','🏆'].map((b,i) => (
              <div key={i} className="bg-[#05966915] border border-[#05966930] w-10 h-10 rounded-xl flex items-center justify-center text-lg">
                {b}
              </div>
            ))}
          </div>

          <div className="bg-[#0a0a0a] border border-[#e8dfc420] rounded-xl p-3 flex items-center gap-3">
            <div className="bg-[#05966920] p-2 rounded-lg">
              <Flame size={18} className="text-[#6ee7b7]" />
            </div>
            <div>
              <div className="text-[#e8dfc4] font-bold text-lg leading-none">7 Days</div>
              <div className="text-gray-500 text-xs mt-1">Current streak</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default HeroSection