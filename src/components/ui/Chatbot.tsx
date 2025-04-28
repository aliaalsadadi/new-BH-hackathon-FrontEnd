import React, { useState } from 'react';
import { MessageSquare, X, Send, Upload, Loader2 } from 'lucide-react';
import Button from './Button';

const LoadingDots = () => (
  <div className="flex space-x-1 items-center">
    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
  </div>
);

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
        <div className="bg-white rounded-2xl shadow-2xl w-96 md:w-[500px] flex flex-col border border-gray-300 min-h-[400px] transition-all duration-300 ease-in-out">
          <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">مساعد التوافق الشامل</span>
            </div>
            <button 
              onClick={toggleChat}
              className="hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
              aria-label="إغلاق المحادثة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[600px] scroll-smooth">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-sm transition-all duration-200 ${
                    message.isUser
                      ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
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
                <div className="rounded-2xl px-4 py-3 bg-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">جاري التفكير</span>
                    <LoadingDots />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك..."
                disabled={loading || fileUploading}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 transition-all duration-200"
              />
              <Button 
                type="submit" 
                variant="primary"
                className="px-4 rounded-xl hover:scale-105 transition-transform duration-200"
                disabled={loading || fileUploading}
              >
                <Send className="w-5 h-5" />
              </Button>
              <label 
                htmlFor="file-upload" 
                className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                  loading || fileUploading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gray-200 hover:bg-gray-300 hover:scale-105'
                }`}
              >
                {fileUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
                <span className="hidden md:block text-sm font-medium">رفع ملف</span>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  disabled={loading || fileUploading}
                  className="hidden w-full"
                />
              </label>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          variant="primary"
          className="rounded-full w-16 h-16 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-primary-600 to-primary-700"
          aria-label="فتح المحادثة"
        >
          <MessageSquare className="w-7 h-7" />
        </Button>
      )}
    </div>
  );
};

export default Chatbot;