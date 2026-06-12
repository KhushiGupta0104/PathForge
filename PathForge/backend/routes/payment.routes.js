const express = require('express')
const router = express.Router()
const { createOrder, verifyPayment } = require('../controllers/payment.controller')
const verifyToken = require('../middleware/auth.middleware')

router.post('/create-order', verifyToken, createOrder)
router.post('/verify-payment', verifyToken, verifyPayment)

module.exports = router
