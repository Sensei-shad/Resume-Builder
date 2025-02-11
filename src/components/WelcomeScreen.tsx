import React from 'react';
import { FileText } from 'lucide-react';

interface WelcomeScreenProps {
  isDarkMode: boolean;
}

export function WelcomeScreen({ isDarkMode }: WelcomeScreenProps) {
  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } animate-fadeOut`}
    >
      <div className="text-center">
        <FileText className={`h-16 w-16 mx-auto mb-4 ${
          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
        } animate-pulse`} />
        <h1 className={`text-4xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Welcome to ResumeAI
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Your Professional Resume Builder
        </p>
      </div>
    </div>
  );
}