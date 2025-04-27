import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Mail } from 'lucide-react';

interface SubscriptionFormProps {
  className?: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const BASEURL = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setValidationMessage('');

    if (typingTimeout) clearTimeout(typingTimeout);

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

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${BASEURL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setValidationMessage('✅ تم الاشتراك بنجاح!');
        setEmail('');
        setIsSubmitted(true);
      } else if (data.error === "Valid email is required") {
        setValidationMessage('❌ الرجاء إدخال بريد إلكتروني صحيح.');
      } else {
        setValidationMessage(`❌ خطأ: ${data.error || 'حدث خطأ غير متوقع.'}`);
      }
    } catch (error) {
      console.error('خطأ في الاشتراك:', error);
      setValidationMessage('❌ خطأ أثناء إرسال الطلب.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {!isSubmitted ? (
        <motion.form 
          onSubmit={handleSubscribe}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex  justify-start mb-4">
          <Mail className="text-primary-600" />
            <h3 className="text-lg font-semibold mr-2">أدخل بريدك الإلكتروني</h3>
          </div>

          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="أدخل بريدك الإلكتروني"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-right"
              disabled={isSubmitting}
            />
            
            {validationMessage && (
              <motion.p 
                className={`text-sm mt-2 text-right ${validationMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {validationMessage}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send size={20} />
              </motion.div>
            ) : (
              <>
                <span>اشترك في النشرة البريدية</span>
                <Mail size={20} />
              </>
            )}
          </button>
        </motion.form>
      ) : (
        <motion.div 
          className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <span>تم الاشتراك بنجاح! شكراً لك.</span>
          <Check className="mr-2" />
        </motion.div>
      )}
    </div>
  );
};

export default SubscriptionForm;