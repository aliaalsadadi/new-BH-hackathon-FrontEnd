import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Shield, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { validateEmail } from '../../utils/utils';
import { useUser } from '../../context/UserContext';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();
  const { setUser, fetchProgress } = useUser(); // Assuming you have a context or state management for user

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BASEURL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullname: name }),
      });
      if (res.ok) {
        setIsCodeSent(true);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to send code.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError('البريد الإلكتروني غير صالح.');
    } else {
      setEmailError(null);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BASEURL}/api/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode, fullname: name }),
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData); // Update the global user state
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
        await fetchProgress(userData.email); // Fetch progress
        navigate('/learn'); // Redirect to the Learn page
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to verify code.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          إنشاء حساب جديد
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            تسجيل الدخول
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={isCodeSent ? handleVerifyCode : handleSendCode} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isCodeSent}
                  className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="محمد أحمد"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isCodeSent}
                  className={`block w-full pr-10 pl-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500`}
                  placeholder="بريدك@example.com"
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
            </div>

            {isCodeSent && (
              <div>
                <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">
                  رمز التحقق
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="verification-code"
                    name="verification-code"
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="أدخل رمز التحقق"
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ml-2"
                  required
                />
                <span className="text-sm text-gray-600">
                  أوافق على{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                    شروط الخدمة
                  </Link>{' '}
                  و{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                    سياسة الخصوصية
                  </Link>
                </span>
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              {isCodeSent ? 'إنشاء الحساب' : 'إرسال رمز التحقق'}
            </Button>

            {isCodeSent && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsCodeSent(false)}
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  استخدام بريد إلكتروني آخر
                </button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;