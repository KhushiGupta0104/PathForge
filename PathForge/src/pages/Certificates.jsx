import { useState, useEffect } from 'react'
import { Award, CheckCircle, Clock, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

function Certificates() {
  const [progressList, setProgressList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchProgressData = async () => {
      try {
        const progressRes = await api.get('/progress/all')
        setProgressList(progressRes.data)
      } catch (err) {
        console.error('Error fetching progress for certificates:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProgressData()
  }, [navigate])

  const handleDownloadDummy = (title) => {
    alert(`📄 Generating and downloading your Pathway Certificate PDF for "${title}"!`)
  }

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
        <Sidebar />
        <div className="pt-20 flex-1 text-center py-8">
          <p className="text-[#8a8a8a] text-sm font-semibold">Loading certificates...</p>
        </div>
      </div>
    )
  }

  const certifiedCount = progressList.filter(p => p.completedLevels?.length >= 3).length

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
      <Sidebar />

      <div className="pt-20 px-8 pb-8 max-w-7xl mx-auto w-full flex-1">
        
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">Your Certificates</h1>
          <p className="text-[#8a8a8a] text-sm font-semibold">Complete 3 or more levels in any learning pathway to unlock official PDF certification</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex items-center gap-4 shadow-sm">
            <div className="bg-[#ffa116]/10 p-4 rounded-2xl">
              <Award size={32} className="text-[#ffa116]" fill="#ffa116" />
            </div>
            <div>
              <p className="text-xs text-[#8a8a8a] font-bold">CERTIFICATIONS COMPLETED</p>
              <p className="text-2xl font-black text-white mt-0.5">{certifiedCount} Certificate{certifiedCount !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 flex items-center gap-4 shadow-sm">
            <div className="bg-[#ffa116]/10 p-4 rounded-2xl">
              <Clock size={32} className="text-[#ffa116]" />
            </div>
            <div>
              <p className="text-xs text-[#8a8a8a] font-bold">ACTIVE ENROLLED PATHWAYS</p>
              <p className="text-2xl font-black text-white mt-0.5">{progressList.length} Pathway{progressList.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        {/* Certificates List */}
        <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 shadow-sm">
          <h2 className="text-white font-bold text-lg mb-6">Pathway Certification Progress</h2>
          
          <div className="flex flex-col gap-4">
            {progressList.length === 0 ? (
              <p className="text-sm text-[#8a8a8a] italic font-semibold py-4">Enroll in a learning module pathway to start earning certificates!</p>
            ) : (
              progressList.map((prog, i) => {
                const completedLevels = prog.completedLevels?.length || 0
                const totalTargetLevels = 3
                const progressPercentage = Math.min((completedLevels / totalTargetLevels) * 100, 100)
                const isCertified = completedLevels >= totalTargetLevels
                const pathwayTitle = prog.pathwayId?.title || 'Learning Pathway'

                return (
                  <div key={i} className="bg-[#1a1a1a] border border-[#3c3c3c] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-white font-bold text-base">{pathwayTitle}</h3>
                        {isCertified ? (
                          <span className="text-[10px] font-bold text-[#2cbb3e] bg-[#2cbb3e]/10 border border-[#2cbb3e]/20 px-2.5 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-wider">
                            <CheckCircle size={10} /> Certified
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#ffa116] bg-[#ffa116]/10 border border-[#ffa116]/20 px-2.5 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-wider">
                            In Progress
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1 bg-[#3c3c3c] rounded-full h-2">
                          <div className="bg-[#ffa116] h-2 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <span className="text-xs text-[#eff1f6] font-bold shrink-0">{completedLevels} / {totalTargetLevels} Levels</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {isCertified ? (
                        <button 
                          onClick={() => handleDownloadDummy(pathwayTitle)}
                          className="w-full md:w-auto bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-[#ffa116]/5"
                        >
                          <FileText size={14} /> Download Certificate PDF
                        </button>
                      ) : (
                        <span className="text-xs text-[#8a8a8a] font-bold bg-[#262626] border border-[#3c3c3c] px-4 py-2.5 rounded-xl block text-center w-full">
                          Complete {totalTargetLevels - completedLevels} more level{totalTargetLevels - completedLevels !== 1 ? 's' : ''} to certify
                        </span>
                      )}
                    </div>

                  </div>
                )
              })
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Certificates
