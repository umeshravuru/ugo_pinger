import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ to, children, className = '' }: LinkProps) {
  return (
    <RouterLink
      to={to}
      className={`text-indigo-600 hover:text-indigo-500 ${className}`}
    >
      {children}
    </RouterLink>
  );
}