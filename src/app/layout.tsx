import type { Metadata } from "next";
import { Outfit } from "@next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AppProvider from "@/components/providers/app-provider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "YouCase",
  description: "Create personalized cases for your devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.className} } antialiased`}>
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
