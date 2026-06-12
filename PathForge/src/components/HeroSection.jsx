import { Zap, Trophy, Flame } from 'lucide-react'

function HeroSection() {
  return (
    <section className="bg-[#1a1a1a] px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden text-[#eff1f6] max-w-7xl mx-auto w-full">
  
  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 100 600 Q 300 400 500 300 Q 700 200 900 250 Q 1100 300 1200 100"
      stroke="#ffa116"
      strokeWidth="3"
      strokeDasharray="12 8"
      fill="none"
    />
    <circle cx="100" cy="600" r="6" fill="#ffa116" />
    <circle cx="500" cy="300" r="6" fill="#ffa116" />
    <circle cx="900" cy="250" r="6" fill="#ffa116" />
    <circle cx="1200" cy="100" r="6" fill="#ffa116" />
  </svg>
      
      {/* Left — Text */}
      <div className="flex-1 z-10">
        <div className="inline-flex items-center gap-2 bg-[#ffa116]/10 border border-[#ffa116]/25 text-[#ffa116] text-xs font-bold px-3 py-1.5 rounded-full mb-8">
          <Zap size={12} />
          From confused student to job-ready, step by step.
        </div>

        <h1 className="text-5xl font-black text-white leading-tight mb-5 tracking-tight">
          Level Up Your <br />
          <span className="text-[#ffa116]">Career Journey</span>
        </h1>

        <p className="text-[#8a8a8a] text-base leading-relaxed mb-8 max-w-md font-semibold">
          A gamified roadmap platform that helps students become job-ready through structured learning pathways, tasks, XP, badges, and real projects.
        </p>

        <div className="flex gap-3">
          <button className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-[#ffa116]/10">
            Start Your Journey
          </button>
          <button className="border border-[#3c3c3c] text-[#eff1f6] hover:text-[#ffa116] hover:border-[#ffa116] font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer bg-[#262626]">
            Explore Pathways
          </button>
        </div>

        {/* Trust line */}
        <p className="text-[#8a8a8a] text-xs mt-6 font-semibold">
          Join <span className="text-[#ffa116] font-bold">10,000+</span> students already on their path
        </p>
      </div>

      {/* Right — Card */}
      <div className="w-80 z-10">
        <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-md">
          
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-[#8a8a8a] mb-0.5 font-bold">Current Level</p>
              <p className="text-white font-black text-lg">Level 12</p>
            </div>
            <div className="bg-[#ffa116] p-2.5 rounded-xl">
              <Trophy size={20} className="text-[#1a1a1a]" fill="#1a1a1a" />
            </div>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1.5 font-bold">
              <span className="text-[#8a8a8a]">Total XP</span>
              <span className="text-[#ffa116]">4,320 / 5,000</span>
            </div>
            <div className="bg-[#3c3c3c] rounded-full h-1.5">
              <div className="bg-[#ffa116] h-1.5 rounded-full" style={{width:'86%'}}></div>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs text-[#8a8a8a] mb-2 font-bold">Recent Badges</p>
            <div className="flex gap-2">
              {['⭐','🏅','🏆'].map((b,i) => (
                <div key={i} className="bg-[#1a1a1a] border border-[#3c3c3c] w-9 h-9 rounded-lg flex items-center justify-center text-base">
                  {b}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#3c3c3c] rounded-xl p-3 flex items-center gap-3">
            <div className="bg-[#ffa116]/10 p-2 rounded-lg">
              <Flame size={16} className="text-[#ffa116]" fill="#ffa116" />
            </div>
            <div>
              <p className="text-[#ffa116] font-bold text-sm">7 Day Streak 🔥</p>
              <p className="text-[#8a8a8a] text-xs font-semibold">Keep it going!</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default HeroSection