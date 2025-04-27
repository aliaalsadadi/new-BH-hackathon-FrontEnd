import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useBadgeStore from './badges';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: number;
  level: string;
  title: string;
  description: string;
  content: string;
  quiz: {
    questions: Question[];
  };
}

interface LessonProgress {
  completed: boolean;
  score: number;
}

interface LessonStore {
  lessons: Record<string, Lesson[]>;
  progress: Record<string, Record<number, LessonProgress>>;
  currentLevel: string;
  setCurrentLevel: (level: string) => void;
  completeLesson: (level: string, lessonId: number, score: number) => void;
  getLessonProgress: (level: string, lessonId: number) => LessonProgress;
  isLessonAvailable: (level: string, lessonId: number) => boolean;
}

const lessonContent = {
  beginner: [
    {
      id: 1,
      level: 'beginner',
      title: 'ما هو القبول الشامل؟ ',
      description: 'تعرف على أساسيات القبول الشامل وأهميته',
      content: `
        <div class="prose max-w-none">
          <h2>:مقدمة</h2>
          <p>في عالمنا الرقمي، يحتاج الأفراد إلى استخدام الإنترنت بلغاتهم الخاصة، وليس فقط بالحروف اللاتينية. القبول الشامل (Universal Acceptance - UA) هو مبدأ أساسي يضمن أن جميع أسماء النطاقات وعناوين البريد الإلكتروني — بغض النظر عن اللغة أو الطول أو الرموز — يجب أن تعمل بشكل صحيح في جميع الأنظمة والتطبيقات بدون مشاكل.</p>
          
          <h3>:المفاهيم الأساسية</h3>
          <ul>
           
تعريف القبول الشامل:
القبول الشامل يعني أن أي اسم نطاق أو عنوان بريد إلكتروني — سواء كان مكتوبًا بالأحرف اللاتينية أو العربية أو الصينية — يجب أن يتم قبوله ومعالجته وعرضه بشكل طبيعي في البرمجيات.
مثال:
•	اسم نطاق: موقع.مثال
•	بريد إلكتروني: مستخدم@موقع.شبكة

          </ul>

         </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هو الهدف الرئيسي من القبول العالمي؟',
            options: [
              'ضمان عمل جميع أسماء النطاقات وعناوين البريد الإلكتروني',
              'زيادة سرعة الإنترنت',
              'تقليل تكلفة استضافة المواقع',
              'تحسين أمان الإنترنت'
            ],
            correctAnswer: 0
          },
          {
            question: 'أي مما يلي ليس من مكونات القبول العالمي؟',
            options: [
              'أسماء النطاقات الدولية',
              'تدويل عناوين البريد الإلكتروني',
              'تحسين سرعة التحميل',
              'دعم النصوص المختلفة'
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      id: 2,
      level: 'beginner',
      title: 'أسماء النطاقات الدولية',
      description: 'فهم أسماء النطاقات الدولية وكيفية عملها',
      content: `
        <div class="prose max-w-none">
          <h2>أسماء النطاقات الدولية (IDNs)</h2>
          <p>
            النطاقات الدولية هي النطاقات التي تحتوي على أحرف غير ASCII. مثلاً، "مثال.مصر" أو "你好.中国".
            يُمكن تحويل هذه النطاقات إلى صيغة ASCII عبر Punycode لتمكين الأنظمة القديمة من معالجتها.
          </p>

          <h3>كيف تعمل أسماء النطاقات الدولية؟</h3>
          <ul>
            <li>تستخدم ترميز Unicode لتمثيل الأحرف</li>
            <li>يتم تحويلها إلى Punycode للتوافق</li>
            <li>تدعم مختلف النصوص واللغات</li>
          </ul>

          <h3>مثال على Punycode:</h3>
          <pre>
            مثال.مصر → xn--mgbh0fb.xn--wgbh1c
          </pre>

          <h3>✅ نقاط المراجعة الرئيسية:</h3>
          <ul>
            <li>IDNs تسمح باستخدام الأحرف غير اللاتينية</li>
            <li>Punycode يحول النص إلى صيغة ASCII</li>
            <li>تدعم جميع لغات العالم</li>
          </ul>
        </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هو الغرض من Punycode؟',
            options: [
              'تشفير النطاقات',
              'تحويل النطاقات الدولية إلى صيغة ASCII',
              'تسريع تحميل المواقع',
              'حماية النطاقات من القرصنة'
            ],
            correctAnswer: 1
          },
          {
            question: 'أي من التالي يعتبر اسم نطاق دولي صحيح؟',
            options: [
              'example.com',
              'مثال.السعودية',
              'domain.net',
              'website.org'
            ],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 3,
      level: 'beginner',
      title: 'تدويل عناوين البريد الإلكتروني',
      description: 'تعلم كيفية دعم عناوين البريد الإلكتروني الدولية',
      content: `
        <div class="prose max-w-none">
          <h2>تدويل عناوين البريد الإلكتروني (EAI)</h2>
          <p>
            تدويل عناوين البريد الإلكتروني يسمح باستخدام الأحرف غير اللاتينية في عناوين البريد الإلكتروني،
            مثل: محمد@مثال.السعودية
          </p>

          <h3>المتطلبات التقنية:</h3>
          <ul>
            <li>دعم Unicode في خوادم البريد</li>
            <li>تحديث بروتوكولات البريد</li>
            <li>تحديث برامج البريد الإلكتروني</li>
          </ul>

          <h3>التحديات:</h3>
          <ul>
            <li>توافق الأنظمة القديمة</li>
            <li>معالجة النصوص ثنائية الاتجاه</li>
            <li>تحديث البنية التحتية</li>
          </ul>

          <h3>✅ نقاط المراجعة الرئيسية:</h3>
          <ul>
            <li>EAI يدعم الأحرف غير اللاتينية</li>
            <li>يتطلب تحديث الأنظمة والبروتوكولات</li>
            <li>يواجه تحديات التوافق</li>
          </ul>
        </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هو الغرض من تدويل عناوين البريد الإلكتروني؟',
            options: [
              'تسريع إرسال البريد',
              'السماح باستخدام الأحرف غير اللاتينية',
              'تقليل البريد المزعج',
              'زيادة سعة البريد'
            ],
            correctAnswer: 1
          },
          {
            question: 'أي من التالي يعتبر من متطلبات EAI؟',
            options: [
              'تغيير نظام التشغيل',
              'شراء خادم جديد',
              'دعم Unicode في الخوادم',
              'تغيير مزود الإنترنت'
            ],
            correctAnswer: 2
          }
        ]
      }
    }
  ],
  intermediate: [
    {
      id: 1,
      level: 'intermediate',
      title: 'التحقق من صحة النطاقات الدولية',
      description: 'تعلم كيفية التحقق من صحة النطاقات الدولية',
      content: `
        <div class="prose max-w-none">
          <h2>التحقق من صحة النطاقات الدولية</h2>
          <p>
            يتطلب التحقق من صحة النطاقات الدولية فهماً عميقاً لقواعد IDNA وكيفية معالجة النصوص المختلفة.
          </p>

          <h3>خطوات التحقق:</h3>
          <ol>
            <li>التحقق من صحة الأحرف</li>
            <li>تطبيق قواعد IDNA</li>
            <li>التحويل إلى Punycode</li>
            <li>التحقق من الطول الإجمالي</li>
          </ol>

          <h3>أمثلة على التحقق:</h3>
          <pre>
            isValidDomain("مثال.مصر") → true
            isValidDomain("example--invalid.com") → false
          </pre>

          <h3>✅ نقاط المراجعة الرئيسية:</h3>
          <ul>
            <li>التحقق من صحة الأحرف مهم</li>
            <li>يجب تطبيق قواعد IDNA</li>
            <li>التحويل إلى Punycode ضروري</li>
          </ul>
        </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هي أول خطوة في التحقق من صحة النطاق الدولي؟',
            options: [
              'التحويل إلى Punycode',
              'التحقق من صحة الأحرف',
              'فحص طول النطاق',
              'تحويل النص إلى ASCII'
            ],
            correctAnswer: 1
          },
          {
            question: 'لماذا يعتبر التحويل إلى Punycode ضرورياً؟',
            options: [
              'لتسريع التحميل',
              'للتوافق مع الأنظمة القديمة',
              'لتحسين الأمان',
              'لتقليل حجم النطاق'
            ],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 2,
      level: 'intermediate',
      title: 'معالجة البريد الإلكتروني الدولي',
      description: 'تعلم كيفية معالجة عناوين البريد الإلكتروني الدولية',
      content: `
        <div class="prose max-w-none">
          <h2>معالجة البريد الإلكتروني الدولي</h2>
          <p>
            تتطلب معالجة البريد الإلكتروني الدولي فهماً لبروتوكولات البريد وكيفية التعامل مع النصوص المختلفة.
          </p>

          <h3>المتطلبات التقنية:</h3>
          <ul>
            <li>دعم SMTP UTF8</li>
            <li>معالجة النصوص ثنائية الاتجاه</li>
            <li>التحقق من صحة العناوين</li>
          </ul>

          <h3>مثال على المعالجة:</h3>
          <pre>
            محمد@مثال.السعودية
            ↓
            xn--mgbx@xn--mgberp4a5d4ar
          </pre>

          <h3>✅ نقاط المراجعة الرئيسية:</h3>
          <ul>
            <li>دعم SMTP UTF8 ضروري</li>
            <li>معالجة النصوص ثنائية الاتجاه مهمة</li>
            <li>التحقق من صحة العناوين إلزامي</li>
          </ul>
        </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هو المتطلب الأساسي لمعالجة البريد الإلكتروني الدولي؟',
            options: [
              'خادم جديد',
              'دعم SMTP UTF8',
              'تغيير مزود البريد',
              'تحديث نظام التشغيل'
            ],
            correctAnswer: 1
          },
          {
            question: 'لماذا تعتبر معالجة النصوص ثنائية الاتجاه مهمة؟',
            options: [
              'لتحسين السرعة',
              'للعرض الصحيح للنصوص العربية',
              'لتقليل حجم الرسائل',
              'لزيادة الأمان'
            ],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 3,
      level: 'intermediate',
      title: 'تخزين البيانات الدولية',
      description: 'تعلم كيفية تخزين البيانات متعددة اللغات',
      content: `
        <div class="prose max-w-none">
          <h2>تخزين البيانات الدولية</h2>
          <p>
            يتطلب تخزين البيانات الدولية استخدام الترميز المناسب وإعداد قواعد البيانات بشكل صحيح.
          </p>

          <h3>متطلبات التخزين:</h3>
          <ul>
            <li>استخدام UTF-8</li>
            <li>إعداد Collation المناسب</li>
            <li>معالجة النصوص بشكل صحيح</li>
          </ul>

          <h3>مثال على الإعداد:</h3>
          <pre>
            CREATE DATABASE mydb
            CHARACTER SET = utf8mb4
            COLLATE = utf8mb4_unicode_ci;
          </pre>

          <h3>✅ نقاط المراجعة الرئيسية:</h3>
          <ul>
            <li>استخدام UTF-8 ضروري</li>
            <li>اختيار Collation مناسب</li>
            <li>التعامل مع النصوص بحذر</li>
          </ul>
        </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هو أفضل ترميز لتخزين البيانات الدولية؟',
            options: [
              'ASCII',
              'UTF-8',
              'ISO-8859-1',
              'Windows-1252'
            ],
            correctAnswer: 1
          },
          {
            question: 'لماذا يعتبر اختيار Collation مهماً؟',
            options: [
              'لتحسين الأداء',
              'للفرز الصحيح للنصوص',
              'لتقليل حجم البيانات',
              'لزيادة الأمان'
            ],
            correctAnswer: 1
          }
        ]
      }
    }
  ],
  advanced: [
    {
      id: 1,
      level: 'advanced',
      title: 'أمان النطاقات الدولية',
      description: 'تعلم كيفية حماية النطاقات الدولية',
      content: `
        <div class="prose max-w-none">
          <h2>أمان النطاقات الدولية</h2>
          <p>
            يتطلب أمان النطاقات الدولية فهماً عميقاً للتهديدات المحتملة وكيفية الحماية منها.
          </p>

          <h3>التهديدات المحتملة:</h3>
          <ul>
            <li>هجمات التشابه البصري</li>
            <li>هجمات التحويل</li>
            <li>هجمات التصيد</li>
          </ul>

          <h3>طرق الحماية:</h3>
          <ol>
            <li>التحقق من النطاقات</li>
            <li>استخدام DNSSEC</li>
            <li>مراقبة النطاقات المشابهة</li>
          </ol>

          <h3>✅ نقاط المراجعة الرئيسية:</h3>
          <ul>
            <li>فهم التهديدات المحتملة</li>
            <li>تطبيق إجراءات الحماية</li>
            <li>استخدام DNSSEC</li>
          </ul>
        </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هو أكبر تهديد للنطاقات الدولية؟',
            options: [
              'بطء التحميل',
              'هجمات التشابه البصري',
              'استهلاك الموارد',
              'تكلفة التسجيل'
            ],
            correctAnswer: 1
          },
          {
            question: 'لماذا يعتبر DNSSEC مهماً؟',
            options: [
              'لتسريع DNS',
              'لحماية النطاقات من التزوير',
              'لتقليل التكلفة',
              'لتحسين الأداء'
            ],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 2,
      level: 'advanced',
      title: 'أداء النطاقات الدولية',
      description: 'تعلم كيفية تحسين أداء النطاقات الدولية',
      content: `
        <div class="prose max-w-none">
          <h2>أداء النطاقات الدولية</h2>
          <p>
            يتطلب تحسين أداء النطاقات الدولية فهماً عميقاً لكيفية معالجة النصوص وتحسين الأداء.
          </p>

          <h3>نقاط التحسين:</h3>
          <ul>
            <li>تحسين التحويل</li>
            <li>تخزين مؤقت للنتائج</li>
            <li>تحسين الخوارزميات</li>
          </ul>

          <h3>مثال على التحسين:</h3>
          <pre>
            // تخزين مؤقت للتحويل
            const cache = new Map();
            function convertIDN(domain) {
              if (cache.has(domain)) {
                return cache.get(domain);
              }
              const result = toASCII(domain);
              cache.set(domain, result);
              return result;
            }
          </pre>

          <h3>✅ نقاط المراجعة الرئيسية:</h3>
          <ul>
            <li>استخدام التخزين المؤقت</li>
            <li>تحسين الخوارزميات</li>
            <li>قياس الأداء</li>
          </ul>
        </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هي أفضل طريقة لتحسين أداء تحويل النطاقات الدولية؟',
            options: [
              'تجاهل التحويل',
              'استخدام التخزين المؤقت',
              'تقليل عدد النطاقات',
              'تغيير الخادم'
            ],
            correctAnswer: 1
          },
          {
            question: 'لماذا يعتبر قياس الأداء مهماً؟',
            options: [
              'لتقليل التكلفة',
              'لتحديد نقاط التحسين',
              'لزيادة الأمان',
              'لتحسين المظهر'
            ],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 3,
      level: 'advanced',
      title: 'تكامل النظم الدولية',
      description: 'تعلم كيفية تكامل النظم مع القبول العالمي',
      content: `
        <div class="prose max-w-none">
          <h2>تكامل النظم الدولية</h2>
          <p>
            يتطلب تكامل النظم مع القبول العالمي فهماً شاملاً لكيفية عمل النظم المختلفة معاً.
          </p>

          <h3>متطلبات التكامل:</h3>
          <ul>
            <li>توحيد المعايير</li>
            <li>تنسيق البروتوكولات</li>
            <li>إدارة التوافق</li>
          </ul>

          <h3>مثال على التكامل:</h3>
          <pre>
            // تكامل مع نظام البريد
            async function sendEmail(to, subject, body) {
              const normalizedTo = normalizeEmail(to);
              const supported = await checkEAISupport(normalizedTo);
              if (supported) {
                return sendEAIEmail(to, subject, body);
              }
              return sendLegacyEmail(to, subject, body);
            }
          </pre>

          <h3>✅ نقاط المراجعة الرئيسية:</h3>
          <ul>
            <li>توحيد المعايير مهم</li>
            <li>إدارة التوافق ضرورية</li>
            <li>اختبار التكامل إلزامي</li>
          </ul>
        </div>
      `,
      quiz: {
        questions: [
          {
            question: 'ما هو أهم جانب في تكامل النظم الدولية؟',
            options: [
              'تقليل التكلفة',
              'توحيد المعايير',
              'تغيير النظام',
              'زيادة السرعة'
            ],
            correctAnswer: 1
          },
          {
            question: 'لماذا تعتبر إدارة التوافق مهمة؟',
            options: [
              'لتقليل التكلفة',
              'لضمان عمل النظم معاً',
              'لتحسين المظهر',
              'لزيادة السرعة'
            ],
            correctAnswer: 1
          }
        ]
      }
    }
  ]
};

const useLessonStore = create<LessonStore>()(
  persist(
    (set, get) => ({
      lessons: lessonContent,
      progress: {},
      currentLevel: 'beginner',
      
      setCurrentLevel: (level) => set({ currentLevel: level }),
      
      completeLesson: (level, lessonId, score) => {
        const badgeStore = useBadgeStore.getState();
        
        // Award badges based on progress
        if (level === 'beginner' && lessonId === 1 && score >= 70) {
          badgeStore.earnBadge('beginner');
        }
        
        if (level === 'beginner' && lessonId === 3 && score >= 70) {
          badgeStore.earnBadge('explorer');
        }
        
        if (level === 'intermediate' && lessonId === 3 && score >= 70) {
          badgeStore.earnBadge('advanced_explorer');
        }
        
        if (level === 'advanced' && lessonId === 3 && score >= 70) {
          badgeStore.earnBadge('expert');
          
          // Check if all lessons are completed for champion badge
          const allLevels = ['beginner', 'intermediate', 'advanced'];
          const allCompleted = allLevels.every(lvl => {
            const levelLessons = get().lessons[lvl];
            return levelLessons.every(lesson => {
              const progress = get().getLessonProgress(lvl, lesson.id);
              return progress.completed && progress.score >= 70;
            });
          });
          
          if (allCompleted) {
            badgeStore.earnBadge('champion');
          }
        }
        
        set((state) => ({
          progress: {
            ...state.progress,
            [level]: {
              ...state.progress[level],
              [lessonId]: { completed: true, score }
            }
          }
        }));
      },
      
      getLessonProgress: (level, lessonId) => {
        const state = get();
        return state.progress[level]?.[lessonId] || { completed: false, score: 0 };
      },
      
      isLessonAvailable: (level, lessonId) => {
        const state = get();
        if (lessonId === 1) return true;
        
        const previousLesson = state.progress[level]?.[lessonId - 1];
        return previousLesson?.completed && previousLesson.score >= 70;
      }
    }),
    {
      name: 'lesson-store'
    }
  )
);

export default useLessonStore;