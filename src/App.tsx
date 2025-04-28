import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ToolsPage from './pages/ToolsPage';
import ResourcesPage from './pages/ResourcesPage';
import LearnPage from './pages/LearnPage';
import PlacementQuizPage from './pages/learn/PlacementQuizPage';
import LessonPage from './pages/learn/LessonPage';
import SubscribePage from './pages/SubscribePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AbcToolPage from './pages/tools/AbcToolPage';
import NotFoundPage from './pages/404';


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/analyzeCode" element={<AbcToolPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/placement-quiz" element={<PlacementQuizPage />} />
        <Route path="/learn/:level/:lessonId" element={<LessonPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;