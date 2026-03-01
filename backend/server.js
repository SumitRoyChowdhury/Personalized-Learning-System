require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { prisma, connectDB } = require('./config/prisma');

// Connect to the DB
connectDB();
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});

app.use('/api/quiz', quizRoutes);
app.use('/api', userRoutes);
app.use('/api', resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
