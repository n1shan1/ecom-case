import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";

import React from "react";
import { Toaster } from "sonner";

type Props = { children: React.ReactNode };

function MainLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
        <div className="flex flex-1 flex-col h-full">{children}</div>
        <Footer />
        <Toaster richColors />
      </main>
    </div>
  );
}

export default MainLayout;
