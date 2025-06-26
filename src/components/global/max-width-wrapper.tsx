import { cn } from "@/lib/utils";
import React from "react";

type Props = { children: React.ReactNode; className?: string };

function MaxWidthWrapper({ children, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
