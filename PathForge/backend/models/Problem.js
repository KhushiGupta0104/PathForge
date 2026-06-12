const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Markdown formatted
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { 
    type: String, 
    enum: ['Frontend', 'Backend', 'Full Stack', 'AI/ML', 'DevOps', 'Cybersecurity'], 
    required: true 
  },
  skills: [{ type: String }], // e.g. ['React', 'Docker', 'JWT', 'NumPy']
  starterCode: { type: String, required: true },
  solutionCode: { type: String, required: true },
  testCases: [{
    input: { type: String },
    output: { type: String }
  }],
  xpReward: { type: Number, required: true },
  acceptanceRate: { type: Number, default: 72.5 }
}, { timestamps: true })

module.exports = mongoose.model('Problem', problemSchema)
