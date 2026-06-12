const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collegeYear: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date },
  badges: [{ type: String }],
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  skillXP: { type: Map, of: Number, default: {} },
  activityLog: { type: Map, of: Number, default: {} },
  isPremium: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)