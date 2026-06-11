const Progress = require('../models/Progress')
const User = require('../models/User')
const Level = require('../models/Level')
const Task = require('../models/Task')

// Enroll in a pathway
const enrollPathway = async (req, res) => {
  try {
    const { pathwayId } = req.body

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
    const { taskId, pathwayId } = req.body

    const progress = await Progress.findOne({
      userId: req.userId,
      pathwayId,
    })
    if (!progress) {
      return res.status(404).json({ message: 'Not enrolled in this pathway' })
    }

    // Already completed?
    if (progress.completedTasks.includes(taskId)) {
      return res.status(400).json({ message: 'Task already completed' })
    }

    // Get task XP
    const task = await Task.findById(taskId)
    if (!task) return res.status(404).json({ message: 'Task not found' })

    // Add task to completed
    progress.completedTasks.push(taskId)
    progress.totalXPEarned += task.xpReward
    await progress.save()

    // Update user XP
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $inc: { xp: task.xpReward } },
      { new: true }
    )

    // Check if level complete
    const level = await Level.findById(task.levelId)
    const allLevelTasks = await Task.find({ levelId: task.levelId })
    const allTaskIds = allLevelTasks.map(t => t._id.toString())
    const completedTaskIds = progress.completedTasks.map(t => t.toString())
    const levelComplete = allTaskIds.every(id => completedTaskIds.includes(id))

    if (levelComplete && !progress.completedLevels.includes(task.levelId)) {
      progress.completedLevels.push(task.levelId)
      progress.totalXPEarned += level.xpReward
      await progress.save()

      // Award badge
      const badgeName = `${level.title} Complete`
      await User.findByIdAndUpdate(req.userId, {
        $addToSet: { badges: badgeName }
      })
    }

    res.json({
      message: 'Task completed!',
      xpEarned: task.xpReward,
      totalXP: user.xp,
      levelComplete,
      progress,
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