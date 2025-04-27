import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  className?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  link,
  className = '',
  delay = 0
}) => {
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

  const iconVariants = {
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  const cardContent = (
    <>
      <motion.div 
        className="feature-icon"
        variants={iconVariants}
        whileHover="hover"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </>
  );

  const cardClasses = `feature-card ${className}`;

  if (link) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Link to={link} className={cardClasses}>
          {cardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={cardClasses}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {cardContent}
    </motion.div>
  );
};

export default FeatureCard;