// app/layout.tsx

import React from 'react';
import { Inter, Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from '@/components/auth/AuthProvider';
// import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased text-deep-brown`}>
        <AuthProvider>
          {/* <Navbar /> */}
          <main>{children}</main>

        </AuthProvider>
      </body>
    </html>
  );
}
