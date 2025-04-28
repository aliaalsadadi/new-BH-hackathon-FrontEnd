import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const BASEURL = import.meta.env.VITE_BASEURL;

  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear messages as soon as user types
    setValidationMessage('');

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(async () => {
      if (value.trim()) {
        try {
          const res = await fetch(`${BASEURL}/api/validate-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: value }),
          });
          if (res.ok) {
            setValidationMessage('✅ البريد الإلكتروني صحيح.');
          } else {
            setValidationMessage('❌ البريد الإلكتروني غير صحيح.');
          }
        } catch (error) {
          console.error('خطأ في التحقق من البريد الإلكتروني:', error);
          setValidationMessage('❌ خطأ أثناء التحقق من البريد الإلكتروني.');
        }
      } else {
        setValidationMessage('');
      }
    }, 1000);

    setTypingTimeout(timeout);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    try {
      const res = await fetch(`${BASEURL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setValidationMessage('✅ تم الاشتراك بنجاح!');
        setEmail(''); // Clear email after successful subscribe
      } else if (data.error === "Valid email is required") {
        setValidationMessage('❌ الرجاء إدخال بريد إلكتروني صحيح.');
      } else {
        setValidationMessage(`❌ خطأ: ${data.error || 'حدث خطأ غير متوقع.'}`);
      }
    } catch (error) {
      console.error('خطأ في الاشتراك:', error);
      setValidationMessage('❌ خطأ أثناء إرسال الطلب.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">اشترك في النشرة البريدية</h3>
            <p className="text-gray-400 mb-4">ابق على اطلاع بآخر المستجدات</p>
            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex overflow-hidden rounded-md shadow-sm">
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 border-0 px-4 py-2 text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="bg-primary-600 hover:bg-primary-700 px-6 py-2 text-white font-medium transition-colors"
                >
                  {subscribing ? 'جارٍ الإرسال...' : 'اشترك'}
                </button>
              </div>
            </form>
            {validationMessage && (
              <p className={`text-sm mt-2 ${validationMessage.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                {validationMessage}
              </p>
            )}
          </div>
        </div>

        {/* CopyRight Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} مبادرة القبول العالمي. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">شروط الخدمة</Link>
              <Link to="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors">سياسة ملفات تعريف الارتباط</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
