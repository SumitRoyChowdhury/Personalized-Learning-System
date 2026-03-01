import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Unlock, CheckCircle2, Trophy } from 'lucide-react';
import styles from './Dashboard.module.css';

const mockTopics = [
    { id: 't1', name: 'Binary Search', status: 'completed' },
    { id: 't2', name: 'Two Pointers', status: 'completed' },
    { id: 't3', name: 'Sliding Window', status: 'unlocked' },
    { id: 't4', name: 'Dynamic Programming', status: 'locked' },
    { id: 't5', name: 'Graphs & BFS', status: 'locked' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState(mockTopics);
    const pathRef = useRef(null);

    const handleCheckpointClick = (topic) => {
        if (topic.status !== 'locked') {
            navigate(`/quiz/${topic.id}?topicName=${encodeURIComponent(topic.name)}`);
        }
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className="page-title">Learning Track</h1>
                <div className={styles.stats}>
                    <div className="glass-panel" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Trophy size={20} color="var(--lime-green)" />
                        <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>1,200 XP</span>
                    </div>
                </div>
            </header>

            <div className={styles.pathContainer} ref={pathRef}>
                <svg className={styles.pathLine} width="100" height="480" preserveAspectRatio="none">
                    <path
                        d="M 50,0 L 50,480"
                        fill="transparent"
                        stroke="#e5e5e5"
                        strokeWidth="16"
                        strokeLinecap="round"
                    />
                </svg>

                {topics.map((topic, index) => {
                    const isOdd = index % 2 !== 0;
                    return (
                        <div
                            key={topic.id}
                            className={styles.checkpointWrapper}
                            onClick={() => handleCheckpointClick(topic)}
                        >
                            <motion.div
                                className={`${styles.checkpoint} ${styles[topic.status]}`}
                                whileHover={topic.status !== 'locked' ? { scale: 1.1, rotate: [-2, 2, -2, 0] } : {}}
                                whileTap={topic.status !== 'locked' ? { scale: 0.95 } : {}}
                            >
                                <div className={styles.iconContainer}>
                                    {topic.status === 'completed' && <CheckCircle2 size={32} color="white" />}
                                    {topic.status === 'unlocked' && <Unlock size={32} color="white" />}
                                    {topic.status === 'locked' && <Lock size={32} color="#afafaf" />}
                                </div>
                            </motion.div>

                            <div className={`${styles.tooltip} glass-panel`}>
                                <h3>{topic.name}</h3>
                                <p>{topic.status.toUpperCase()}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
