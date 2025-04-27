import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const SubscribePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'تم الاشتراك بنجاح!');
        setEmail(''); // Clear the input field
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'فشل الاشتراك. حاول مرة أخرى.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('حدث خطأ غير متوقع. حاول مرة أخرى.');
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">اشترك في التحديثات</h1>
            <p className="text-xl text-gray-300">
              ابق على اطلاع بآخر تطورات ومصادر القبول العالمي
            </p>
          </motion.div>
        </div>
      </div>

      {/* Subscription Form */}
      <Section background="light">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">الاشتراك في النشرة البريدية</h3>
            <p className="text-gray-700 mb-8">
              اشترك في نشرتنا البريدية لتلقي آخر التحديثات حول القبول العالمي،
              بما في ذلك المصادر الجديدة، وأدلة التطبيق، وأخبار المجتمع.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    البريد الإلكتروني
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="بريدك@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ml-2"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      أوافق على تلقي رسائل بريد إلكتروني من القبول العالمي.
                      يمكنك إلغاء الاشتراك في أي وقت. راجع{' '}
                      <a href="/privacy" className="text-primary-600 hover:underline">سياسة الخصوصية</a>.
                    </span>
                  </label>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  اشترك في النشرة البريدية
                </Button>

                {successMessage && (
                  <div className="mt-4 text-green-600">
                    <p>{successMessage}</p>
                  </div>
                )}
                {errorMessage && (
                  <div className="mt-4 text-red-600">
                    <p>{errorMessage}</p>
                  </div>
                )}
              </div>
            </form>
          </Card>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">ابق على اطلاع</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">تحديثات شهرية</h3>
              <p className="text-gray-600">تحديثات منتظمة حول تطورات وأفضل ممارسات القبول العالمي</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">أحدث المصادر</h3>
              <p className="text-gray-600">كن أول من يعرف عن الأدوات والمصادر الجديدة</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">أخبار المجتمع</h3>
              <p className="text-gray-600">ابق على تواصل مع مجتمع القبول العالمي حول العالم</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default SubscribePage;