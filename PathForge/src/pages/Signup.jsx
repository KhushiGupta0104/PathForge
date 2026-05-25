import { Zap, Mail, Lock, User, GraduationCap } from 'lucide-react'

function Signup() {
  return (
    <div className="bg-[#faf7f2] min-h-screen flex items-center justify-center py-12">
      
      <div className="bg-white border border-[#e2d9c8] rounded-2xl p-8 w-full max-w-md shadow-sm">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-[#92400e] p-1.5 rounded-lg">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="text-[#1c1917] font-bold text-xl">
            Path<span className="text-[#92400e]">Forge</span>
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#1c1917] mb-1">Create your account</h1>
        <p className="text-[#78716c] text-sm mb-8">Start your journey to becoming job-ready</p>

        <div className="flex flex-col gap-4">

          <div>
            <label className="text-[#1c1917] text-sm font-medium mb-1.5 block">Full Name</label>
            <div className="flex items-center gap-3 border border-[#e2d9c8] rounded-xl px-4 py-3 focus-within:border-[#92400e]">
              <User size={16} className="text-[#78716c]" />
              <input
                type="text"
                placeholder="Khushi Gupta"
                className="bg-transparent outline-none text-sm text-[#1c1917] placeholder:text-[#78716c] w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-[#1c1917] text-sm font-medium mb-1.5 block">Email</label>
            <div className="flex items-center gap-3 border border-[#e2d9c8] rounded-xl px-4 py-3 focus-within:border-[#92400e]">
              <Mail size={16} className="text-[#78716c]" />
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent outline-none text-sm text-[#1c1917] placeholder:text-[#78716c] w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-[#1c1917] text-sm font-medium mb-1.5 block">College Year</label>
            <div className="flex items-center gap-3 border border-[#e2d9c8] rounded-xl px-4 py-3 focus-within:border-[#92400e]">
              <GraduationCap size={16} className="text-[#78716c]" />
              <select className="bg-transparent outline-none text-sm text-[#78716c] w-full">
                <option value="">Select your year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#1c1917] text-sm font-medium mb-1.5 block">Password</label>
            <div className="flex items-center gap-3 border border-[#e2d9c8] rounded-xl px-4 py-3 focus-within:border-[#92400e]">
              <Lock size={16} className="text-[#78716c]" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none text-sm text-[#1c1917] placeholder:text-[#78716c] w-full"
              />
            </div>
          </div>

          <button className="bg-[#92400e] hover:bg-[#78350f] text-white font-semibold py-3 rounded-xl text-sm mt-2">
            Create Account
          </button>

        </div>

        <p className="text-center text-sm text-[#78716c] mt-6">
          Already have an account?{' '}
          <span className="text-[#92400e] font-semibold cursor-pointer hover:underline">Login</span>
        </p>

      </div>
    </div>
  )
}

export default Signup