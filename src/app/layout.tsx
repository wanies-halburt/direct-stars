import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toastOptions = {
    className: "z-40",
    success: {
      iconTheme: {
        primary: "white",
        secondary: "green",
      },
      style: {
        background: "green",
        color: "white",
      },
    },
    error: {
      iconTheme: {
        primary: "white",
        secondary: "red",
      },
      style: {
        background: "red",
        color: "white",
      },
    },
  };
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
      <Toaster position="top-right" toastOptions={toastOptions} />
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
