import { Zap, Mail, GraduationCap, Edit } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const badges = [
  { emoji: '🏆', name: 'Top Performer', earned: true },
  { emoji: '⭐', name: 'Quick Learner', earned: true },
  { emoji: '🏅', name: 'Streak Master', earned: true },
  { emoji: '🎯', name: 'Goal Setter', earned: true },
  { emoji: '🔥', name: 'On Fire', earned: false },
  { emoji: '🚀', name: 'Rocket Start', earned: false },
  { emoji: '✅', name: 'Completionist', earned: false },
  { emoji: '📈', name: 'Level Up', earned: false },
]

const certificates = [
  { title: 'Frontend Developer', date: 'March 2024', status: 'completed' },
  { title: 'DSA Fundamentals', date: 'January 2024', status: 'completed' },
  { title: 'Backend Developer', date: 'In Progress', status: 'progress' },
]

function Profile() {
  return (
    <div className="bg-[#faf7f2] min-h-screen flex">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        <h1 className="text-2xl font-extrabold text-[#1c1917] mb-1">Your Profile</h1>
        <p className="text-[#78716c] text-sm mb-8">Manage your account and view achievements</p>

        <div className="grid grid-cols-3 gap-6">

          <div className="flex flex-col gap-4">

            <div className="bg-white border border-[#e2d9c8] rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#92400e] flex items-center justify-center text-white font-black text-3xl mb-4">
                K
              </div>
              <h2 className="text-[#1c1917] font-bold text-lg">Khushi Gupta</h2>
              <p className="text-[#78716c] text-sm mb-4">2nd Year Student</p>
              <button className="flex items-center gap-2 border border-[#e2d9c8] text-[#78716c] hover:border-[#92400e] hover:text-[#92400e] text-xs px-4 py-2 rounded-lg">
                <Edit size={12} /> Edit Profile
              </button>
            </div>

            <div className="bg-white border border-[#e2d9c8] rounded-2xl p-5">
              {[
                { label: 'Total XP', value: '4,320' },
                { label: 'Current Level', value: 'Level 12' },
                { label: 'Day Streak', value: '7 days 🔥' },
                { label: 'Tasks Done', value: '47' },
                { label: 'Certificates', value: '2' },
              ].map((s, i) => (
                <div key={i} className="flex justify-between py-2.5 border-b border-[#f0e8dc] last:border-0">
                  <span className="text-[#78716c] text-sm">{s.label}</span>
                  <span className="text-[#1c1917] font-semibold text-sm">{s.value}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="col-span-2 flex flex-col gap-6">

            
            <div className="bg-white border border-[#e2d9c8] rounded-2xl p-6">
              <h3 className="text-[#1c1917] font-bold mb-4">Badges</h3>
              <div className="grid grid-cols-4 gap-3">
                {badges.map((b, i) => (
                  <div key={i} className={`flex flex-col items-center gap-2 p-3 rounded-xl border ${b.earned ? 'border-[#92400e30] bg-[#92400e08]' : 'border-[#e2d9c8] opacity-40'}`}>
                    <span className="text-2xl">{b.emoji}</span>
                    <span className="text-xs text-[#78716c] text-center">{b.name}</span>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-white border border-[#e2d9c8] rounded-2xl p-6">
              <h3 className="text-[#1c1917] font-bold mb-4">Certificates</h3>
              <div className="flex flex-col gap-3">
                {certificates.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#faf7f2] border border-[#e2d9c8] rounded-xl">
                    <div>
                      <p className="text-[#1c1917] font-semibold text-sm">{c.title}</p>
                      <p className="text-[#78716c] text-xs">{c.date}</p>
                    </div>
                    {c.status === 'completed' ? (
                      <button className="bg-[#92400e] text-white text-xs font-semibold px-4 py-2 rounded-lg">
                        Download
                      </button>
                    ) : (
                      <span className="text-[#b45309] text-xs font-semibold bg-[#b4530915] px-3 py-1 rounded-full">In Progress</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile