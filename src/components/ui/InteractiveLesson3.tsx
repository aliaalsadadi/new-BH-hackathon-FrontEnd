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
    title: 'البرمجة لدعم القبول الشامل (أمثلة Python وJava)',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <h2>مقدمة</h2>
        <p>
          لجعل التطبيقات تدعم القبول الشامل (UA)، يحتاج المطورون إلى فهم كيفية التعامل مع Unicode وIDNs وEAIs داخل الكود البرمجي بشكل صحيح. دعم UA يبدأ من كتابة الكود بطريقة تدعم جميع أنواع النصوص.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4">معالجة النصوص باستخدام Unicode</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>يجب أن تتم جميع عمليات الإدخال، المعالجة، والتخزين باستخدام ترميز UTF-8</li>
            <li>عند قراءة النصوص من ملفات أو الشبكة، يجب التأكد من استخدام UTF-8 كإعداد افتراضي</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-bold mb-2">التعامل مع IDNs:</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>التطبيع (Normalization) ضروري قبل أي تحويل أو مقارنة</li>
            <li>التحويل بين U-Label وA-Label يتم عبر مكتبات جاهزة</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h4 className="font-bold mb-4">أمثلة عملية:</h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold">Python - تحويل اسم نطاق:</h5>
              <pre className="bg-gray-800 text-white p-4 rounded">
                {`import idna
domain = "موقع.شبكة"
domain_alabel = idna.encode(domain).decode('ascii')
print(domain_alabel)`}
              </pre>
            </div>
            <div>
              <h5 className="font-semibold">Java - تطبيع نص:</h5>
              <pre className="bg-gray-800 text-white p-4 rounded">
                {`Normalizer2 normalizer = Normalizer2.getNFCInstance();
String normalizedInput = normalizer.normalize("موقع.شبكة");`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h5 className="font-bold mb-2">ملاحظة تقنية:</h5>
              <p>دائماً اختبر النصوص قبل المعالجة باستخدام وظائف التطبيع، لأن الاختلافات الصغيرة قد تؤدي إلى أخطاء في البحث أو التحقق.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    quiz: {
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
          question: 'أي مكتبة في Python يمكن استخدامها لتحويل U-Label إلى A-Label؟',
          options: [
            'socket',
            'idna',
            'random'
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    title: 'إرسال واستقبال البريد الإلكتروني الدولي (EAI)',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <h2>مقدمة</h2>
        <p>
          مع التوسع في دعم البريد الإلكتروني الدولي (EAI)، يجب على التطبيقات الحديثة أن تكون قادرة على إرسال واستقبال الرسائل التي تحتوي على أسماء نطاقات وعناوين بريد مكتوبة بلغات غير لاتينية.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4">متطلبات دعم EAI:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>دعم SMTPUTF8 في بروتوكول إرسال البريد</li>
            <li>استخدام مكتبات إرسال بريد تدعم Unicode بشكل كامل</li>
            <li>التعامل مع التحقق من عناوين البريد الإلكتروني بشكل صحيح قبل الإرسال</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-bold mb-2">خطوات إرسال بريد إلكتروني دولي:</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>التأكد من تطبيع عنوان البريد الإلكتروني</li>
            <li>تحويل اسم النطاق إلى A-Label إن لزم الأمر</li>
            <li>إعداد الجلسة البريدية باستخدام دعم UTF-8</li>
          </ol>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h4 className="font-bold mb-4">مثال عملي:</h4>
          <div>
            <h5 className="font-semibold">Python - إرسال بريد باستخدام smtplib:</h5>
            <pre className="bg-gray-800 text-white p-4 rounded">
              {`import smtplib
from email.message import EmailMessage
msg = EmailMessage()
msg['Subject'] = 'مرحبا'
msg['From'] = 'مرسل@مثال.شبكة'
msg['To'] = 'مستلم@موقع.شبكة'
msg.set_content('محتوى الرسالة')
smtp = smtplib.SMTP('smtp.example.com')
smtp.send_message(msg)
smtp.quit()`}
            </pre>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h5 className="font-bold mb-2">ملاحظة تقنية:</h5>
              <p>بعض خوادم البريد لا تدعم SMTPUTF8، لذلك يجب اختبار التوافق أولاً.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    quiz: {
      questions: [
        {
          question: 'ما البروتوكول الذي يحتاج إلى دعم SMTPUTF8 لإرسال EAI؟',
          options: [
            'HTTP',
            'SMTP',
            'FTP'
          ],
          correctAnswer: 1
        },
        {
          question: 'لماذا يجب تحويل أسماء النطاقات إلى A-Label قبل الإرسال؟',
          options: [
            'لأنها أسهل للقراءة',
            'لأنها مطلوبة من قبل DNS',
            'لجعل البريد أصغر'
          ],
          correctAnswer: 1
        },
        {
          question: 'ماذا يحدث إذا حاولت إرسال بريد EAI إلى خادم لا يدعم SMTPUTF8؟',
          options: [
            'يتم الإرسال بنجاح',
            'يتم رفض الرسالة',
            'يتم تغيير البريد تلقائيًا'
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    title: 'التحديات البرمجية وحلولها',
    content: (
      <div className="prose max-w-none" dir="rtl">
        <h2>مقدمة</h2>
        <p>
          رغم التقدم الكبير في دعم القبول الشامل، يواجه المطورون تحديات برمجية متنوعة تتعلق بالتحقق، العرض، والتوافق مع الأنظمة القديمة.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4">أهم التحديات:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>التعامل مع أنظمة لا تدعم Unicode</li>
            <li>مشاكل في عرض النصوص ثنائية الاتجاه (مثل العربية والعبرية)</li>
            <li>أخطاء التحقق باستخدام قواعد قديمة تعتمد على ASCII فقط</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-bold mb-2">حلول مقترحة:</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>استخدام مكتبات حديثة لدعم Unicode وIDNA2008</li>
            <li>التأكد من أن جميع مدخلات ومخرجات النظام تطبق التطبيع</li>
            <li>اختبار النظام باستخدام بيانات حقيقية متعددة اللغات</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h4 className="font-bold mb-4">مثال عملي:</h4>
          <div>
            <h5 className="font-semibold">اختبار التطبيع قبل تخزين البريد الإلكتروني:</h5>
            <pre className="bg-gray-800 text-white p-4 rounded">
              {`import unicodedata
email = "مستخدم@موقع.شبكة"
normalized_email = unicodedata.normalize('NFC', email)`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <h4 className="font-bold mb-2">ملاحظة تقنية:</h4>
          <p>كتابة اختبارات آلية Automated Tests ببيانات بلغات مختلفة يعتبر جزءًا أساسياً لضمان دعم UA.</p>
        </div>
      </div>
    ),
    quiz: {
      questions: [
        {
          question: 'ما أحد أكبر التحديات في دعم القبول الشامل؟',
          options: [
            'سرعة البرمجة',
            'التعامل مع النصوص المتعددة اللغات',
            'تصميم واجهة المستخدم'
          ],
          correctAnswer: 1
        },
        {
          question: 'ما الحل المناسب لمشكلة عرض نص عربي بشكل معكوس؟',
          options: [
            'تجاهل النصوص العربية',
            'استخدام دعم اتجاه النص (RTL)',
            'تغيير النص للإنجليزية'
          ],
          correctAnswer: 1
        },
        {
          question: 'ما أهمية التطبيع (Normalization) أثناء البرمجة؟',
          options: [
            'ضمان توافق البيانات مع العمليات',
            'زيادة حجم الملفات',
            'تسريع تحميل الصفحة'
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