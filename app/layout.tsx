import "../app/globals.css";
import type { Metadata } from "next";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata: Metadata = {
  title: "AI Detector",
  description: "Next.js + Tailwind project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
