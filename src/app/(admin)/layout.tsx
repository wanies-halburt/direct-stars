"use client";

import AdminAuthLayout from "@/components/AuthLayout/AdminAuthLayout";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthLayout>{children}</AdminAuthLayout>
  );
}
{/* <div className="min-h-screen xl:flex">
<AppSidebar />
<Backdrop />
<div
  className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
>
  <AppHeader />
  <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
</div>
</div> */}