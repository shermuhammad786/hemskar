"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
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
    <StoreProvider>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? <Loader /> : children}
      </div>
    </StoreProvider>
  );
}
