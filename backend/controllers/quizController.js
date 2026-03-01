const { generateQuiz, analyzeAttempt } = require('../services/quizGenerator');
const { prisma } = require('../config/prisma');

const getQuiz = async (req, res) => {
    try {
        const topic = req.query.topic || 'Binary Search';
        const quiz = await generateQuiz(topic);
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const attemptQuiz = async (req, res) => {
    try {
        const { user_id, topic_id, topic_name, questions_and_answers } = req.body;

        if (!user_id || !topic_id || !topic_name || !questions_and_answers) {
            return res.status(400).json({ error: 'Missing required fields (user_id, topic_id, topic_name, questions_and_answers)' });
        }

        // 1. Calculate Score
        const totalQuestions = questions_and_answers.length;
        const correctAnswers = questions_and_answers.filter(qa => qa.was_correct).length;
        const score = Math.round((correctAnswers / totalQuestions) * 100);

        // 2. Identify Incorrect Answers for AI
        const incorrectAnswers = questions_and_answers
            .filter(qa => !qa.was_correct)
            .map(qa => ({
                question: qa.question,
                concept_tag: qa.concept_tag
            }));

        // 3. Run AI Analysis
        let weak_concepts_identified = "None";
        if (incorrectAnswers.length > 0) {
            weak_concepts_identified = await analyzeAttempt(topic_name, incorrectAnswers);
        }

        // 4. Save to Database
        const newAttempt = await prisma.quizAttempt.create({
            data: {
                user_id,
                topic_id,
                score,
                weak_concepts_identified
            }
        });

        res.status(201).json({
            message: 'Quiz attempt analyzed and recorded successfully',
            score,
            weak_concepts_identified,
            attempt: newAttempt
        });
    } catch (error) {
        console.error('Quiz attempt error:', error);
        res.status(500).json({ error: 'Internal server error while analyzing attempt' });
    }
};

module.exports = {
    getQuiz,
    attemptQuiz
};
