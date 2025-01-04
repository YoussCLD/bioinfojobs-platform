import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

const ErrorMessage = ({ 
  message = 'Une erreur est survenue', 
  onRetry = null,
  variant = 'default'  // 'default' ou 'full'
}) => {
  const variants = {
    default: 'max-w-md mx-auto my-4 p-4',
    full: 'h-64 flex items-center justify-center'
  };

  return (
    <div className={`${variants[variant]} text-center`}>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-700 font-medium mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 mx-auto"
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Réessayer</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
