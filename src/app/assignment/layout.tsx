"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { StoreProvider } from "@/redux/storeProvider";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  useEffect(() => {
    const token = getCookie("token")
    // console.log('token: == cormmersce ', token);
    if (!token) {
      redirect("/auth/signin")
    }
  }, [])


  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </StoreProvider>



        {/* 
        <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" async></script>
        <script src="https://files.bpcontent.cloud/2025/02/18/06/20250218063448-6YLXT8K0.js" defer ></script> */}

      </body>
    </html>
  );
}
