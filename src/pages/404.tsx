import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // لو تستخدم React Router

const NotFoundPage: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const validateDomain = (domain: string) => {
    // بسيط: تأكد أنه يحوي أحرف عربية أو رموز IDN
    const idnRegex = /[^\u0000-\u007f]/;
    if (domain.trim() === '') {
      setValidationResult('الرجاء إدخال اسم نطاق أولاً.');
    } else if (idnRegex.test(domain)) {
      setValidationResult('✅ هذا النطاق يحتوي على أحرف دولية ويحتاج دعم UA.');
    } else {
      setValidationResult('✅ هذا نطاق ASCII تقليدي، لا توجد مشكلة توافق.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary-800 to-secondary-800 text-white p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6 text-center">عذرًا، لم يتم العثور على الصفحة المطلوبة.</p>
      {/* <p className="text-lg mb-8 text-center">ربما المشكلة بسبب اسم نطاق غير متوافق مع معايير القبول الشامل (UA)!</p> */}

      {/* <div className="w-full max-w-md space-y-4 bg-white text-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center">تحقق من نطاقك</h2>
        <input
          type="text"
          placeholder="أدخل اسم نطاق..."
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-400"
          dir="ltr"
        />
        <button
          onClick={() => validateDomain(domain)}
          className="w-full py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition"
        >
          تحقق
        </button>

        {validationResult && (
          <div className="p-4 mt-4 rounded-lg bg-gray-100 text-center">
            {validationResult}
          </div>
        )}
      </div> */}

      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 bg-white text-primary-700 font-semibold rounded-full hover:bg-gray-100 transition"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFoundPage;
