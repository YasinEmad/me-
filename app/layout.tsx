import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Yasin Emad portfolio",
  description: "Full-stack developer with a passion for building scalable and efficient web applications. Experienced in React, Node.js, and cloud technologies. Always eager to learn and take on new challenges.",
  icons: [
    { rel: "icon", url: "/logo.png", type: "image/png", sizes: "32x32" },
    { rel: "shortcut icon", url: "/logo.png", type: "image/png", sizes: "32x32" },
    { rel: "apple-touch-icon", url: "/logo.png", type: "image/png", sizes: "180x180" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
