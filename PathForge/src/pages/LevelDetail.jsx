import { useState, useEffect, useRef } from 'react'
import { PlayCircle, HelpCircle, Code, CheckCircle, Zap, Terminal, Cpu, Play, Send, Sparkles } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
    case 'Beginner':
      return 'bg-[#00b8a3]/10 text-[#00b8a3] border-transparent'
    case 'Medium':
    case 'Intermediate':
      return 'bg-[#ffc01e]/10 text-[#ffc01e] border-transparent'
    case 'Hard':
    case 'Advanced':
    default:
      return 'bg-[#ef4743]/10 text-[#ef4743] border-transparent'
  }
}

function LevelDetail() {
  const { pathwayId, levelId } = useParams()
  const navigate = useNavigate()
  const chatEndRef = useRef(null)

  const [level, setLevel] = useState(null)
  const [tasks, setTasks] = useState([])
  const [activeTask, setActiveTask] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  // Coding workspace state
  const [code, setCode] = useState('')
  const language = 'javascript'
  const [consoleOpen, setConsoleOpen] = useState(true)
  const [consoleTab, setConsoleTab] = useState('testcases') // 'testcases' | 'result'
  const [running, setRunning] = useState(false)
  const [runResult, setRunResult] = useState(null)

  // Quiz workspace state
  const [selectedQuizOption, setSelectedQuizOption] = useState(null)
  const [quizFeedback, setQuizFeedback] = useState(null) // { correct: boolean, message: string }

  // Video workspace state
  const [videoCompleted, setVideoCompleted] = useState(false)

  // AI Tutor state
  const [activeTab, setActiveTab] = useState('description') // 'description' | 'submissions' | 'ai-tutor'
  const [aiChat, setAIChat] = useState([
    { sender: 'tutor', text: "👋 Hello! I am your PathForge AI Code Tutor. If you're stuck on this task, click one of the quick actions below, or ask me any question about your code!" }
  ])
  const [aiLoading, setAILoading] = useState(false)
  const [aiInput, setAIInput] = useState('')

  // Scroll chat to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [aiChat])

  // Fetch Level, Tasks and Progress
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        // Get Level and tasks
        const levelRes = await api.get(`/pathways/${pathwayId}/levels/${levelId}`)
        setLevel(levelRes.data.level)
        setTasks(levelRes.data.tasks)

        // Get progress
        const progressRes = await api.get(`/progress/${pathwayId}`)
        setProgress(progressRes.data)

        // Set default active task (first unsolved, or first overall)
        const completedIds = progressRes.data.completedTasks || []
        const unsolved = levelRes.data.tasks.find(t => !completedIds.includes(t._id))
        const initialTask = unsolved || levelRes.data.tasks[0]
        setActiveTask(initialTask)
        
        if (initialTask?.type === 'project') {
          setCode(initialTask.starterCode || '')
        }
      } catch (err) {
        console.error('Error fetching level details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [pathwayId, levelId, navigate])

  // Handle switching tasks
  const handleSelectTask = (task) => {
    setActiveTask(task)
    setRunResult(null)
    setSelectedQuizOption(null)
    setQuizFeedback(null)
    setVideoCompleted(false)
    
    setAIChat([
      { sender: 'tutor', text: `👋 Hello! I am your PathForge AI Code Tutor. If you're stuck on "${task.title}", click one of the quick actions below, or ask me any question about your code!` }
    ])
    setAIInput('')
    
    if (task.type === 'project') {
      setCode(task.starterCode || '')
    }
  }

  // AI Tutor Request Handler
  const handleAskAITutor = async (messageType, customMessage = '') => {
    if (!activeTask || aiLoading) return
    
    let userMsgText = ''
    if (messageType === 'hint') {
      userMsgText = '💡 Can you give me a hint for this task?'
    } else if (messageType === 'explain-error') {
      userMsgText = '🔍 Review my code and explain potential issues.'
    } else {
      if (!customMessage.trim()) return
      userMsgText = customMessage
    }

    // Append user message to thread
    setAIChat(prev => [...prev, { sender: 'user', text: userMsgText }])
    if (messageType === 'chat') {
      setAIInput('')
    }
    setAILoading(true)

    try {
      const res = await api.post('/ai/tutor', {
        taskId: activeTask._id,
        code,
        messageType,
        userMessage: customMessage
      })

      setAIChat(prev => [...prev, { sender: 'tutor', text: res.data.response }])
    } catch (err) {
      console.error('AI Tutor request failed:', err)
      setAIChat(prev => [...prev, { sender: 'tutor', text: '❌ Sorry, I encountered an error. Please check your network and try again.' }])
    } finally {
      setAILoading(false)
    }
  }

  // Dry run code runner locally
  const handleRunCode = async () => {
    if (!activeTask) return
    setRunning(true)
    setConsoleTab('result')
    setConsoleOpen(true)
    
    try {
      const res = await api.post('/progress/complete-task', {
        taskId: activeTask._id,
        pathwayId,
        code,
        language
      })
      
      setRunResult({
        status: res.data.status || 'Wrong Answer',
        testCasesPassed: res.data.testCasesPassed || 0,
        totalTestCases: res.data.totalTestCases || activeTask.testCases?.length || 0,
        securityScore: res.data.securityScore,
        securityLog: res.data.securityLog
      })
    } catch (err) {
      console.error('Run code error:', err)
      setRunResult({
        status: 'Compile Error',
        testCasesPassed: 0,
        totalTestCases: activeTask.testCases?.length || 0,
      })
    } finally {
      setRunning(false)
    }
  }

  // Submit coding project
  const handleSubmitCode = async () => {
    if (!activeTask) return
    setRunning(true)
    setConsoleTab('result')
    setConsoleOpen(true)
    
    try {
      const res = await api.post('/progress/complete-task', {
        taskId: activeTask._id,
        pathwayId,
        code,
        language
      })
      
      setRunResult({
        status: res.data.status || 'Wrong Answer',
        testCasesPassed: res.data.testCasesPassed || 0,
        totalTestCases: res.data.totalTestCases || activeTask.testCases?.length || 0,
        securityScore: res.data.securityScore,
        securityLog: res.data.securityLog
      })

      if (res.data.status === 'Accepted') {
        // Refresh progress list and User profile
        const progressRes = await api.get(`/progress/${pathwayId}`)
        setProgress(progressRes.data)
        const userRes = await api.get('/auth/me')
        localStorage.setItem('user', JSON.stringify(userRes.data))
        window.dispatchEvent(new CustomEvent('sync-user-profile'))
      }
    } catch (err) {
      console.error('Submit code error:', err)
      setRunResult({
        status: 'Compile Error',
        testCasesPassed: 0,
        totalTestCases: activeTask.testCases?.length || 0,
      })
    } finally {
      setRunning(false)
    }
  }

  // Submit MCQ Quiz
  const handleSubmitQuiz = async () => {
    if (selectedQuizOption === null || !activeTask) return
    
    try {
      const res = await api.post('/progress/complete-task', {
        taskId: activeTask._id,
        pathwayId,
        quizAnswerSubmitted: selectedQuizOption
      })
      
      if (res.data.status === 'Accepted') {
        setQuizFeedback({ correct: true, message: '🎉 Correct Answer! XP updated.' })
        
        // Refresh progress and user
        const progressRes = await api.get(`/progress/${pathwayId}`)
        setProgress(progressRes.data)
        const userRes = await api.get('/auth/me')
        localStorage.setItem('user', JSON.stringify(userRes.data))
      } else {
        setQuizFeedback({ correct: false, message: '❌ Incorrect answer. Please try again!' })
      }
    } catch (err) {
      console.error('Error submitting quiz answer:', err)
      setQuizFeedback({ correct: false, message: 'Something went wrong.' })
    }
  }

  // Complete Video task
  const handleCompleteVideo = async () => {
    if (!activeTask) return
    
    try {
      await api.post('/progress/complete-task', {
        taskId: activeTask._id,
        pathwayId
      })
      
      setVideoCompleted(true)
      
      // Refresh progress and user
      const progressRes = await api.get(`/progress/${pathwayId}`)
      setProgress(progressRes.data)
      const userRes = await api.get('/auth/me')
      localStorage.setItem('user', JSON.stringify(userRes.data))
    } catch (err) {
      console.error('Error completing video task:', err)
    }
  }

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
        <Sidebar />
        <div className="pt-20 flex-1 text-center py-8">
          <p className="text-[#8a8a8a] text-sm font-semibold">Loading level progression...</p>
        </div>
      </div>
    )
  }

  if (!level || !activeTask) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex flex-col text-[#eff1f6]">
        <Sidebar />
        <div className="pt-20 flex-1 text-center py-8">
          <p className="text-[#8a8a8a] text-sm font-semibold">Level details or tasks not found.</p>
          <Link to="/pathways" className="text-[#ffa116] font-semibold mt-2 hover:underline">Go back to pathways</Link>
        </div>
      </div>
    )
  }

  const completedCount = progress?.completedTasks?.length || 0
  const isTaskCompleted = progress?.completedTasks?.includes(activeTask._id)

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col">
      <Sidebar />

      <div className="pt-14 flex-1 flex h-[calc(100vh-3.5rem)] overflow-hidden">
        
        {/* LEFT COLUMN: Sidebar Tasks List */}
        <div className="w-80 bg-[#262626] border-r border-[#3c3c3c] flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-[#3c3c3c] bg-[#1a1a1a]">
            <Link to={`/pathway/${pathwayId}`} className="text-[#8a8a8a] hover:text-[#ffa116] text-xs font-semibold flex items-center gap-1 mb-3">
              ← Pathway Details
            </Link>
            <h2 className="text-white font-black text-base leading-tight mb-1">{level.title}</h2>
            <p className="text-[#8a8a8a] text-xs font-semibold mb-3">{level.focus}</p>
            
            {/* Task completion status bar */}
            <div className="flex justify-between items-center text-[10px] text-[#8a8a8a] font-bold mb-1">
              <span>PROGRESS</span>
              <span>{completedCount} / {tasks.length} Completed</span>
            </div>
            <div className="bg-[#3c3c3c] rounded-full h-1.5 w-full">
              <div 
                className="bg-[#2cbb3e] h-1.5 rounded-full transition-all" 
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Scrollable Tasks list */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#3c3c3c]">
            {tasks.map((t, idx) => {
              const isCompleted = progress?.completedTasks?.includes(t._id)
              const isActive = activeTask._id === t._id
              
              // Icon selector
              let taskIcon = <PlayCircle size={16} />
              if (t.type === 'quiz') taskIcon = <HelpCircle size={16} />
              if (t.type === 'project') taskIcon = <Code size={16} />

              return (
                <button
                  key={t._id}
                  onClick={() => handleSelectTask(t)}
                  className={`w-full text-left p-4 flex items-start justify-between transition-all border-l-4 ${
                    isActive 
                      ? 'bg-[#ffa116]/10 border-[#ffa116] text-[#ffa116]' 
                      : 'hover:bg-[#303030] border-transparent text-[#eff1f6]'
                  }`}
                >
                  <div className="flex gap-3">
                    <span className={`mt-0.5 ${isActive ? 'text-[#ffa116]' : 'text-[#8a8a8a]'}`}>
                      {taskIcon}
                    </span>
                    <div>
                      <p className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#eff1f6]'}`}>
                        Task {idx + 1}: {t.title}
                      </p>
                      <p className="text-[10px] text-[#8a8a8a] font-bold uppercase mt-0.5">
                        {t.type} · +{t.xpReward} XP
                      </p>
                    </div>
                  </div>
                  {isCompleted && (
                    <CheckCircle size={14} className="text-[#2cbb3e] shrink-0 mt-0.5" fill="#2cbb3e15" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Workspaces */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#1a1a1a]">
          
          {/* Top workspace action bar */}
          <div className="bg-[#262626] border-b border-[#3c3c3c] px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-xs uppercase tracking-wider">{activeTask.type} Workspace</span>
              <span className="text-[#3c3c3c]">/</span>
              <span className="text-[#8a8a8a] font-bold text-xs">{activeTask.title}</span>
            </div>
            <span className="bg-[#ffa116]/15 text-[#ffa116] border border-[#ffa116]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-0.5">
              <Zap size={10} fill="#ffa116" /> +{activeTask.xpReward} XP Reward
            </span>
          </div>

          {/* Dynamic workspace renderer */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* 1. VIDEO WORKSPACE */}
            {activeTask.type === 'video' && (
              <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
                <iframe
                  className="w-full aspect-video rounded-3xl border border-[#3c3c3c] mb-6"
                  src={activeTask.content}
                  title={activeTask.title}
                  allowFullScreen
                ></iframe>
                
                <h2 className="text-xl font-black text-white mb-2">{activeTask.title}</h2>
                <p className="text-[#8a8a8a] text-sm leading-relaxed mb-6 font-medium">{activeTask.description}</p>
                
                <div className="border-t border-[#3c3c3c] pt-6 flex items-center justify-between">
                  <span className="text-xs text-[#8a8a8a] font-medium">Watch the video in full to complete this task.</span>
                  {isTaskCompleted || videoCompleted ? (
                    <span className="bg-[#2cbb3e]/10 text-[#2cbb3e] text-xs font-bold px-4 py-2.5 rounded-xl border border-[#2cbb3e]/20 flex items-center gap-1.5">
                      <CheckCircle size={14} fill="#2cbb3e15" /> Completed
                    </span>
                  ) : (
                    <button
                      onClick={handleCompleteVideo}
                      className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] text-xs font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Play size={10} fill="#1a1a1a" /> Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 2. MCQ QUIZ WORKSPACE */}
            {activeTask.type === 'quiz' && (
              <div className="flex-1 overflow-y-auto p-8 max-w-2xl mx-auto w-full flex flex-col justify-center">
                <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl p-6 mb-6">
                  <p className="text-[#ffa116] text-xs font-black uppercase tracking-wider mb-2">Quiz Challenge</p>
                  <h2 className="text-white font-bold text-lg mb-4 leading-snug">{activeTask.description}</h2>
                  
                  <div className="flex flex-col gap-2.5">
                    {activeTask.quizOptions?.map((opt, idx) => (
                      <label 
                        key={idx}
                        className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                          selectedQuizOption === idx
                            ? 'border-[#ffa116] bg-[#ffa116]/10 text-white'
                            : 'border-[#3c3c3c] hover:border-[#ffa116] bg-[#1a1a1a]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="quiz"
                          checked={selectedQuizOption === idx}
                          onChange={() => {
                            if (!isTaskCompleted) {
                              setSelectedQuizOption(idx)
                              setQuizFeedback(null)
                            }
                          }}
                          disabled={isTaskCompleted}
                          className="mt-0.5 accent-[#ffa116]"
                        />
                        <span className="text-sm text-[#eff1f6] font-semibold leading-tight">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {quizFeedback && (
                  <div className={`p-4 rounded-xl border mb-6 text-sm font-semibold text-center ${
                    quizFeedback.correct 
                      ? 'bg-[#2cbb3e]/10 border-[#2cbb3e]/20 text-[#2cbb3e]' 
                      : 'bg-[#ef4743]/10 border-[#ef4743]/20 text-[#ef4743]'
                  }`}>
                    {quizFeedback.message}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-[#3c3c3c] pt-6">
                  <span className="text-xs text-[#8a8a8a] font-medium">Choose the single correct option.</span>
                  {isTaskCompleted ? (
                    <span className="bg-[#2cbb3e]/10 text-[#2cbb3e] text-xs font-bold px-4 py-2.5 rounded-xl border border-[#2cbb3e]/20 flex items-center gap-1.5">
                      <CheckCircle size={14} fill="#2cbb3e15" /> Correct & Solved
                    </span>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={selectedQuizOption === null}
                      className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] text-xs font-bold px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 3. PROJECT (CODING CHALLENGE) SPLIT WORKSPACE */}
            {activeTask.type === 'project' && (
              <div className="flex-1 flex overflow-hidden">
                
                {/* Left side of split: Description / AI Tutor */}
                <div className="w-1/2 bg-[#262626] border-r border-[#3c3c3c] flex flex-col overflow-hidden">
                  
                  {/* Left Pane Tabs Selection */}
                  <div className="bg-[#1a1a1a] border-b border-[#3c3c3c] flex px-4">
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                        activeTab === 'description'
                          ? 'border-[#ffa116] text-[#ffa116]'
                          : 'border-transparent text-[#8a8a8a] hover:text-white'
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab('ai-tutor')}
                      className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1 ${
                        activeTab === 'ai-tutor'
                          ? 'border-[#ffa116] text-[#ffa116]'
                          : 'border-transparent text-[#8a8a8a] hover:text-white'
                      }`}
                    >
                      <Sparkles size={12} className={activeTab === 'ai-tutor' ? 'text-[#ffa116]' : 'text-[#8a8a8a]'} /> AI Tutor
                    </button>
                  </div>

                  {/* Left Pane Content Render */}
                  <div className="flex-1 overflow-y-auto flex flex-col">
                    {activeTab === 'description' ? (
                      <div className="p-6 flex flex-col gap-5">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getDifficultyColor(level.difficulty || 'Easy')}`}>
                            {level.difficulty || 'Easy'}
                          </span>
                          <span className="text-[10px] text-[#eff1f6] bg-[#3c3c3c] px-2 py-0.5 rounded uppercase font-bold">
                            JavaScript (JS)
                          </span>
                        </div>

                        <h3 className="text-white font-black text-lg">{activeTask.title}</h3>
                        <div className="text-sm text-[#eff1f6] leading-relaxed whitespace-pre-wrap font-sans font-medium">
                          {activeTask.description}
                        </div>

                        <div className="border-t border-[#3c3c3c] pt-4 mt-6">
                          <p className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2">Platform Context</p>
                          <p className="text-xs text-[#8a8a8a] leading-relaxed font-semibold">
                            Code is evaluated inside a Node.js VM container on the server. Make sure you return the final object/results from your function.
                          </p>
                        </div>
                      </div>
                    ) : (
                      // AI Tutor Tab
                      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#1a1a1a]">
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                          {aiChat.map((msg, i) => (
                            <div 
                              key={i}
                              className={`flex flex-col max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                                msg.sender === 'tutor'
                                  ? 'bg-[#262626] border border-[#3c3c3c] text-[#eff1f6] self-start rounded-tl-none shadow-sm'
                                  : 'bg-[#ffa116] text-[#1a1a1a] self-end rounded-tr-none shadow-md'
                              }`}
                            >
                              <p className={`font-extrabold text-[9px] uppercase tracking-wider opacity-75 mb-1 ${msg.sender === 'tutor' ? 'text-[#ffa116]' : 'text-[#1a1a1a]'}`}>
                                {msg.sender === 'tutor' ? '🤖 AI Tutor' : '👤 You'}
                              </p>
                              <div className="whitespace-pre-wrap font-sans font-medium">{msg.text}</div>
                            </div>
                          ))}
                          
                          {aiLoading && (
                            <div className="bg-[#262626] border border-[#3c3c3c] text-[#8a8a8a] self-start rounded-2xl rounded-tl-none p-4 max-w-[85%] animate-pulse flex items-center gap-2">
                              <Sparkles size={14} className="text-[#ffa116] animate-spin" />
                              <span className="text-xs font-bold">Tutor is analyzing your workspace...</span>
                            </div>
                          )}
                          <div ref={chatEndRef} />
                        </div>

                        {/* Quick action buttons */}
                        <div className="px-4 py-2 border-t border-[#3c3c3c] flex gap-2 overflow-x-auto bg-[#262626]">
                          <button
                            onClick={() => handleAskAITutor('hint')}
                            disabled={aiLoading}
                            className="bg-[#1a1a1a] hover:bg-[#ffa116]/10 border border-[#3c3c3c] hover:border-[#ffa116] text-[#8a8a8a] hover:text-[#ffa116] text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all disabled:opacity-50 cursor-pointer"
                          >
                            💡 Get a Hint
                          </button>
                          <button
                            onClick={() => handleAskAITutor('explain-error')}
                            disabled={aiLoading}
                            className="bg-[#1a1a1a] hover:bg-[#ffa116]/10 border border-[#3c3c3c] hover:border-[#ffa116] text-[#8a8a8a] hover:text-[#ffa116] text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all disabled:opacity-50 cursor-pointer"
                          >
                            🔍 Review My Code
                          </button>
                        </div>

                        {/* Message Send Input */}
                        <div className="p-3 border-t border-[#3c3c3c] bg-[#262626] flex gap-2 items-center">
                          <input
                            type="text"
                            value={aiInput}
                            onChange={(e) => setAIInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleAskAITutor('chat', aiInput)
                            }}
                            disabled={aiLoading}
                            placeholder="Ask me a question (e.g. 'What is display flex?')..."
                            className="flex-1 bg-[#1a1a1a] border border-[#3c3c3c] hover:border-[#ffa116] rounded-xl px-3.5 py-2 text-xs text-[#eff1f6] placeholder:text-[#8a8a8a] outline-none transition-all focus:border-[#ffa116] font-semibold"
                          />
                          <button
                            onClick={() => handleAskAITutor('chat', aiInput)}
                            disabled={aiLoading || !aiInput.trim()}
                            className="bg-[#ffa116] hover:bg-[#ffb84d] text-[#1a1a1a] p-2.5 rounded-xl transition-all shadow-md disabled:opacity-40 cursor-pointer"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side of split: Code Editor & interactive terminal */}
                <div className="w-1/2 flex flex-col bg-[#1a1a1a] text-[#eff1f6] overflow-hidden border-l border-[#3c3c3c]">
                  
                  {/* Code selector */}
                  <div className="bg-[#262626] border-b border-[#3c3c3c] px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#8a8a8a] uppercase">Language:</span>
                      <span className="text-xs font-semibold text-white bg-[#1a1a1a] border border-[#3c3c3c] rounded px-2.5 py-0.5">JavaScript</span>
                    </div>
                    {isTaskCompleted && (
                      <span className="text-[10px] text-[#2cbb3e] font-bold uppercase flex items-center gap-0.5">
                        ● Solved
                      </span>
                    )}
                  </div>

                  {/* Editor input */}
                  <div className="flex-1 flex overflow-hidden bg-[#1e1e1e]">
                    <div className="w-10 bg-[#1e1e1e] text-[#5c5c5c] font-mono text-xs text-right pr-2 select-none pt-4 border-r border-[#2d2d2d]">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="h-5 leading-5">{i + 1}</div>
                      ))}
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="flex-1 bg-[#1e1e1e] text-[#eff1f6] font-mono text-xs p-4 outline-none resize-none leading-5 overflow-y-auto"
                      style={{ tabSize: 2 }}
                      placeholder="// Type your javascript solution here..."
                    ></textarea>
                  </div>

                  {/* Dynamic Console log terminal */}
                  {consoleOpen && (
                    <div className="bg-[#1a1a1a] border-t border-[#3c3c3c] flex flex-col h-60 overflow-hidden">
                      <div className="bg-[#262626] border-b border-[#3c3c3c] flex justify-between px-4">
                        <div className="flex">
                          <button
                            onClick={() => setConsoleTab('testcases')}
                            className={`py-2 px-3 text-xs font-bold flex items-center gap-1.5 transition-all border-b-2 ${
                              consoleTab === 'testcases' ? 'border-[#ffa116] text-[#ffa116]' : 'border-transparent text-[#8a8a8a] hover:text-white'
                            }`}
                          >
                            <Terminal size={12} /> Test Cases
                          </button>
                          <button
                            onClick={() => setConsoleTab('result')}
                            className={`py-2 px-3 text-xs font-bold flex items-center gap-1.5 transition-all border-b-2 ${
                              consoleTab === 'result' ? 'border-[#ffa116] text-[#ffa116]' : 'border-transparent text-[#8a8a8a] hover:text-white'
                            }`}
                          >
                            <Cpu size={12} /> Result
                          </button>
                        </div>
                        <button onClick={() => setConsoleOpen(false)} className="text-xs text-[#8a8a8a] hover:text-white py-1 cursor-pointer">Minimize</button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-[#1a1a1a]">
                        {consoleTab === 'testcases' ? (
                          <div className="flex flex-col gap-2.5">
                            <p className="text-[#8a8a8a] text-[9px] uppercase font-bold tracking-wider">Example test expressions:</p>
                            {activeTask.testCases?.map((tc, idx) => (
                              <div key={idx} className="bg-[#262626] border border-[#3c3c3c] p-3 rounded-lg flex flex-col gap-1">
                                <div>
                                  <span className="text-[#8a8a8a] text-[10px]">Expression:</span>
                                  <code className="text-white block mt-0.5">{tc.input}</code>
                                </div>
                                <div>
                                  <span className="text-[#8a8a8a] text-[10px]">Expected output:</span>
                                  <code className="text-[#2cbb3e] block mt-0.5">{tc.output}</code>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {running ? (
                              <p className="text-[#8a8a8a] animate-pulse font-semibold">Checking execution parameters in server sandboxing context...</p>
                            ) : !runResult ? (
                              <p className="text-[#8a8a8a] italic font-semibold">Submit or execute a run of your solution to print details.</p>
                            ) : (
                              <div className="flex flex-col gap-2.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold">Status:</span>
                                  <span className={`text-xs font-black uppercase ${
                                    runResult.status === 'Accepted' 
                                      ? 'text-[#2cbb3e]' 
                                      : runResult.status === 'Security Violation'
                                        ? 'text-red-500 font-extrabold shadow-sm'
                                        : 'text-[#ef4743]'
                                  }`}>
                                    {runResult.status}
                                  </span>
                                </div>
                                <div className="bg-[#262626] border border-[#3c3c3c] p-3 rounded-lg">
                                  <p className="text-[#8a8a8a] text-[10px] mb-1 font-semibold">Test Cases Results:</p>
                                  <p className="text-white font-bold text-sm">
                                    {runResult.testCasesPassed} / {runResult.totalTestCases} Passed
                                  </p>
                                </div>
                                
                                {runResult.securityScore !== undefined && (
                                  <div className="bg-[#262626] border border-[#3c3c3c] p-4 rounded-xl flex flex-col gap-2.5 mt-1 shadow-sm">
                                    <div className="flex justify-between items-center">
                                      <span className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                                        🛡️ Threat Detection Scanner
                                      </span>
                                      <span className={`text-xs font-black px-2.5 py-0.5 rounded ${
                                        runResult.securityScore >= 80
                                          ? 'bg-[#00af9b]/10 text-[#00af9b]'
                                          : runResult.securityScore >= 50
                                            ? 'bg-[#ffb800]/10 text-[#ffb800]'
                                            : 'bg-[#ff2d55]/10 text-[#ff2d55]'
                                      }`}>
                                        Score: {runResult.securityScore}/100
                                      </span>
                                    </div>
                                    <div className="bg-[#1a1a1a] rounded-full h-1.5 w-full overflow-hidden">
                                      <div 
                                        className={`h-1.5 rounded-full transition-all duration-500 ${
                                          runResult.securityScore >= 80
                                            ? 'bg-[#00af9b]'
                                            : runResult.securityScore >= 50
                                              ? 'bg-[#ffb800]'
                                              : 'bg-[#ff2d55]'
                                        }`}
                                        style={{ width: `${runResult.securityScore}%` }}
                                      ></div>
                                    </div>
                                    <div className="bg-[#1a1a1a] p-2.5 rounded-lg border border-[#3c3c3c]/50">
                                      <p className="text-[9px] text-[#8a8a8a] font-bold uppercase tracking-wider mb-1">Scan Diagnostics</p>
                                      <p className={`text-xs font-semibold leading-relaxed ${
                                        runResult.securityScore >= 80 
                                          ? 'text-[#00af9b]' 
                                          : runResult.securityScore >= 50 
                                            ? 'text-[#ffb800]' 
                                            : 'text-[#ff2d55]'
                                      }`}>
                                        {runResult.securityLog}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {runResult.status === 'Accepted' && (
                                  <p className="text-[#2cbb3e] font-semibold text-center mt-2 animate-bounce">
                                    🎉 Correct! Level task successfully solved. +{activeTask.xpReward} XP awarded!
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions footer */}
                  <div className="bg-[#262626] border-t border-[#3c3c3c] px-4 py-3 flex items-center justify-between">
                    <button
                      onClick={() => setConsoleOpen(!consoleOpen)}
                      className="text-xs font-semibold text-[#eff1f6] hover:text-white bg-[#1a1a1a] hover:bg-[#303030] border border-[#3c3c3c] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {consoleOpen ? 'Hide Console' : 'Show Console'}
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={handleRunCode}
                        disabled={running || isTaskCompleted}
                        className="text-xs font-semibold text-[#eff1f6] hover:text-white bg-[#1a1a1a] hover:bg-[#303030] border border-[#3c3c3c] px-4 py-2 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                      >
                        Run Code
                      </button>
                      <button
                        onClick={handleSubmitCode}
                        disabled={running || isTaskCompleted}
                        className="text-xs font-bold text-[#1a1a1a] bg-[#ffa116] hover:bg-[#ffb84d] px-5 py-2 rounded-xl shadow-md disabled:opacity-50 transition-all cursor-pointer"
                      >
                        {isTaskCompleted ? 'Solved' : 'Submit'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default LevelDetail