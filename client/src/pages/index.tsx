import Head from "next/head";
import Stepper from "@/components/invoice/Stepper";
import Step1Info from "@/components/invoice/Step1Info";
import Step2Items from "@/components/invoice/Step2Items";
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
          {currentStep === 2 && <Step2Items />}
          {currentStep === 3 && (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 3: Review</h2>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
