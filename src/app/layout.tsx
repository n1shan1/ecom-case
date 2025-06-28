import type { Metadata } from "next";
import { Outfit } from "@next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AppProvider from "@/components/providers/app-provider";
import { constructMetadata } from "@/lib/utils";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = constructMetadata();

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
