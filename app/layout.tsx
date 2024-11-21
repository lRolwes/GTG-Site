import type { Metadata } from "next";
import { Josefin_Sans } from 'next/font/google'
import "./globals.css";

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "GTG Vacations",
  description: "GTG Vacations is your gateway to unforgettable travel experiences. Explore our wide range of destinations, from tropical beaches to mountain getaways, and find your perfect vacation spot.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className}`}>{children}</body>
    </html>
  )
}
