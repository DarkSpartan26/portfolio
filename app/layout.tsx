import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priyanshu Kapoor | Portfolio",
  description: "Personal portfolio and blog of Priyanshu Kapoor.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AsciiBackground from "@/components/AsciiBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Atmosphere Layers */}
        <AsciiBackground />
        <div className="atmosphere-layer grid-background"></div>
        <div className="ambient-glow"></div>
        <div className="atmosphere-layer noise-overlay"></div>
        <div className="atmosphere-layer scanline-overlay"></div>
        <div className="atmosphere-layer vignette-overlay"></div>

        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
