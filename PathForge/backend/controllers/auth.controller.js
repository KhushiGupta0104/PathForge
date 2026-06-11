const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password, collegeYear } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      collegeYear,
    })

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        badges: user.badges,
      }
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        badges: user.badges,
      }
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// GET ME
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { signup, login, getMe }