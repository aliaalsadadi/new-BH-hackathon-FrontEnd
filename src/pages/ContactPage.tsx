import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Globe } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">اتصل بنا</h1>
            <p className="text-xl text-gray-300">
              تواصل مع فريقنا للحصول على الدعم أو الاستفسارات حول القبول العالمي
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">موقعنا</h3>
            <p className="text-gray-700">
              ١٢٣ شارع العالمي<br />
              المدينة العالمية، ١٠٠٠١<br />
              المملكة العربية السعودية
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">راسلنا</h3>
            <p className="text-gray-700 mb-2">
              الاستفسارات العامة:<br />
              <a href="mailto:info@universalacceptance.org" className="text-primary-600 hover:underline">
                info@universalacceptance.org
              </a>
            </p>
            <p className="text-gray-700">
              الدعم الفني:<br />
              <a href="mailto:support@universalacceptance.org" className="text-primary-600 hover:underline">
                support@universalacceptance.org
              </a>
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">اتصل بنا</h3>
            <p className="text-gray-700 mb-2">
              المكتب الرئيسي:<br />
              <a href="tel:+12345678901" className="text-primary-600 hover:underline">
                +٩٦٦ ١٢٣ ٤٥٦ ٧٨٩
              </a>
            </p>
            <p className="text-gray-700">
              خط الدعم:<br />
              <a href="tel:+12345678902" className="text-primary-600 hover:underline">
                +٩٦٦ ١٢٣ ٤٥٦ ٧٩٠
              </a>
            </p>
          </Card>
        </div>
        
        <div className="mt-12">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-primary-600 ml-2" />
              <h3 className="text-xl font-semibold text-gray-900">ساعات العمل</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">المقر الرئيسي</h4>
                <p className="text-gray-700">
                  الأحد - الخميس: ٩:٠٠ ص - ٥:٠٠ م<br />
                  الجمعة: مغلق<br />
                  السبت: مغلق
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">الدعم الفني</h4>
                <p className="text-gray-700">
                  الأحد - الخميس: ٢٤ ساعة<br />
                  الجمعة: ٩:٠٠ ص - ٥:٠٠ م<br />
                  السبت: ٩:٠٠ ص - ٥:٠٠ م
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Contact Form */}
      <Section background="light" title="أرسل لنا رسالة" subtitle="املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 border border-gray-200">
            <form>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الأول *
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="محمد"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                      اسم العائلة *
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="العربي"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="mohammed@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="+٩٦٦ ٥٠٠ ٠٠٠ ٠٠٠"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    الموضوع *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="كيف يمكننا مساعدتك؟"
                  />
                </div>
                
                <div>
                  <label htmlFor="inquiry-type" className="block text-sm font-medium text-gray-700 mb-1">
                    نوع الاستفسار *
                  </label>
                  <select
                    id="inquiry-type"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">اختر نوع الاستفسار</option>
                    <option value="general">استفسار عام</option>
                    <option value="technical">دعم فني</option>
                    <option value="partnership">فرصة شراكة</option>
                    <option value="feedback">ملاحظات</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    الرسالة *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="يرجى تقديم تفاصيل عن استفسارك..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 ml-2 mt-1" />
                    <span className="text-gray-700 text-sm">
                      أوافق على معالجة بياناتي الشخصية وفقاً 
                      <a href="#" className="text-primary-600 hover:underline"> لسياسة الخصوصية</a>.
                    </span>
                  </label>
                </div>
                
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  إرسال الرسالة
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Section>

      {/* Map Section */}
      <Section>
        <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <p className="text-gray-700">سيتم عرض الخريطة التفاعلية هنا</p>
          </div>
        </div>
      </Section>

      {/* Additional Contact Options */}
      <Section background="light" title="طرق أخرى للتواصل" centered>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 border border-gray-200 text-center">
            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">المحادثة المباشرة</h3>
            <p className="text-gray-700 mb-4">
              تحدث مع فريق الدعم لدينا مباشرة للحصول على مساعدة فورية مع أسئلتك.
            </p>
            <Button variant="outline">ابدأ المحادثة</Button>
          </Card>
          
          <Card className="p-6 border border-gray-200 text-center">
            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">منتدى المجتمع</h3>
            <p className="text-gray-700 mb-4">
              انضم إلى منتدى مجتمعنا للتواصل مع ممارسي القبول العالمي الآخرين وتبادل المعرفة.
            </p>
            <Button variant="outline">زيارة المنتدى</Button>
          </Card>
          
          <Card className="p-6 border border-gray-200 text-center">
            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">وسائل التواصل الاجتماعي</h3>
            <p className="text-gray-700 mb-4">
              تابعنا على وسائل التواصل الاجتماعي للحصول على التحديثات والنصائح والانضمام إلى المحادثة.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* FAQ Preview */}
      <Section title="الأسئلة الشائعة">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">ما هي المدة المتوقعة للرد؟</h3>
              <p className="text-gray-700">
                نرد عادةً على الاستفسارات خلال ٢٤-٤٨ ساعة عمل. للمسائل الفنية العاجلة،
                يهدف فريق الدعم لدينا للرد خلال ٤ ساعات خلال ساعات العمل العادية.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">هل تقدمون خدمات استشارية لتطبيق القبول العالمي؟</h3>
              <p className="text-gray-700">
                نعم، نقدم خدمات استشارية لمساعدة المؤسسات في تطبيق القبول العالمي.
                يرجى الاتصال بنا مع احتياجاتك المحددة، وسيقدم فريقنا معلومات حول
                خدماتنا والأسعار.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">كيف يمكنني المساهمة في مبادرة القبول العالمي؟</h3>
              <p className="text-gray-700">
                هناك العديد من الطرق للمساهمة! يمكنك الانضمام إلى منتديات مجتمعنا،
                المشاركة في فعاليات القبول العالمي، تطبيق القبول العالمي في أنظمتك،
                مشاركة موارد القبول العالمي، أو أن تصبح مناصراً في مؤسستك.
                اتصل بنا لمعرفة المزيد عن الفرص المحددة.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button to="/resources" variant="outline">
              عرض جميع الأسئلة الشائعة
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">هل أنت مستعد لجعل أنظمتك جاهزة للقبول العالمي؟</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          فريق خبرائنا هنا لمساعدتك في تطبيق القبول العالمي في تطبيقاتك وأنظمتك.
        </p>
        <Button size="lg" variant="accent">
          جدولة استشارة
        </Button>
      </Section>
    </>
  );
};

export default ContactPage;