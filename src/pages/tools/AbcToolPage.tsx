import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // basic theme
import 'prismjs/components/prism-javascript'; // load language

const AbcToolPage: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const highlight = (code: string) =>
    Prism.highlight(code, Prism.languages.javascript, 'javascript');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setLoading(true);
      setResult('');
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/analyze-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: text, language: 'arabic' }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.report);
      } else {
        setResult('حدث خطأ أثناء تحليل الكود: ' + (data.error || 'خطأ غير معروف'));
      }
    } catch (error) {
      console.error(error);
      setResult('فشل الاتصال بالخادم.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">افحص مطابقة أكوادك البرمجية لمعايير القبول العالمي UA</h1>
            <p className="text-xl text-gray-300">
              قم بلصق النص مباشرة للتحليل
            </p>
          </motion.div>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative border border-gray-300 rounded-md bg-gray-50">
                  <Editor
                    value={text}
                    onValueChange={setText}
                    highlight={highlight}
                    padding={12}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      direction: 'ltr', // force Left-To-Right
                      textAlign: 'left',
                      minHeight: '200px',
                      backgroundColor: '#f9fafb',
                    }}
                    textareaId="codeArea"
                    placeholder="الصق الكود هنا..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={!text.trim() || loading}
              >
                {loading ? 'جاري التحليل...' : 'تحليل المحتوى'}
              </Button>
            </form>

            {result && (
  <div className="mt-8 p-6 bg-gray-50 rounded-lg space-y-4">
    <h3 className="text-lg font-semibold mb-3">نتائج التحليل</h3>

    <div className="space-y-2">
      {/* Extract and Format Report */}
      {(() => {
  const ratingMatch = result.match(/التقييم \(من 100\): (\d+)/);
  const problemsMatch = result.match(/المشاكل المكتشفة:\n([\s\S]*?)\n\n/);
  const improvementsMatch = result.match(/التحسينات المقترحة:\n([\s\S]*?)\n\n/);
  const commentMatch = result.match(/تعليق عام:\n([\s\S]*)/);

  const rating = ratingMatch ? ratingMatch[1] : null;

  const cleanList = (raw: string) =>
    raw
      .trim()
      .split('\n')
      .map(line => line.replace(/^-\s*/, '').trim()) // <<< إزالة الشرطة
      .filter(Boolean);

  const problems = problemsMatch ? cleanList(problemsMatch[1]) : [];
  const improvements = improvementsMatch ? cleanList(improvementsMatch[1]) : [];
  const comment = commentMatch ? commentMatch[1].trim() : null;

  return (
    <div className="space-y-6">
      {rating && (
        <div>
          <h4 className="font-semibold text-primary-600">التقييم:</h4>
          <p className="text-gray-700">{rating} / 100</p>
        </div>
      )}

      {problems.length > 0 && (
        <div>
          <h4 className="font-semibold text-primary-600">المشاكل المكتشفة:</h4>
          <ul className="list-disc list-inside text-gray-700">
            {problems.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {improvements.length > 0 && (
        <div>
          <h4 className="font-semibold text-primary-600">التحسينات المقترحة:</h4>
          <ul className="list-disc list-inside text-gray-700">
            {improvements.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>
      )}

      {comment && (
        <div>
          <h4 className="font-semibold text-primary-600">تعليق عام:</h4>
          <p className="text-gray-700 whitespace-pre-line">{comment}</p>
        </div>
      )}
    </div>
  );
})()}

    </div>
  </div>
)}
          </Card>
        </div>
      </Section>
    </>
  );
};

export default AbcToolPage;
