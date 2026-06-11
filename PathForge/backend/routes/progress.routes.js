const express = require('express')
const router = express.Router()
const { enrollPathway, getProgress, completeTask, getAllProgress } = require('../controllers/progress.controller')
const verifyToken = require('../middleware/auth.middleware')

router.post('/enroll', verifyToken, enrollPathway)
router.get('/all', verifyToken, getAllProgress)
router.get('/:pathwayId', verifyToken, getProgress)
router.post('/complete-task', verifyToken, completeTask)

module.exports = router