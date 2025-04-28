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
    title: 'التعامل البرمجي مع أسماء النطاقات الدولية (IDNs)',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <h2>مقدمة</h2>
        <p>
          مع تزايد استخدام أسماء النطاقات بلغات متعددة، أصبح من الضروري للمطورين معرفة كيفية التعامل مع هذه الأسماء بشكل صحيح داخل البرمجيات. تحويل وتمييز أسماء النطاقات الدولية (IDNs) جزء أساسي لدعم القبول الشامل.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4">ما هو U-Label و A-Label؟</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">U-Label:</h4>
              <p>الاسم المقروء بلغة المستخدم، مكتوب بـ Unicode.</p>
              <p className="text-gray-600">مثال: موقع.شبكة</p>
            </div>
            <div>
              <h4 className="font-bold">A-Label:</h4>
              <p>التمثيل المشفر (Punycode) القابل للمعالجة في أنظمة DNS.</p>
              <p className="text-gray-600">مثال: xn--4gbrim.xn--ngbc5azd</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-bold mb-2">خطوات التعامل مع IDNs:</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>استلام الاسم من المستخدم بلغة طبيعية (U-Label)</li>
            <li>تطبيع النص (Normalization) باستخدام Unicode NFC</li>
            <li>تحويله إلى A-Label باستخدام Punycode</li>
            <li>التعامل مع A-Label برمجياً (تخزين، استعلام DNS، إلخ)</li>
          </ol>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h4 className="font-bold mb-4">أمثلة عملية:</h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold">Python مثال:</h5>
              <pre className="bg-gray-800 text-white p-4 rounded">
                {`import idna
domain = "موقع.شبكة"
domain_alabel = idna.encode(domain).decode('ascii')
print(domain_alabel)`}
              </pre>
            </div>
            <div>
              <h5 className="font-semibold">Java مثال:</h5>
              <pre className="bg-gray-800 text-white p-4 rounded">
                {`IDNA idna = IDNA.getUTS46Instance(IDNA.NONTRANSITIONAL_TO_ASCII);
StringBuilder output = new StringBuilder();
idna.nameToASCII("موقع.شبكة", output, null);
System.out.println(output.toString());`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h5 className="font-bold mb-2">ملاحظة تقنية:</h5>
              <p>تأكد من استخدام معيار IDNA2008 وليس IDNA2003، حيث أن IDNA2008 هو الأحدث والأكثر دقة.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    quiz: {
      questions: [
        {
          question: 'ما هو الفرق بين U-Label وA-Label؟',
          options: [
            'U-Label هو النسخة النصية، وA-Label هو النسخة المشفرة',
            'U-Label أطول دائمًا من A-Label',
            'كلاهما متشابهان تمامًا'
          ],
          correctAnswer: 0
        },
        {
          question: 'أي معيار يجب استخدامه مع IDNs؟',
          options: [
            'IDNA2003',
            'IDNA2008',
            'ASCII Standard'
          ],
          correctAnswer: 1
        },
        {
          question: 'في برمجيات حديثة، ما الخطوة الأولى بعد استقبال اسم نطاق دولي من المستخدم؟',
          options: [
            'تخزينه مباشرة',
            'تحويله إلى A-Label بدون تطبيع',
            'تطبيع النص باستخدام Unicode'
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    title: 'التحقق من صحة أسماء النطاقات وعناوين البريد الإلكتروني',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <h2>مقدمة</h2>
        <p>
          قبل قبول أي اسم نطاق أو بريد إلكتروني من المستخدم، يجب التحقق من صحته لضمان عمل النظام بشكل صحيح ومنع الأخطاء أو الثغرات الأمنية.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4">التحقق من صحة أسماء النطاقات:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>تأكد أن الاسم يتبع مواصفات IDNA2008</li>
            <li>لا يحتوي على رموز غير مسموحة</li>
            <li>الطول الكلي للنطاق لا يتجاوز 255 بايت</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <h4 className="font-bold mb-2">التحقق من صحة البريد الإلكتروني:</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>اسم صندوق بريد (Mailbox Name) صحيح</li>
            <li>اسم نطاق صحيح (بعد تحويله لـ A-Label)</li>
            <li>يجب دعم عناوين البريد الإلكترونية الدولية (EAI) المكتوبة بـ Unicode</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h4 className="font-bold mb-4">مثال عملي:</h4>
          <div>
            <h5 className="font-semibold">Python مثال التحقق من بريد إلكتروني:</h5>
            <pre className="bg-gray-800 text-white p-4 rounded">
              {`from email_validator import validate_email
result = validate_email("مستخدم@موقع.شبكة", check_deliverability=True)
print(result)`}
            </pre>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h5 className="font-bold mb-2">ملاحظة تقنية:</h5>
              <ul className="list-disc list-inside space-y-2">
                <li>regex التقليدية المستخدمة للبريد الإلكتروني قد لا تدعم Unicode بشكل صحيح!</li>
                <li>استخدام مكتبات متخصصة أفضل (مثل email_validator)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    quiz: {
      questions: [
        {
          question: 'لماذا يجب التحقق من صحة أسماء النطاقات قبل معالجتها؟',
          options: [
            'لمنع الأخطاء البرمجية',
            'لتسريع أداء النظام',
            'لأنه إجراء غير ضروري'
          ],
          correctAnswer: 0
        },
        {
          question: 'ما المشكلة في استخدام regex التقليدي للتحقق من EAI؟',
          options: [
            'لا يدعم Unicode',
            'يتطلب إذن خاص',
            'سريع جدًا'
          ],
          correctAnswer: 0
        },
        {
          question: 'أي من الخيارات يعبر عن طريقة تحقق صحيحة من بريد إلكتروني دولي؟',
          options: [
            'استخدام مكتبة تحقق متخصصة',
            'الاعتماد على فحص يدوي',
            'تجاهل التحقق'
          ],
          correctAnswer: 0
        }
      ]
    }
  },
  {
    title: 'تخزين واسترجاع أسماء النطاقات والبريد الإلكتروني',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <h2>مقدمة</h2>
        <p>
          بمجرد قبول أسماء النطاقات وعناوين البريد الإلكتروني، يجب تخزينها بطريقة آمنة وصحيحة لضمان استرجاعها وعرضها بدون فقد أو تلف.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4">قواعد تخزين الأسماء والعناوين:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>استخدام قاعدة بيانات تدعم UTF-8 بالكامل</li>
            <li>تحديد الأعمدة كـ VARCHAR بطول مناسب (مثلاً 255 خانة)</li>
            <li>إذا كان النظام يحتاج، يمكن تخزين U-Label وA-Label معًا في حقول منفصلة</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <h4 className="font-bold mb-2">أمور مهمة أثناء التخزين:</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>تأكد أن جميع عمليات الإدخال والإخراج تستخدم الترميز الموحد (UTF-8)</li>
            <li>لا تفترض أن كل نص قصير؛ قد تحتوي بعض النطاقات الدولية على أحرف طويلة</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h4 className="font-bold mb-4">مثال عملي:</h4>
          <div>
            <h5 className="font-semibold">في MySQL:</h5>
            <pre className="bg-gray-800 text-white p-4 rounded">
              {`CREATE TABLE domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);`}
            </pre>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-bold mb-2">ملاحظة تقنية:</h4>
          <p>قواعد بيانات NoSQL مثل MongoDB تدعم UTF-8 بشكل افتراضي.</p>
        </div>
      </div>
    ),
    quiz: {
      questions: [
        {
          question: 'ما هو نوع الترميز الأفضل لدعم كل اللغات في قواعد البيانات؟',
          options: [
            'ASCII',
            'UTF-8',
            'Latin-1'
          ],
          correctAnswer: 1
        },
        {
          question: 'لماذا من الأفضل تخزين A-Label إلى جانب U-Label أحيانًا؟',
          options: [
            'لتسريع عمليات DNS',
            'لزيادة استهلاك التخزين فقط',
            'لأنه مطلوب قانونياً'
          ],
          correctAnswer: 0
        },
        {
          question: 'ما هو خطر استخدام ترميز خاطئ أثناء تخزين أسماء النطاقات؟',
          options: [
            'فقدان بعض الأحرف أو تشويهها',
            'زيادة سرعة النظام',
            'لا يوجد خطر'
          ],
          correctAnswer: 0
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
  );
}