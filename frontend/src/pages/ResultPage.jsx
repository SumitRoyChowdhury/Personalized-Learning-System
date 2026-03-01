import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import styles from './ResultPage.module.css';

export default function ResultPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const score = searchParams.get('score');
    const total = searchParams.get('total');
    const topicName = searchParams.get('topicName');
    const topicId = searchParams.get('topicId');
    const isGood = searchParams.get('isGood') === 'true';

    const percentage = Math.round((parseInt(score) / parseInt(total)) * 100);

    return (
        <div className={styles.resultPage}>
            <motion.div
                className={`glass-panel ${styles.resultCard}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
            >
                {isGood ? (
                    <>
                        <motion.div
                            className={styles.iconWrapperGood}
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Trophy size={64} color="var(--bg-color)" />
                        </motion.div>
                        <h1 className={styles.successTitle}>Checkpoint Cleared!</h1>
                        <p className={styles.subtitle}>You mastered exactly what was needed in <strong>{topicName}</strong>.</p>

                        <div className={styles.scoreCircleGood}>
                            <span>{percentage}%</span>
                        </div>

                        <div className={styles.statsPanel}>
                            <p>🎯 Score: {score}/{total}</p>
                            <p>💪 Strengths: Core concepts, Time Complexity</p>
                        </div>

                        <button className="btn-primary" onClick={() => navigate('/')}>
                            Continue Journey <ArrowRight size={18} style={{ marginLeft: '8px', display: 'inline' }} />
                        </button>
                    </>
                ) : (
                    <>
                        <motion.div
                            className={styles.iconWrapperPoor}
                            animate={{ x: [-5, 5, -5, 5, 0] }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                        >
                            <AlertTriangle size={64} color="var(--bg-color)" />
                        </motion.div>
                        <h1 className={styles.warningTitle}>Keep Going!</h1>
                        <p className={styles.subtitle}>You're getting there with <strong>{topicName}</strong> but need a bit more practice.</p>

                        <div className={styles.scoreCirclePoor}>
                            <span>{percentage}%</span>
                        </div>

                        <div className={styles.statsPanel}>
                            <p>🎯 Score: {score}/{total}</p>
                            <p>⚠️ Needs Review: Edge cases, Implementation details</p>
                        </div>

                        <div className={styles.actions}>
                            <button className="btn-secondary" onClick={() => navigate('/')}>
                                <Home size={18} style={{ marginRight: '8px', display: 'inline' }} />
                                Dashboard
                            </button>
                            <button
                                className="btn-primary"
                                onClick={() => navigate(`/recommendation?topicId=${topicId}&topicName=${encodeURIComponent(topicName)}`)}
                                style={{ background: 'linear-gradient(135deg, #00f0ff, #0055ff)' }}
                            >
                                Get Help <ArrowRight size={18} style={{ marginLeft: '8px', display: 'inline' }} />
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}
