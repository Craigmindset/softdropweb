"use client";

import type React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/login/carrier";
  const isAdminDashboard = pathname?.startsWith("/admin/dashboard");
  const isSenderDashboard = pathname?.startsWith("/dashboard");
  const isCarrierDashboard = pathname?.startsWith("/carrier/dashboard");
  const isSenderSignup = pathname?.startsWith("/signup/sender");

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
