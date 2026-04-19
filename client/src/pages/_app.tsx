import "@/styles/globals.css";

import MainLayout from "@/layouts/MainLayout";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </MainLayout>
  );
}

