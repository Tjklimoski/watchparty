import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WatchParty",
  description: "Watch movies with other's just as excited as you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="watchPartyDark" lang="en">
      <body
        className={`${rubik.className} bg-main-pattern bg-top bg-no-repeat min-h-screen`}
      >
        <Navbar />
        {children}
        {/* ADD FOOTER */}
      </body>
    </html>
  );
}
