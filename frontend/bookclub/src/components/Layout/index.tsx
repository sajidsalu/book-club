// src/components/Layout.tsx
import { useState } from "react";
import Sidebar from "../Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 ml-0 md:ml-64 bg-gray-50 p-4">{children}</div>
    </div>
  );
}
