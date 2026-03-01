import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './QuizPage.module.css';

// Comprehensive Question Bank mapping to topic IDs
const questionBank = {
    t1: [ // Binary Search
        { text: "Which approach is strictly faster for searching a sorted array?", options: ["Linear Search", "Binary Search", "DFS", "Random Search"], answer: "Binary Search" },
        { text: "What is the time complexity of a standard Binary Search?", options: ["O(N)", "O(1)", "O(log N)", "O(N log N)"], answer: "O(log N)" },
        { text: "Which condition exits the binary search loop if element is not found?", options: ["left <= right", "left < right", "left > right", "left == right"], answer: "left > right" },
        { text: "What must be true about an array to perform binary search?", options: ["It must have even length", "It must be sorted", "It must contain numbers only", "It must not have duplicates"], answer: "It must be sorted" },
        { text: "In binary search, how is the middle index calculated safely to avoid overflow?", options: ["(left + right) / 2", "left + (right - left) / 2", "left * right / 2", "right - left / 2"], answer: "left + (right - left) / 2" }
    ],
    t2: [ // Two Pointers
        { text: "When using Two Pointers on a sorted array to find a sum, what do you do if the current sum is too small?", options: ["Move left pointer right", "Move right pointer left", "Reset pointers", "Stop searching"], answer: "Move left pointer right" },
        { text: "What is typically the time complexity of a Two Pointer approach on a sorted array?", options: ["O(N^2)", "O(1)", "O(N)", "O(N log N)"], answer: "O(N)" },
        { text: "Which problem is a classic example for Two Pointers?", options: ["Valid Palindrome", "N-Queens", "Fibonacci", "Shortest Path"], answer: "Valid Palindrome" },
        { text: "Can two pointers start at the same index?", options: ["Yes", "No", "Only for strings", "Only for matrices"], answer: "Yes" },
        { text: "Which sorting algorithm relies heavily on a two-pointer-like partition concept?", options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"], answer: "Quick Sort" }
    ],
    t3: [ // Sliding Window
        { text: "What best defines a 'Sliding Window' approach?", options: ["Pointers moving opposite", "Maintaining a subset range between pointers", "Sorting the array first", "Using recursion"], answer: "Maintaining a subset range between pointers" },
        { text: "Which data structure is often used alongside a Sliding Window to track counts or frequencies?", options: ["Stack", "Hash Map", "Tree", "Graph"], answer: "Hash Map" },
        { text: "When should the left pointer shrink the window in a variable-size sliding window?", options: ["Always", "Never", "When window constraint is violated", "When reaching the end"], answer: "When window constraint is violated" },
        { text: "What is the primary advantage of the Sliding Window technique?", options: ["Reduces O(N^2) loops to O(N)", "Sorts the data faster", "Uses less memory", "Can be parallelized easily"], answer: "Reduces O(N^2) loops to O(N)" },
        { text: "A fixed-size sliding window normally calculates the first window then...", options: ["Restarts from index 0", "Slides by one element at a time", "Grows in size", "Stops executing"], answer: "Slides by one element at a time" }
    ],
    t4: [ // Dynamic Programming
        { text: "What is the core concept of Dynamic Programming?", options: ["Randomness", "Graph traversing", "Storing results of overlapping subproblems", "Branch and Bound"], answer: "Storing results of overlapping subproblems" },
        { text: "What is 'Memoization' in DP?", options: ["Bottom-up approach", "Top-down approach with caching", "Sorting first", "Loop unrolling"], answer: "Top-down approach with caching" },
        { text: "What is required for a problem to be solved efficiently by DP?", options: ["Greedy Choice", "Optimal Substructure", "No overlapping subproblems", "Linear data structure"], answer: "Optimal Substructure" },
        { text: "Which sequence is classically introduced with DP to prevent exponential time complexities?", options: ["Random Numbers", "Fibonacci Sequence", "Prime Numbers", "Even Numbers"], answer: "Fibonacci Sequence" },
        { text: "What is 'Tabulation' in DP?", options: ["Top-down caching approach", "Bottom-up approach using iterative tables", "Using hash maps only", "Recursive mapping"], answer: "Bottom-up approach using iterative tables" }
    ],
    t5: [ // Graphs & BFS
        { text: "Which data structure is fundamentally used to implement Breadth-First Search (BFS)?", options: ["Stack", "Queue", "Hash Map", "Linked List"], answer: "Queue" },
        { text: "BFS is generally best for finding...", options: ["Longest Path", "Shortest Path in unweighted graphs", "All permutations", "Maximum flow"], answer: "Shortest Path in unweighted graphs" },
        { text: "What happens if you do not track 'visited' nodes in BFS on an undirected or cyclic graph?", options: ["Infinite loop", "Stack Overflow immediately", "Faster execution", "Immediate crash"], answer: "Infinite loop" },
        { text: "In a tree, what does BFS correspond to?", options: ["In-order traversal", "Post-order traversal", "Level-order traversal", "Pre-order traversal"], answer: "Level-order traversal" },
        { text: "What is the time complexity of BFS on a graph with V vertices and E edges?", options: ["O(V * E)", "O(V + E)", "O(V^2)", "O(log V)"], answer: "O(V + E)" }
    ],
    default: [
        { text: "What is algorithmic complexity primarily concerned with?", options: ["Code line count", "Growth rate of resource consumption", "Compilation speed", "Variable naming efficiency"], answer: "Growth rate of resource consumption" },
        { text: "What does big-O notation describe?", options: ["Best case scenario", "Average case scenario", "Worst case upper bound", "Exact duration"], answer: "Worst case upper bound" },
        { text: "Which algorithmic complexity is theoretically the fastest?", options: ["O(N)", "O(1)", "O(N log N)", "O(N^2)"], answer: "O(1)" }
    ]
};

export default function QuizPage() {
    const { topicId } = useParams();
    const [searchParams] = useSearchParams();
    const topicName = searchParams.get('topicName') || 'Quiz';
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60); // 60s per quiz

    // Mock API Fetch + Question Randomization
    useEffect(() => {
        setLoading(true);

        // Reset state each time the quiz loads or remounts
        setCurrentIdx(0);
        setAnswers({});
        setTimeLeft(60);

        setTimeout(() => {
            // Pull questions securely corresponding to topicId
            const topicBank = questionBank[topicId] || questionBank['default'];

            // Shuffle the questions array
            const shuffled = [...topicBank].sort(() => 0.5 - Math.random());

            // Take exactly 3 random questions for the quiz trial
            const selectedQuestions = shuffled.slice(0, 3).map((q, idx) => ({ ...q, id: idx }));

            setQuestions(selectedQuestions);
            setLoading(false);
        }, 1500); // simulate API delay
    }, [topicId]);

    // Timer
    useEffect(() => {
        if (loading || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, loading]);

    const handleSelect = (option) => {
        setAnswers(prev => ({ ...prev, [currentIdx]: option }));
    };

    const isLast = currentIdx === questions.length - 1;
    const isFilled = Object.keys(answers).length === questions.length;

    const handleSubmit = () => {
        // Navigate to results
        const score = Object.values(answers).filter((ans, i) => ans === questions[i].answer).length;
        const isGood = score >= Math.ceil(questions.length * 0.7);

        navigate(`/result?score=${score}&total=${questions.length}&topicId=${topicId}&topicName=${encodeURIComponent(topicName)}&isGood=${isGood}`);
    };

    if (loading) {
        return (
            <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="loader"></div>
                <h2 style={{ marginTop: '20px', color: 'var(--neon-blue)' }}>Generating Challenge...</h2>
            </div>
        );
    }

    // Fallback if no questions are loaded
    if (questions.length === 0) return null;

    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;

    return (
        <div className={styles.quizPage}>
            <header className={styles.header}>
                <div className={styles.topBar}>
                    <button className="btn-secondary" onClick={() => navigate('/')}>
                        <ArrowLeft size={18} style={{ marginRight: '8px', display: 'inline' }} />
                        Exit
                    </button>
                    <div className={`${styles.timer} ${timeLeft < 10 ? styles.timerWarning : ''}`}>
                        <Timer size={20} />
                        <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                    </div>
                </div>

                <div className={styles.progressBarWrapper}>
                    <motion.div
                        className={styles.progressBar}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
                <div className={styles.progressText}>
                    Question {currentIdx + 1} of {questions.length}
                </div>
            </header>

            <main className={styles.questionContainer}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={questions[currentIdx].text} // Make sure key uniquely identifies the question to trigger Framer transitions
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`glass-panel ${styles.quizCard}`}
                    >
                        <h2 className={styles.questionText}>{q.text}</h2>

                        <div className={styles.optionsList}>
                            {q.options.map((opt, i) => {
                                const isSelected = answers[currentIdx] === opt;
                                return (
                                    <button
                                        key={i}
                                        className={`${styles.optionBtn} ${isSelected ? styles.selected : ''}`}
                                        onClick={() => handleSelect(opt)}
                                    >
                                        <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className={styles.footer}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {currentIdx > 0 && (
                        <button className="btn-secondary" onClick={() => setCurrentIdx(prev => prev - 1)}>Previous</button>
                    )}
                </div>

                {!isLast ? (
                    <button
                        className="btn-primary"
                        disabled={!answers[currentIdx]}
                        onClick={() => setCurrentIdx(prev => prev + 1)}
                    >
                        Next <ArrowRight size={18} style={{ marginLeft: '8px', display: 'inline', verticalAlign: 'middle' }} />
                    </button>
                ) : (
                    <button
                        className="btn-primary"
                        style={{ background: 'linear-gradient(135deg, var(--lime-green), #00BB00)' }}
                        disabled={!isFilled}
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                )}
            </footer>
        </div>
    );
}
