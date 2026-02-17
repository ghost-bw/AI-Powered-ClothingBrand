import React from "react";
import { Check, X } from "lucide-react"; // Added missing icon imports

const CheckoutStepper = ({ currentStep, hasFailed }) => {
  const steps = [
    { title: "Address", step: 1, description: "Shipping details" },
    { title: "Payment", step: 2, description: "Payment method" },
    {
      title: hasFailed ? "Failed" : "Success",
      step: 3,
      description: hasFailed ? "Try again" : "Order confirmed",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-10 px-4">
      <div className="relative">
        {/* Steps Container */}
        <div className="flex justify-between items-start relative">
          {/* Full Background Line */}
          <div
            className="absolute top-6 h-0.5 bg-gray-300"
            style={{
              left: "24px",
              right: "24px",
              width: "calc(100% - 48px)",
            }}
          ></div>

          {/* Progress Line */}
          <div
            className={`absolute top-6 h-0.5 transition-all duration-300 ${
              hasFailed && currentStep === 3 ? "bg-red-500" : "bg-green-600"
            }`}
            style={{
              left: "24px",
              width: `${(currentStep - 1) * 50}%`, // Fixed: added backticks for template literal
              maxWidth: "calc(100% - 48px)",
            }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = currentStep > step.step;
            const isActive = currentStep === step.step;
            const isCurrentFailed =
              hasFailed && currentStep === 3 && step.step === 3;

            return (
              <div
                key={step.title + step.step} // Fixed: better key to avoid duplicates
                className="flex flex-col items-center relative z-20"
                style={{
                  width: index === 1 ? "auto" : "calc(50% - 24px)",
                }}
              >
                {/* Circle Container */}
                <div className="relative">
                  {index === 1 && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-0.5 bg-white z-10"></div>
                  )}

                  {/* Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mb-2 border-2 transition-all duration-300 relative z-20
                      ${
                        isCurrentFailed
                          ? "bg-red-500 text-white border-red-500"
                          : isCompleted || isActive
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-600 border-gray-300"
                      }`}
                  >
                    {isCurrentFailed ? (
                      <X size={20} className="text-white" />
                    ) : isCompleted ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      step.step
                    )}
                  </div>
                </div>

                {/* Step Title */}
                <span
                  className={`text-sm font-medium ${
                    isCurrentFailed
                      ? "text-red-600"
                      : isCompleted || isActive
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>

                {/* Step Description */}
                <span
                  className={`text-xs mt-1 text-center ${
                    isCurrentFailed ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {step.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepper;
