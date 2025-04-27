import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowRight } from 'lucide-react';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const PlacementQuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions: QuizQuestion[] = [
    {
      question: "ما هو القبول العالمي (UA)؟",
      options: [
        "معيار يضمن أن جميع أسماء النطاقات وعناوين البريد الإلكتروني يمكن استخدامها من قبل جميع التطبيقات",
        "ميزة في متصفح الويب لترجمة المواقع",
        "لغة برمجة لتطوير الويب",
        "بروتوكول أمان الإنترنت"
      ],
      correctAnswer: 0
    },
    {
      question: "ما هو اسم النطاق الدولي (IDN)؟",
      options: [
        "اسم نطاق يستخدم فقط الحروف الإنجليزية",
        "اسم نطاق يحتوي على حروف من نصوص مختلفة (مثل العربية والصينية)",
        "اسم نطاق أقصر من ١٠ أحرف",
        "اسم نطاق يستخدم الأرقام بدلاً من الحروف"
      ],
      correctAnswer: 1
    },
    {
      question: "ما هو الهدف الرئيسي من تدويل عناوين البريد الإلكتروني (EAI)؟",
      options: [
        "تسريع تحميل البريد الإلكتروني",
        "تشفير محتوى البريد الإلكتروني",
        "السماح باستخدام الحروف غير اللاتينية في عناوين البريد الإلكتروني",
        "ضغط مرفقات البريد الإلكتروني"
      ],
      correctAnswer: 2
    },
    {
      question: "ما هو التحدي الرئيسي في تطبيق القبول العالمي؟",
      options: [
        "جعل المواقع تبدو متطابقة في جميع المتصفحات",
        "التعامل مع ترميزات وأنظمة كتابة مختلفة في أنظمة البرمجيات",
        "تقليل أوقات تحميل المواقع",
        "إنشاء تصميمات متجاوبة مع الجوال"
      ],
      correctAnswer: 1
    },
    {
      question: "ما هو Punycode في سياق القبول العالمي؟",
      options: [
        "لغة برمجة لتطوير الويب",
        "طريقة لتشفير أسماء النطاقات",
        "طريقة لتمثيل حروف يونيكود في تنسيق ASCII لأسماء النطاقات",
        "نوع من تكوين خادم الويب"
      ],
      correctAnswer: 2
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const level = determineLevel(newAnswers);
      navigate(`/learn/${level}/1`);
    }
  };

  const determineLevel = (userAnswers: number[]): string => {
    const correctAnswers = userAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / questions.length) * 100);

    // Adjusted thresholds and simplified logic
    if (score < 40) return 'beginner';
    if (score < 70) return 'intermediate';
    return 'advanced';
  };

  return (
    <>
      <div className="relative bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">اختبار تحديد المستوى</h1>
            <p className="text-xl text-gray-300">
              دعنا نحدد مستوى معرفتك الحالي بالقبول العالمي
            </p>
          </motion.div>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Brain className="w-6 h-6 text-primary-600 ml-2" />
                  <h2 className="text-2xl font-bold text-gray-900">السؤال {currentQuestion + 1}</h2>
                </div>
                <span className="text-gray-500">
                  {currentQuestion + 1} من {questions.length}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-primary-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h3>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-right p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default PlacementQuizPage;