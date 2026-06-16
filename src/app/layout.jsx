import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextHire | Find Your Dream Job",
  description: "The AI-native career platform connecting job seekers with top companies.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`bg-background text-foreground`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
