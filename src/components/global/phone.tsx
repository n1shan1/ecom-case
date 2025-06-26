import { cn } from "@/lib/utils";
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
        <img src={imgSource} className="object-cover" alt="image" />
      </div>
    </div>
  );
}

export default PhoneMockup;
