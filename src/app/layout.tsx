"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState, useRef } from "react";
import Loader from "@/components/common/Loader";
import { StoreProvider } from "@/redux/storeProvider";
import './global.css'
import { tryCatch } from "@/modal/modal";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { deleteCookie } from "cookies-next";
import { Modal } from 'antd';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const hasShownModal = useRef(false);
  const [modal, contextHolder] = Modal.useModal();

  const handleUnauthorized = () => {
    if (!hasShownModal.current) {
      tryCatch({ response: { status: 401 } }, modal, router);
      hasShownModal.current = true;

      // Reset the flag after some time (e.g., 5 seconds)
      setTimeout(() => {
        hasShownModal.current = false;
      }, 5000);
    }
    localStorage.clear();
    deleteCookie("token")
    router.replace('/auth/signin');
  };

  useEffect(() => {
    // Global fetch interceptor
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        const data = await response.clone().json().catch(() => ({}));

        if (response.status === 401 || data?.statusCode === 401) {
          handleUnauthorized();
          return Promise.reject('Unauthorized access');
        }
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    // Axios interceptor
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => {
        if (response.data?.statusCode === 401) {
          handleUnauthorized();
          return Promise.reject('Unauthorized access');
        }
        return response;
      },
      (error) => {
        if (error.response?.status === 401 || error.response?.data?.statusCode === 401) {
          handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );

    setTimeout(() => setLoading(false), 1000);

    return () => {
      window.fetch = originalFetch;
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, [router]);

  if (error) {
    // Handle the error state here
    tryCatch(error);
    return <div>Something went wrong!</div>;
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          {contextHolder}
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </StoreProvider>




        <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" async></script>
        <script src="https://files.bpcontent.cloud/2025/02/18/06/20250218063448-6YLXT8K0.js" defer ></script>

      </body>
    </html>
  );
}
