const Pathway = require('../models/Pathway')
const Level = require('../models/Level')
const Task = require('../models/Task')

// GET all pathways
const getAllPathways = async (req, res) => {
  try {
    const pathways = await Pathway.find()
    res.json(pathways)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// GET single pathway with levels
const getPathwayById = async (req, res) => {
  try {
    const pathway = await Pathway.findById(req.params.id)
    if (!pathway) return res.status(404).json({ message: 'Pathway not found' })

    const levels = await Level.find({ pathwayId: req.params.id }).sort({ levelNumber: 1 })
    res.json({ pathway, levels })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// GET single level with tasks
const getLevelById = async (req, res) => {
  try {
    const level = await Level.findById(req.params.levelId)
    if (!level) return res.status(404).json({ message: 'Level not found' })

    const tasks = await Task.find({ levelId: req.params.levelId })
    res.json({ level, tasks })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { getAllPathways, getPathwayById, getLevelById }