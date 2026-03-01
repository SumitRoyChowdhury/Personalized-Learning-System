import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import RecommendationPage from './pages/RecommendationPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quiz/:topicId" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
      </Routes>
    </div>
  );
}

export default App;
