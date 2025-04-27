import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  animate?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  interactive = false,
  animate = true,
  delay = 0
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const interactiveClasses = interactive 
    ? 'transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer' 
    : '';
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut"
      }
    }
  };

  if (!animate) {
    return (
      <div className={`${baseClasses} ${interactiveClasses} ${className}`}>
        {children}
      </div>
    );
  }
  
  return (
    <motion.div 
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
    >
      {children}
    </motion.div>
  );
};

export default Card;