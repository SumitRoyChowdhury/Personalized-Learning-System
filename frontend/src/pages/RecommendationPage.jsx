import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import styles from './RecommendationPage.module.css';

export default function RecommendationPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get both topicName and topicId from the URL
    const topicName = searchParams.get('topicName') || 'Topic';
    const topicId = searchParams.get('topicId');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            setError(null);
            try {
                // Call the actual backend API with topic parameters
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/recommendation`, {
                    params: {
                        topic_id: topicId,
                        topic_name: topicName
                    }
                });

                // Set the recommendations array with the response from Youtube
                const videos = response.data?.recommendations || [];
                setRecommendations(Array.isArray(videos) ? videos : []);
            } catch (err) {
                console.error("Failed to fetch recommendations:", err);
                // Enhanced user error handling
                if (!err.response && String(err.message).includes("Network Error")) {
                    setError("Backend Server is not running. Please start it on port 5001.");
                } else if (err.response?.status === 500) {
                    setError("Backend Error 500: Missing YouTube API Key. Add it to your backend .env file!");
                } else {
                    setError("Could not load recommendations at this time. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (topicId) {
            fetchRecommendations();
        } else {
            setLoading(false);
            setError("No topic selected.");
        }
    }, [topicId, topicName]);

    const handleWatchVideo = (url) => {
        if (url) {
            // Open video URL provided by the backend in a new browser tab
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            alert("No URL provided for this video.");
        }
    };

    return (
        <div className={styles.recommendationPage}>
            <header className={styles.header}>
                <button className="btn-secondary" onClick={() => navigate(-1)} style={{ alignSelf: 'flex-start' }}>
                    <ArrowLeft size={18} style={{ marginRight: '8px', display: 'inline' }} /> Back
                </button>
                <h1 className="page-title" style={{ marginTop: '1rem' }}>Level Up: {topicName}</h1>
                <p style={{ color: 'var(--text-muted)' }}>We think these resources will help you master the key concepts.</p>
            </header>

            {loading ? (
                <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
                    <div className="loader"></div>
                </div>
            ) : error ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--electric-pink)' }}>
                    <h3>{error}</h3>
                    <button className="btn-secondary" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>Return to Dashboard</button>
                </div>
            ) : recommendations.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <h3>No recommendations found for this topic yet.</h3>
                </div>
            ) : (
                <div className={styles.gridContainer}>
                    {recommendations.map((video, idx) => {
                        // Extract YT details manually as the DB schema only has resource_link based on our inspection
                        const vMatch = video.resource_link?.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
                        const ytId = vMatch ? vMatch[1] : '';
                        const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80";

                        return (
                            <motion.div
                                key={video.resource_id || idx}
                                className={`glass-panel ${styles.videoCard}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                onClick={() => handleWatchVideo(video.resource_link)}
                            >
                                <div className={styles.thumbnailWrapper}>
                                    <img src={thumbUrl} alt="Tutorial Thumbnail" className={styles.thumbnail} />
                                    <div className={styles.durationBadge}>New</div>
                                    <div className={styles.playOverlay}>
                                        <Play size={48} fill="white" color="white" />
                                    </div>
                                </div>

                                <div className={styles.cardInfo}>
                                    <h3 className={styles.videoTitle}>{topicName} Video Tutorial</h3>
                                    <p className={styles.channelName}>{video.resource_type || "Source: YouTube"}</p>
                                    <button
                                        className="btn-primary"
                                        style={{ width: '100%', marginTop: '1rem', padding: '10px', fontSize: '1rem' }}
                                        onClick={(e) => {
                                            // Prevents card wrapper onClick from triggering twice
                                            e.stopPropagation();
                                            handleWatchVideo(video.resource_link);
                                        }}
                                    >
                                        Watch Now
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
