import { useInvoiceStore } from "@/store/useInvoiceStore";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "DATA KLIEN" },
  { id: 2, label: "SHIPMENT DETAILS" },
  { id: 3, label: "REVIEW" },
];

const Stepper = () => {
  const currentStep = useInvoiceStore((state) => state.currentStep);

  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-16 sm:mb-12 px-2">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center w-full last:w-auto">
          <div className="flex flex-col items-center relative gap-1.5 sm:gap-2">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base transition-colors ${
                currentStep >= step.id
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > step.id ? (
                <Check size={16} className="sm:w-5 sm:h-5" />
              ) : (
                step.id
              )}
            </div>
            <span
              className={`absolute -bottom-7 sm:-bottom-8 text-[9px] sm:text-[10px] font-bold whitespace-nowrap text-center ${
                currentStep >= step.id ? "text-secondary" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < STEPS.length - 1 && (
            <div
              className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-colors ${
                currentStep > step.id ? "bg-primary" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
