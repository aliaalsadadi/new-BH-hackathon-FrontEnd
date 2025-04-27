import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Globe size={24} className="text-primary-400" />
              <span>القبول العالمي</span>
            </Link>
            <p className="text-gray-400 mb-6">
              بناء إنترنت مقبول عالمياً للجميع مع النطاقات والبريد الإلكتروني العربي
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">عن القبول العالمي</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors">الأدوات</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-white transition-colors">المصادر</Link></li>
              <li><Link to="/learn" className="text-gray-400 hover:text-white transition-colors">تعلم</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-400 ml-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">١٢٣ شارع العالمي، المدينة العالمية، ١٠٠٠١</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-400 ml-2 flex-shrink-0" />
                <span className="text-gray-400">+١ ٢٣٤ ٥٦٧ ٨٩٠</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-400 ml-2 flex-shrink-0" />
                <span className="text-gray-400">info@universalacceptance.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">اشترك في النشرة البريدية</h3>
            <p className="text-gray-400 mb-4">ابق على اطلاع بآخر المستجدات</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني" 
                  className="px-4 py-2 w-full rounded-l-md text-gray-900 focus:outline-none"
                />
                <button type="submit" className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md transition-colors">
                  اشترك
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} مبادرة القبول العالمي. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6">
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