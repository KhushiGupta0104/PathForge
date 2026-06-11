const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Pathway = require('./models/Pathway')
const Level = require('./models/Level')
const Task = require('./models/Task')

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected!')

    // Clear existing data
    await Pathway.deleteMany()
    await Level.deleteMany()
    await Task.deleteMany()
    console.log('Cleared existing data!')

    // Create pathway
    const pathway = await Pathway.create({
      title: 'Frontend Developer',
      description: 'Master frontend development with React, TypeScript and modern tooling',
      difficulty: 'Beginner',
      estimatedMonths: 6,
      totalXP: 5000,
      tags: ['React', 'TypeScript', 'Tailwind'],
      icon: 'Code',
    })
    console.log('Pathway created!')

    // Create levels
    const level1 = await Level.create({
      pathwayId: pathway._id,
      title: 'Programming Basics',
      focus: 'Python / C',
      levelNumber: 1,
      xpReward: 500,
    })

    const level2 = await Level.create({
      pathwayId: pathway._id,
      title: 'DSA Basics',
      focus: 'Arrays, Loops',
      levelNumber: 2,
      xpReward: 750,
    })

    const level3 = await Level.create({
      pathwayId: pathway._id,
      title: 'Web Basics',
      focus: 'HTML, CSS',
      levelNumber: 3,
      xpReward: 600,
    })
    console.log('Levels created!')

    // Create tasks for level 1
    await Task.create([
      {
        levelId: level1._id,
        title: 'Introduction to Programming',
        type: 'video',
        description: 'Watch this video to understand programming basics',
        content: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
        xpReward: 50,
      },
      {
        levelId: level1._id,
        title: 'Programming Basics Quiz',
        type: 'quiz',
        description: 'Test your understanding of programming basics',
        xpReward: 100,
        quizOptions: ['Compiler', 'Interpreter', 'Both', 'Neither'],
        quizAnswer: 2,
      },
      {
        levelId: level1._id,
        title: 'Build a Calculator',
        type: 'project',
        description: 'Build a simple calculator using Python or C',
        xpReward: 200,
      },
    ])

    // Create tasks for level 2
    await Task.create([
      {
        levelId: level2._id,
        title: 'Introduction to Arrays',
        type: 'video',
        description: 'Learn about arrays and how to use them',
        content: 'https://www.youtube.com/watch?v=QFrJQq6Iox8',
        xpReward: 50,
      },
      {
        levelId: level2._id,
        title: 'Arrays Quiz',
        type: 'quiz',
        description: '10 MCQ questions on arrays',
        xpReward: 100,
        quizOptions: ['0', '1', '-1', 'None'],
        quizAnswer: 0,
      },
      {
        levelId: level2._id,
        title: 'Build a Todo List',
        type: 'project',
        description: 'Create a todo list using arrays',
        xpReward: 200,
      },
    ])

    console.log('Tasks created!')
    console.log('Seed complete! 🔥')
    process.exit(0)

  } catch (err) {
    console.log('Seed error:', err)
    process.exit(1)
  }
}

seedData()