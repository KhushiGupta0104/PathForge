const User = require('../models/User')

// Create a simulated Razorpay payment order
const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body
    
    // Generate a simulated order ID
    const randomNum = Math.floor(100000 + Math.random() * 900000)
    const orderId = `order_pay_${randomNum}`

    res.status(201).json({
      id: orderId,
      entity: 'order',
      amount: amount || 99900, // 999 INR in paise
      currency: currency || 'INR',
      receipt: `receipt_${randomNum}`,
      status: 'created'
    })
  } catch (err) {
    res.status(500).json({ message: 'Order creation failed', error: err.message })
  }
}

// Verify signature and unlock premium membership status
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ message: 'Missing transaction credentials' })
    }

    // Update the User document to premium status in MongoDB
    const user = await User.findByIdAndUpdate(
      req.userId,
      { isPremium: true },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      message: 'Payment verified successfully! LeetCode Premium membership unlocked.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        isPremium: user.isPremium,
        badges: user.badges
      }
    })
  } catch (err) {
    res.status(500).json({ message: 'Payment verification failed', error: err.message })
  }
}

module.exports = { createOrder, verifyPayment }
