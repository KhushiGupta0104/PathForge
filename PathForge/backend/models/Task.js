const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  levelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'quiz', 'project'], required: true },
  description: { type: String },
  content: { type: String },
  xpReward: { type: Number, default: 100 },
  quizOptions: [{ type: String }],
  quizAnswer: { type: Number },
  starterCode: { type: String },
  solutionCode: { type: String },
  testCases: [{
    input: { type: String },
    output: { type: String }
  }]
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)