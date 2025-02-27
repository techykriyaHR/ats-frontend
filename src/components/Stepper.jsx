import React from 'react';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex items-center">
          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${index <= currentStep ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {index + 1}
            </div>
            <div className="text-xs mt-2 text-center">{step}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 ${index < currentStep ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}