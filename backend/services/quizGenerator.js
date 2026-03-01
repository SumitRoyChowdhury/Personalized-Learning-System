const { Groq } = require('groq-sdk');

const getAIKey = () => {
    const keys = [
        process.env.AI_API_KEY_1,
        process.env.AI_API_KEY_2,
        process.env.AI_API_KEY_3
    ];
    return keys[Math.floor(Math.random() * keys.length)];
};

const generateQuiz = async (topic = 'Binary Search') => {
    const key = getAIKey();
    const groq = new Groq({ apiKey: key });

    const prompt = `Generate a 5-question multiple-choice quiz on the topic of "${topic}". Focus on conceptual understanding. Return the response in strictly JSON format.
Structure the JSON exact format like this:
{
  "quiz": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": "string (exactly matches one option)",
      "explanation": "string",
      "concept_tag": "string (e.g. Time Complexity, Edge Cases, Basics)"
    }
  ]
}`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: 'json_object' }
        });

        return JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
    } catch (err) {
        console.error('Error generating quiz:', err.message);
        throw new Error('Failed to generate quiz');
    }
};

const analyzeAttempt = async (topicName, incorrectAnswers) => {
    if (!incorrectAnswers || incorrectAnswers.length === 0) {
        return "None"; // Perfect score
    }

    const key = getAIKey();
    const groq = new Groq({ apiKey: key });

    const prompt = `Analyze a student's incorrect answers on a "${topicName}" quiz. 
Here are the questions they got wrong along with the concepts tested:
${JSON.stringify(incorrectAnswers, null, 2)}

Identify the core weak concepts the student is struggling with. Return exactly a comma-separated list of 1 to 3 short concept names (e.g., "Time Complexity, Array Bounds"). Do not include any extra text.`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            model: 'llama-3.3-70b-versatile',
        });

        return chatCompletion.choices[0]?.message?.content?.trim() || "General understanding";
    } catch (err) {
        console.error('Error analyzing attempt:', err.message);
        return "Unknown concepts"; // Fallback
    }
};

module.exports = {
    generateQuiz,
    analyzeAttempt
};
