import { useState, useEffect } from 'react'
import { Award, Flame, Zap, CheckCircle, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

const allPossibleBadges = [
  { emoji: '🏆', name: 'Programming Basics Complete', description: 'Awarded for completing Level 1 tasks in any programming pathway.' },
  { emoji: '⭐', name: 'DSA Basics Complete', description: 'Awarded for completing Data Structures and Algorithms level modules.' },
  { emoji: '🏅', name: 'Web Basics Complete', description: 'Awarded for completing Level 1 of Web/Frontend development.' },
  { emoji: '🎯', name: 'Frontend Developer Complete', description: 'Awarded for completing the Frontend Pathway in full.' },
]

function Achievements() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchUserData = async () => {
      try {
        const userRes = await api.get('/auth/me')
        setUser(userRes.data)
        localStorage.setItem('user', JSON.stringify(userRes.data))
      } catch (err) {
        console.error('Error fetching user for achievements:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
        <Sidebar />
        <div className="pt-20 flex-1 text-center py-8">
          <p className="text-[#8a8a8a] text-sm font-semibold">Loading achievements...</p>
        </div>
      </div>
    )
  }

  const earnedBadgesCount = user.badges?.length || 0

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
      <Sidebar />

      <div className="pt-20 px-8 pb-8 max-w-7xl mx-auto w-full flex-1">
        
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">Badges & Achievements</h1>
          <p className="text-[#8a8a8a] text-sm font-semibold">Track milestones and unlock exclusive rewards as you progress</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex items-center gap-4 shadow-sm">
            <div className="bg-[#ffa116]/10 p-4 rounded-2xl">
              <Award size={32} className="text-[#ffa116]" fill="#ffa116" />
            </div>
            <div>
              <p className="text-xs text-[#8a8a8a] font-bold">BADGES EARNED</p>
              <p className="text-2xl font-black text-white mt-0.5">{earnedBadgesCount} / {allPossibleBadges.length}</p>
            </div>
          </div>

          <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex items-center gap-4 shadow-sm">
            <div className="bg-[#ffa116]/10 p-4 rounded-2xl">
              <Flame size={32} className="text-[#ffa116]" fill="#ffa116" />
            </div>
            <div>
              <p className="text-xs text-[#8a8a8a] font-bold">CURRENT STREAK</p>
              <p className="text-2xl font-black text-white mt-0.5">{user.streak || 0} Days</p>
            </div>
          </div>

          <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex items-center gap-4 shadow-sm">
            <div className="bg-[#ffa116]/10 p-4 rounded-2xl">
              <Zap size={32} className="text-[#ffa116]" fill="#ffa116" />
            </div>
            <div>
              <p className="text-xs text-[#8a8a8a] font-bold">TOTAL XP SCORE</p>
              <p className="text-2xl font-black text-white mt-0.5">{(user.xp || 0).toLocaleString()} XP</p>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-sm">
          <h2 className="text-white font-bold text-lg mb-6">Your Learning Badges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allPossibleBadges.map((b, i) => {
              const isEarned = user.badges?.includes(b.name)
              return (
                <div 
                  key={i} 
                  className={`border rounded-2xl p-5 flex items-start gap-4 transition-all ${
                    isEarned 
                      ? 'border-[#ffa116]/30 bg-[#ffa116]/5' 
                      : 'border-[#3c3c3c] bg-[#1a1a1a] opacity-50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                    isEarned ? 'bg-[#ffa116]/10 border border-[#ffa116]/30' : 'bg-[#262626] border border-[#3c3c3c]'
                  }`}>
                    {b.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-white font-bold text-sm">{b.name}</h3>
                      {isEarned ? (
                        <span className="text-[10px] font-bold text-[#2cbb3e] bg-[#2cbb3e]/10 border border-[#2cbb3e]/20 px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase">
                          <CheckCircle size={10} /> Unlocked
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-[#8a8a8a] bg-[#3c3c3c] px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase">
                          <Lock size={10} /> Locked
                        </span>
                      )}
                    </div>
                    <p className="text-[#8a8a8a] text-xs font-semibold mt-1.5 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Achievements
