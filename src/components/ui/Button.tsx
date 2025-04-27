import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animate?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  to,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  leftIcon,
  rightIcon,
  animate = true
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    accent: 'bg-accent-500 text-gray-900 hover:bg-accent-600 focus:ring-accent-400',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClasses} ${className}`;

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };
  
  const content = (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a 
        href={href} 
        className={classes}
        whileHover={animate ? "hover" : undefined}
        whileTap={animate ? "tap" : undefined}
        variants={buttonVariants}
      >
        {content}
      </motion.a>
    );
  }
  
  if (to) {
    return (
      <motion.div
        whileHover={animate ? "hover" : undefined}
        whileTap={animate ? "tap" : undefined}
        variants={buttonVariants}
      >
        <Link to={to} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button 
      type={type} 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      whileHover={animate ? "hover" : undefined}
      whileTap={animate ? "tap" : undefined}
      variants={buttonVariants}
    >
      {content}
    </motion.button>
  );
};

export default Button;