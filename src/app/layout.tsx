import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Student Course Portal",
    template: "%s | Student Course Portal",
  },

  metadataBase: new URL("https://course-enroll-8p3p.vercel.app"),
  description:
    "A full-stack student course management web app built with Next.js and Express.js. It allows students to enroll in courses and admins to manage course listings and student enrollments. Designed with Tailwind CSS and powered by MySQL for real-time data handling.",
  openGraph: {
    title: "Student Course Portal",
    description:
      "A full-stack student course management web app built with Next.js and Express.js. It allows students to enroll in courses and admins to manage course listings and student enrollments. Designed with Tailwind CSS and powered by MySQL for real-time data handling.",
    url: "https://course-enroll-8p3p.vercel.app",
    siteName: "Student Course Portal",
    images: {
      url: "/tempcourse.PNG",
      width: 1200,
      height: 630,
      alt: "Student Course Portal",
    },
    type: "website",
  },
};

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
        <Provider>
          <Toaster />
          <div className="w-[95%] mx-auto">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
