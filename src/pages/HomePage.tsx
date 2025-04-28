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

      {/* About Section */}
      <Section background="light" id="about-preview">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title text-right" dir="rtl">عن القبول العالمي (UA)</h2>
              <p className="text-lg text-gray-700 mb-6 text-right" dir="rtl">
                القبول العالمي (UA) هو المبادرة التي تضمن قدرة جميع مستخدمي الإنترنت على الوصول إلى أي نطاق إلكتروني أو عنوان بريد إلكتروني - مهما كانت اللغة أو النص المستخدم.
              </p>
              <p className="text-lg text-gray-700 mb-6 text-right" dir="rtl">
                مع ظهور نطاقات جديدة بلغات مختلفة مثل العربية، الصينية، والروسية، أصبح من الضروري تحديث أنظمتنا لدعم التنوع اللغوي. القبول العالمي يجعل الإنترنت أكثر شمولاً وعدلاً للجميع.
              </p>
              <p className="text-lg text-gray-700 mb-6 text-right" dir="rtl">
                UA لا يقتصر فقط على المجالات الجديدة، بل يشمل التأكد من أن التطبيقات، والمواقع، والبريد الإلكتروني تتعامل بشكل صحيح مع أسماء النطاقات الدولية (IDNs) وعناوين البريد الإلكتروني العالمية (EAI).
              </p>

              <div className="mt-8 text-right" dir="rtl">
                <Button to="/about" rightIcon={<ArrowRight size={18} />} className="hover:scale-105 transition-transform">
                  تعرف أكثر على القبول العالمي
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-right" dir="rtl">ما هو القبول العالمي (UA)؟</h3>
            <div className="space-y-4 text-gray-600 mb-8" dir="rtl">
              <p>القبول العالمي هو الركيزة الأساسية لبناء إنترنت متكافئ، حيث يستطيع أي شخص التواصل دون عوائق لغوية أو تقنية.</p>
              <p>من خلال تبني UA، نُمكّن المليارات من الأفراد من أن يكونوا جزءاً فعالاً من شبكة الويب العالمية.</p>
            </div>

            <ul className="mt-8 space-y-6" dir="rtl">
              <motion.li
                whileHover={{ scale: 1.03 }}
                className="flex items-start transition-transform"
              >
                <div className="rounded-full bg-primary-100 p-2 ml-4 mt-1">
                  <Globe className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">الشمولية</h4>
                  <p className="text-gray-600">دعم جميع اللغات والرموز والنصوص ليكون الإنترنت حقاً مساحة لكل البشر.</p>
                </div>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.03 }}
                className="flex items-start transition-transform"
              >
                <div className="rounded-full bg-primary-100 p-2 ml-4 mt-1">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">سهولة الوصول</h4>
                  <p className="text-gray-600">فتح الأبواب الرقمية أمام المليارات من المستخدمين الجدد بلغاتهم المحلية.</p>
                </div>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.03 }}
                className="flex items-start transition-transform"
              >
                <div className="rounded-full bg-primary-100 p-2 ml-4 mt-1">
                  <Lock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">الابتكار</h4>
                  <p className="text-gray-600">تحفيز الإبداع وتطوير معايير وتقنيات جديدة تجعل التواصل أكثر مرونة وشمولية.</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </Section>




      {/* Features Preview */}
      <Section title="ميزات ذكية مدعومة بالذكاء الاصطناعي" centered>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card interactive className="p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-primary-600"
                fill="currentColor"
                viewBox="0 0 459.319 459.319"
              >
                <g>
                  <path d="M94.924,366.674h312.874c0.958,0,1.886-0.136,2.778-0.349c0.071,0,0.13,0.012,0.201,0.012   c6.679,0,12.105-5.42,12.105-12.104V12.105C422.883,5.423,417.456,0,410.777,0h-2.955H114.284H94.941   c-32.22,0-58.428,26.214-58.428,58.425c0,0.432,0.085,0.842,0.127,1.259c-0.042,29.755-0.411,303.166-0.042,339.109   c-0.023,0.703-0.109,1.389-0.109,2.099c0,30.973,24.252,56.329,54.757,58.245c0.612,0.094,1.212,0.183,1.847,0.183h317.683   c6.679,0,12.105-5.42,12.105-12.105v-45.565c0-6.68-5.427-12.105-12.105-12.105s-12.105,5.426-12.105,12.105v33.461H94.924   c-18.395,0-33.411-14.605-34.149-32.817c0.018-0.325,0.077-0.632,0.071-0.963c-0.012-0.532-0.03-1.359-0.042-2.459   C61.862,380.948,76.739,366.674,94.924,366.674z M103.178,58.425c0-6.682,5.423-12.105,12.105-12.105s-12.105,5.423-12.105,12.105   V304.31c0,6.679-5.423,12.105-12.105,12.105s-12.105-5.427-12.105-12.105V58.425z" />
                </g>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-primary-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7" />
                <path d="M16 3h5v5" />
                <path d="M10 14 21 3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">المصادر</h3>
            <p className="text-gray-600">تعرف على الوثائق والمستندات التقنيى الرسمية</p>
            <Button to="/resources" variant="ghost" size="sm" className="mt-4">
              عرض المصادر
            </Button>
          </Card>

          <Card interactive className="p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-primary-600"
              >
                <path d="M19.14 12.936c.036-.306.06-.618.06-.936s-.024-.63-.06-.936l2.11-1.65a.5.5 0 0 0 .12-.63l-2-3.464a.5.5 0 0 0-.61-.22l-2.49 1a7.007 7.007 0 0 0-1.62-.936l-.38-2.65A.5.5 0 0 0 14.1 3h-4.2a.5.5 0 0 0-.49.42l-.38 2.65c-.582.21-1.126.496-1.62.936l-2.49-1a.5.5 0 0 0-.61.22l-2 3.464a.5.5 0 0 0 .12.63l2.11 1.65c-.036.306-.06.618-.06.936s.024.63.06.936l-2.11 1.65a.5.5 0 0 0-.12.63l2 3.464a.5.5 0 0 0 .61.22l2.49-1c.494.44 1.038.726 1.62.936l.38 2.65a.5.5 0 0 0 .49.42h4.2a.5.5 0 0 0 .49-.42l.38-2.65c.582-.21 1.126-.496 1.62-.936l2.49 1a.5.5 0 0 0 .61-.22l2-3.464a.5.5 0 0 0-.12-.63l-2.11-1.65zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>

            </div>
            <h3 className="text-xl font-semibold mb-2">الأدوات</h3>
            <p className="text-gray-600">اكتشف الأدوات التي تساعدك على فهم القبول العالمي</p>
            <Button to="/tools" variant="ghost" size="sm" className="mt-4">
              اكتشف الان
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