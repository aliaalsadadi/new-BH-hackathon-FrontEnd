import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '../ui/Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Layout;