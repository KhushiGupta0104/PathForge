import { Users, Target, CheckCircle, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Users, value: '10K+', label: 'Students' },
  { icon: Target, value: '50+', label: 'Career Pathways' },
  { icon: CheckCircle, value: '1200+', label: 'Tasks Completed' },
  { icon: TrendingUp, value: '95%', label: 'Completion Rate' },
]

function StatsSection() {
  return (
    <section className="bg-[#faf7f2] px-16 py-16 border-t border-[#e2d9c8]">
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-[#e2d9c8] rounded-2xl p-6 flex flex-col items-start gap-3">
            <div className="bg-[#92400e12] p-3 rounded-xl">
              <stat.icon size={22} className="text-[#92400e]" />
            </div>
            <div>
              <p className="text-3xl font-black text-[#1c1917]">{stat.value}</p>
              <p className="text-sm text-[#78716c] mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection