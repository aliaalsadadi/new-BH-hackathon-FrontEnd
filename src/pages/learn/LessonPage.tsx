import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, ArrowLeft, ArrowRight, Lock, Trophy } from 'lucide-react';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SuccessConfetti from '../../components/ui/SuccessConfetti';
import BadgePopup from '../../components/ui/BadgePopup';
import useLessonStore from '../../store/lessons';
import useBadgeStore from '../../store/badges';
import InteractiveLesson from '../../components/ui/InteractiveLesson';
import InteractiveLesson2 from '../../components/ui/InteractiveLesson2';
import InteractiveLesson3 from '../../components/ui/InteractiveLesson3';
const LessonPage: React.FC = () => {
  const { level = 'beginner', lessonId } = useParams();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<{ icon: string; name: string; message: string } | null>(null);

  const { lessons, completeLesson, isLessonAvailable } = useLessonStore();
  const { badges } = useBadgeStore();
  const lesson = lessons[level]?.find(l => l.id === parseInt(lessonId || '1'));
  const isAvailable = isLessonAvailable(level, parseInt(lessonId || '1'));

  useEffect(() => {
    if (!isAvailable) {
      navigate(`/learn/${level}/1`);
    }
  }, [isAvailable, level, navigate, lessonId]);

  useEffect(() => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setShowCompletion(false);
    setShowConfetti(false);
    setEarnedBadge(null);
  }, [lessonId, level]);

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < (lesson?.quiz.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalScore = calculateScore(newAnswers);
      setScore(finalScore);
      setQuizCompleted(true);
      
      if (finalScore >= 70) {
        setShowConfetti(true);
        completeLesson(level, parseInt(lessonId || '1'), finalScore);
        
        // Check for newly earned badge
        const badgeId = getBadgeId(level, parseInt(lessonId || '1'));
        if (badgeId && badges[badgeId] && !badges[badgeId].earned) {
          setEarnedBadge({
            icon: badges[badgeId].icon,
            name: badges[badgeId].name,
            message: badges[badgeId].message
          });
        }
      }
    }
  };

  const getBadgeId = (level: string, lessonId: number): string | null => {
    if (level === 'beginner' && lessonId === 1) return 'beginner';
    if (level === 'beginner' && lessonId === 3) return 'explorer';
    if (level === 'intermediate' && lessonId === 3) return 'advanced_explorer';
    if (level === 'advanced' && lessonId === 3) return 'expert';
    return null;
  };

  const calculateScore = (userAnswers: number[]): number => {
    if (!lesson?.quiz.questions) return 0;
    
    const correctAnswers = userAnswers.filter((answer, index) => {
      return answer === lesson.quiz.questions[index].correctAnswer;
    }).length;
    
    return Math.round((correctAnswers / lesson.quiz.questions.length) * 100);
  };

  const isLastLesson = () => {
    const levels = ['beginner', 'intermediate', 'advanced'];
    const currentLevelIndex = levels.indexOf(level);
    const currentLevelLessons = lessons[level] || [];
    
    return currentLevelIndex === levels.length - 1 && 
           parseInt(lessonId || '1') === currentLevelLessons.length;
  };

  const handleNextLesson = () => {
    const nextLessonId = parseInt(lessonId || '1') + 1;
    const currentLevelLessons = lessons[level] || [];
    
    if (isLastLesson()) {
      setShowCompletion(true);
    } else if (nextLessonId <= currentLevelLessons.length) {
      navigate(`/learn/${level}/${nextLessonId}`);
    } else {
      const levels = ['beginner', 'intermediate', 'advanced'];
      const currentLevelIndex = levels.indexOf(level);
      if (currentLevelIndex < levels.length - 1) {
        navigate(`/learn/${levels[currentLevelIndex + 1]}/1`);
      }
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-primary-800 to-secondary-800 flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          {showConfetti && <SuccessConfetti />}
          <Card className="p-12 text-center">
            <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-8">
              <Trophy className="w-16 h-16 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">تهانينا! 🎉</h1>
            <p className="text-xl text-gray-700 mb-8">
              لقد أكملت بنجاح جميع دروس القبول العالمي! نحن فخورون بإنجازك
              ونتطلع إلى رؤية مساهمتك في جعل الإنترنت أكثر شمولية للجميع.
            </p>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                شهادتك في طريقها إليك عبر البريد الإلكتروني.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  to="/learn" 
                  variant="primary"
                  size="lg"
                  leftIcon={<Brain className="w-5 h-5" />}
                >
                  العودة إلى صفحة التعلم
                </Button>
                <Button 
                  to="/resources" 
                  variant="outline"
                  size="lg"
                  leftIcon={<ArrowRight className="w-5 h-5" />}
                >
                  استكشف المزيد من المصادر
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 ml-3" />
              <h1 className="text-4xl font-bold">{lesson.title}</h1>
            </div>
            <p className="text-xl text-gray-300">
              المستوى: {level} - الدرس {lessonId}
            </p>
          </motion.div>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8">
                {(() => {
  switch (level) {
    case 'beginner':
      return <InteractiveLesson />;
    case 'intermediate':
      return <InteractiveLesson2 />;
    case 'advanced':
      return <InteractiveLesson3 />;
    default:
      return null;
  }
})()}

                  <div className="mt-8 flex justify-end">
                    <Button 
                      variant="primary"
                      onClick={() => setShowQuiz(true)}
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      className="transform hover:scale-105 transition-transform"
                    >
                      ابدأ الاختبار
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8">
               
                  {!quizCompleted ? (
                    <>
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold">
                            السؤال {currentQuestion + 1} من {lesson.quiz.questions.length}
                          </h3>
                          <span className="text-gray-500">تقدم الاختبار</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-2 bg-primary-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${((currentQuestion + 1) / lesson.quiz.questions.length) * 100}%` 
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-lg font-medium mb-6">
                          {lesson.quiz.questions[currentQuestion].question}
                        </h4>
                        <div className="space-y-4">
                          {lesson.quiz.questions[currentQuestion].options.map((option, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleQuizAnswer(index)}
                              className="w-full text-right p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 transform hover:scale-102"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center justify-between">
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                                <span>{option}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {showConfetti && <SuccessConfetti />}
                      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
                        score >= 70 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {score >= 70 ? (
                          <CheckCircle className="w-12 h-12" />
                        ) : (
                          <Lock className="w-12 h-12" />
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {score >= 70 ? 'أحسنت!' : 'حاول مرة أخرى'}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        لقد حصلت على {score}% من الإجابات الصحيحة
                      </p>
                      {score >= 70 ? (
                        <Button
                          variant="primary"
                          onClick={handleNextLesson}
                          rightIcon={<ArrowRight className="w-5 h-5" />}
                          className="transform hover:scale-105 transition-transform"
                        >
                          {isLastLesson() ? 'إنهاء الدورة' : 'انتقل إلى الدرس التالي'}
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={handleRetryQuiz}
                          rightIcon={<ArrowRight className="w-5 h-5" />}
                          className="transform hover:scale-105 transition-transform"
                        >
                          حاول مرة أخرى
                        </Button>
                      )}
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {earnedBadge && (
        <BadgePopup
          icon={earnedBadge.icon}
          name={earnedBadge.name}
          message={earnedBadge.message}
          onClose={() => setEarnedBadge(null)}
        />
      )}
    </>
  );
};

export default LessonPage;