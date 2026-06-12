const testimonials = [
  {
    name: 'Sangini Shah',
    role: 'Frontend Developer @ Google',
    initial: 'S',
    text: 'PathForge transformed my learning journey. The gamification kept me motivated, and I landed my dream job in 6 months!',
    level: 'Level 18',
  },
  {
    name: 'Maya Patel',
    role: 'Full Stack Engineer @ Meta',
    initial: 'M',
    text: 'The structured pathways and real projects gave me the confidence to apply for senior roles. Absolutely worth it.',
    level: 'Level 22',
  },
  {
    name: 'Shreya Sharma',
    role: 'DevOps Engineer @ Amazon',
    initial: 'S',
    text: 'I loved the progression system. Every task felt like a mini-achievement. Went from student to hired in 8 months!',
    level: 'Level 15',
  },
]

function TestimonialsSection() {
  return (
    <section className="bg-[#1a1a1a] px-16 py-20 border-t border-[#3c3c3c] text-[#eff1f6] max-w-7xl mx-auto w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">Success Stories</h2>
        <p className="text-[#8a8a8a] text-base font-semibold">Join thousands of students who leveled up their careers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#ffa116] flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                {t.initial}
              </div>
              <div>
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-[#8a8a8a] text-xs font-semibold">{t.role}</p>
              </div>
            </div>
            <p className="text-[#8a8a8a] text-sm leading-relaxed font-semibold italic">"{t.text}"</p>
            <div className="flex items-center gap-1 text-[#ffa116] text-xs font-bold bg-[#ffa116]/10 px-3 py-1 rounded-full border border-[#ffa116]/20 self-start">
              🏆 {t.level}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection