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
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-12">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center w-full last:w-auto">
          <div className="flex flex-col items-center relative gap-2">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
                currentStep >= step.id
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > step.id ? <Check size={20} /> : step.id}
            </div>
            <span
              className={`absolute -bottom-8 text-[10px] font-bold whitespace-nowrap text-center ${
                currentStep >= step.id ? "text-secondary" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < STEPS.length - 1 && (
            <div
              className={`flex-1 h-[2px] mx-4 transition-colors ${
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
