import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlignLeft, Languages, Brain, BarChart, BookOpen, Globe, Code, FileText } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import FeatureCard from '../components/ui/FeatureCard';
import Button from '../components/ui/Button';

const ToolsPage: React.FC = () => {
  const [domainInput, setDomainInput] = useState('');
  const [resultLink, setResultLink] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTranslate = async () => {
    setErrorMessage(null);
    setResultLink(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/api/linkify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: domainInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setResultLink(data.link);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to process the input.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An unexpected error occurred.');
    }
  };
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">الأدوات</h1>
            <p className="text-xl text-gray-300">
              اكتشف أدواتنا المبتكرة والمصادر المصممة لمساعدتك في فهم وتطبيق القبول العالمي
            </p>
          </motion.div>
        </div>
      </div>

      {/* AI Tools Section */}
      <Section
        title="أدوات ذكية مدعومة بالذكاء الاصطناعي"
        subtitle="أدوات متقدمة لمساعدتك في فهم وتطبيق القبول العالمي بشكل أفضل"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="روبوت المحادثة"
            description="احصل على إجابات فورية لأسئلتك حول القبول العالمي من خلال روبوت المحادثة المدعوم بالذكاء الاصطناعي"
            icon={<MessageSquare className="w-6 h-6" />}
            link="/tools/chatbot"
          />

          <FeatureCard
            title="المترجم"
            description="ترجمة فورية لأسماء النطاقات والمصطلحات التقنية عبر لغات ونصوص متعددة"
            icon={<Languages className="w-6 h-6" />}
            link="/tools/translator"
          />

          <FeatureCard
            title="الملخص"
            description="تلخيص سريع للوثائق التقنية المعقدة والمواصفات الخاصة بالقبول العالمي"
            icon={<AlignLeft className="w-6 h-6" />}
            link="/tools/summarizer"
          />

          <FeatureCard
            title="ABC"
            description="أداة متقدمة لتحليل المستندات والنصوص"
            icon={<FileText className="w-6 h-6" />}
            link="/tools/abc"
          />
        </div>
      </Section>

      {/* Translator Feature */}
      <Section background="light" id="translator">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">مترجم أسماء النطاقات</h2>
            <p className="text-lg text-gray-700 mb-6">
              أداة الترجمة المتقدمة تساعدك في تحويل أسماء النطاقات بين النصوص واللغات المختلفة،
              بما في ذلك العربية والصينية والسيريلية والمزيد.
            </p>
            <div className="mt-8">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 mb-4"
                placeholder="example.com أو مثال.عربي"
              />
              <Button variant="primary" onClick={handleTranslate}>
                ترجم
              </Button>
              {resultLink && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">النتيجة:</h4>
                  <a
                    href={resultLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    {resultLink}
                  </a>
                </div>
              )}
              {errorMessage && (
                <div className="mt-4 text-red-600">
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
          <Card className="p-8 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">مترجم أسماء النطاقات</h3>
            <p className="text-gray-700">
              أدخل اسم النطاق أو البريد الإلكتروني لتحويله إلى رابط قابل للنقر باستخدام
              تنسيق Punycode.
            </p>
          </Card>
        </div>
      </Section>

      {/* Summarizer Feature */}
      <Section id="summarizer">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Card className="p-8 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">ملخص الوثائق التقنية</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="document-url" className="block text-sm font-medium text-gray-700 mb-1">
                  رابط الوثيقة أو النص:
                </label>
                <input
                  type="text"
                  id="document-url"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://example.com/ua-document.pdf أو الصق النص"
                />
              </div>

              <div>
                <label htmlFor="summary-length" className="block text-sm font-medium text-gray-700 mb-1">
                  طول الملخص:
                </label>
                <select
                  id="summary-length"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="short">قصير (فقرة واحدة)</option>
                  <option value="medium">متوسط (3 فقرات)</option>
                  <option value="long">طويل (5 فقرات)</option>
                </select>
              </div>

              <Button variant="primary" className="w-full">لخص</Button>

              <div className="mt-4 p-4 bg-gray-50 rounded-md h-48 overflow-y-auto">
                <h4 className="text-sm font-medium text-gray-700 mb-2">الملخص:</h4>
                <p className="text-gray-800">
                  القبول العالمي (UA) يضمن أن جميع أسماء النطاقات وعناوين البريد الإلكتروني يمكن استخدامها من قبل جميع التطبيقات والأجهزة والأنظمة المتصلة بالإنترنت. وهذا يشمل نطاقات المستوى الأعلى الجديدة وأسماء النطاقات الدولية بالنصوص غير اللاتينية.
                </p>
                <p className="text-gray-800 mt-2">
                  تحدد الوثيقة المتطلبات التقنية للمطورين لضمان أن تطبيقاتهم جاهزة للقبول العالمي، بما في ذلك التحقق والتخزين والمعالجة وعرض جميع أسماء النطاقات وعناوين البريد الإلكتروني الصالحة.
                </p>
              </div>
            </div>
          </Card>
          <div>
            <h2 className="section-title">ملخص الوثائق التقنية</h2>
            <p className="text-lg text-gray-700 mb-6">
              يساعدك ملخصنا المدعوم بالذكاء الاصطناعي في فهم النقاط الرئيسية للوثائق التقنية المعقدة،
              والمواصفات والإرشادات الخاصة بالقبول العالمي بسرعة.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              ما عليك سوى إدخال رابط للوثيقة أو لصق النص مباشرة، وستقوم أداتنا بإنشاء ملخص موجز
              يسلط الضوء على أهم المعلومات، مما يوفر وقتك مع ضمان عدم فقدان التفاصيل المهمة.
            </p>
            <div className="mt-8">
              <Button variant="primary">جرب الملخص</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Other Features */}
      <Section background="light" title="ميزات إضافية" centered>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <BarChart className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">فاحص جاهزية القبول العالمي</h3>
            <p className="text-gray-700 mb-4">
              اختبر ما إذا كان تطبيقك أو موقعك يتعامل بشكل صحيح مع أسماء النطاقات وعناوين البريد الإلكتروني الدولية.
            </p>
            <Button variant="outline" size="sm">افحص الآن</Button>
          </Card>

          <Card className="p-6">
            <Globe className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">محول أسماء النطاقات الدولية</h3>
            <p className="text-gray-700 mb-4">
              التحويل بين تمثيلات Unicode و Punycode لأسماء النطاقات الدولية.
            </p>
            <Button variant="outline" size="sm">حول</Button>
          </Card>

          <Card className="p-6">
            <Code className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">مصادر المطورين</h3>
            <p className="text-gray-700 mb-4">
              الوصول إلى مكتبات الكود، وواجهات برمجة التطبيقات، والوثائق التقنية لجعل تطبيقاتك جاهزة للقبول العالمي.
            </p>
            <Button variant="outline" size="sm">عرض المصادر</Button>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">هل أنت مستعد للبدء؟</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          اكتشف مصادر التعلم لدينا لفهم كيف يجعل القبول العالمي الإنترنت أكثر شمولية.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/learn" size="lg" variant="primary">
            ابدأ التعلم
          </Button>
          <Button to="/contact" size="lg" variant="outline">
            اتصل بنا
          </Button>
        </div>
      </Section>
    </>
  );
};

export default ToolsPage;