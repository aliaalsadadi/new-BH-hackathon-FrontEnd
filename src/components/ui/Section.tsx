import React from 'react';
import AnimatedText from './AnimatedText';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
  centered?: boolean;
  background?: 'white' | 'light' | 'primary' | 'secondary';
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  className = '',
  id,
  centered = false,
  background = 'white',
}) => {
  const bgClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    primary: 'bg-primary-50',
    secondary: 'bg-secondary-50',
  };

  const textAlignClasses = centered ? 'text-center' : '';

  return (
    <section id={id} className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {(title || subtitle) && (
          <div className={`mb-12 ${textAlignClasses}`}>
            {title && (
              <AnimatedText 
                variant="slide" 
                className="section-title"
                delay={0.2}
              >
                {title}
              </AnimatedText>
            )}
            {subtitle && (
              <AnimatedText 
                variant="fade" 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                delay={0.4}
              >
                {subtitle}
              </AnimatedText>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;