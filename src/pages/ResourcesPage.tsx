import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Book, Link, ExternalLink, Globe } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ResourcesPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-secondary-800 text-white py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">المصادر</h1>
            <p className="text-xl text-gray-300">
              مستندات ومصادر مفيدة لفهم وتطبيق القبول العالمي
            </p>
          </motion.div>
        </div>
      </div>

      {/* Technical Guides */}
      <Section title="الأدلة التقنية" subtitle="مصادر شاملة للمطورين ومسؤولي النظام">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="flex flex-col h-full border border-gray-200">
            <div className="p-6 flex-grow">
              <div className="flex items-start mb-4">
                <FileText className="w-8 h-8 text-primary-600 ml-3" />
                <h3 className="text-xl font-semibold text-center text-gray-900">دليل تطبيق القبول العالمي الشامل</h3>
              </div>
              <p className="text-gray-700 mb-4">
              يغطي دليل تطبيق القبول الشامل الخطوات الأساسية لقبول ومعالجة وعرض أسماء النطاقات وعناوين البريد الإلكتروني الدولية بطريقة صحيحة ومتسقة
              </p>
              <ul className="text-gray-700 mb-4 list-disc list-inside">
                <li>أساسيات القبول الشامل</li>
                <li>أفضل ممارسات التحقق والتخزين والمعالجة</li>
                <li>دعم العناوين الدولية في البريد الإلكتروني</li>
                <li>التحديات والحلول التقنية</li>
              </ul>
            </div>
            <div className="p-6 pt-0">
                <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open("https://uasg.tech/download/uasg-005-ua-quick-guide-en/", "_blank")}
                leftIcon={<Download size={18} />}
                >
                تحميل الدليل
                </Button>
            </div>
          </Card>
          
          <Card className="flex flex-col h-full border border-gray-200">
            <div className="p-6 flex-grow">
              <div className="flex items-start mb-4">
                <Book className="w-8 h-8 text-primary-600 ml-3" />
                <h3 className="text-xl font-semibold text-gray-900">إطار عمل الجاهزية للقبول الشامل                </h3>
              </div>
              <p className="text-gray-700 mb-4">
              دليل شامل يشرح كيفية تحديد، قبول، فحص التطبيقات لضمان عملعا بنظام القبول العالمي الشامل 
              </p>
              <ul className="text-gray-700 mb-4 list-disc list-inside">
                <li>مجموعة التطبيقات التي يُسعى لدعم القبول العالمي فيها</li>
                <li>الترميز المشترك</li>
                <li>خطوات التحقق من المطابقة لمعايير القبول العالمي</li>
              </ul>
            </div>
            <div className="p-6 pt-0">
              <Button variant="outline" className="w-full" 
              onClick={() => window.open("https://uasg.tech/download/uasg-026-ua-readiness-framework-en/", "_blank")}
              leftIcon={<Download size={18} />}
              >
                تحميل الدليل
              </Button>
               
            </div>
          </Card>
          
          <Card className="flex flex-col h-full border border-gray-200">
            <div className="p-6 flex-grow">
              <div className="flex items-start mb-4">
                <Link className="w-8 h-8 text-primary-600 ml-3" />
                <h3 className="text-xl font-semibold text-gray-900">المعايير التقنية للبريد الإلكتروني</h3>
              </div>
              <p className="text-gray-700 mb-4">
                المعايير والبروتوكولات التقنية لتدويل عناوين البريد الإلكتروني.
                تعلم كيفية التعامل مع عناوين البريد الإلكتروني الدولية في أنظمتك.
              </p>
              <ul className="text-gray-700 mb-4 list-disc list-inside">
                <li>النظام الرئيسي للبريد الإلكتروني</li>
                <li>تمييز الايميلات الموافقة لمعايير القبول العالمي</li>
                <li>كيفية الاستقبال ولإرسال من البريد الالكرتوني الموافق لمعايير القبول العالمي</li>
              </ul>
            </div>
            <div className="p-6 pt-0">
              <Button variant="outline" className="w-full" 
              onClick={() => window.open("https://uasg.tech/download/uasg-012-eai-a-technical-overview-en/", "_blank")}
              leftIcon={<Download size={18} />}
              >
                تحميل الدليل
              </Button>
               
            </div>
          </Card>
        </div>
      </Section>

      {/* Case Studies */}
<Section background="light" title="دراسات الحالة" subtitle="تعلم من تطبيقات القبول العالمي الناجحة">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {/* Study 1 */}
    <Card className="border border-gray-200">
      <img 
        src="egypt.png" 
        alt="بوابة إلكترونية تدعم اللغة العربية" 
        className="w-full h-48 object-contain"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">موقع وزارة الاتصالات المصرية</h3>
        <p className="text-gray-700 mb-4">
          مثال حقيقي على كيفية استخدام نطاق عربي بالكامل لدعم اللغة المحلية
          وتمكين المستخدمين من الوصول إلى خدمات إلكترونية بلغاتهم الأم بدون عوائق.
        </p>
        <Button 
          as="a"
          href="https://xn----ymcbaaajlc6dj7bxne2c.xn--wgbh1c/" 
          target="_blank" 
          rel="noopener noreferrer"
          variant="ghost" 
          className="text-primary-600 hover:text-primary-700 p-0 h-auto" 
          rightIcon={<ExternalLink size={16} />}
        >
          زيارة الموقع
        </Button>
      </div>
    </Card>

    {/* Study 2 */}
    <Card className="border border-gray-200">
      <img 
        src="UASG.jpg" 
        alt="موقع تعليمي عن القبول العالمي" 
        className="w-full h-48 object-contain"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">UASG.tech</h3>
        <p className="text-gray-700 mb-4">
          الموقع الرسمي لمجموعة دعم القبول العالمي (UASG)، الذي يقدم أبحاث وأدوات وتوصيات
          لمساعدة المؤسسات على تطبيق معايير القبول العالمي بشكل كامل.
        </p>
        <Button 
          as="a"
          href="https://uasg.tech/" 
          target="_blank" 
          rel="noopener noreferrer"
          variant="ghost" 
          className="text-primary-600 hover:text-primary-700 p-0 h-auto" 
          rightIcon={<ExternalLink size={16} />}
        >
          زيارة الموقع
        </Button>
      </div>
    </Card>

    {/* Study 3 */}
    <Card className="border border-gray-200">
      <img 
        src="backathon-bahrain-logo-w.svg" 
        alt="بوابة حكومية عربية" 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">هاكاثون.البحرين</h3>
        <p className="text-gray-700 mb-4">
          بوابة إلكترونية مبتكرة تدعم القبول العالمي للنطاقات العربية،
          مما يعزز الشمولية الرقمية للمستخدمين العرب ويعكس التزام البحرين بالتقنيات المستقبلية.
        </p>
        <Button 
          as="a"
          href="https://xn--mgbam8grabl.xn--mgbcpq6gpa1a/" 
          target="_blank" 
          rel="noopener noreferrer"
          variant="ghost" 
          className="text-primary-600 hover:text-primary-700 p-0 h-auto" 
          rightIcon={<ExternalLink size={16} />}
        >
          زيارة الموقع
        </Button>
      </div>
    </Card>

  </div>
</Section>


      {/* Code Libraries */}
      <Section title="المكتبات والأدوات البرمجية" subtitle="مكتبات وأدوات مفتوحة المصدر للمساعدة في تطبيق القبول العالمي">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المكتبة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوصف
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اللغة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الترخيص
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">idna-uts46	 </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">مكتبة جافاسكريبت لتحويل والتحقق  من أسماء النطاقات العالمية</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">جافاسكريبت</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">MIT</div>
                </td>
                <td className="px-6 py-4 text-left whitespace-nowrap">
                  <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700" onClick={() => window.open("https://www.npmjs.com/package/idna-uts46", "_blank")}>
                    عرض
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">idna</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">مكتبة بايثون تدعم التحويل بين النص العربي وبونيكود (IDNA2008)	</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">بايثون</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">BSD License</div>
                </td>
                <td className="px-6 py-4 text-left whitespace-nowrap">
                  <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700" onClick={() => window.open("https://pypi.org/project/idna/", "_blank")}>
                    عرض
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">ICU4J</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700"> (بما فيها العربية) مكتبة جافا تدعم كامل لتحويل النطاقات الدولية </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">جافا</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">ICU license
                  </div>
                </td>
                <td className="px-6 py-4 text-left whitespace-nowrap">
                  <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700" onClick={() => window.open("https://unicode-org.github.io/icu/userguide/icu4j/", "_blank")}>
                    عرض
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* External Resources */}
      <Section background="light" title="مصادر خارجية" subtitle="مصادر إضافية من مجتمع القبول العالمي">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">المنظمات</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ml-3">
                  <Globe className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">مجموعة توجيه القبول العالمي (UASG)</h4>
                  <a href="https://uasg.tech/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                    زيارة الموقع <ExternalLink size={14} className="mr-1" />
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ml-3">
                  <Globe className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">هيئة الإنترنت للأسماء والأرقام المخصصة (ICANN)</h4>
                  <a href="https://www.icann.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                    زيارة الموقع <ExternalLink size={14} className="mr-1" />
                  </a>
                </div>
              </li>
            </ul>
          </Card>
          
          <Card className="p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">المعايير والمواصفات</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ml-3 mt-1">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">RFC 5890: أسماء النطاقات الدولية للتطبيقات</h4>
                  <p className="text-sm text-gray-600 mb-1">بروتوكول لأسماء النطاقات الدولية</p>
                  <a href="https://tools.ietf.org/html/rfc5890" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                    قراءة المعيار <ExternalLink size={14} className="mr-1" />
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ml-3 mt-1">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">RFC 6530: نظرة عامة وإطار عمل للبريد الإلكتروني الدولي</h4>
                  <p className="text-sm text-gray-600 mb-1">إطار عمل لتدويل عناوين البريد الإلكتروني</p>
                  <a href="https://tools.ietf.org/html/rfc6530" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                    قراءة المعيار <ExternalLink size={14} className="mr-1" />
                  </a>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* CTA Section
      <Section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">هل تحتاج مساعدة في التطبيق؟</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          تواصل مع فريق خبرائنا للحصول على مساعدة مخصصة في تطبيق القبول العالمي.
        </p>
        <Button to="/contact" size="lg" variant="primary">
          اتصل بنا
        </Button>
      </Section> */}
    </>
  );
};

export default ResourcesPage;