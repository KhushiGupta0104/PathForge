const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Pathway = require('./models/Pathway')
const Level = require('./models/Level')
const Task = require('./models/Task')
const Progress = require('./models/Progress')
const Submission = require('./models/Submission')
const User = require('./models/User')

dotenv.config()

const pathwaysData = [
  {
    title: 'Frontend Developer',
    description: 'Master HTML, CSS, React, and layout design to build beautiful, responsive web applications.',
    difficulty: 'Beginner',
    estimatedMonths: 3,
    totalXP: 1500,
    tags: ['React', 'CSS', 'JavaScript', 'HTML'],
    icon: 'Layout',
    levels: [
      {
        title: 'CSS Flexbox & Layouts',
        focus: 'Master element alignment and positioning',
        levelNumber: 1,
        xpReward: 200,
        tasks: [
          {
            title: 'Flexbox Crash Course',
            type: 'video',
            description: 'Watch this comprehensive video to learn all about display flex, justify-content, and align-items.',
            content: 'https://www.youtube.com/embed/JJ_P7d607sY',
            xpReward: 50
          },
          {
            title: 'Flexbox Alignment Quiz',
            type: 'quiz',
            description: 'Test your understanding of primary and cross axes inside CSS Flexbox.',
            quizOptions: [
              'justify-content controls horizontal axis, align-items controls vertical axis (in row layout)',
              'justify-content controls vertical axis, align-items controls horizontal axis (in row layout)',
              'both control horizontal alignment',
              'neither controls alignment'
            ],
            quizAnswer: 0,
            xpReward: 50
          },
          {
            title: 'CSS Flexbox Centering',
            type: 'project',
            description: 'Centering elements is the most famous CSS challenge. Write a function `getCenterStyles()` that returns an object containing the three CSS Flexbox properties required to center a child element both horizontally and vertically inside a parent container.\n\n### Expected returned object keys:\n* `display`\n* `justifyContent`\n* `alignItems`',
            starterCode: `function getCenterStyles() {
  // Return CSS flexbox properties to center an element
  return {
    
  };
}`,
            solutionCode: `function getCenterStyles() {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
}`,
            testCases: [
              { input: 'getCenterStyles().display', output: 'flex' },
              { input: 'getCenterStyles().justifyContent', output: 'center' },
              { input: 'getCenterStyles().alignItems', output: 'center' }
            ],
            xpReward: 100
          },
          {
            title: 'DOM Class Manipulator',
            type: 'project',
            description: 'Working with vanilla JS requires manipulating element classes safely. Write a function `addClass(element, className)` that appends a class name to an element\'s `className` string.\n* Ensure there are no duplicate class names.\n* Ensure spacing is correct.',
            starterCode: `function addClass(element, className) {
  // Append class name to element.className safely
  
}`,
            solutionCode: `function addClass(element, className) {
  const classes = element.className ? element.className.trim().split(/\\s+/) : [];
  if (!classes.includes(className)) {
    classes.push(className);
  }
  return classes.join(' ');
}`,
            testCases: [
              { input: 'addClass({ className: "btn" }, "btn-primary")', output: 'btn btn-primary' },
              { input: 'addClass({ className: "btn active" }, "active")', output: 'btn active' },
              { input: 'addClass({ className: "" }, "container")', output: 'container' }
            ],
            xpReward: 100
          }
        ]
      },
      {
        title: 'React Hooks & State',
        focus: 'Learn state management and component lifecycle hooks',
        levelNumber: 2,
        xpReward: 300,
        tasks: [
          {
            title: 'React Custom Hooks Explained',
            type: 'video',
            description: 'Learn how custom hooks enable clean, reusable state logic in React.',
            content: 'https://www.youtube.com/embed/J-g9I3gQD94',
            xpReward: 50
          },
          {
            title: 'React Hooks Rules Quiz',
            type: 'quiz',
            description: 'Test your knowledge of rules of hooks.',
            quizOptions: [
              'Hooks can be called inside loops or conditional statements',
              'Hooks can only be called from React function components or custom hooks',
              'Hooks can be called from standard vanilla JS helper functions',
              'None of the above'
            ],
            quizAnswer: 1,
            xpReward: 50
          },
          {
            title: 'React Custom Hook: useToggle',
            type: 'project',
            description: 'Custom hooks are the building blocks of reusable state in React. Implement a simulated toggle hook function `useToggle(initialValue)` that takes an initial boolean value (default `false`) and returns an array containing:\n1. A getter function returning the current state value.\n2. A toggle function that flips the state between `true` and `false`.',
            starterCode: `function useToggle(initialValue = false) {
  // Return [getterFunction, toggleFunction]
  
}`,
            solutionCode: `function useToggle(initialValue = false) {
  let state = initialValue;
  const getValue = () => state;
  const toggle = () => { state = !state; };
  return [getValue, toggle];
}`,
            testCases: [
              { input: '(function() { const [val, toggle] = useToggle(false); toggle(); return val(); })()', output: 'true' },
              { input: '(function() { const [val, toggle] = useToggle(true); toggle(); toggle(); return val(); })()', output: 'true' },
              { input: '(function() { const [val, toggle] = useToggle(false); return val(); })()', output: 'false' }
            ],
            xpReward: 100
          }
        ]
      }
    ]
  },
  {
    title: 'Backend Developer',
    description: 'Build robust web servers, craft REST APIs, query databases, and manage authentications.',
    difficulty: 'Intermediate',
    estimatedMonths: 4,
    totalXP: 2000,
    tags: ['Node.js', 'Express', 'SQL', 'MongoDB'],
    icon: 'Database',
    levels: [
      {
        title: 'Express APIs & URL Handling',
        focus: 'Understand routing and request inputs parsing',
        levelNumber: 1,
        xpReward: 200,
        tasks: [
          {
            title: 'URL Query Parameters Guide',
            type: 'video',
            description: 'Learn how web servers process incoming request variables in standard URLs.',
            content: 'https://www.youtube.com/embed/yQzZ8E54R9k',
            xpReward: 50
          },
          {
            title: 'Query String Quiz',
            type: 'quiz',
            description: 'How are multiple query string parameters joined together in a standard URL query string?',
            quizOptions: [
              'Using comma (,)',
              'Using semicolon (;)',
              'Using ampersand (&)',
              'Using forward slash (/)'
            ],
            quizAnswer: 2,
            xpReward: 50
          },
          {
            title: 'URL Query Parameter Parser',
            type: 'project',
            description: 'Backend web servers (like Express/Node) frequently parse queries from request URLs. Write a function `parseQueryParams(url)` that extracts the query string parameters from a URL and returns them as a key-value object.',
            starterCode: `function parseQueryParams(url) {
  // Return parsed query parameters object
  
}`,
            solutionCode: `function parseQueryParams(url) {
  const params = {};
  const queryStart = url.indexOf('?');
  if (queryStart === -1) return params;
  const queryStr = url.substring(queryStart + 1);
  const pairs = queryStr.split('&');
  for (let pair of pairs) {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  }
  return params;
}`,
            testCases: [
              { input: 'JSON.stringify(parseQueryParams("https://api.com/users?role=admin&status=active"))', output: '{"role":"admin","status":"active"}' },
              { input: 'JSON.stringify(parseQueryParams("https://site.com/search?q=react"))', output: '{"q":"react"}' }
            ],
            xpReward: 100
          }
        ]
      }
    ]
  },
  {
    title: 'Cybersecurity',
    description: 'Learn to protect networks, perform vulnerability scanning, and secure systems against threats.',
    difficulty: 'Intermediate',
    estimatedMonths: 2,
    totalXP: 1000,
    tags: ['OWASP', 'XSS Prevention', 'Sanitization'],
    icon: 'Shield',
    levels: [
      {
        title: 'Input Validation',
        focus: 'Learn about XSS vulnerabilities and escaping inputs',
        levelNumber: 1,
        xpReward: 200,
        tasks: [
          {
            title: 'Understanding Cross-Site Scripting (XSS)',
            type: 'video',
            description: 'An introductory video on XSS vulnerabilities and how attackers exploit them.',
            content: 'https://www.youtube.com/embed/EoaDgUpU9N8',
            xpReward: 50
          },
          {
            title: 'XSS Mitigation Quiz',
            type: 'quiz',
            description: 'Which is the most effective way to prevent stored XSS?',
            quizOptions: [
              'Filtering scripts on client side only',
              'HTML-escaping and sanitizing inputs on the server',
              'Using HTTPS encryption',
              'Disabling JavaScript in user browser'
            ],
            quizAnswer: 1,
            xpReward: 50
          },
          {
            title: 'XSS HTML Input Sanitizer',
            type: 'project',
            description: 'Cross-Site Scripting (XSS) occurs when malicious HTML/scripts are injected into the page. Write a function `sanitizeHTML(inputString)` that escapes basic XSS attack vectors by converting special HTML characters (`<` and `>`) to their safe HTML entity representations.',
            starterCode: `function sanitizeHTML(inputString) {
  // Escape '<' and '>' characters
  
}`,
            solutionCode: `function sanitizeHTML(inputString) {
  return inputString.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}`,
            testCases: [
              { input: 'sanitizeHTML("<script>")', output: '&lt;script&gt;' },
              { input: 'sanitizeHTML("<div class=\\"danger\\">")', output: '&lt;div class="danger"&gt;' }
            ],
            xpReward: 100
          }
        ]
      }
    ]
  },
  {
    title: 'Full Stack Developer',
    description: 'Master frontend frameworks, backend servers, databases, and deployment pipelines to build complete web applications.',
    difficulty: 'Advanced',
    estimatedMonths: 6,
    totalXP: 1000,
    tags: ['React', 'Node.js', 'MongoDB', 'Docker'],
    icon: 'Layers',
    isPremium: true,
    levels: [
      {
        title: 'Full Stack Architecture',
        focus: 'Understand frontend-backend integration and cross-origin setup',
        levelNumber: 1,
        xpReward: 200,
        tasks: [
          {
            title: 'CORS Configuration Guide',
            type: 'video',
            description: 'Learn how Cross-Origin Resource Sharing (CORS) keeps client and server communications secure.',
            content: 'https://www.youtube.com/embed/tcLW5d0EPuA',
            xpReward: 50
          },
          {
            title: 'CORS Headers Quiz',
            type: 'quiz',
            description: 'Which HTTP header is required on the server response to allow client-side access from another origin?',
            quizOptions: [
              'Access-Control-Allow-Origin',
              'Access-Control-Allow-Methods',
              'Origin-Allow-Client',
              'Allow-Cross-Origin'
            ],
            quizAnswer: 0,
            xpReward: 50
          },
          {
            title: 'JSON API Response Wrapper',
            type: 'project',
            description: 'API servers must return consistent response envelopes. Write a function `wrapResponse(data, message)` that returns a standardized JSON object with `success: true`, `message`, and `data` fields.',
            starterCode: `function wrapResponse(data, message = "Success") {
  // Wrap response in standard envelope
  
}`,
            solutionCode: `function wrapResponse(data, message = "Success") {
  return {
    success: true,
    message,
    data
  };
}`,
            testCases: [
              { input: 'JSON.stringify(wrapResponse({ id: 1 }, "User loaded"))', output: '{"success":true,"message":"User loaded","data":{"id":1}}' },
              { input: 'wrapResponse(null).success', output: 'true' }
            ],
            xpReward: 100
          }
        ]
      }
    ]
  }
]

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected for seeding!')

    // Clear old curriculum collections
    await Pathway.deleteMany()
    await Level.deleteMany()
    await Task.deleteMany()
    await Progress.deleteMany()
    await Submission.deleteMany()

    // Reset user profiles progress
    await User.updateMany({}, {
      $set: { solvedProblems: [], xp: 0, level: 1, streak: 0, lastActiveDate: null, badges: [], skillXP: {} }
    })

    console.log('Cleared existing curriculum and reset user progress.')

    // Iterate pathways and insert levels + tasks
    for (const p of pathwaysData) {
      const pathwayObj = await Pathway.create({
        title: p.title,
        description: p.description,
        difficulty: p.difficulty,
        estimatedMonths: p.estimatedMonths,
        totalXP: p.totalXP,
        tags: p.tags,
        icon: p.icon,
        isPremium: p.isPremium || false
      })
      console.log(`Seeded Pathway: ${pathwayObj.title}`)

      for (const l of p.levels) {
        const levelObj = await Level.create({
          pathwayId: pathwayObj._id,
          title: l.title,
          focus: l.focus,
          levelNumber: l.levelNumber,
          xpReward: l.xpReward
        })
        console.log(`  Seeded Level: ${levelObj.title}`)

        for (const t of l.tasks) {
          await Task.create({
            levelId: levelObj._id,
            title: t.title,
            type: t.type,
            description: t.description,
            content: t.content,
            xpReward: t.xpReward,
            quizOptions: t.quizOptions,
            quizAnswer: t.quizAnswer,
            starterCode: t.starterCode,
            solutionCode: t.solutionCode,
            testCases: t.testCases
          })
        }
        console.log(`    Seeded ${l.tasks.length} Tasks for Level ${l.levelNumber}`)
      }
    }

    console.log('Seed completed successfully! 🔥')
    process.exit(0)
  } catch (err) {
    console.error('Seed error:', err)
    process.exit(1)
  }
}

seedData()