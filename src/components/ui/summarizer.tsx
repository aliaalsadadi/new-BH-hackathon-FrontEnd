import React, { useState } from 'react';
import axios from 'axios';
import Section from './Section';
import Card from './Card';
import Button from './Button';

const SummarizerSection: React.FC = () => {
  const BaseUrl = import.meta.env.VITE_BASEURL
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('Arabic'); // <-- اللغة الافتراضية عربي
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryResult, setSummaryResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSummarize = async () => {
    if (!file) {
      setError('يرجى اختيار ملف قبل التلخيص.');
      return;
    }

    setLoading(true);
    setError('');
    setSummaryResult('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('summaryLength', summaryLength);
      formData.append('language', language); // <--- نرسل اللغة المختارة

      const response = await axios.post(`${BaseUrl}/summarize-pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSummaryResult(response.data.summary);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء التلخيص. تأكد من أن الملف صحيح.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="summarizer">
      <div className="grid md:grid-cols-2 gap-12 items-start">

         {/* Right side: Upload and Form */}
         <div>
          <h2 className="section-title">رفع ملف للتلخيص</h2>
          <p className="text-lg text-gray-700 mb-6">
            قم برفع ملف PDF أو Word أو نصي، وسيقوم النظام بقراءة محتواه وتلخيصه تلقائياً لك باستخدام الذكاء الاصطناعي.
          </p>

          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اختر الملف:
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Summary Length Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                طول الملخص:
              </label>
              <select
                value={summaryLength}
                onChange={(e) => setSummaryLength(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="short">قصير (فقرة واحدة)</option>
                <option value="medium">متوسط (3 فقرات)</option>
                <option value="long">طويل (5 فقرات)</option>
              </select>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اللغة:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Arabic">العربية</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Summarize Button */}
            <Button
              variant="primary"
              className="w-full"
              onClick={handleSummarize}
            >
              {loading ? 'جاري التلخيص...' : 'ابدأ التلخيص'}
            </Button>
          </div>
        </div>

        {/* Left side: Summary Result */}
        <Card className="p-8 border border-gray-200 h-full">
          <h3 className="text-xl font-semibold mb-4">الملخص الناتج</h3>
          <div className="mt-4 p-4 bg-gray-50 rounded-md h-96 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">الملخص:</h4>
            {error && (
              <p className="text-red-500">{error}</p>
            )}
            {!error && (
              <p className="text-gray-800 whitespace-pre-wrap">
                {loading ? 'جاري التلخيص...' : (summaryResult || 'لم يتم إنشاء ملخص بعد.')}
              </p>
            )}
          </div>
        </Card>

       
      </div>
    </Section>
  );
};

export default SummarizerSection;
