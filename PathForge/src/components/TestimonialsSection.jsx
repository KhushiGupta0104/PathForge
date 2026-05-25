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
    <section className="bg-[#faf7f2] px-16 py-20 border-t border-[#e2d9c8]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#1c1917] mb-3">Success Stories</h2>
        <p className="text-[#78716c] text-base">Join thousands of students who leveled up their careers</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white border border-[#e2d9c8] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#92400e] flex items-center justify-center text-white font-bold text-lg">
                {t.initial}
              </div>
              <div>
                <p className="text-[#1c1917] font-semibold text-sm">{t.name}</p>
                <p className="text-[#78716c] text-xs">{t.role}</p>
              </div>
            </div>
            <p className="text-[#78716c] text-sm leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-1 text-[#92400e] text-xs font-semibold">
              🏆 {t.level}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection