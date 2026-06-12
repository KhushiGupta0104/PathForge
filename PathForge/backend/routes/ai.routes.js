const express = require('express')
const router = express.Router()
const { getAITutorResponse } = require('../controllers/ai.controller')
const verifyToken = require('../middleware/auth.middleware')

router.post('/tutor', verifyToken, getAITutorResponse)

module.exports = router
