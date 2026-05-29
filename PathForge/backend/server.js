const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get('/ping', (req, res) => {
  res.json({ message: 'PathForge backend is live!' })
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
  console.log('MongoDB connection error:', err)
})