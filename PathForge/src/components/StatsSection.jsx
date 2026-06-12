import { Users, Target, CheckCircle, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Users, value: '10K+', label: 'Students' },
  { icon: Target, value: '50+', label: 'Career Pathways' },
  { icon: CheckCircle, value: '1200+', label: 'Tasks Completed' },
  { icon: TrendingUp, value: '95%', label: 'Completion Rate' },
]

function StatsSection() {
  return (
    <section className="bg-[#1a1a1a] px-16 py-16 border-t border-[#3c3c3c] text-[#eff1f6] max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex flex-col items-start gap-3 shadow-sm">
            <div className="bg-[#ffa116]/10 p-3 rounded-xl">
              <stat.icon size={22} className="text-[#ffa116]" />
            </div>
            <div>
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-sm text-[#8a8a8a] mt-0.5 font-semibold">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection