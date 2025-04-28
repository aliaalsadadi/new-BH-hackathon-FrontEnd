import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Award, Lock, CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import BadgeShowcase from '../components/ui/BadgeShowcase';
import useLessonStore from '../store/lessons';
import useBadgeStore from '../store/badges';
import { useUser } from '../context/UserContext';
const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const { lessons } = useLessonStore();
  const { badges } = useBadgeStore();
  const { user } = useUser();

  const startLearning = () => {
    navigate('/learn/placement-quiz');
  };
  const isLessonAvailable = (level: string, lessonId: number): boolean => {
    if (lessonId === 1) return true; // The first lesson is always available.

    const previousLesson = user?.progress?.[level]?.[lessonId - 1];
    return previousLesson?.completed === true && previousLesson.score >= 70; // Ensure the previous lesson is completed with a passing score.
  };
  const renderLessonCard = (lesson: any, level: string) => {
    const progress = user?.progress?.[level]?.[lesson.id];
    const isCompleted = progress?.completed;
    const score = progress?.score;
    const isLocked = !isLessonAvailable(level, lesson.id);
    return (
      <Card key={lesson.id} className="p-6 relative">
        {isCompleted ? (
          <div className="absolute top-4 left-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        ) : isLocked ? (
          <div className="absolute top-4 left-4">
            <Lock className="w-6 h-6 text-gray-400" />
          </div>
        ) : null}

        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">{lesson.title}</h3>
        <p className="text-gray-600 text-center mb-6">{lesson.description}</p>

        {isCompleted ? (
          <div className="space-y-3">
            <div className="bg-green-50 text-green-700 text-sm rounded-md p-2 text-center">
              تم الإكمال بنجاح - {score}%
            </div>
            <Button
              to={`/learn/${level}/${lesson.id}`}
              variant="outline"
              className="w-full"
            >
              مراجعة الدرس
            </Button>
          </div>
        ) : (
          <Button
            to={isLocked ? "#" : `/learn/${level}/${lesson.id}`}
            variant={isLocked ? "outline" : "primary"}
            className="w-full"
            disabled={isLocked}
          >
            {isLocked ? 'مغلق' : 'ابدأ الدرس'}
          </Button>
        )}
      </Card>
    );
  };

  return (
    <>
      <div className="relative bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">تعلم القبول العالمي</h1>
            <p className="text-xl text-gray-300">
              ابدأ رحلة التعلم مع تجربة مخصصة بناءً على مستوى معرفتك
            </p>
            <div className="mt-8">
              <Button
                variant="accent"
                size="lg"
                onClick={startLearning}
              >
                ابدأ رحلة التعلم
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Badge Showcase Section */}
      <Section title="شاراتك" subtitle="اجمع الشارات وتقدم في رحلة تعلم القبول العالمي" centered>
        <BadgeShowcase badges={badges} />
      </Section>

      <Section title="المستوى المبتدئ" centered>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lessons.beginner.map(lesson => renderLessonCard(lesson, 'beginner'))}
        </div>
      </Section>

      <Section title="المستوى المتوسط" background="light" centered>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lessons.intermediate.map(lesson => renderLessonCard(lesson, 'intermediate'))}
        </div>
      </Section>

      <Section title="المستوى المتقدم" centered>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lessons.advanced.map(lesson => renderLessonCard(lesson, 'advanced'))}
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">مستعد لبدء التعلم؟</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          ابدأ رحلتك في القبول العالمي مع منصتنا التفاعلية للتعلم
        </p>
        <Button
          size="lg"
          variant="primary"
          onClick={startLearning}
        >
          خذ اختبار تحديد المستوى
        </Button>
      </Section>
    </>
  );
};

export default LearnPage;