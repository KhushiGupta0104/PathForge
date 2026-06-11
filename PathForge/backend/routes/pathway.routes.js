const express = require('express')
const router = express.Router()
const { getAllPathways, getPathwayById, getLevelById } = require('../controllers/pathway.controller')
const verifyToken = require('../middleware/auth.middleware')

router.get('/', verifyToken, getAllPathways)
router.get('/:id', verifyToken, getPathwayById)
router.get('/:id/levels/:levelId', verifyToken, getLevelById)

module.exports = router