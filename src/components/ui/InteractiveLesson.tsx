import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface Section {
  title: string;
  content: JSX.Element;
  quiz: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

const sections: Section[] = [
  {
    title: 'ما هو القبول الشامل (UA)؟',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <p>
          في عالمنا الرقمي، يحتاج الأفراد إلى استخدام الإنترنت بلغاتهم الخاصة، وليس فقط بالحروف اللاتينية. القبول الشامل (Universal Acceptance - UA) هو مبدأ أساسي يضمن أن جميع أسماء النطاقات وعناوين البريد الإلكتروني — بغض النظر عن اللغة أو الطول أو الرموز — يجب أن تعمل بشكل صحيح في جميع الأنظمة والتطبيقات بدون مشاكل.
        </p>

        <h3>المفاهيم الأساسية</h3>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h4 className="text-xl font-semibold mb-3">تعريف القبول الشامل:</h4>
          <p>القبول الشامل يعني أن أي اسم نطاق أو عنوان بريد إلكتروني — سواء كان مكتوبًا بالأحرف اللاتينية أو العربية أو الصينية — يجب أن يتم قبوله ومعالجته وعرضه بشكل طبيعي في البرمجيات.</p>
          
          <h4 className="text-xl font-semibold mt-4 mb-3">مثال:</h4>
          <ul className="list-disc list-inside">
            <li>اسم نطاق: موقع.مثال</li>
            <li>بريد إلكتروني: مستخدم@موقع.شبكة</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <h4 className="font-bold mb-2">لماذا القبول الشامل مهم؟</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>توسيع الوصول: يسمح للمستخدمين باستخدام لغاتهم المحلية.</li>
            <li>تحقيق المساواة الرقمية: يمنع تمييز اللغات والرموز.</li>
            <li>تشجيع الابتكار: يفتح فرصًا للشركات لبناء تطبيقات تدعم الجميع.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h4 className="text-xl font-semibold mb-3">أنواع أسماء النطاقات وعناوين البريد الإلكتروني:</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>ASCII: مثل example.com</li>
            <li>IDN: مثل موقع.السعودية</li>
            <li>EAI: مثل مستخدم@موقع.شبكة</li>
          </ul>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h5 className="font-bold mb-2">ملاحظة تقنية:</h5>
              <p>حتى اليوم، هناك برمجيات لا تدعم UA بشكل كامل. لهذا السبب، يجب اختبار البرمجيات وتحديثها لتكون "UA جاهزة".</p>
            </div>
          </div>
        </div>
      </div>
    ),
    quiz: {
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
    }
  },
  {
    title: 'الأساسيات: Unicode وIDN وEAI',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <p>
          لفهم القبول الشامل بشكل صحيح، يجب أن نبدأ من أساسيات تمثيل النصوص في الحاسوب. بدون معرفة الفروقات بين ASCII وUnicode، ومفاهيم IDN وEAI، سيكون من الصعب بناء برمجيات تدعم جميع المستخدمين.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4">الفرق بين ASCII وUnicode:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">ASCII:</h4>
              <p>نظام ترميز قديم يستخدم 7 بتات فقط ويدعم الحروف اللاتينية (A-Z)، الأرقام (0-9) وبعض الرموز البسيطة.</p>
            </div>
            <div>
              <h4 className="font-bold">Unicode:</h4>
              <p>نظام ترميز حديث يدعم معظم لغات العالم، مثل العربية، الصينية، الهندية...، باستخدام تشفير مرن يصل إلى 32 بت.</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-bold mb-2">ما هو IDN؟</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>IDN = Internationalized Domain Name</li>
            <li>أسماء النطاقات التي تحتوي على حروف غير لاتينية مثل: "موقع.السعودية"</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <h4 className="font-bold mb-2">ما هو EAI؟</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>EAI = Email Address Internationalization</li>
            <li>إمكانية استخدام حروف غير لاتينية في الجزء المحلي من البريد الإلكتروني</li>
            <li>مثال: مستخدم@مثال.شبكة</li>
          </ul>
        </div>
      </div>
    ),
    quiz: {
      questions: [
        {
          question: 'ما الفرق الرئيسي بين ASCII وUnicode؟',
          options: [
            'Unicode يدعم لغات متعددة بينما ASCII محدود',
            'ASCII يستخدم أكثر من Unicode',
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
          question: 'أي من الأمثلة التالية يمثل بريدًا إلكترونيًا دوليًا (EAI)؟',
          options: [
            'user@example.com',
            'مستخدم@مثال.شبكة',
            'example@gmail.com'
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    title: 'التحديات وأثر القبول الشامل',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <p>
          القبول الشامل لا يعني فقط دعم أسماء النطاقات والبريد الإلكتروني. بل يتعلق أيضًا بإزالة الحواجز الرقمية وإتاحة الإنترنت للجميع.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4">التحديات عند غياب القبول الشامل:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>فشل تسجيل النطاقات بلغات محلية</li>
            <li>رفض نماذج التسجيل لعناوين بريد إلكتروني دولية</li>
            <li>مشاكل في عرض النصوص ذات اتجاه من اليمين إلى اليسار (RTL)</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <h4 className="font-bold mb-2">أثر القبول الشامل على العالم الرقمي:</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>تحسين الشمولية الرقمية: يسمح لمزيد من الأشخاص باستخدام الإنترنت بلغاتهم الأصلية</li>
            <li>دعم النمو الاقتصادي: يفتح فرصًا جديدة للأسواق المحلية والدولية</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-bold mb-2">الجهات المستفيدة من UA:</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>المطورون</li>
            <li>الحكومات</li>
            <li>الشركات الناشئة</li>
            <li>المؤسسات التعليمية</li>
          </ul>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h5 className="font-bold mb-2">ملاحظة تقنية:</h5>
              <p>إهمال دعم UA يمكن أن يؤدي إلى فقدان شريحة ضخمة من المستخدمين المحتملين.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    quiz: {
      questions: [
        {
          question: 'ما هو أحد الآثار السلبية لعدم دعم القبول الشامل؟',
          options: [
            'تعزيز الاقتصاد الرقمي',
            'إقصاء بعض المستخدمين عن الإنترنت',
            'زيادة أمان المواقع'
          ],
          correctAnswer: 1
        },
        {
          question: 'من المستفيد من دعم القبول الشامل؟',
          options: [
            'فقط الشركات العالمية',
            'جميع مستخدمي الإنترنت',
            'فقط المستخدمين باللغة الإنجليزية'
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
  }
];

export default function InteractiveLesson() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleAnswerSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsAnswerCorrect(answerIndex === sections[currentIndex].quiz.questions[currentQuestion].correctAnswer);
  };

  const nextQuestion = () => {
    if (currentQuestion < sections[currentIndex].quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      setShowQuiz(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }
  };

  const next = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowQuiz(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }
  };

  const back = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowQuiz(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 text-right" dir="rtl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{sections[currentIndex].title}</h2>
          <div className="flex gap-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentIndex}-${showQuiz}-${currentQuestion}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          {!showQuiz ? (
            sections[currentIndex].content
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">
                {sections[currentIndex].quiz.questions[currentQuestion].question}
              </h3>
              <div className="space-y-4">
                {sections[currentIndex].quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSubmit(index)}
                    className={`w-full text-right p-4 rounded-lg border transition-all duration-200 ${
                      selectedAnswer === index
                        ? isAnswerCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <div className={`p-4 rounded-lg ${
                  isAnswerCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  <p className="font-semibold mb-2">
                    {isAnswerCorrect ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة'}
                  </p>
                  {isAnswerCorrect && currentQuestion < sections[currentIndex].quiz.questions.length - 1 && (
                    <button
                      onClick={nextQuestion}
                      className="mt-4 bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition-colors"
                    >
                      السؤال التالي
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={back}
          disabled={currentIndex === 0}
          className="bg-primary-600 text-white px-6 py-2 rounded disabled:opacity-50 transition-all duration-200 hover:bg-primary-700"
        >
          السابق
        </button>

        <div className="flex gap-4">
          {!showQuiz && (
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-secondary-600 text-white px-6 py-2 rounded transition-all duration-200 hover:bg-secondary-700"
            >
              اختبر معلوماتك
            </button>
          )}
          
          {currentIndex < sections.length - 1 ? (
            <button
              onClick={next}
              className="bg-primary-600 text-white px-6 py-2 rounded transition-all duration-200 hover:bg-primary-700"
            >
              التالي
            </button>
          ) : (
            <button
              disabled
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              انتهى الدرس 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
}