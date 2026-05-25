import { Zap, Star, Flame } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'XP System',
    description: 'Earn experience points for every task completed. Level up to unlock advanced challenges.',
    color: '#92400e',
    bg: '#92400e12',
    extra: (
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#78716c]">Current Level</span>
          <span className="text-[#92400e] font-semibold">Level 12</span>
        </div>
        <div className="bg-[#f0e8dc] rounded-full h-1.5">
          <div className="bg-[#92400e] h-1.5 rounded-full" style={{width:'75%'}}></div>
        </div>
        <p className="text-xs text-[#78716c] mt-1">750 XP to next level</p>
      </div>
    )
  },
  {
    icon: Star,
    title: 'Achievements',
    description: 'Collect badges for milestones, streaks, and special accomplishments.',
    color: '#1d4ed8',
    bg: '#1d4ed812',
    extra: (
      <div className="mt-4 grid grid-cols-4 gap-2">
        {['🏆','⭐','🏅','🎯','🔥','🚀','✅','📈'].map((b,i) => (
          <div key={i} className="bg-[#faf7f2] border border-[#e2d9c8] w-9 h-9 rounded-lg flex items-center justify-center text-sm">
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
    color: '#b45309',
    bg: '#b4530912',
    extra: (
      <div className="mt-4 flex items-center gap-3">
        <span className="text-4xl font-black text-[#b45309]">7</span>
        <div>
          <p className="text-sm font-semibold text-[#1c1917]">Days in a row</p>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} className="w-4 h-4 rounded-sm bg-[#b45309] opacity-90"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
]

function FeaturesSection() {
  return (
    <section className="bg-[#faf7f2] px-16 py-20 border-t border-[#e2d9c8]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#1c1917] mb-3">Level Up Your Learning</h2>
        <p className="text-[#78716c] text-base">Track progress, earn rewards, and stay motivated with our gamification system</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white border border-[#e2d9c8] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl" style={{background: f.bg}}>
                <f.icon size={20} style={{color: f.color}} />
              </div>
              <h3 className="text-[#1c1917] font-bold text-lg">{f.title}</h3>
            </div>
            <p className="text-[#78716c] text-sm leading-relaxed">{f.description}</p>
            {f.extra}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection