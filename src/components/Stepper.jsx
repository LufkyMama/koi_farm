import React from 'react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex justify-between w-full max-w-xl mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Step Circle */}
            <div
              aria-current={index === currentStep ? 'step' : undefined}
              aria-label={`Step ${index + 1}: ${step}`}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {index + 1}
            </div>

            {/* Step Label Below Circle */}
            <div className="text-center text-sm mt-2">{step}</div>
          </div>
        ))}
      </div>

      {/* Continuous Progress Line */}
      <div className="relative w-full max-w-xl">
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300"></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 transition-all duration-300"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;
