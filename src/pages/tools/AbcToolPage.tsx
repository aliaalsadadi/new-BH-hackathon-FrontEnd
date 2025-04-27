import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AbcToolPage: React.FC = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setText(''); // Clear text area when file is selected
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setFile(null); // Clear file when text is entered
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically handle the file/text submission
    // For now, we'll just show a sample response
    setResult('تم تحليل المحتوى بنجاح! هذا مثال على النتيجة التي سيتم عرضها.');
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">أداة ABC للتحليل</h1>
            <p className="text-xl text-gray-300">
              قم بتحميل ملف أو لصق النص مباشرة للتحليل
            </p>
          </motion.div>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".txt,.doc,.docx,.pdf"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {file ? file.name : 'اسحب الملف هنا أو انقر للتحميل'}
                    </span>
                    <span className="text-xs text-gray-500">
                      PDF, Word, أو Text (حتى 10MB)
                    </span>
                  </label>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-start pt-3 pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    value={text}
                    onChange={handleTextChange}
                    placeholder="أو قم بلصق النص هنا..."
                    rows={6}
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={!file && !text}
              >
                تحليل المحتوى
              </Button>
            </form>

            {result && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">نتائج التحليل</h3>
                <p className="text-gray-700">{result}</p>
              </div>
            )}
          </Card>
        </div>
      </Section>
    </>
  );
};

export default AbcToolPage;