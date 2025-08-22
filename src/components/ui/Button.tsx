import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-pastel-500 to-dream-end text-white hover:from-pastel-600 hover:to-dream-end/90 focus:ring-pastel-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-lavender-500 to-dreamLavender-end text-white hover:from-lavender-600 hover:to-dreamLavender-end/90 focus:ring-lavender-500',
    outline: 'border-2 border-pastel-500 text-pastel-600 hover:bg-gradient-to-r hover:from-pastel-500 hover:to-dream-end hover:text-white focus:ring-pastel-500',
    ghost: 'text-pastel-600 hover:bg-pastel-50 focus:ring-pastel-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
