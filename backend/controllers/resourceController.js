const { prisma } = require('../config/prisma');
const axios = require('axios');

const getRecommendations = async (req, res) => {
    try {
        const { topic_id, topic_name } = req.query;

        if (!topic_id || !topic_name) {
            return res.status(400).json({ error: 'topic_id and topic_name query parameters are required.' });
        }

        // 1. Check if we already have curated resources for this topic in the DB
        let resources = await prisma.resource.findMany({
            where: { topic_id }
        });

        // 2. If we do, return them (Saving API quota)
        if (resources.length > 0) {
            return res.status(200).json({
                topic_id,
                source: 'database-cache',
                recommendations: resources
            });
        }

        // 3. If no resources found, search YouTube dynamically based on the topic_name
        console.log(`No cached resources found for ${topic_name}. Querying YouTube API...`);
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(topic_name + ' algorithm data structures tutorial')}&type=video&key=${YOUTUBE_API_KEY}&maxResults=2`;

        const ytResponse = await axios.get(searchUrl);
        const videos = ytResponse.data.items || [];

        const newResources = [];

        // 4. Transform and save pulled videos to Database dynamically
        for (const video of videos) {
            const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;

            try {
                // Try caching to DB for future use
                const newRes = await prisma.resource.create({
                    data: {
                        topic_id,
                        resource_type: 'YouTube',
                        resource_link: videoLink
                    }
                });
                newResources.push(newRes);
            } catch (dbErr) {
                // If the frontend provided a mock topic_id not yet strictly in the DB topics column (FK failure),
                // we safely skip caching but STILL serve the frontend the valid video payload!
                newResources.push({
                    resource_id: video.id.videoId,
                    topic_id,
                    resource_type: 'YouTube',
                    resource_link: videoLink
                });
            }
        }

        // 5. Build Final Response
        res.status(200).json({
            topic_id,
            source: 'youtube-api',
            recommendations: newResources
        });

    } catch (error) {
        console.error('Recommendation error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Internal server error while fetching recommendations.' });
    }
};

module.exports = {
    getRecommendations
};
