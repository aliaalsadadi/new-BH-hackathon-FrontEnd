import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import Button from './Button';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm here to help you with Universal Acceptance. What would you like to know?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm a demo chatbot. In the real implementation, I would provide helpful information about Universal Acceptance!",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-primary-600 text-white rounded-t-lg">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              <span className="font-medium">UA Assistant</span>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.isUser
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button type="submit" variant="primary" className="px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          variant="primary"
          className="rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default Chatbot;