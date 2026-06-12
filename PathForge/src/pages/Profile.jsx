import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

const allPossibleBadges = [
  { emoji: '🏆', name: 'Programming Basics Complete' },
  { emoji: '⭐', name: 'DSA Basics Complete' },
  { emoji: '🏅', name: 'Web Basics Complete' },
  { emoji: '🎯', name: 'Frontend Developer Complete' },
]

function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})
  const [progressList, setProgressList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchProfileData = async () => {
      try {
        const userRes = await api.get('/auth/me')
        setUser(userRes.data)
        localStorage.setItem('user', JSON.stringify(userRes.data))

        const progressRes = await api.get('/progress/all')
        setProgressList(progressRes.data)
      } catch (err) {
        console.error('Error fetching profile data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [navigate])

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
        <Sidebar />
        <div className="pt-20 flex-1 text-center py-8">
          <p className="text-[#8a8a8a] text-sm font-semibold">Loading profile details...</p>
        </div>
      </div>
    )
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U'
  const totalTasksCompleted = progressList.reduce((acc, curr) => acc + curr.completedTasks.length, 0)
  const totalCertificates = progressList.filter(p => p.completedLevels?.length >= 3).length

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
      <Sidebar />

      <div className="pt-20 px-8 pb-8 max-w-7xl mx-auto w-full flex-1">

        <h1 className="text-2xl font-extrabold text-white mb-1">Your Profile</h1>
        <p className="text-[#8a8a8a] text-sm mb-8 font-semibold">Manage your account and view achievements</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex flex-col gap-4">

            {/* Profile Avatar Card */}
            <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#ffa116] flex items-center justify-center text-[#1a1a1a] font-black text-3xl mb-4">
                {userInitial}
              </div>
              <h2 className="text-white font-bold text-lg">{user.name}</h2>
              <p className="text-[#8a8a8a] text-sm mb-2 font-medium">{user.email}</p>
              <p className="text-[#eff1f6] text-xs bg-[#1a1a1a] px-3 py-1 border border-[#3c3c3c] rounded-full font-bold">
                {user.collegeYear ? `${user.collegeYear} Year Student` : 'Student'}
              </p>
            </div>

            {/* Stats List */}
            <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-5 shadow-sm">
              {[
                { label: 'Total XP', value: (user.xp || 0).toLocaleString() },
                { label: 'Current Level', value: `Level ${user.level || 1}` },
                { label: 'Day Streak', value: `${user.streak || 0} days 🔥` },
                { label: 'Tasks Done', value: totalTasksCompleted },
                { label: 'Certificates Earned', value: totalCertificates },
              ].map((s, i) => (
                <div key={i} className="flex justify-between py-2.5 border-b border-[#3c3c3c] last:border-0 font-semibold text-sm">
                  <span className="text-[#8a8a8a]">{s.label}</span>
                  <span className="text-white font-bold">{s.value}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Badges Section */}
            <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-sm">
              <h3 className="text-white font-bold mb-4">Badges & Achievements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {allPossibleBadges.map((b, i) => {
                  const isEarned = user.badges?.includes(b.name)
                  return (
                    <div 
                      key={i} 
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                        isEarned 
                          ? 'border-[#ffa116]/30 bg-[#ffa116]/5 shadow-sm' 
                          : 'border-[#3c3c3c] opacity-30'
                      }`}
                    >
                      <span className="text-2xl">{b.emoji}</span>
                      <span className="text-xs text-white font-semibold text-center leading-snug">{b.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Certificates Section */}
            <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-sm">
              <h3 className="text-white font-bold mb-4">Your Pathway Certificates</h3>
              <div className="flex flex-col gap-3">
                {progressList.length === 0 ? (
                  <p className="text-sm text-[#8a8a8a] italic font-semibold">Enroll in a pathway to start earning certificates!</p>
                ) : (
                  progressList.map((prog, i) => {
                    const isCompleted = prog.completedLevels?.length >= 3 // Assuming 3 levels complete means certified
                    return (
                      <div key={i} className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#3c3c3c] rounded-2xl">
                        <div>
                          <p className="text-white font-bold text-sm">{prog.pathwayId?.title || 'Learning Pathway'}</p>
                          <p className="text-xs text-[#8a8a8a] mt-0.5 font-semibold">
                            {isCompleted ? 'Certified & Completed' : `In Progress (${prog.completedLevels?.length || 0} / 3 Levels complete)`}
                          </p>
                        </div>
                        {isCompleted ? (
                          <button className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer">
                            Download PDF
                          </button>
                        ) : (
                          <span className="text-[#ffa116] text-xs font-bold bg-[#ffa116]/10 px-3 py-1 rounded-full border border-[#ffa116]/20">In Progress</span>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile