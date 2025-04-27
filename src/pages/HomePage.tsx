import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, Lock } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-900 to-secondary-900 text-white min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              بناء إنترنت مقبول عالمياً للجميع
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              النطاقات والبريد الإلكتروني العربي لويب عالمي حقيقي
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button to="/learn" size="lg" variant="primary">
                ابدأ التعلم
              </Button>
              <Button to="/about" size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                اعرف المزيد
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <Section background="light" id="about-preview">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">عن القبول العالمي (UA)</h2>
            <p className="text-lg text-gray-700 mb-6">
              القبول العالمي (UA) يضمن أن جميع أسماء النطاقات وعناوين البريد الإلكتروني يمكن استخدامها من قبل جميع التطبيقات والأجهزة والأنظمة المتصلة بالإنترنت.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              مع استمرار توسع الإنترنت بنطاقات المستوى الأعلى الجديدة بمختلف النصوص واللغات،
              يصبح القبول العالمي ضرورياً لتجربة إنترنت عالمية وشاملة حقاً.
            </p>
            <div className="mt-8">
              <Button to="/about" rightIcon={<ArrowRight size={18} />}>
                تعرف أكثر على القبول العالمي
              </Button>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">ما هو القبول العالمي (UA)؟</h3>
            <div className="space-y-4 text-gray-600">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-primary-100 p-1 ml-3 mt-1">
                  <Globe className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">الشمولية</h4>
                  <p className="text-gray-600">ضمان دعم جميع اللغات والنصوص عبر الإنترنت</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary-100 p-1 ml-3 mt-1">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">سهولة الوصول</h4>
                  <p className="text-gray-600">جعل الإنترنت في متناول المليارات من المستخدمين الجدد</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary-100 p-1 ml-3 mt-1">
                  <Lock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">الابتكار</h4>
                  <p className="text-gray-600">دفع التقنيات والمعايير الجديدة للتواصل العالمي</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Features Preview */}
      <Section title="ميزات ذكية مدعومة بالذكاء الاصطناعي" centered>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card interactive className="p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary-600">
                <path d="M12 20h9m-9-3h7m-7-3h9m-9-3h7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">تعلم</h3>
            <p className="text-gray-600">وحدات تعليمية تفاعلية حول القبول العالمي</p>
            <Button to="/learn" variant="ghost" size="sm" className="mt-4">
              ابدأ التعلم
            </Button>
          </Card>
          
          <Card interactive className="p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary-600">
                <path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7" />
                <path d="M16 3h5v5" />
                <path d="M10 14 21 3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">المصادر</h3>
            <p className="text-gray-600">الوصول إلى الأدلة والوثائق والأدوات</p>
            <Button to="/resources" variant="ghost" size="sm" className="mt-4">
              عرض المصادر
            </Button>
          </Card>
          
          <Card interactive className="p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary-600">
                <path d="M14 7v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
                <path d="M7 12v-1a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">المجتمع</h3>
            <p className="text-gray-600">انضم إلى مجتمعنا العالمي من مناصري القبول العالمي</p>
            <Button to="/contact" variant="ghost" size="sm" className="mt-4">
              انضم الآن
            </Button>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">ابدأ رحلة التعلم</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          اكتشف كيف يجعل القبول العالمي الإنترنت أكثر شمولية وسهولة في الوصول للجميع.
        </p>
        <Button to="/learn" size="lg" variant="accent" className="mx-auto">
          انتقل إلى صفحة التعلم
        </Button>
      </Section>
    </>
  );
};

export default HomePage;