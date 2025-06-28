"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  dark?: boolean;
  imgSource: string;
}

function PhoneMockup({ className, dark = false, imgSource, ...props }: Props) {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
      <div className="absolute -z-10 inset-0">
        <img
          src={imgSource}
          className="object-cover min-h-full min-w-full"
          alt="image"
        />
      </div>
    </div>
  );
}

export default PhoneMockup;
