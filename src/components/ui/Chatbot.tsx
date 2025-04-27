import React, { useState } from 'react';
import { MessageSquare, X, Send, Upload } from 'lucide-react';
import Button from './Button';

const Chatbot: React.FC = () => {
  const BASEURL = import.meta.env.VITE_BASEURL;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "مرحبًا! أنا هنا لمساعدتك بخصوص التوافق الشامل (UA). يمكنك إرسال سؤال أو رفع ملف.", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || fileUploading) return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const chatHistory = [];
      const reversedMessages = [...newMessages].reverse();

      for (let i = 0; i < reversedMessages.length; i += 2) {
        const botMessage = reversedMessages[i];
        const userMessage = reversedMessages[i + 1];
        if (botMessage && userMessage) {
          chatHistory.unshift({ GlobalLink: userMessage.text, UserInput: botMessage.text });
        }
        if (chatHistory.length === 4) break;
      }

      const response = await fetch(`${BASEURL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, chatHistory }),
      });

      const data = await response.json();
      if (data.answer) {
        setMessages(prev => [...prev, { text: data.answer, isUser: false }]);
      } else {
        setMessages(prev => [...prev, { text: "عذرًا، لم أتمكن من إيجاد إجابة.", isUser: false }]);
      }
    } catch (error) {
      console.error('خطأ في الاتصال بالخادم:', error);
      setMessages(prev => [...prev, { text: "حدث خطأ أثناء الاتصال بالخادم.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || loading || fileUploading) return;

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setMessages(prev => [...prev, { text: "❌ نوع الملف غير مدعوم.", isUser: false }]);
      return;
    }

    setFileUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BASEURL}/upload-doc-chat`, { method: 'POST', body: formData });
      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { text: "✅ تم رفع الملف بنجاح! يمكنك الآن طرح أسئلتك.", isUser: false }]);
        setFileUploaded(true);
      } else {
        setMessages(prev => [...prev, { text: `❌ فشل رفع الملف: ${data.error}`, isUser: false }]);
      }
    } catch (error) {
      console.error('خطأ أثناء رفع الملف:', error);
      setMessages(prev => [...prev, { text: "❌ حدث خطأ أثناء رفع الملف.", isUser: false }]);
    } finally {
      setFileUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-96 md:w-[500px] flex flex-col border border-gray-300 min-h-[400px]">
          <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-primary-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              <span className="font-bold text-lg">مساعد التوافق الشامل</span>
            </div>
            <button onClick={toggleChat} aria-label="إغلاق المحادثة">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[600px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`rounded-xl px-4 py-2 max-w-[80%] ${message.isUser
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-800'}`}
                  style={{
                    textAlign: isArabic(message.text) ? 'right' : 'left',
                    direction: isArabic(message.text) ? 'rtl' : 'ltr',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="rounded-xl px-4 py-2 max-w-[80%] bg-gray-100 text-gray-800">
                  جاري التحميل...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك..."
                disabled={loading || fileUploading}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
              />
              <Button type="submit" variant="primary" className="px-4" disabled={loading || fileUploading}>
                <Send className="w-5 h-5" />
              </Button>
              <label htmlFor="file-upload" className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg transition ${loading || fileUploading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}>
                <Upload className="w-5 h-5" />
                <span className="text-sm font-medium">رفع ملف</span>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  disabled={loading || fileUploading}
                  className="hidden"
                />
              </label>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          variant="primary"
          className="rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
          aria-label="فتح المحادثة"
        >
          <MessageSquare className="w-7 h-7" />
        </Button>
      )}
    </div>
  );
};

export default Chatbot;
