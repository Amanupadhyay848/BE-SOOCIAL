'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF3D] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-lg gap-2',
    lg: 'text-base px-6 py-3.5 rounded-lg gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#C6FF3D] text-black font-semibold hover:bg-[#b5f030] shadow-[0_0_24px_rgba(198,255,61,0.25)] hover:shadow-[0_0_32px_rgba(198,255,61,0.45)]',
    secondary:
      'bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700',
    outline:
      'bg-transparent text-white border border-neutral-700 hover:border-neutral-500 hover:bg-white/5',
    ghost:
      'bg-transparent text-neutral-300 hover:text-white hover:bg-white/5',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (shouldReduceMotion) {
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }} className="inline-block">
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (shouldReduceMotion) {
    return (
      <button className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.975 }}
      className={combinedClasses}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
