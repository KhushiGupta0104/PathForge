const mongoose = require('mongoose')

const pathwaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  estimatedMonths: { type: Number },
  totalXP: { type: Number },
  tags: [{ type: String }],
  icon: { type: String },
  isPremium: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Pathway', pathwaySchema)