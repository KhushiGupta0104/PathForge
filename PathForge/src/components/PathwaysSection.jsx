import { Clock, Zap, Code, Database, Layers, Brain, Cloud, BarChart } from 'lucide-react'

const pathways = [
  {
    icon: Code,
    title: 'Frontend Developer',
    difficulty: 'Beginner',
    duration: '6 months',
    xp: '5000 XP',
    tags: ['React', 'TypeScript', 'Tailwind'],
    diffColor: '#16a34a',
    diffBg: '#16a34a15',
  },
  {
    icon: Database,
    title: 'Backend Developer',
    difficulty: 'Intermediate',
    duration: '8 months',
    xp: '7500 XP',
    tags: ['Node.js', 'PostgreSQL', 'API'],
    diffColor: '#b45309',
    diffBg: '#b4530915',
  },
  {
    icon: Layers,
    title: 'Full Stack Developer',
    difficulty: 'Advanced',
    duration: '12 months',
    xp: '12000 XP',
    tags: ['MERN', 'Next.js', 'AWS'],
    diffColor: '#dc2626',
    diffBg: '#dc262615',
  },
  {
    icon: Brain,
    title: 'AI/ML Engineer',
    difficulty: 'Advanced',
    duration: '10 months',
    xp: '10000 XP',
    tags: ['Python', 'TensorFlow', 'ML'],
    diffColor: '#dc2626',
    diffBg: '#dc262615',
  },
  {
    icon: Cloud,
    title: 'DevOps Engineer',
    difficulty: 'Intermediate',
    duration: '7 months',
    xp: '8000 XP',
    tags: ['Docker', 'K8s', 'CI/CD'],
    diffColor: '#b45309',
    diffBg: '#b4530915',
  },
  {
    icon: BarChart,
    title: 'Data Scientist',
    difficulty: 'Advanced',
    duration: '11 months',
    xp: '11000 XP',
    tags: ['Python', 'Pandas', 'Stats'],
    diffColor: '#dc2626',
    diffBg: '#dc262615',
  },
]

function PathwaysSection() {
  return (
    <section className="bg-[#faf7f2] px-16 py-20 border-t border-[#e2d9c8]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#1c1917] mb-3">Choose Your Path</h2>
        <p className="text-[#78716c] text-base">Select from curated career pathways designed by industry experts</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {pathways.map((p, i) => (
          <div key={i} className="bg-white border border-[#e2d9c8] rounded-2xl p-6 flex flex-col gap-4">
            
            <div className="flex items-start justify-between">
              <div className="bg-[#92400e12] p-3 rounded-xl">
                <p.icon size={22} className="text-[#92400e]" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{color: p.diffColor, background: p.diffBg}}>
                {p.difficulty}
              </span>
            </div>

            <div>
              <h3 className="text-[#1c1917] font-bold text-lg mb-3">{p.title}</h3>
              <div className="flex items-center gap-4 text-xs text-[#78716c]">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {p.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={12} className="text-[#92400e]" /> {p.xp}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag, j) => (
                <span key={j} className="bg-[#faf7f2] border border-[#e2d9c8] text-[#78716c] text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <button className="w-full border border-[#e2d9c8] hover:border-[#92400e] hover:text-[#92400e] text-[#78716c] text-sm font-medium py-2.5 rounded-xl mt-auto transition-colors">
              Start Pathway
            </button>

          </div>
        ))}
      </div>
    </section>
  )
}

export default PathwaysSection