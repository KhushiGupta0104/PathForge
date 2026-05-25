import { Zap, Trophy, Flame, Star } from 'lucide-react'

function HeroSection() {
  return (
    <section className="bg-[#faf7f2] px-16 py-24 flex items-center gap-20 relative overflow-hidden">
  
  {/* Background path */}
  <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 100 600 Q 300 400 500 300 Q 700 200 900 250 Q 1100 300 1200 100"
      stroke="#92400e"
      strokeWidth="3"
      strokeDasharray="12 8"
      fill="none"
    />
    <circle cx="100" cy="600" r="6" fill="#92400e" />
    <circle cx="500" cy="300" r="6" fill="#92400e" />
    <circle cx="900" cy="250" r="6" fill="#92400e" />
    <circle cx="1200" cy="100" r="6" fill="#92400e" />
  </svg>
      
      {/* Left — Text */}
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 bg-[#92400e12] border border-[#92400e25] text-[#92400e] text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <Zap size={12} />
          From confused student to job-ready, step by step.
        </div>

        <h1 className="text-5xl font-extrabold text-[#1c1917] leading-tight mb-5">
          Level Up Your <br />
          <span className="text-[#92400e]">Career Journey</span>
        </h1>

        <p className="text-[#78716c] text-base leading-relaxed mb-8 max-w-md">
          A gamified roadmap platform that helps students become job-ready through structured learning pathways, tasks, XP, badges, and real projects.
        </p>

        <div className="flex gap-3">
          <button className="bg-[#92400e] hover:bg-[#78350f] text-white font-semibold px-6 py-3 rounded-lg text-sm">
            Start Your Journey
          </button>
          <button className="border border-[#e2d9c8] text-[#78716c] hover:text-[#1c1917] hover:border-[#92400e] font-medium px-6 py-3 rounded-lg text-sm">
            Explore Pathways
          </button>
        </div>

        {/* Trust line */}
        <p className="text-[#78716c] text-xs mt-6">
          Join <span className="text-[#92400e] font-semibold">10,000+</span> students already on their path
        </p>
      </div>

      {/* Right — Card */}
      <div className="w-80">
        <div className="bg-white border border-[#e2d9c8] rounded-2xl p-6 shadow-sm">
          
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-[#78716c] mb-0.5">Current Level</p>
              <p className="text-[#1c1917] font-bold text-lg">Level 12</p>
            </div>
            <div className="bg-[#92400e] p-2.5 rounded-xl">
              <Trophy size={20} className="text-white" />
            </div>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#78716c]">Total XP</span>
              <span className="text-[#92400e] font-semibold">4,320 / 5,000</span>
            </div>
            <div className="bg-[#f0e8dc] rounded-full h-1.5">
              <div className="bg-[#92400e] h-1.5 rounded-full" style={{width:'86%'}}></div>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs text-[#78716c] mb-2">Recent Badges</p>
            <div className="flex gap-2">
              {['⭐','🏅','🏆'].map((b,i) => (
                <div key={i} className="bg-[#faf7f2] border border-[#e2d9c8] w-9 h-9 rounded-lg flex items-center justify-center text-base">
                  {b}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#faf7f2] border border-[#e2d9c8] rounded-xl p-3 flex items-center gap-3">
            <div className="bg-[#92400e15] p-2 rounded-lg">
              <Flame size={16} className="text-[#92400e]" />
            </div>
            <div>
              <p className="text-[#1c1917] font-bold text-sm">7 Day Streak 🔥</p>
              <p className="text-[#78716c] text-xs">Keep it going!</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default HeroSection