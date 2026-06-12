import { Zap, Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center text-[#eff1f6]">
      <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-8 w-full max-w-md shadow-sm">
        
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="bg-[#ffa116] p-1.5 rounded-lg">
            <Zap size={16} className="text-[#1a1a1a]" fill="#1a1a1a" />
          </div>
          <span className="text-white font-black text-xl">
            Path<span className="text-[#ffa116]">Forge</span>
          </span>
        </Link>

        <h1 className="text-2xl font-extrabold text-white mb-1">Welcome back</h1>
        <p className="text-[#8a8a8a] text-sm mb-8 font-semibold">Continue your learning journey</p>

        {error && (
          <div className="bg-[#ef4743]/10 border border-[#ef4743]/20 text-[#ef4743] text-sm px-4 py-3 rounded-xl mb-4 font-semibold">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-white text-sm font-medium mb-1.5 block">Email</label>
            <div className="flex items-center gap-3 border border-[#3c3c3c] rounded-xl px-4 py-3 focus-within:border-[#ffa116] bg-[#1a1a1a]">
              <Mail size={16} className="text-[#8a8a8a]" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder:text-[#8a8a8a] w-full font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-1.5 block">Password</label>
            <div className="flex items-center gap-3 border border-[#3c3c3c] rounded-xl px-4 py-3 focus-within:border-[#ffa116] bg-[#1a1a1a]">
              <Lock size={16} className="text-[#8a8a8a]" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder:text-[#8a8a8a] w-full font-semibold"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] font-bold py-3 rounded-xl text-sm mt-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="text-center text-sm text-[#8a8a8a] mt-6 font-semibold">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#ffa116] font-bold hover:underline">Sign up</Link>
        </p>

      </div>
    </div>
  )
}

export default Login