import Head from "next/head";
import Stepper from "@/components/invoice/Stepper";
import Step1Info from "@/components/invoice/Step1Info";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useEffect, useState } from "react";

export default function Home() {
  const currentStep = useInvoiceStore((state) => state.currentStep);
  const [hydrated, setHydrated] = useState(false);

  // Hydration guard for persisted store
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <>
      <Head>
        <title>New Invoice | Fleet Logistic</title>
      </Head>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">New Invoice</h1>
          <p className="text-gray-500">Create a new shipping manifest and invoice.</p>
        </div>

        <Stepper />

        <div className="mt-16">
          {currentStep === 1 && <Step1Info />}
          {currentStep === 2 && (
            <div className="text-center py-20 bg-white rounded-xl">
              <p className="text-gray-400">Step 2 (Shipment Details) is coming up...</p>
            </div>
          )}
          {currentStep === 3 && (
            <div className="text-center py-20 bg-white rounded-xl">
              <p className="text-gray-400">Step 3 (Review) is coming up...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
