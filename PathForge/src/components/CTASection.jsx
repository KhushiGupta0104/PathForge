function CTASection() {
  return (
    <section className="mx-16 my-12 bg-[#262626] border border-[#3c3c3c] rounded-3xl px-16 py-20 text-center relative overflow-hidden shadow-md max-w-7xl md:mx-auto w-[calc(100%-8rem)]">
      <div className="relative z-10">
        <h2 className="text-4xl font-black text-white mb-4">Start Building Your Future Today</h2>
        <p className="text-[#8a8a8a] text-base mb-8 font-semibold">Join thousands of students leveling up their careers through gamified learning</p>
        <button className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] font-bold px-8 py-3 rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-[#ffa116]/10">
          Begin Your Path
        </button>
      </div>
    </section>
  )
}

export default CTASection