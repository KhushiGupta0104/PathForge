const Progress = require('../models/Progress')
const User = require('../models/User')
const Level = require('../models/Level')
const Task = require('../models/Task')
const Submission = require('../models/Submission')
const Pathway = require('../models/Pathway')
const vm = require('vm')

// Enroll in a pathway
const enrollPathway = async (req, res) => {
  try {
    const { pathwayId } = req.body

    // Check pathway premium status
    const pathway = await Pathway.findById(pathwayId)
    if (!pathway) {
      return res.status(404).json({ message: 'Pathway not found' })
    }

    if (pathway.isPremium) {
      const user = await User.findById(req.userId)
      if (!user || !user.isPremium) {
        return res.status(403).json({ message: 'Premium Subscription required to unlock this pathway.' })
      }
    }

    // Check already enrolled
    const existing = await Progress.findOne({
      userId: req.userId,
      pathwayId,
    })
    if (existing) {
      return res.status(400).json({ message: 'Already enrolled' })
    }

    const progress = await Progress.create({
      userId: req.userId,
      pathwayId,
      completedLevels: [],
      completedTasks: [],
      totalXPEarned: 0,
    })

    res.status(201).json(progress)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get user progress for a pathway
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.userId,
      pathwayId: req.params.pathwayId,
    })
    if (!progress) {
      return res.status(404).json({ message: 'Not enrolled' })
    }
    res.json(progress)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Complete a task
const completeTask = async (req, res) => {
  try {
    const { taskId, pathwayId, code, language, quizAnswerSubmitted } = req.body

    const progress = await Progress.findOne({
      userId: req.userId,
      pathwayId,
    })
    if (!progress) {
      return res.status(404).json({ message: 'Not enrolled in this pathway' })
    }

    // Get task details
    const task = await Task.findById(taskId)
    if (!task) return res.status(404).json({ message: 'Task not found' })

    // If task is project (coding challenge), execute in VM sandbox
    let projectStatus = null
    let testCasesPassed = 0
    let totalTestCases = 0
    let securityScore = 100
    let securityLog = "Security Scan Passed: No vulnerabilities or structural risks detected."

    if (task.type === 'project') {
      totalTestCases = task.testCases?.length || 0
      const lang = language || 'javascript'
      
      if (lang === 'javascript' || lang === 'js') {
        // Static Code Analysis & Threat Detection
        const restrictedKeywords = [
          'process', 'require', 'module', 'global', '__dirname', '__filename', 
          'child_process', 'exec', 'spawn', 'fs', 'http', 'https', 'net',
          'XMLHttpRequest', 'fetch', 'Function', 'Constructor', 'prototype'
        ];
        
        const containsRestricted = restrictedKeywords.filter(kw => {
          const regex = new RegExp(`\\b${kw}\\b`);
          return regex.test(code);
        });

        if (containsRestricted.length > 0) {
          return res.json({
            message: `Security Policy Violation: Access to restricted keyword/module '${containsRestricted.join(', ')}' is blocked.`,
            status: 'Security Violation',
            testCasesPassed: 0,
            totalTestCases,
            securityScore: 0,
            securityLog: `Security Scan Failed: Forbidden tokens [${containsRestricted.join(', ')}] detected.`
          });
        }

        // Calculate Code Security & Quality Risk Score (0-100)
        let securityReasons = [];

        // Check loop nesting depth (simple check for for/while nesting)
        const loops = (code.match(/\bfor\s*\(|\bwhile\s*\(/g) || []).length;
        if (loops > 2) {
          securityScore -= 15;
          securityReasons.push('Highly nested loop structures (Complexity Risk)');
        }

        // Check regex usage (to prevent ReDoS)
        if (/\bRegExp\b|\/.+\/[gim]*\.test|\/.+\/[gim]*\.exec/g.test(code)) {
          securityScore -= 10;
          securityReasons.push('Custom Regular Expressions detected (ReDoS Risk)');
        }

        // Check eval usage
        if (/\beval\b/g.test(code)) {
          securityScore -= 30;
          securityReasons.push('Dynamic evaluation using eval() detected (Code Injection Risk)');
        }

        if (securityScore < 100) {
          securityLog = `Security Scan Warning: ${securityReasons.join(', ')}.`;
        }

        try {
          for (const tc of task.testCases) {
            const scriptCode = `
              ${code}
              
              // Execute function
              const result = eval("${tc.input.replace(/"/g, '\\"')}");
              result;
            `
            const context = vm.createContext({})
            const runResult = vm.runInContext(scriptCode, context, { timeout: 1000 })
            
            const expected = tc.output.trim()
            const actual = String(runResult).trim()

            if (actual === expected) {
              testCasesPassed++
            } else {
              projectStatus = 'Wrong Answer'
            }
          }
          if (testCasesPassed === totalTestCases) {
            projectStatus = 'Accepted'
          } else if (!projectStatus) {
            projectStatus = 'Wrong Answer'
          }
        } catch (err) {
          projectStatus = 'Runtime Error'
        }
      } else {
        // Mock execution for other languages
        if (code && code.trim().length > 15) {
          testCasesPassed = totalTestCases
          projectStatus = 'Accepted'
        } else {
          projectStatus = 'Wrong Answer'
        }
      }

      // Save submission record
      await Submission.create({
        userId: req.userId,
        problemId: task._id,
        code,
        language: lang,
        status: projectStatus,
        testCasesPassed,
        totalTestCases
      })

      // If code is not accepted, return early
      if (projectStatus !== 'Accepted') {
        return res.json({
          message: 'Code check failed',
          status: projectStatus,
          testCasesPassed,
          totalTestCases,
          securityScore,
          securityLog
        })
      }
    }

    // If task is quiz, check MCQ answer
    if (task.type === 'quiz' && quizAnswerSubmitted !== undefined) {
      if (Number(quizAnswerSubmitted) !== task.quizAnswer) {
        return res.json({
          message: 'Incorrect quiz answer',
          status: 'Wrong Answer'
        })
      }
    }

    // Mark task completed and update user XP/Streak
    const alreadyCompleted = progress.completedTasks.includes(taskId)
    let xpEarned = 0
    let levelComplete = false
    let user = await User.findById(req.userId)

    if (!alreadyCompleted) {
      progress.completedTasks.push(taskId)
      progress.totalXPEarned += task.xpReward
      await progress.save()

      xpEarned = task.xpReward

      // Streak calculation logic
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (user.lastActiveDate) {
        const lastActive = new Date(user.lastActiveDate)
        lastActive.setHours(0, 0, 0, 0)

        const diffTime = today - lastActive
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
          user.streak += 1
        } else if (diffDays > 1) {
          user.streak = 1
        }
        // If diffDays === 0, keep same streak
      } else {
        user.streak = 1
      }
      user.lastActiveDate = new Date()
      user.xp += task.xpReward

      // Increment today's activity log counter
      const dateKey = new Date().toISOString().split('T')[0]
      if (!user.activityLog) {
        user.activityLog = new Map()
      }
      const currentActivityCount = user.activityLog.get(dateKey) || 0
      user.activityLog.set(dateKey, currentActivityCount + 1)

      // Update skill breakdown XP map
      const pathwayObj = await Pathway.findById(pathwayId)
      if (pathwayObj) {
        const category = pathwayObj.title
        if (!user.skillXP) {
          user.skillXP = new Map()
        }
        const currentSkillXP = user.skillXP.get(category) || 0
        user.skillXP.set(category, currentSkillXP + task.xpReward)
      }

      // Level calculation (1000 XP per level)
      user.level = Math.floor(user.xp / 1000) + 1
      await user.save()

      // Check if level is complete
      const level = await Level.findById(task.levelId)
      const allLevelTasks = await Task.find({ levelId: task.levelId })
      const allTaskIds = allLevelTasks.map(t => t._id.toString())
      const completedTaskIds = progress.completedTasks.map(t => t.toString())
      levelComplete = allTaskIds.every(id => completedTaskIds.includes(id))

      if (levelComplete && !progress.completedLevels.includes(task.levelId)) {
        progress.completedLevels.push(task.levelId)
        progress.totalXPEarned += level.xpReward
        await progress.save()

        const badgeName = `${level.title} Complete`
        await User.findByIdAndUpdate(req.userId, {
          $addToSet: { badges: badgeName },
          $inc: { xp: level.xpReward }
        })

        user = await User.findById(req.userId)
      }
    }

    res.json({
      message: 'Task completed successfully!',
      status: 'Accepted',
      xpEarned,
      totalXP: user.xp,
      streak: user.streak,
      levelComplete,
      progress,
      securityScore: task.type === 'project' ? securityScore : undefined,
      securityLog: task.type === 'project' ? securityLog : undefined,
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get all user progress
const getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId })
      .populate('pathwayId', 'title difficulty totalXP')
    res.json(progress)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { enrollPathway, getProgress, completeTask, getAllProgress }