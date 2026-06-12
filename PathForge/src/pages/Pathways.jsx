import { useState, useEffect } from 'react'
import { Layout, Database, Shield, Zap, Search, ChevronRight, BookOpen, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

const getPathwayIcon = (iconName) => {
  switch (iconName) {
    case 'Layout':
      return <Layout size={24} className="text-[#ffa116]" />
    case 'Database':
      return <Database size={24} className="text-[#ffa116]" />
    case 'Shield':
      return <Shield size={24} className="text-[#ffa116]" />
    default:
      return <BookOpen size={24} className="text-[#ffa116]" />
  }
}

const getDifficultyStyle = (difficulty) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-[#00af9b]/10 text-[#00af9b] border-[#00af9b]/20'
    case 'Intermediate':
      return 'bg-[#ffb800]/10 text-[#ffb800] border-[#ffb800]/20'
    case 'Advanced':
    default:
      return 'bg-[#ff2d55]/10 text-[#ff2d55] border-[#ff2d55]/20'
  }
}

function Pathways() {
  const [pathways, setPathways] = useState([])
  const [progressMap, setProgressMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  // Keep track of the current user's local premium status
  const [currentUser, setCurrentUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchPathwaysAndProgress = async () => {
      setLoading(true)
      try {
        // Fetch all pathways
        const pathwaysRes = await api.get('/pathways')
        setPathways(pathwaysRes.data)

        // Fetch user progress lists
        const progressRes = await api.get('/progress/all')
        
        // Map progress pathwayId -> progress record
        const pMap = {}
        progressRes.data.forEach((p) => {
          if (p.pathwayId?._id) {
            pMap[p.pathwayId._id] = p
          } else if (p.pathwayId) {
            pMap[p.pathwayId] = p
          }
        })
        setProgressMap(pMap)
      } catch (err) {
        console.error('Error fetching pathways:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPathwaysAndProgress()
  }, [navigate])

  // Listen to premium update event
  useEffect(() => {
    const handlePremiumUpdated = () => {
      const u = localStorage.getItem('user')
      if (u) {
        setCurrentUser(JSON.parse(u))
      }
    }
    window.addEventListener('premium-updated', handlePremiumUpdated)
    return () => {
      window.removeEventListener('premium-updated', handlePremiumUpdated)
    }
  }, [])

  const filteredPathways = pathways.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const triggerPremiumModal = () => {
    window.dispatchEvent(new CustomEvent('open-premium-modal'))
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
      <Sidebar />

      <div className="pt-20 px-8 pb-8 max-w-7xl mx-auto w-full flex-1">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Learning Modules</h1>
            <p className="text-[#8a8a8a] text-sm mt-0.5 font-semibold">Select a module to build hands-on skills, earn XP, and unlock achievements</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-lg">
          <div className="bg-[#262626] border border-[#3c3c3c] rounded-2xl px-4 py-2.5 flex items-center gap-3 focus-within:border-[#ffa116] transition-colors shadow-sm">
            <Search size={18} className="text-[#8a8a8a]" />
            <input
              type="text"
              placeholder="Search pathways or skills (e.g. React, SQL, security)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-white placeholder:text-[#8a8a8a] w-full font-semibold"
            />
          </div>
        </div>

        {/* Pathways Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#8a8a8a] text-sm font-semibold">Loading learning modules...</p>
          </div>
        ) : filteredPathways.length === 0 ? (
          <div className="text-center py-12 bg-[#262626] border border-[#3c3c3c] rounded-2xl p-6">
            <BookOpen size={40} className="text-[#8a8a8a] mx-auto mb-3 opacity-60" />
            <p className="text-[#8a8a8a] text-sm font-semibold">No pathways found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPathways.map((p) => {
              const progressRecord = progressMap[p._id]
              const isEnrolled = !!progressRecord
              const completedTasksCount = progressRecord?.completedTasks?.length || 0
              const isLocked = p.isPremium && !currentUser?.isPremium
              
              return (
                <div 
                  key={p._id}
                  className={`bg-[#262626] border rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden group ${
                    isLocked ? 'border-[#3c3c3c] hover:border-amber-500/40' : 'border-[#3c3c3c] hover:border-[#ffa116]'
                  }`}
                >
                  {isLocked && (
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none select-none">
                      <div className="absolute top-4 -right-8 w-28 bg-[#ffa116] text-[#1a1a1a] text-[9px] font-black text-center py-1 rotate-45 uppercase tracking-wider shadow-sm">
                        Premium
                      </div>
                    </div>
                  )}

                  <div>
                    {/* Top Meta info */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`bg-[#1a1a1a] border border-[#3c3c3c] p-3 rounded-2xl transition-colors ${
                        isLocked ? 'group-hover:bg-[#ffa116]/5' : 'group-hover:bg-[#ffa116]/10'
                      }`}>
                        {getPathwayIcon(p.icon)}
                      </div>
                      <div className="flex gap-2 mr-6">
                        {p.isPremium && (
                          <span className="bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/30 text-[9px] font-black px-2 py-0.5 rounded uppercase flex items-center gap-0.5">
                            👑 Pro
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getDifficultyStyle(p.difficulty)}`}>
                          {p.difficulty}
                        </span>
                        <span className="bg-[#ffa116]/10 text-[#ffa116] text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-0.5">
                          <Zap size={10} fill="#ffa116" /> {p.totalXP} XP
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h2 className={`font-black text-lg mb-2 transition-colors leading-snug flex items-center gap-1.5 ${
                      isLocked ? 'text-[#a0a0a0] group-hover:text-white' : 'text-white group-hover:text-[#ffa116]'
                    }`}>
                      {p.title}
                      {isLocked && <Lock size={15} className="text-[#ffa116]" />}
                    </h2>
                    <p className="text-[#8a8a8a] text-sm leading-relaxed mb-4 font-semibold">
                      {p.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tags?.map((tag, idx) => (
                        <span key={idx} className="bg-[#1a1a1a] border border-[#3c3c3c] text-[#8a8a8a] text-xs font-bold px-2.5 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress Indicator or Enroll Button */}
                  <div className="border-t border-[#3c3c3c] pt-4 mt-auto">
                    {isLocked ? (
                      <div className="flex items-center justify-between">
                        <span className="text-[#8a8a8a] text-xs font-semibold">{p.estimatedMonths} Months Duration</span>
                        <button
                          onClick={triggerPremiumModal}
                          className="bg-gradient-to-r from-[#ffa116] to-[#b26b00] text-[#1a1a1a] text-xs font-black px-4.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer hover:brightness-110 shadow-sm shadow-[#ffa116]/5"
                        >
                          Unlock Pathway 🔒
                        </button>
                      </div>
                    ) : isEnrolled ? (
                      <div>
                        <div className="flex justify-between text-xs mb-2 font-bold">
                          <span className="text-[#8a8a8a]">Completed Tasks: {completedTasksCount}</span>
                          <span className="text-[#ffa116]">Enrolled</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-[#1a1a1a] rounded-full h-2">
                            <div 
                              className="bg-[#ffa116] h-2 rounded-full transition-all" 
                              style={{ width: `${Math.min((completedTasksCount / 8) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <Link
                            to={`/pathway/${p._id}`}
                            className="bg-[#ffa116] hover:bg-[#ffa116]/90 text-[#1a1a1a] text-xs font-bold px-4.5 py-2 rounded-xl flex items-center gap-1 shadow-sm transition-all"
                          >
                            Continue <ChevronRight size={12} />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-[#8a8a8a] text-xs font-semibold">{p.estimatedMonths} Months Duration</span>
                        <Link
                          to={`/pathway/${p._id}`}
                          className="border border-[#ffa116] text-[#ffa116] hover:bg-[#ffa116] hover:text-[#1a1a1a] text-xs font-bold px-4.5 py-2 rounded-xl flex items-center gap-1 transition-all"
                        >
                          Start Module <ChevronRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default Pathways