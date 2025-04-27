import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SuccessConfetti from './SuccessConfetti';

interface BadgePopupProps {
  icon: string;
  name: string;
  message: string;
  onClose: () => void;
}

const BadgePopup: React.FC<BadgePopupProps> = ({ icon, name, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <SuccessConfetti />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="text-6xl mb-6"
          >
            {icon}
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-3"
          >
            {name} Badge Earned!
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600"
          >
            {message}
          </motion.p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BadgePopup;