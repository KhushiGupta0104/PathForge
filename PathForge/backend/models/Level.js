const mongoose = require('mongoose')

const levelSchema = new mongoose.Schema({
  pathwayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pathway', required: true },
  title: { type: String, required: true },
  focus: { type: String },
  levelNumber: { type: Number, required: true },
  xpReward: { type: Number, default: 500 },
}, { timestamps: true })

module.exports = mongoose.model('Level', levelSchema)