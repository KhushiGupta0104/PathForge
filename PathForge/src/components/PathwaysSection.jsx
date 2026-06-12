import { Clock, Zap, Code, Database, Layers, Brain, Cloud, BarChart } from 'lucide-react'

const getDiffStyles = (difficulty) => {
  switch (difficulty) {
    case 'Beginner':
      return { color: '#00b8a3', bg: 'rgba(0,184,163,0.15)' }
    case 'Intermediate':
      return { color: '#ffc01e', bg: 'rgba(255,192,30,0.15)' }
    case 'Advanced':
    default:
      return { color: '#ef4743', bg: 'rgba(239,71,67,0.15)' }
  }
}

const pathways = [
  {
    icon: Code,
    title: 'Frontend Developer',
    difficulty: 'Beginner',
    duration: '6 months',
    xp: '5000 XP',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    icon: Database,
    title: 'Backend Developer',
    difficulty: 'Intermediate',
    duration: '8 months',
    xp: '7500 XP',
    tags: ['Node.js', 'PostgreSQL', 'API'],
  },
  {
    icon: Layers,
    title: 'Full Stack Developer',
    difficulty: 'Advanced',
    duration: '12 months',
    xp: '12000 XP',
    tags: ['MERN', 'Next.js', 'AWS'],
  },
  {
    icon: Brain,
    title: 'AI/ML Engineer',
    difficulty: 'Advanced',
    duration: '10 months',
    xp: '10000 XP',
    tags: ['Python', 'TensorFlow', 'ML'],
  },
  {
    icon: Cloud,
    title: 'DevOps Engineer',
    difficulty: 'Intermediate',
    duration: '7 months',
    xp: '8000 XP',
    tags: ['Docker', 'K8s', 'CI/CD'],
  },
  {
    icon: BarChart,
    title: 'Data Scientist',
    difficulty: 'Advanced',
    duration: '11 months',
    xp: '11000 XP',
    tags: ['Python', 'Pandas', 'Stats'],
  },
]

function PathwaysSection() {
  return (
    <section className="bg-[#1a1a1a] px-16 py-20 border-t border-[#3c3c3c] text-[#eff1f6] max-w-7xl mx-auto w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">Choose Your Path</h2>
        <p className="text-[#8a8a8a] text-base font-semibold">Select from curated career pathways designed by industry experts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pathways.map((p, i) => {
          const diffStyle = getDiffStyles(p.difficulty)
          return (
            <div key={i} className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
              
              <div className="flex items-start justify-between">
                <div className="bg-[#ffa116]/10 p-3 rounded-xl">
                  <p.icon size={22} className="text-[#ffa116]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{color: diffStyle.color, background: diffStyle.bg}}>
                  {p.difficulty}
                </span>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-3">{p.title}</h3>
                <div className="flex items-center gap-4 text-xs text-[#8a8a8a] font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {p.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={12} className="text-[#ffa116]" fill="#ffa116" /> {p.xp}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag, j) => (
                  <span key={j} className="bg-[#1a1a1a] border border-[#3c3c3c] text-[#eff1f6] text-xs px-3 py-1 rounded-full font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] text-sm font-bold py-2.5 rounded-xl mt-auto transition-colors cursor-pointer shadow-md shadow-[#ffa116]/5">
                Start Pathway
              </button>

            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PathwaysSection