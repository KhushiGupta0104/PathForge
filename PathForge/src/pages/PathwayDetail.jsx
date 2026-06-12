import { useState, useEffect, useCallback } from 'react'
import { Lock, CheckCircle, ChevronRight } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

function PathwayDetail() {
  const { id } = useParams()
  const [pathway, setPathway] = useState(null)
  const [levels, setLevels] = useState([])
  const [progress, setProgress] = useState(null)
  const [enrolled, setEnrolled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const navigate = useNavigate()

  // Track current user premium status
  const [currentUser, setCurrentUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })

  const fetchPathwayData = useCallback(async () => {
    try {
      // Fetch pathway and levels
      const pathwayRes = await api.get(`/pathways/${id}`)
      setPathway(pathwayRes.data.pathway)
      setLevels(pathwayRes.data.levels)

      // Fetch user progress for this pathway
      try {
        const progressRes = await api.get(`/progress/${id}`)
        setProgress(progressRes.data)
        setEnrolled(true)
      } catch (err) {
        if (err.response?.status === 404) {
          setEnrolled(false)
        } else {
          console.error('Error fetching progress:', err)
        }
      }
    } catch (err) {
      console.error('Error fetching pathway details:', err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPathwayData()
  }, [navigate, fetchPathwayData])

  // Listen to premium updates
  useEffect(() => {
    const handlePremiumUpdated = () => {
      const u = localStorage.getItem('user')
      if (u) {
        setCurrentUser(JSON.parse(u))
      }
      fetchPathwayData() // Re-fetch progress (if they just bought premium, their enroll action could succeed now)
    }
    window.addEventListener('premium-updated', handlePremiumUpdated)
    return () => {
      window.removeEventListener('premium-updated', handlePremiumUpdated)
    }
  }, [fetchPathwayData])

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      await api.post('/progress/enroll', { pathwayId: id })
      await fetchPathwayData() // Reload progress
    } catch (err) {
      console.error('Enrollment failed:', err)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
        <Sidebar />
        <div className="pt-20 flex-1 text-center py-8">
          <p className="text-[#8a8a8a] text-sm font-semibold">Loading pathway details...</p>
        </div>
      </div>
    )
  }

  if (!pathway) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
        <Sidebar />
        <div className="pt-20 flex-1 text-center py-8">
          <p className="text-[#8a8a8a] text-sm font-semibold">Pathway not found.</p>
          <Link to="/pathways" className="text-[#ffa116] font-semibold mt-2 hover:underline inline-block">Go back to pathways</Link>
        </div>
      </div>
    )
  }

  const isLocked = pathway.isPremium && !currentUser?.isPremium
  const completedLevelsCount = progress?.completedLevels?.length || 0
  const progressPercentage = levels.length > 0 ? (completedLevelsCount / levels.length) * 100 : 0

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
      <Sidebar />

      <div className="pt-20 px-8 pb-8 max-w-7xl mx-auto w-full flex-1">

        <div className="mb-8">
          <p className="text-[#8a8a8a] text-sm mb-1">← <Link to="/pathways" className="hover:text-[#ffa116]">All Pathways</Link></p>
          <h1 className="text-2xl font-black text-white tracking-tight mb-1 flex items-center gap-2">
            {pathway.title}
            {pathway.isPremium && (
              <span className="bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/30 text-[9px] font-black px-2 py-0.5 rounded uppercase flex items-center gap-0.5">
                👑 Pro Track
              </span>
            )}
          </h1>
          <p className="text-[#8a8a8a] text-sm font-semibold">{pathway.estimatedMonths || 6} months · {pathway.totalXP} XP · {pathway.difficulty}</p>
        </div>

        {/* Enrollment / Progress / Lock Banner */}
        {isLocked ? (
          <div className="bg-[#262626] border border-amber-500/30 rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ffa116]"></div>
            <div>
              <h2 className="text-white font-bold text-lg mb-1 flex items-center gap-1.5">
                <span>👑 LeetCode Premium Pathway</span>
              </h2>
              <p className="text-[#8a8a8a] text-sm font-medium">
                This career pathway requires a LeetCode Premium subscription. Upgrade now to enroll, complete VM assessments, and earn certified accomplishments.
              </p>
            </div>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-premium-modal'))}
              className="bg-gradient-to-r from-[#ffa116] to-[#b26b00] text-[#1a1a1a] font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:brightness-110 shrink-0 cursor-pointer shadow-md shadow-[#ffa116]/10"
            >
              Upgrade to Unlock 🔒
            </button>
          </div>
        ) : !enrolled ? (
          <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-white font-bold text-lg mb-1">Ready to start your journey?</h2>
              <p className="text-[#8a8a8a] text-sm font-medium">Enroll in this pathway to unlock tasks, track progress, and earn rewards!</p>
            </div>
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] font-bold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60 shrink-0 cursor-pointer"
            >
              {enrolling ? 'Enrolling...' : 'Enroll in Pathway'}
            </button>
          </div>
        ) : (
          <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white font-bold">Overall Progress</span>
              <span className="text-[#ffa116] font-bold">{completedLevelsCount} / {levels.length} Levels Completed</span>
            </div>
            <div className="bg-[#3c3c3c] rounded-full h-2">
              <div className="bg-[#ffa116] h-2 rounded-full animate-pulse" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        )}

        {/* Levels List */}
        <div className="flex flex-col gap-4">
          {levels.map((level, i) => {
            // A level is completed if progress has it in completedLevels
            const isCompleted = progress?.completedLevels?.includes(level._id)

            // A level is unlocked if they are NOT locked AND enrolled AND (first level OR previous level completed)
            const isUnlocked = !isLocked && enrolled && (level.levelNumber === 1 || progress?.completedLevels?.includes(levels[i - 1]?._id))

            return (
              <div 
                key={level._id} 
                className={`bg-[#262626] border rounded-3xl p-6 flex items-center justify-between transition-all ${
                  isUnlocked ? 'border-[#3c3c3c]' : 'border-[#3c3c3c] opacity-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    isCompleted 
                      ? 'bg-[#2cbb3e] text-white' 
                      : isUnlocked 
                        ? 'bg-[#ffa116]/10 text-[#ffa116] border-2 border-[#ffa116]' 
                        : 'bg-[#3c3c3c] text-[#8a8a8a]'
                  }`}>
                    {isCompleted ? <CheckCircle size={18} className="text-white" /> : isUnlocked ? level.levelNumber : <Lock size={16} />}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Level {level.levelNumber} — {level.title}</p>
                    <p className="text-[#8a8a8a] text-xs mt-0.5 font-semibold">
                      {level.focus} · {level.taskCount || 0} tasks · {level.xpReward} XP
                    </p>
                  </div>
                </div>

                {isUnlocked ? (
                  <Link to={`/pathway/${pathway._id}/level/${level._id}`} className="flex items-center gap-1 text-[#ffa116] text-sm font-bold hover:underline">
                    {isCompleted ? 'Review' : 'Continue'} <ChevronRight size={16} />
                  </Link>
                ) : (
                  <span className="text-[#8a8a8a] text-xs font-semibold flex items-center gap-1">
                    {isLocked ? (
                      <>
                        <Lock size={12} className="text-[#ffa116]" />
                        <span>Premium Locked</span>
                      </>
                    ) : !enrolled ? (
                      'Enroll to unlock'
                    ) : (
                      'Complete previous level'
                    )}
                  </span>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default PathwayDetail