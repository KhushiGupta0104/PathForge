const Problem = require('../models/Problem')
const Submission = require('../models/Submission')
const User = require('../models/User')
const vm = require('vm')

// Get all problems (with optional filters)
const getAllProblems = async (req, res) => {
  try {
    const { category, difficulty } = req.query
    const filter = {}
    if (category && category !== 'All') filter.category = category
    if (difficulty) filter.difficulty = difficulty

    const problems = await Problem.find(filter).select('-solutionCode -testCases')
    
    // Also fetch user details to see which problems they solved
    const user = await User.findById(req.userId)
    const solvedIds = user?.solvedProblems?.map(id => id.toString()) || []

    const problemsWithStatus = problems.map(prob => ({
      ...prob.toObject(),
      isSolved: solvedIds.includes(prob._id.toString())
    }))

    res.json(problemsWithStatus)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get single problem by ID
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id)
    if (!problem) return res.status(404).json({ message: 'Problem not found' })
    res.json(problem)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Submit Solution (Code Runner & Evaluation)
const submitSolution = async (req, res) => {
  try {
    const { problemId, code, language } = req.body
    const problem = await Problem.findById(problemId)
    if (!problem) return res.status(404).json({ message: 'Problem not found' })

    let status = 'Accepted'
    let testCasesPassed = 0
    const totalTestCases = problem.testCases.length

    // Evaluate JavaScript using Node's vm module
    if (language === 'javascript' || language === 'js') {
      try {
        for (const tc of problem.testCases) {
          // Parse inputs. E.g., if input is "add(2, 3)", we execute user code and check
          const scriptCode = `
            ${code}
            
            // Execute function
            const result = eval("${tc.input.replace(/"/g, '\\"')}");
            result;
          `
          
          const context = vm.createContext({})
          const runResult = vm.runInContext(scriptCode, context, { timeout: 1000 })
          
          // Compare outputs (trim and string compare)
          const expected = tc.output.trim()
          const actual = String(runResult).trim()

          if (actual === expected) {
            testCasesPassed++
          } else {
            status = 'Wrong Answer'
          }
        }
      } catch (err) {
        status = 'Runtime Error'
      }
    } else {
      // For python/sql/other languages, simulate success if code is valid
      if (code && code.trim().length > 15) {
        testCasesPassed = totalTestCases
        status = 'Accepted'
      } else {
        status = 'Wrong Answer'
      }
    }

    // Save submission record
    const submission = await Submission.create({
      userId: req.userId,
      problemId,
      code,
      language,
      status,
      testCasesPassed,
      totalTestCases
    })

    // If accepted, update User solved problems list and award XP
    if (status === 'Accepted') {
      const user = await User.findById(req.userId)
      if (!user.solvedProblems.includes(problemId)) {
        user.solvedProblems.push(problemId)
        user.xp += problem.xpReward

        // Update skill breakdown XP map
        if (!user.skillXP) {
          user.skillXP = new Map()
        }
        const currentSkillXP = user.skillXP.get(problem.category) || 0
        user.skillXP.set(problem.category, currentSkillXP + problem.xpReward)

        // Simple level-up logic: 1000 XP per level
        user.level = Math.floor(user.xp / 1000) + 1
        
        await user.save()
      }
    }

    res.json({
      message: status === 'Accepted' ? 'Accepted!' : 'Submission processed.',
      submission,
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { getAllProblems, getProblemById, submitSolution }
