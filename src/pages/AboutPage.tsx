import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Lock, Clock, BarChart, BookOpen } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-primary-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">عن القبول العالمي</h1>
            <p className="text-xl text-gray-300">
              اكتشف كيف يكسر القبول العالمي حواجز اللغة ويجعل الإنترنت عالمياً حقاً
            </p>
          </motion.div>
        </div>
      </div>

      {/* What is UA Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">ما هو القبول العالمي (UA)؟</h2>
            <p className="text-lg text-gray-700 mb-6">
              القبول العالمي (UA) هو مفهوم يضمن معاملة جميع أسماء النطاقات وعناوين البريد الإلكتروني
              بشكل متساوٍ من قبل تطبيقات وأنظمة الإنترنت، بغض النظر عن النص أو اللغة أو الطول.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              يضمن القبول العالمي أن جميع أسماء النطاقات وعناوين البريد الإلكتروني الصالحة
              يمكن استخدامها بشكل صحيح من قبل جميع التطبيقات والأجهزة والأنظمة المتصلة بالإنترنت.
              وهذا يشمل أسماء النطاقات الدولية (IDNs) التي تحتوي على حروف من نصوص غير لاتينية
              مثل العربية والصينية والسيريلية.
            </p>
            <p className="text-lg text-gray-700">
              هدف القبول العالمي هو إنشاء إنترنت أكثر شمولاً ومتعدد اللغات، مما يتيح للمستخدمين
              التصفح والوصول إلى المحتوى بلغاتهم ونصوصهم الأصلية.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">المبادئ الأساسية للقبول العالمي</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="rounded-full bg-primary-100 p-2 ml-4 mt-1">
                  <Globe className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-1">الشمولية</h4>
                  <p className="text-gray-700">ضمان دعم جميع اللغات والنصوص عبر الإنترنت، وكسر الحواجز اللغوية</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary-100 p-2 ml-4 mt-1">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-1">سهولة الوصول</h4>
                  <p className="text-gray-700">جعل الإنترنت في متناول المليارات من المستخدمين الجدد من خلال النطاقات والبريد الإلكتروني المحلي</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary-100 p-2 ml-4 mt-1">
                  <Lock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-1">الابتكار</h4>
                  <p className="text-gray-700">دفع التقنيات والمعايير الجديدة التي تدعم الاتصال والتواصل العالمي</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Why UA Matters */}
      <Section background="light" title="أهمية القبول العالمي" centered>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <Card className="p-6">
            <Clock className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">الوصول العالمي</h3>
            <p className="text-gray-700">
              يمكّن القبول العالمي الشركات والمؤسسات من الوصول إلى أسواق وجماهير جديدة
              من خلال دعم النطاقات والبريد الإلكتروني باللغات المحلية.
            </p>
          </Card>
          
          <Card className="p-6">
            <BarChart className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">الشمول الرقمي</h3>
            <p className="text-gray-700">
              من خلال دعم اللغات والنصوص المحلية، يساعد القبول العالمي في سد الفجوة الرقمية
              ويجلب المزيد من الناس إلى الإنترنت.
            </p>
          </Card>
          
          <Card className="p-6">
            <BookOpen className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">الحفاظ على الثقافة</h3>
            <p className="text-gray-700">
              يعزز القبول العالمي التنوع اللغوي على الإنترنت، مما يساعد في الحفاظ على
              اللغات والنصوص المختلفة والاحتفاء بها.
            </p>
          </Card>
        </div>
      </Section>

      {/* Arabic and UA */}
      <Section title="اللغة العربية والقبول العالمي" subtitle="كيف يجعل القبول العالمي الإنترنت أكثر سهولة للناطقين بالعربية">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">أسماء النطاقات وعناوين البريد الإلكتروني العربية</h3>
              <p className="text-gray-700 mb-4">
                تتيح أسماء النطاقات الدولية العربية للمواقع أن يكون لها عناوين مكتوبة بالكامل
                بالنص العربي، مما يجعلها أكثر سهولة في الوصول والتذكر للناطقين بالعربية.
              </p>
              <p className="text-gray-700 mb-4">
                وبالمثل، يمكّن تدويل عناوين البريد الإلكتروني (EAI) المستخدمين من امتلاك
                عناوين بريد إلكتروني باللغة العربية في كل من اسم المستخدم والنطاق.
              </p>
              <p className="text-gray-700">
                تتطلب هذه التقنيات تطبيقاً صحيحاً للقبول العالمي عبر البرامج والأنظمة
                لتعمل بشكل صحيح وتوفر تجربة سلسة للمستخدمين.
              </p>
              
              <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
                <h4 className="font-semibold text-primary-800 mb-2">مثال على اسم نطاق عربي</h4>
                <p className="font-arabic text-lg text-primary-900 mb-1">مثال.العالم</p>
                <p className="text-sm text-primary-700">يظهر كـ: xn--mgbh0fb.xn--mgbcpq6gpa1a</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-24 h-24 text-primary-600 mx-auto mb-6" />
                <p className="text-2xl font-bold text-primary-900 font-arabic mb-2">الإنترنت للجميع</p>
                <p className="text-gray-700">إنترنت يتحدث لغتك</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* UA Timeline */}
      <Section background="light" title="الجدول الزمني للقبول العالمي" centered>
        <div className="relative border-r-4 border-primary-500 mr-4 md:mr-1/2 pr-8 py-4 max-w-2xl mx-auto">
          <div className="mb-12 relative">
            <div className="absolute -right-12 mt-2 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold">١</span>
            </div>
            <h3 className="text-xl font-bold mb-2">٢٠٠٩-٢٠١٠: نطاقات المستوى الأعلى الجديدة</h3>
            <p className="text-gray-700">
              وافقت ICANN على توسيع نطاقات المستوى الأعلى العامة (gTLDs)، مما خلق الحاجة للقبول العالمي.
            </p>
          </div>
          
          <div className="mb-12 relative">
            <div className="absolute -right-12 mt-2 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold">٢</span>
            </div>
            <h3 className="text-xl font-bold mb-2">٢٠١٢: برنامج أسماء النطاقات الدولية</h3>
            <p className="text-gray-700">
              إطلاق برنامج أسماء النطاقات الدولية (IDNs)، مما يتيح أسماء نطاقات بمختلف النصوص واللغات.
            </p>
          </div>
          
          <div className="mb-12 relative">
            <div className="absolute -right-12 mt-2 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold">٣</span>
            </div>
            <h3 className="text-xl font-bold mb-2">٢٠١٥: تشكيل مجموعة توجيه القبول العالمي</h3>
            <p className="text-gray-700">
              تم تشكيل مجموعة توجيه القبول العالمي (UASG) لدفع الوعي وتطبيق القبول العالمي.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -right-12 mt-2 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold">٤</span>
            </div>
            <h3 className="text-xl font-bold mb-2">الحاضر: الجهود المستمرة</h3>
            <p className="text-gray-700">
              العمل المستمر لضمان جاهزية جميع البرامج والأنظمة للقبول العالمي، مع التركيز
              على تعزيز دعم تدويل عناوين البريد الإلكتروني (EAI).
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AboutPage;