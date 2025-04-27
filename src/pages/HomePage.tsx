import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, Lock, Bell, Mail } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SubscriptionForm from '../components/ui/SubscriptionForm';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section with Enhanced Header */}
      <div className="relative bg-gradient-to-r from-primary-900 to-secondary-900 text-white min-h-[90vh] flex items-center">
        {/* Better header image with improved overlay */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 to-secondary-900/70 mix-blend-multiply"></div>
        
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
              className="text-xl md:text-2xl mb-8 text-gray-100"
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
              <Button to="/learn" size="lg" variant="primary" className="bg-accent-600 hover:bg-accent-700 focus:ring-accent-500">
                ابدأ التعلم
              </Button>
              <Button to="/about" size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                اعرف المزيد
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => document.getElementById('subscription')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-center justify-center">
            <motion.div 
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Subscription Section (New) */}
      <Section id="subscription" background="secondary" className="text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-2 bg-secondary-100 rounded-full mb-6">
              <Bell size={24} className="text-secondary-600 ml-2" />
              <span className="text-secondary-700 font-medium">نشرة إخبارية</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">اشترك لتعرف آخر أخبار قبول الإنترنت العالمي UA</h2>
            
            <p className="text-xl text-gray-700 mb-8">
              كن أول من يعرف عن التحديثات والأخبار والفعاليات المتعلقة بالقبول العالمي للإنترنت
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >

            <SubscriptionForm />
            <p className="text-gray-500 text-sm mt-4 text-right">
              لن نشارك بريدك الإلكتروني مع أي جهة أخرى ويمكنك إلغاء الاشتراك في أي وقت.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* About Section (Enhanced) */}
      <Section background="light" id="about-preview">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-primary-100 px-3 py-1 rounded-full mb-4">
              <span className="text-primary-700 font-medium">تعريف</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">عن القبول العالمي (UA)</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              القبول العالمي (UA) يضمن أن جميع أسماء النطاقات وعناوين البريد الإلكتروني يمكن استخدامها من قبل جميع التطبيقات والأجهزة والأنظمة المتصلة بالإنترنت.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              مع استمرار توسع الإنترنت بنطاقات المستوى الأعلى الجديدة بمختلف النصوص واللغات،
              يصبح القبول العالمي ضرورياً لتجربة إنترنت عالمية وشاملة حقاً.
            </p>
            <div className="mt-8">
              <Button to="/about" rightIcon={<ArrowRight size={18} />} className="bg-primary-600 hover:bg-primary-700">
                تعرف أكثر على القبول العالمي
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 text-right">ما هو القبول العالمي (UA)؟</h3>
              <div className="space-y-4 text-gray-600">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <ul className="mt-8 space-y-6 text-right">
                <li className="flex items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">الشمولية</h4>
                    <p className="text-gray-600">ضمان دعم جميع اللغات والنصوص عبر الإنترنت</p>
                  </div>
                  <div className="rounded-full bg-primary-100 p-1 mr-3 ml-3 mt-1">
                    <Globe className="w-5 h-5 text-primary-600" />
                  </div>
                </li>
                <li className="flex items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">سهولة الوصول</h4>
                    <p className="text-gray-600">جعل الإنترنت في متناول المليارات من المستخدمين الجدد</p>
                  </div>
                  <div className="rounded-full bg-primary-100 p-1 mr-3 ml-3 mt-1">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                </li>
                <li className="flex items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">الابتكار</h4>
                    <p className="text-gray-600">دفع التقنيات والمعايير الجديدة للتواصل العالمي</p>
                  </div>
                  <div className="rounded-full bg-primary-100 p-1 mr-3 ml-3 mt-1">
                    <Lock className="w-5 h-5 text-primary-600" />
                  </div>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Features Section (Enhanced) */}
      <Section 
        title="ميزات ذكية مدعومة بالذكاء الاصطناعي" 
        subtitle="استكشف أدواتنا المبتكرة لفهم وتطبيق مبادئ القبول العالمي"
        centered 
        background="primary"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card interactive className="p-6 text-center h-full">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-accent-600">
                  <path d="M12 20h9m-9-3h7m-7-3h9m-9-3h7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">تعلم</h3>
              <p className="text-gray-600 mb-4">وحدات تعليمية تفاعلية حول القبول العالمي تساعدك على فهم المفاهيم الأساسية</p>
              <Button to="/learn" variant="ghost" size="sm" className="mt-auto text-accent-600 hover:text-accent-700 hover:bg-accent-50">
                ابدأ التعلم
              </Button>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card interactive className="p-6 text-center h-full">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-accent-600">
                  <path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7" />
                  <path d="M16 3h5v5" />
                  <path d="M10 14 21 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">المصادر</h3>
              <p className="text-gray-600 mb-4">الوصول إلى الأدلة والوثائق والأدوات التي تساعدك على تطبيق معايير القبول العالمي</p>
              <Button to="/resources" variant="ghost" size="sm" className="mt-auto text-accent-600 hover:text-accent-700 hover:bg-accent-50">
                عرض المصادر
              </Button>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card interactive className="p-6 text-center h-full">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-accent-600">
                  <path d="M14 7v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
                  <path d="M7 12v-1a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">المجتمع</h3>
              <p className="text-gray-600 mb-4">انضم إلى مجتمعنا العالمي من مناصري القبول العالمي وشارك في الفعاليات والمؤتمرات</p>
              <Button to="/contact" variant="ghost" size="sm" className="mt-auto text-accent-600 hover:text-accent-700 hover:bg-accent-50">
                انضم الآن
              </Button>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Testimonials Section (New) */}
      <Section background="light" id="testimonials">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-100 px-3 py-1 rounded-full mb-4">
            <span className="text-primary-700 font-medium">تجارب الآخرين</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">ماذا يقول المستخدمون عنا</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 ml-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">اسم المستخدم</h4>
                    <p className="text-gray-500 text-sm">شركة / منظمة</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "ساعدتنا منصة القبول العالمي في فهم كيفية جعل موقعنا متوافقاً مع جميع أنواع عناوين البريد الإلكتروني وأسماء النطاقات، مما وسع من نطاق وصولنا عالمياً."
                </p>
                <div className="mt-4 flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section (Enhanced) */}
      <Section background="accent" className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">ابدأ رحلة التعلم</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            اكتشف كيف يجعل القبول العالمي الإنترنت أكثر شمولية وسهولة في الوصول للجميع.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/learn" size="lg" variant="primary" className="bg-white text-accent-600 hover:bg-gray-100">
              انتقل إلى صفحة التعلم
            </Button>
            <Button to="/contact" size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              تواصل معنا
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default HomePage;