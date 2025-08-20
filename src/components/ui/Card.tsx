import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false 
}: CardProps) {
  const baseClasses = 'rounded-xl p-6 transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-md',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-gray-200',
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  
  return (
    <div className={cn(
      baseClasses,
      variants[variant],
      hoverClasses,
      className
    )}>
      {children}
    </div>
  );
}
