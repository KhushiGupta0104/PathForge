import { Zap, Mail, Lock } from 'lucide-react'

function Login() {
  return (
    <div className="bg-[#faf7f2] min-h-screen flex items-center justify-center">
      
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

        <h1 className="text-2xl font-extrabold text-[#1c1917] mb-1">Welcome back</h1>
        <p className="text-[#78716c] text-sm mb-8">Continue your learning journey</p>

        
        <div className="flex flex-col gap-4">
          
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
            Login
          </button>

        </div>

        <p className="text-center text-sm text-[#78716c] mt-6">
          Don't have an account?{' '}
          <span className="text-[#92400e] font-semibold cursor-pointer hover:underline">Sign up</span>
        </p>

      </div>
    </div>
  )
}

export default Login