const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Compile Error', 'Runtime Error'], required: true },
  testCasesPassed: { type: Number, default: 0 },
  totalTestCases: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Submission', submissionSchema)
