import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  [key: number]: {
    questions: QuizQuestion[];
  };
}

interface QuizSectionProps {
  lessonId: number;
  onComplete: (score: number) => void;
}

const quizData: QuizData = {
  1: {
    questions: [
      {
        question: 'ما هو القبول الشامل (Universal Acceptance)؟',
        options: [
          'السماح باستخدام النطاقات اللاتينية فقط',
          'ضمان عمل جميع النطاقات والبريد الإلكتروني بجميع اللغات بشكل صحيح',
          'رفض أسماء النطاقات الدولية'
        ],
        correctAnswer: 1
      },
      {
        question: 'لماذا يعتبر القبول الشامل مهمًا؟',
        options: [
          'لدعم مزيد من الابتكار',
          'لجعل أسماء النطاقات أقصر',
          'لتقليل عدد مستخدمي الإنترنت'
        ],
        correctAnswer: 0
      },
      {
        question: 'أي من الأمثلة التالية هو اسم نطاق دولي (IDN)؟',
        options: [
          'www.example.com',
          'موقع.السعودية',
          'www.google.com'
        ],
        correctAnswer: 1
      }
    ]
  },
  2: {
    questions: [
      {
        question: 'ما الفرق الرئيسي بين ASCII وUnicode؟',
        options: [
          'Unicode يدعم لغات متعددة بينما ASCII محدود',
          'ASCII أكثر شيوعًا من Unicode',
          'كلاهما متطابقان'
        ],
        correctAnswer: 0
      },
      {
        question: 'ما هو IDN؟',
        options: [
          'بريد إلكتروني دولي',
          'اسم نطاق دولي',
          'عنوان IP'
        ],
        correctAnswer: 1
      },
      {
        question: 'أي من التحديات التالية يتم مواجهتها عند التعامل مع النطاقات الدولية؟',
        options: [
          'زيادة السرعة',
          'ضمان عمل النطاق بشكل صحيح في جميع أنحاء العالم',
          'تقليل التكلفة'
        ],
        correctAnswer: 1
      }
    ]
  },
  3: {
    questions: [
      {
        question: 'ما الترميز الموصى به لمعالجة النصوص لدعم القبول الشامل؟',
        options: [
          'ASCII',
          'UTF-8',
          'Latin-1'
        ],
        correctAnswer: 1
      },
      {
        question: 'ما الغرض من استخدام التطبيع (Normalization) للنصوص؟',
        options: [
          'تحسين مظهر النص',
          'توحيد التمثيل النصي',
          'زيادة حجم النص'
        ],
        correctAnswer: 1
      },
      {
        question: 'أي من الآتي مثال على عدم دعم UA؟',
        options: [
          'قبول نطاق "موقع.السعودية"',
          'رفض بريد إلكتروني يحتوي على حروف عربية',
          'تخزين عنوان بريد إلكتروني بنجاح'
        ],
        correctAnswer: 1
      }
    ]
  }
};

const QuizSection: React.FC<QuizSectionProps> = ({ lessonId, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  
  const questions = quizData[lessonId]?.questions || [];
  
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    
    setTimeout(() => {
      const newAnswers = [...userAnswers, answerIndex];
      setUserAnswers(newAnswers);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // Quiz completed, calculate score
        const correctAnswers = newAnswers.filter((answer, index) => 
          answer === questions[index].correctAnswer
        ).length;
        const score = Math.round((correctAnswers / questions.length) * 100);
        onComplete(score);
      }
    }, 1000);
  };
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <div className="max-w-2xl mx-auto py-4 text-right" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            السؤال {currentQuestionIndex + 1} من {questions.length}
          </h3>
          <span className="text-gray-500">تقدم الاختبار</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-2 bg-primary-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {questions.length > 0 && (
        <div className="space-y-6">
          <h4 className="text-lg font-medium mb-6">
            {questions[currentQuestionIndex].question}
          </h4>
          
          <div className="space-y-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                className={`w-full text-right p-4 rounded-lg border transition-all duration-200 
                  ${selectedAnswer === index 
                    ? isCorrect 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
                  }`}
                whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center justify-between">
                  <span className={selectedAnswer === index ? (isCorrect ? 'text-green-600' : 'text-red-600') : 'text-gray-400'}>
                    {selectedAnswer === index && (isCorrect ? '✓' : '✗')}
                  </span>
                  <span>{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSection;