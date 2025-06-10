// File: src/components/ProcessingProgress.tsx
import React from 'react';

interface ProcessingProgressProps {
  progress: number;
  currentStep: string;
}

export const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
  progress,
  currentStep
}) => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="font-medium">{currentStep}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{progress}% complete</p>
    </div>
  );
};
