// src/app/layout.tsx

import { AuthProvider } from '@/context/AuthContext';
import type { Metadata } from "next"; // Needed for typing (if you use it)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* CRITICAL: The app MUST be wrapped */}
        <AuthProvider> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}