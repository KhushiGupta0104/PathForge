import { useState, useEffect, useCallback } from 'react'
import { Zap, Trophy, Code, Award, BarChart, Flame, LogOut, CreditCard, X, Check } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../api'

const navItems = [
  { icon: Trophy, label: 'Dashboard', path: '/dashboard' },
  { icon: Code, label: 'Pathways', path: '/pathways' },
  { icon: Award, label: 'Achievements', path: '/achievements' },
  { icon: BarChart, label: 'Certificates', path: '/certificates' },
]

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  // Parse user details from localStorage
  const userString = localStorage.getItem('user')
  const initialUser = userString ? JSON.parse(userString) : {
    name: 'User',
    level: 1,
    xp: 0,
    streak: 0,
    isPremium: false,
  }

  const [user, setUser] = useState(initialUser)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Payment Form States
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Sync user status with backend
  const syncUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const res = await api.get('/auth/me')
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
        setUser(res.data)
      }
    } catch (err) {
      console.error('Error syncing user profile:', err)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    syncUser()

    const handleOpenModal = () => {
      setErrorMsg('')
      setPaymentSuccess(false)
      setCardNumber('')
      setCardName('')
      setCardExpiry('')
      setCardCvv('')
      setIsModalOpen(true)
    }

    const handleSync = () => {
      syncUser()
    }

    window.addEventListener('open-premium-modal', handleOpenModal)
    window.addEventListener('sync-user-profile', handleSync)

    return () => {
      window.removeEventListener('open-premium-modal', handleOpenModal)
      window.removeEventListener('sync-user-profile', handleSync)
    }
  }, [syncUser])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = value.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '))
    } else {
      setCardNumber(value)
    }
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setCardExpiry(value.substring(0, 5))
  }

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, '')
    setCardCvv(value.substring(0, 3))
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    const cleanCard = cardNumber.replace(/\s/g, '')
    if (cleanCard.length !== 16) {
      setErrorMsg('Card number must be 16 digits')
      return
    }
    if (!cardName.trim()) {
      setErrorMsg('Cardholder name is required')
      return
    }
    if (cardExpiry.length !== 5) {
      setErrorMsg('Expiry date must be in MM/YY format')
      return
    }
    if (cardCvv.length !== 3) {
      setErrorMsg('CVV must be 3 digits')
      return
    }

    setPaymentLoading(true)
    try {
      // Step 1: Create Order
      const orderRes = await api.post('/payments/create-order', {
        amount: 99900,
        currency: 'INR'
      })

      const orderId = orderRes.data.id

      // Step 2: Verify Payment (Simulated)
      const randomId = Math.floor(100000000 + Math.random() * 900000000)
      const paymentRes = await api.post('/payments/verify-payment', {
        razorpay_order_id: orderId,
        razorpay_payment_id: `pay_mock_${randomId}`
      })

      if (paymentRes.data?.user) {
        localStorage.setItem('user', JSON.stringify(paymentRes.data.user))
        setUser(paymentRes.data.user)
        setPaymentSuccess(true)
        
        // Notify other pages
        window.dispatchEvent(new CustomEvent('premium-updated'))

        setTimeout(() => {
          setIsModalOpen(false)
          setPaymentSuccess(false)
        }, 2000)
      } else {
        throw new Error('Payment verification succeeded but user update failed')
      }
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || 'Payment processing failed. Please try again.')
    } finally {
      setPaymentLoading(false)
    }
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U'

  return (
    <>
      <div className="w-full h-14 bg-[#262626] border-b border-[#3c3c3c] flex items-center justify-between px-6 fixed top-0 left-0 z-50 text-[#eff1f6] shadow-sm select-none">
        
        {/* BRAND LOGO */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-[#ffa116] p-1.5 rounded-lg">
            <Zap size={14} className="text-[#1a1a1a]" fill="#1a1a1a" />
          </div>
          <span className="text-white font-black text-lg tracking-tight">
            Path<span className="text-[#ffa116]">Forge</span>
          </span>
        </Link>

        {/* CENTER MENU NAVIGATION */}
        <div className="flex items-center gap-6">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={i}
                to={item.path}
                className={`text-xs font-semibold uppercase tracking-wider py-1.5 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'border-[#ffa116] text-[#eff1f6]'
                    : 'border-transparent text-[#8a8a8a] hover:text-[#eff1f6]'
                }`}
              >
                <item.icon size={13} />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* RIGHT SIDE CONTROLS */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Premium Badge / Upgrade Button */}
          {user.isPremium ? (
            <span className="text-[#ffa116] text-xs font-bold bg-[#ffa116]/10 border border-[#ffa116]/30 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm shadow-[#ffa116]/5 animate-pulse">
              👑 Premium
            </span>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#ffa116]/20 to-[#ffa116]/10 hover:from-[#ffa116]/30 hover:to-[#ffa116]/20 border border-[#ffa116]/50 text-[#ffa116] text-xs font-bold px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
            >
              👑 Unlock Premium
            </button>
          )}

          {/* Streak Flame */}
          <div className="flex items-center gap-1 bg-[#ffa116]/10 px-3 py-1 rounded-full border border-[#ffa116]/20">
            <Flame size={14} className="text-[#ffa116]" fill="#ffa116" />
            <span className="text-xs font-bold text-[#ffa116]">{user.streak || 0} Days</span>
          </div>

          {/* Profile Circle Link */}
          <Link to="/profile" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-full bg-[#ffa116] text-[#1a1a1a] flex items-center justify-center font-bold text-xs select-none">
              {userInitial}
            </div>
            <span className="text-xs text-[#8a8a8a] group-hover:text-white font-bold hidden md:inline transition-colors">
              {user.name} (Lvl {user.level || 1})
            </span>
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>

      {/* RAZORPAY MOCK PREMIUM CHECKOUT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-[#262626] border border-[#3c3c3c] rounded-3xl w-full max-w-md p-6 relative flex flex-col gap-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#8a8a8a] hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {paymentSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-[#2cbb3e]/20 border-2 border-[#2cbb3e] rounded-full flex items-center justify-center mb-4 text-[#2cbb3e] animate-bounce">
                  <Check size={32} />
                </div>
                <h3 className="text-white text-xl font-black mb-1">Upgrade Successful!</h3>
                <p className="text-[#8a8a8a] text-sm font-semibold px-4">
                  Welcome to PathForge Premium! You have unlocked all developer tracks, mock interview templates, and VM features.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-2">
                  <span className="text-[10px] text-[#ffa116] bg-[#ffa116]/10 px-2.5 py-0.5 rounded font-black tracking-widest uppercase">
                    PRO ACCESS
                  </span>
                  <h3 className="text-white text-xl font-black mt-1.5">Unlock LeetCode Premium</h3>
                  <p className="text-[#8a8a8a] text-xs font-semibold mt-0.5">Get unlimited access to advanced Full Stack pathways and systems.</p>
                </div>

                {/* Credit Card Graphic Preview */}
                <div className="bg-gradient-to-br from-[#ffa116] to-[#b26b00] rounded-2xl p-5 text-white shadow-lg relative h-40 overflow-hidden flex flex-col justify-between select-none">
                  {/* Subtle decorative circles */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full"></div>
                  <div className="absolute right-12 -top-12 w-24 h-24 bg-white/5 rounded-full"></div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black tracking-widest opacity-80 uppercase">PathForge Gold Card</p>
                      <div className="w-8 h-6 bg-yellow-300/30 rounded-md border border-white/20 mt-2 flex items-center justify-center">
                        <div className="w-4 h-3 bg-yellow-200/20 rounded"></div>
                      </div>
                    </div>
                    <span className="text-base font-black italic tracking-tighter">Premium</span>
                  </div>

                  <div>
                    <p className="font-mono text-base tracking-widest leading-none mb-3">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] uppercase tracking-wider opacity-60">Cardholder Name</p>
                        <p className="text-[11px] font-bold tracking-wide uppercase truncate max-w-[180px]">
                          {cardName || 'KHUSHI GUPTA'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] uppercase tracking-wider opacity-60">Expires</p>
                        <p className="text-[11px] font-mono font-bold tracking-wide">
                          {cardExpiry || 'MM/YY'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-3">
                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 text-red-500 text-xs font-semibold text-center">
                      {errorMsg}
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-[#8a8a8a] tracking-wider">Card Number</label>
                    <div className="bg-[#1a1a1a] border border-[#3c3c3c] rounded-xl px-3 py-2.5 flex items-center gap-2 focus-within:border-[#ffa116] transition-colors">
                      <CreditCard size={14} className="text-[#8a8a8a]" />
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className="bg-transparent outline-none text-xs text-white placeholder:text-[#3c3c3c] w-full font-semibold font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-[#8a8a8a] tracking-wider">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="CARDHOLDER NAME"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="bg-[#1a1a1a] border border-[#3c3c3c] rounded-xl px-3 py-2.5 focus:border-[#ffa116] outline-none text-xs text-white placeholder:text-[#3c3c3c] font-semibold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-[#8a8a8a] tracking-wider">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        className="bg-[#1a1a1a] border border-[#3c3c3c] rounded-xl px-3 py-2.5 focus:border-[#ffa116] outline-none text-xs text-white placeholder:text-[#3c3c3c] font-semibold text-center font-mono"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-[#8a8a8a] tracking-wider">CVV Code</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={handleCvvChange}
                        maxLength={3}
                        className="bg-[#1a1a1a] border border-[#3c3c3c] rounded-xl px-3 py-2.5 focus:border-[#ffa116] outline-none text-xs text-white placeholder:text-[#3c3c3c] font-semibold text-center font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Simulator Logo Banner */}
                  <div className="flex justify-between items-center bg-[#1a1a1a]/40 border border-[#3c3c3c]/50 rounded-xl px-3 py-2 mt-1 select-none">
                    <span className="text-[9px] text-[#8a8a8a] font-bold">Razorpay Mock Payment Gateway</span>
                    <span className="text-[10px] text-[#00b8a3] font-black tracking-widest italic uppercase">Razorpay</span>
                  </div>

                  <button
                    type="submit"
                    disabled={paymentLoading}
                    className="w-full bg-[#ffa116] hover:bg-[#ffb84d] disabled:bg-[#ffa116]/50 text-[#1a1a1a] text-sm font-black py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-[#ffa116]/10 flex justify-center items-center gap-2 mt-2"
                  >
                    {paymentLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying Transaction...</span>
                      </>
                    ) : (
                      <span>Pay ₹999 & Upgrade</span>
                    )}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar