// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

// Define the simple variant types
type BtnVariant = 'primary' | 'secondary' | 'delete' | 'toggle';
// Define simple size types
type BtnSize = 'small' | 'medium';

// CRITICAL: The interface extends ButtonHTMLAttributes<HTMLButtonElement>
// This includes props like 'type', 'onClick', 'disabled', etc.
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
  children: React.ReactNode; 
}

const Button: React.FC<BtnProps> = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  className = '', 
  // capture all standard attributes passed to the component, including type="submit"
  ...props 
}) => {
  
  const baseClasses = 'font-bold py-2 px-4 rounded transition duration-200';
  const sizeClasses = size === 'small' ? 'text-sm py-1 px-3' : 'text-base py-2 px-4';
  let colorClasses = '';

  // Use simple if/else logic for class assignment
  if (variant === 'primary') {
    colorClasses = 'bg-blue-500 hover:bg-blue-600 text-white';
  } else if (variant === 'secondary') {
    colorClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  } else if (variant === 'delete') {
    colorClasses = 'bg-red-500 hover:bg-red-600 text-white';
  } else if (variant === 'toggle') {
    colorClasses = 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'; 
  }

  // Combine all classes
  const finalClasses = `${baseClasses} ${sizeClasses} ${colorClasses} ${className}`;
  
  return (
    // CRITICAL: We pass all remaining props ({...props}) to the native <button> element.
    // This ensures that 'type="submit"' (which you passed from Login.tsx) works.
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;