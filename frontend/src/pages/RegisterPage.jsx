import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Gamepad2, LogIn, UserPlus } from 'lucide-react';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Determine the mock endpoint and delay based on action
        const endpoint = isLogin ? `${import.meta.env.VITE_BACKEND_URL}/api/login` : `${import.meta.env.VITE_BACKEND_URL}/api/register`;

        // Simulate API call to backend
        setTimeout(() => {
            setLoading(false);
            // For now, regardless of login or register, simulate a successful flow to dashboard
            navigate('/');
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // Clear form on toggle
        setFormData({ name: '', email: '', password: '' });
    };

    const isFormValid = isLogin
        ? formData.email && formData.password
        : formData.name && formData.email && formData.password;

    return (
        <div className={styles.registerPage}>
            <motion.div
                className={`glass-panel ${styles.formCard}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                key={isLogin ? 'login' : 'register'}
            >
                <div className={styles.headerIcon}>
                    <Gamepad2 size={48} color="var(--bg-color)" />
                </div>

                <h1 className={styles.title}>{isLogin ? 'Welcome Back' : 'Start Your Journey'}</h1>
                <p className={styles.subtitle}>{isLogin ? 'Ready to continue your progress?' : 'Level up your coding skills today!'}</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <AnimatePresence mode="popLayout">
                        {!isLogin && (
                            <motion.div
                                className={styles.inputGroup}
                                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={styles.inputIcon}><User size={20} /></div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Gamer Tag (Username)"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputIcon}><Mail size={20} /></div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputIcon}><Lock size={20} /></div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Secret Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn-primary ${styles.submitBtn}`}
                        disabled={loading || !isFormValid}
                    >
                        {loading ? <div className={styles.btnLoader}></div> : (
                            <>
                                {isLogin ? 'Login to Dashboard' : 'Create Account'}
                                {isLogin ? <LogIn size={18} style={{ marginLeft: '8px' }} /> : <UserPlus size={18} style={{ marginLeft: '8px' }} />}
                            </>
                        )}
                    </button>
                </form>

                <p className={styles.loginLink}>
                    {isLogin ? "Don't have an account?" : "Already a player?"}{" "}
                    <span onClick={toggleMode}>
                        {isLogin ? "Sign up here" : "Login here"}
                    </span>
                </p>
            </motion.div>
        </div>
    );
}
