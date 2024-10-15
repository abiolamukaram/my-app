import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "../globals.css";

import {
  ClerkProvider,
  // SignInButton,
  // SignedIn,
  // SignedOut,
  // UserButton
} from '@clerk/nextjs'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.ttf",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.ttf",  // Corrected path
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Nuskiddies - Admin Auth",
  description: "Dashboard to manage Nuskiddies data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
        className={inter.className}
        //  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
      </html>
    </ClerkProvider>
  );
}