const { prisma } = require('../config/prisma');

const registerUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required.' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
            },
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error during registration.' });
    }
};

const getUserAnalysis = async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: 'user_id query parameter is required.' });
        }

        // Fetch user's quiz attempts
        const attempts = await prisma.quizAttempt.findMany({
            where: { user_id },
            include: { topic: true }
        });

        if (attempts.length === 0) {
            return res.status(404).json({ message: 'No attempts found for this user.' });
        }

        const totalAttempts = attempts.length;
        const averageScore = attempts.reduce((acc, attempt) => acc + attempt.score, 0) / totalAttempts;

        let weakConcepts = [];
        attempts.forEach(attempt => {
            if (attempt.weak_concepts_identified) {
                // Assuming comma-separated string based on previous DB records
                const concepts = attempt.weak_concepts_identified.split(',').map(c => c.trim());
                weakConcepts.push(...concepts);
            }
        });

        // Get unique weak concepts
        weakConcepts = [...new Set(weakConcepts)];

        res.status(200).json({
            user_id,
            total_attempts: totalAttempts,
            average_score: parseFloat(averageScore.toFixed(2)),
            weak_concepts: weakConcepts,
            history: attempts.map(a => ({
                attempt_id: a.attempt_id,
                topic: a.topic.subject_id, // We don't have topic_name directly, subject_id or mapping
                score: a.score,
                weak_concepts_identified: a.weak_concepts_identified
            }))
        });

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Internal server error while fetching analysis.' });
    }
};

module.exports = {
    registerUser,
    getUserAnalysis
};
