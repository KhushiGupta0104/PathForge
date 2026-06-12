import { Zap, Star, Flame } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'XP System',
    description: 'Earn experience points for every task completed. Level up to unlock advanced challenges.',
    color: '#ffa116',
    bg: 'rgba(255,161,22,0.1)',
    extra: (
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#8a8a8a] font-bold">Current Level</span>
          <span className="text-[#ffa116] font-extrabold">Level 12</span>
        </div>
        <div className="bg-[#3c3c3c] rounded-full h-1.5">
          <div className="bg-[#ffa116] h-1.5 rounded-full" style={{width:'75%'}}></div>
        </div>
        <p className="text-xs text-[#8a8a8a] mt-1 font-semibold">750 XP to next level</p>
      </div>
    )
  },
  {
    icon: Star,
    title: 'Achievements',
    description: 'Collect badges for milestones, streaks, and special accomplishments.',
    color: '#ffa116',
    bg: 'rgba(255,161,22,0.1)',
    extra: (
      <div className="mt-4 grid grid-cols-4 gap-2">
        {['🏆','⭐','🏅','🎯','🔥','🚀','✅','📈'].map((b,i) => (
          <div key={i} className="bg-[#1a1a1a] border border-[#3c3c3c] w-9 h-9 rounded-lg flex items-center justify-center text-sm">
            {b}
          </div>
        ))}
      </div>
    )
  },
  {
    icon: Flame,
    title: 'Daily Streaks',
    description: "Build habits by maintaining daily learning streaks. Don't break the chain!",
    color: '#ffa116',
    bg: 'rgba(255,161,22,0.1)',
    extra: (
      <div className="mt-4 flex items-center gap-3">
        <span className="text-4xl font-black text-[#ffa116]">7</span>
        <div>
          <p className="text-sm font-bold text-white">Days in a row</p>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} className="w-4 h-4 rounded-sm bg-[#ffa116] opacity-90"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
]

function FeaturesSection() {
  return (
    <section className="bg-[#1a1a1a] px-16 py-20 border-t border-[#3c3c3c] text-[#eff1f6] max-w-7xl mx-auto w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">Level Up Your Learning</h2>
        <p className="text-[#8a8a8a] text-base font-semibold">Track progress, earn rewards, and stay motivated with our gamification system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl" style={{background: f.bg}}>
                <f.icon size={20} style={{color: f.color}} />
              </div>
              <h3 className="text-white font-black text-lg">{f.title}</h3>
            </div>
            <p className="text-[#8a8a8a] text-sm leading-relaxed font-semibold">{f.description}</p>
            {f.extra}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection