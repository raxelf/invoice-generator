import "@/styles/globals.css";

import MainLayout from "@/layouts/MainLayout";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
        <Toaster position="top-center" />
      </MainLayout>
    </QueryClientProvider>
  );
}


