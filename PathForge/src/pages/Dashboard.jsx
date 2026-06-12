import { Flame, Award, BookOpen, ChevronRight, Info } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Helper to generate calendar weeks
const generateCalendarWeeks = (activityLog = {}) => {
  const dates = []
  const today = new Date()
  
  // Calculate start date (364 days ago)
  const startDate = new Date()
  startDate.setDate(today.getDate() - 364)
  
  // Align to start on Sunday
  const startDay = startDate.getDay()
  startDate.setDate(startDate.getDate() - startDay)

  const currentDate = new Date(startDate)
  
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const count = activityLog[dateStr] || 0
    
    dates.push({
      date: new Date(currentDate),
      dateStr,
      count
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Slice into 7-day weeks
  const weeks = []
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7))
  }
  return weeks
}

const getGridBoxColor = (count) => {
  if (count === 0) return 'bg-[#2d2d2d] border border-[#1a1a1a]/30'
  if (count === 1) return 'bg-[#2cbb3e] border border-[#2cbb3e]/50'
  if (count === 2) return 'bg-[#009e2b] border border-[#009e2b]/50'
  if (count === 3) return 'bg-[#007f1d] border border-[#007f1d]/50'
  return 'bg-[#005e12] border border-[#005e12]/50' // 4+ tasks completed
}

function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})
  const [progressList, setProgressList] = useState([])
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        // Fetch latest user details
        const userRes = await api.get('/auth/me')
        setUser(userRes.data)
        localStorage.setItem('user', JSON.stringify(userRes.data))

        // Fetch user progress lists
        const progressRes = await api.get('/progress/all')
        setProgressList(progressRes.data)

        // Fetch all pathways
        const pathwaysRes = await api.get('/pathways')
        setPathways(pathwaysRes.data)

      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  // Get active/enrolled pathways
  const enrolledPathIds = progressList.map(p => p.pathwayId?._id || p.pathwayId)
  const activePathways = pathways.filter(p => enrolledPathIds.includes(p._id))
  
  // Recommend a pathway if none active, or first unenrolled
  const recommendedPathway = pathways.find(p => !enrolledPathIds.includes(p._id)) || pathways[0]

  // Count total tasks completed across all pathways
  const totalTasksDone = progressList.reduce((sum, p) => sum + (p.completedTasks?.length || 0), 0)

  // Generate calendar grid
  const activityLog = user.activityLog || {}
  const calendarWeeks = generateCalendarWeeks(activityLog)

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
      <Sidebar />

      <div className="pt-20 px-8 pb-8 max-w-7xl mx-auto w-full flex-1">

        <h1 className="text-2xl font-black text-white tracking-tight mb-1">Your Command Center</h1>
        <p className="text-[#8a8a8a] text-sm mb-8 font-semibold">Track your learning streak, progress, and skill stats</p>

        {loading ? (
          <div className="bg-[#262626] border border-[#3c3c3c] rounded-2xl p-6 mb-6 text-center py-8">
            <p className="text-[#8a8a8a] text-sm font-semibold">Loading your dashboard...</p>
          </div>
        ) : (
          <>
            {/* Streak & Welcome Card */}
            <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="bg-[#ffa116]/10 p-4 rounded-full flex items-center justify-center">
                  <Flame size={36} className="text-[#ffa116]" fill="#ffa116" />
                </div>
                <div>
                  <h2 className="text-white font-black text-xl mb-0.5 leading-snug">Welcome back, {user.name}!</h2>
                  <p className="text-[#8a8a8a] text-sm font-medium">
                    {user.streak > 0 
                      ? `You are on a ${user.streak}-day learning streak! Keep solving to maintain it.`
                      : "Start a module task today to kick off your streak!"}
                  </p>
                </div>
              </div>
              <div className="bg-[#ffa116] text-[#1a1a1a] px-6 py-3 rounded-2xl flex flex-col items-center justify-center font-bold shadow-md shadow-[#ffa116]/5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-90">STREAK</span>
                <span className="text-2xl font-black">{user.streak || 0} DAYS</span>
              </div>
            </div>

            {/* LeetCode Streak Contribution Calendar */}
            <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 mb-8 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-black text-base flex items-center gap-2">
                  <Flame size={18} className="text-[#ffa116]" /> 365-Day Learning Calendar
                </h3>
                <span className="text-[10px] text-[#8a8a8a] font-bold flex items-center gap-1">
                  <Info size={12} /> Hover squares for details
                </span>
              </div>

              {/* Grid Box */}
              <div className="flex gap-1 overflow-x-auto p-4 bg-[#1a1a1a] border border-[#3c3c3c] rounded-2xl shadow-inner scrollbar-thin">
                {calendarWeeks.map((week, weekIdx) => {
                  // Display month label if it's the start of a month
                  const firstDay = week[0]?.date
                  const showMonthLabel = firstDay && firstDay.getDate() <= 7
                  const monthLabel = showMonthLabel ? monthNames[firstDay.getMonth()] : ''

                  return (
                    <div key={weekIdx} className="flex flex-col gap-1 select-none">
                      {/* Month label header */}
                      <span className="text-[9px] text-[#8a8a8a] font-bold h-3 block text-center mb-0.5">
                        {monthLabel}
                      </span>
                      {/* Week column (7 days) */}
                      <div className="flex flex-col gap-1">
                        {week.map((day, dayIdx) => {
                          const dateLabel = day.date.toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                          const tooltip = `${day.count} task${day.count !== 1 ? 's' : ''} completed on ${dateLabel}`

                          return (
                            <div
                              key={dayIdx}
                              title={tooltip}
                              className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-110 cursor-pointer ${getGridBoxColor(day.count)}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex justify-end items-center gap-1.5 mt-3 text-[10px] text-[#8a8a8a] font-bold uppercase tracking-wider">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-sm bg-[#2d2d2d]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#2cbb3e]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#009e2b]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#007f1d]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#005e12]" />
                <span>More</span>
              </div>
            </div>

            {/* Enrolled Modules Progress Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              {/* Enrolled Modules Progress */}
              <div className="lg:col-span-2 bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-sm">
                <h3 className="text-white font-black text-base mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-[#ffa116]" /> Enrolled Modules
                </h3>

                {activePathways.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-[#8a8a8a] font-medium italic mb-4">You aren't enrolled in any modules yet.</p>
                    {recommendedPathway && (
                      <Link 
                        to={`/pathway/${recommendedPathway._id}`}
                        className="bg-[#ffa116] hover:bg-[#ffa116]/90 text-[#1a1a1a] text-xs font-bold px-4.5 py-2.5 rounded-xl transition-all inline-block shadow-sm"
                      >
                        Enroll in {recommendedPathway.title}
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {activePathways.map(path => {
                      const prog = progressList.find(p => (p.pathwayId?._id || p.pathwayId) === path._id)
                      const tasksDone = prog?.completedTasks?.length || 0
                      
                      return (
                        <div key={path._id} className="border border-[#3c3c3c] rounded-2xl p-4 hover:border-[#ffa116] transition-all flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <h4 className="font-bold text-sm text-white mb-1">{path.title}</h4>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-[#1a1a1a] rounded-full h-2">
                                <div 
                                  className="bg-[#ffa116] h-2 rounded-full" 
                                  style={{ width: `${Math.min((tasksDone / 8) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-[10px] text-[#8a8a8a] font-bold uppercase">{tasksDone} Tasks Complete</span>
                            </div>
                          </div>
                          <Link 
                            to={`/pathway/${path._id}`}
                            className="bg-[#ffa116]/10 hover:bg-[#ffa116] text-[#ffa116] hover:text-[#1a1a1a] p-2 rounded-xl transition-all flex items-center justify-center shrink-0"
                          >
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Recommendation Card */}
              <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-[#ffa116] text-xs font-black uppercase tracking-wider mb-2">Recommended For You</h3>
                  {recommendedPathway ? (
                    <>
                      <h4 className="text-white font-black text-lg mb-1 leading-snug">{recommendedPathway.title}</h4>
                      <p className="text-[#8a8a8a] text-xs leading-relaxed mb-4 font-semibold">
                        {recommendedPathway.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#8a8a8a] font-bold">
                        <span className="bg-[#ffa116]/10 text-[#ffa116] font-extrabold px-2 py-0.5 rounded-full uppercase">+{recommendedPathway.totalXP} XP</span>
                        <span>{recommendedPathway.difficulty}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-[#8a8a8a] italic font-semibold">You have started all available pathways. Great job!</p>
                  )}
                </div>
                {recommendedPathway && (
                  <Link 
                    to={`/pathway/${recommendedPathway._id}`}
                    className="w-full text-center bg-[#ffa116] hover:bg-[#ffa116]/90 text-[#1a1a1a] text-xs font-extrabold py-2.5 rounded-xl transition-all shadow-sm block mt-4"
                  >
                    Start Pathway
                  </Link>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { 
                  label: 'Tasks Solved', 
                  value: totalTasksDone, 
                  sub: 'Across all active modules' 
                },
                { 
                  label: 'Badges Earned', 
                  value: user.badges?.length || 0, 
                  sub: user.badges?.length > 0 ? 'Amazing progress!' : 'Complete levels to earn badges' 
                },
                { 
                  label: 'Total Learning XP', 
                  value: (user.xp || 0).toLocaleString(), 
                  sub: `Current level: ${user.level || 1}` 
                },
              ].map((s, i) => (
                <div key={i} className="bg-[#262626] border border-[#3c3c3c] rounded-2xl p-5 shadow-sm">
                  <p className="text-[#8a8a8a] text-xs mb-1 font-bold">{s.label}</p>
                  <p className="text-white font-black text-3xl leading-none">{s.value}</p>
                  <p className="text-[#ffa116] text-xs mt-1.5 font-semibold">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Recent Badges Row */}
            {user.badges && user.badges.length > 0 && (
              <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-sm mb-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Award size={18} className="text-[#ffa116]" /> Earned Badges
                </h3>
                <div className="flex flex-wrap gap-3">
                  {user.badges.map((badge, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[#ffa116]/5 border border-[#ffa116]/10 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      🏆 {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}

export default Dashboard