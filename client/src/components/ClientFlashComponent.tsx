"use client";

import { useSearchParams } from "next/navigation";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("err");

  return (
    <>
      {errorMessage && (
        <p className="rounded bg-red-200 py-2 text-center text-red-600 transition">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default ClientFlashComponent;
