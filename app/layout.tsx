import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "ClariDoc",
  description: "AI powered PDF summariser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
