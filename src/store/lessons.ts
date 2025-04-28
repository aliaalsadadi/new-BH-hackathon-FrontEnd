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
      title: 'ما هو القبول الشامل (UA)؟',
      description: 'تعرف على أساسيات القبول الشامل وأهميته',
      content: `
        <div class="prose max-w-none">
          <h2>مقدمة</h2>
          <p>في عالمنا الرقمي، يحتاج الأفراد إلى استخدام الإنترنت بلغاتهم الخاصة، وليس فقط بالحروف اللاتينية. القبول الشامل (Universal Acceptance - UA) هو مبدأ أساسي يضمن أن جميع أسماء النطاقات وعناوين البريد الإلكتروني — بغض النظر عن اللغة أو الطول أو الرموز — يجب أن تعمل بشكل صحيح في جميع الأنظمة والتطبيقات بدون مشاكل.</p>
          
          <h3>المفاهيم الأساسية</h3>
          <h4>تعريف القبول الشامل:</h4>
          <p>القبول الشامل يعني أن أي اسم نطاق أو عنوان بريد إلكتروني — سواء كان مكتوبًا بالأحرف اللاتينية أو العربية أو الصينية — يجب أن يتم قبوله ومعالجته وعرضه بشكل طبيعي في البرمجيات.</p>
          <p><strong>مثال:</strong></p>
          <ul>
            <li>اسم نطاق: موقع.مثال</li>
            <li>بريد إلكتروني: مستخدم@موقع.شبكة</li>
          </ul>

          <h4>لماذا القبول الشامل مهم؟</h4>
          <ul>
            <li>توسيع الوصول: يسمح للمستخدمين باستخدام لغاتهم المحلية.</li>
            <li>تحقيق المساواة الرقمية: يمنع تمييز اللغات والرموز.</li>
            <li>تشجيع الابتكار: يفتح فرصًا للشركات لبناء تطبيقات تدعم الجميع.</li>
          </ul>

          <h4>أنواع أسماء النطاقات وعناوين البريد الإلكتروني:</h4>
          <ul>
            <li>ASCII: مثل example.com</li>
            <li>IDN (Internationalized Domain Names): مثل موقع.السعودية</li>
            <li>EAI (Email Address Internationalization): مثل مستخدم@موقع.شبكة</li>
          </ul>

          <h4>أمثلة عملية:</h4>
          <ol>
            <li>تسجيل نطاق باللغة العربية: "تعليم.موقع"</li>
            <li>إرسال بريد إلكتروني دولي: من "طالب@جامعة.السعودية" إلى "أستاذ@مثال.كوم"</li>
          </ol>
          <p><strong>ملاحظة تقنية:</strong> حتى اليوم، هناك برمجيات لا تدعم UA بشكل كامل. لهذا السبب، يجب اختبار البرمجيات وتحديثها لتكون "UA جاهزة".</p>

          <h4>مراجعة داخلية:</h4>
          <p>✅ هل تعتقد أن عنوان البريد الإلكتروني "مستخدم@موقع.شبكة" سيتم قبوله دائمًا في جميع المواقع الإلكترونية القديمة؟</p>
          <p><strong>الجواب:</strong> ❌ لا، بعض الأنظمة القديمة قد ترفضه بسبب عدم دعم Unicode.</p>
        </div>
      `,
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
          },
          {
            question: 'جميع البرمجيات تدعم القبول الشامل بشكل كامل. (صح أم خطأ)',
            options: ['✅ صحيح', '❌ خطأ'],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 2,
      level: 'beginner',
      title: 'الأساسيات: Unicode وIDN وEAI',
      description: 'فهم الأساسيات التقنية للقبول الشامل',
      content: `
        <div class="prose max-w-none">
          <h2>مقدمة</h2>
          <p>لفهم القبول الشامل بشكل صحيح، يجب أن نبدأ من أساسيات تمثيل النصوص في الحاسوب. بدون معرفة الفروقات بين ASCII وUnicode، ومفاهيم IDN وEAI، سيكون من الصعب بناء برمجيات تدعم جميع المستخدمين.</p>
          
          <h3>المفاهيم الأساسية</h3>
          <h4>الفرق بين ASCII وUnicode:</h4>
          <ul>
            <li><strong>ASCII:</strong> نظام ترميز قديم يستخدم 7 بتات فقط ويدعم الحروف اللاتينية (A-Z)، الأرقام (0-9) وبعض الرموز البسيطة.</li>
            <li><strong>Unicode:</strong> نظام ترميز حديث يدعم معظم لغات العالم، مثل العربية، الصينية، الهندية...، باستخدام تشفير مرن يصل إلى 32 بت.</li>
          </ul>
          <p><strong>مثال:</strong> الكلمة "سلام" لا يمكن تمثيلها بـ ASCII، ولكن يمكن تمثيلها بـ Unicode.</p>

          <h4>ما هو IDN؟</h4>
          <p>IDN = Internationalized Domain Name</p>
          <p>أسماء النطاقات التي تحتوي على حروف غير لاتينية مثل: "موقع.السعودية"</p>

          <h4>ما هو EAI؟</h4>
          <p>EAI = Email Address Internationalization</p>
          <p>إمكانية استخدام حروف غير لاتينية في الجزء المحلي من البريد الإلكتروني، مثل: مستخدم@مثال.شبكة</p>

          <h4>أمثلة عملية:</h4>
          <table>
            <thead>
              <tr>
                <th>المفهوم</th>
                <th>مثال</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ASCII</td>
                <td>www.example.com</td>
              </tr>
              <tr>
                <td>IDN</td>
                <td>موقع.شبكة</td>
              </tr>
              <tr>
                <td>EAI</td>
                <td>مستخدم@موقع.شبكة</td>
              </tr>
            </tbody>
          </table>

          <h4>ملاحظة تقنية:</h4>
          <p>رغم أن معظم الأنظمة الحديثة تدعم Unicode، إلا أن بعض البرمجيات القديمة قد تُسبب أخطاء عند التعامل مع IDN أو EAI.</p>

          <h4>مراجعة داخلية:</h4>
          <p>✅ هل البريد الإلكتروني "مستخدم@موقع.شبكة" يحتاج إلى Unicode أو ASCII؟</p>
          <p><strong>الجواب:</strong> ✅ Unicode</p>
        </div>
      `,
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
          },
          {
            question: 'Unicode يسمح بتمثيل نصوص بأحرف صينية وعربية. (صح أم خطأ)',
            options: ['✅ صحيح', '❌ خطأ'],
            correctAnswer: 0
          }
        ]
      }
    },
    {
      id: 3,
      level: 'beginner',
      title: 'التحديات وأثر القبول الشامل',
      description: 'تعرف على التحديات وأثر القبول الشامل على العالم الرقمي',
      content: `
        <div class="prose max-w-none">
          <h2>مقدمة</h2>
          <p>القبول الشامل لا يعني فقط دعم أسماء النطاقات والبريد الإلكتروني. بل يتعلق أيضًا بإزالة الحواجز الرقمية وإتاحة الإنترنت للجميع.</p>
          
          <h3>المفاهيم الأساسية</h3>
          <h4>التحديات عند غياب القبول الشامل:</h4>
          <ul>
            <li>فشل تسجيل النطاقات بلغات محلية.</li>
            <li>رفض نماذج التسجيل لعناوين بريد إلكتروني دولية.</li>
            <li>مشاكل في عرض النصوص ذات اتجاه من اليمين إلى اليسار (RTL).</li>
          </ul>

          <h4>أثر القبول الشامل على العالم الرقمي:</h4>
          <ul>
            <li><strong>تحسين الشمولية الرقمية:</strong> يسمح لمزيد من الأشخاص باستخدام الإنترنت بلغاتهم الأصلية.</li>
            <li><strong>دعم النمو الاقتصادي:</strong> يفتح فرصًا جديدة للأسواق المحلية والدولية.</li>
          </ul>

          <h4>الجهات المستفيدة من UA:</h4>
          <ul>
            <li>المطورون</li>
            <li>الحكومات</li>
            <li>الشركات الناشئة</li>
            <li>المؤسسات التعليمية</li>
          </ul>

          <h4>أمثلة عملية:</h4>
          <ul>
            <li>موقع يرفض تسجيل بريد إلكتروني مثل "مستخدم@مثال.شبكة" ➔ <strong>مشكلة UA</strong>.</li>
            <li>موقع يقبل جميع اللغات ويعالج النصوص بشكل صحيح ➔ <strong>يدعم UA</strong>.</li>
          </ul>

          <h4>ملاحظة تقنية:</h4>
          <p>إهمال دعم UA يمكن أن يؤدي إلى فقدان شريحة ضخمة من المستخدمين المحتملين.</p>

          <h4>مراجعة داخلية:</h4>
          <p>✅ هل دعم القبول الشامل ضروري فقط للمستخدمين الذين يتحدثون الإنجليزية؟</p>
          <p><strong>الجواب:</strong> ❌ خطأ، بل هو ضروري لجميع اللغات.</p>
        </div>
      `,
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
          },
          {
            question: 'القبول الشامل ليس ضرورياً إذا كان الموقع مخصصًا لمستخدمين محليين فقط. (صح أم خطأ)',
            options: ['✅ صحيح', '❌ خطأ'],
            correctAnswer: 1
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