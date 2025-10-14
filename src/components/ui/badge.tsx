import React from 'react';

// Define simple color types
type BadgeColor = 'ok' | 'fail' | 'info' | 'default';

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ color = 'default', children, className = '' }) => {
  
  let colorClasses = '';

  // Use simple switch case logic
  switch (color) {
    case 'ok':
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case 'fail':
      colorClasses = 'bg-red-100 text-red-800';
      break;
    case 'info':
      colorClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'default':
    default:
      colorClasses = 'bg-gray-100 text-gray-800';
      break;
  }

  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  return (
    <span className={`${baseClasses} ${colorClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;