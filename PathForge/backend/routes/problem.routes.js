const express = require('express')
const router = express.Router()
const { getAllProblems, getProblemById, submitSolution } = require('../controllers/problem.controller')
const verifyToken = require('../middleware/auth.middleware')

router.get('/', verifyToken, getAllProblems)
router.get('/:id', verifyToken, getProblemById)
router.post('/submit', verifyToken, submitSolution)

module.exports = router
