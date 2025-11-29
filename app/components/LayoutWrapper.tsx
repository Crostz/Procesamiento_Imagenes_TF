"use client";

import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Sidebar overlays content */}
      <Sidebar isOpen={showSidebar} toggleSidebar={() => setShowSidebar(false)} />

      {/* Main content stays full width */}
      <div className="flex flex-col h-full">
        <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
