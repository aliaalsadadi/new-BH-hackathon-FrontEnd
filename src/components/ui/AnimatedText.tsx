import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade' | 'slide' | 'zoom' | 'typewriter';
  delay?: number;
  duration?: number;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  variant = 'fade',
  delay = 0,
  duration = 0.5,
  once = true
}) => {
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay }
      }
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1,
        y: 0,
        transition: { duration, delay }
      }
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1,
        scale: 1,
        transition: { duration, delay }
      }
    },
    typewriter: {
      hidden: { opacity: 0, width: 0 },
      visible: { 
        opacity: 1,
        width: "100%",
        transition: { duration: duration * 2, delay }
      }
    }
  };

  return (
    <motion.div
      className={`${className} ${variant === 'typewriter' ? 'overflow-hidden whitespace-nowrap' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedText;