const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pathwayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pathway', required: true },
  completedLevels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Level' }],
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  totalXPEarned: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Progress', progressSchema)