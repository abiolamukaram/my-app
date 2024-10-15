import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "../globals.css";
import {ClerkProvider} from '@clerk/nextjs'

import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";

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
  title: "Nuskiddies - Admin Dashboard",
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
        <div className="flex max-lg:flex-col text-grey-1">
          <LeftSideBar/>
          <TopBar/>
          <div className="flex-1">{children}</div>
        </div>
        </body>
      </html>
    </ClerkProvider>
  );
}