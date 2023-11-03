import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WatchParty",
  description: "Watch movies and TV Shows with other's just as excited as you!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="watchPartyDark" lang="en" className="overflow-x-hidden">
      <body className={`${rubik.className} min-h-screen overflow-x-hidden`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
