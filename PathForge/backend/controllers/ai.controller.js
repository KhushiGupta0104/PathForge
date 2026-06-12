const Task = require('../models/Task')
const https = require('https')

const callGemini = (apiKey, systemInstruction, userPrompt) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      contents: [{
        parts: [{ text: `${systemInstruction}\n\nUser Question:\n${userPrompt}` }]
      }]
    })

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          // If status code is not 200, log error
          if (res.statusCode !== 200) {
            console.error('Gemini API returned status code:', res.statusCode, data)
            return resolve('I encountered an API error. Please verify your GEMINI_API_KEY.')
          }
          const parsed = JSON.parse(data)
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
          if (text) {
            resolve(text)
          } else {
            resolve('I could not analyze this. Please check if your code has invalid characters and try again.')
          }
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', (e) => {
      reject(e)
    })

    req.write(postData)
    req.end()
  })
}

const generateFallbackResponse = (task, code, messageType) => {
  if (messageType === 'hint') {
    return `💡 **[AI Tutor Offline Mode Hint]**
To solve **"${task.title}"**:
1. Check the parameters. For example, make sure you correctly return the expected value format described in the description.
2. In your editor:
   \`\`\`javascript
   ${code.trim() ? code.substring(0, 180) + '...' : '// Start writing code'}
   \`\`\`
3. Verify that you don't have syntax errors (like missing brackets or unmatched curly braces).
4. Run your code in the console to inspect outputs.

*Note: To enable live API responses, add \`GEMINI_API_KEY\` in your \`backend/.env\` file.*`
  } else if (messageType === 'explain-error') {
    return `🔍 **[AI Tutor Offline Mode Code Review]**
Analyzing your code structure for **"${task.title}"**:
* Make sure you aren't hardcoding outputs to match a single test case. The validator tests multiple random parameters.
* Check if your functions are named exactly as shown in the starting code template.
* Verify that you use the correct return statement (\`return ...\`) to send output back to the evaluator.

*Note: To enable live API responses, add \`GEMINI_API_KEY\` in your \`backend/.env\` file.*`
  } else {
    return `🤖 **[AI Tutor Offline Mode]**
I see your custom question. Currently, the server is running in offline fallback mode because no \`GEMINI_API_KEY\` was found in your environment configuration.

To unlock live chat and custom code analysis:
1. Add this line to your \`backend/.env\`:
   \`\`\`env
   GEMINI_API_KEY=your_google_gemini_api_key
   \`\`\`
2. Restart your backend server.
3. Type any question, and I will guide you through this task!`
  }
}

const getAITutorResponse = async (req, res) => {
  try {
    const { taskId, code, messageType, userMessage } = req.body
    const task = await Task.findById(taskId)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // If key is missing, return fallback mock response
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      const fallback = generateFallbackResponse(task, code, messageType)
      return res.json({ response: fallback })
    }

    // Context instructions for LLM prompt
    const systemInstruction = `You are a friendly, encouraging AI Technical Tutor on PathForge.
Your goal is to guide the student to solve the coding task: "${task.title}".
Here is the task details and description:
"${task.description}"

Here is the student's current workspace code:
\`\`\`javascript
${code || '// No code typed yet'}
\`\`\`

Test cases that the code must satisfy:
${JSON.stringify(task.testCases)}

IMPORTANT INSTRUCTION: Do NOT give the student the copy-paste solution code. Instead, give them strategic hints, point out bugs/syntax issues, explain programming concepts, or provide pseudocode so they learn how to fix the problem themselves.`

    let prompt = ''
    if (messageType === 'hint') {
      prompt = 'Please give me a conceptual hint on how to approach this task.'
    } else if (messageType === 'explain-error') {
      prompt = 'Analyze my code above and explain if there are logical bugs, syntax errors, or if I am failing test cases.'
    } else {
      prompt = userMessage || 'How can I solve this challenge?'
    }

    const aiResponse = await callGemini(apiKey, systemInstruction, prompt)
    res.json({ response: aiResponse })

  } catch (err) {
    res.status(500).json({ message: 'AI Tutor server error', error: err.message })
  }
}

module.exports = { getAITutorResponse }
