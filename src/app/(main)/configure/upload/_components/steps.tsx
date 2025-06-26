"use client";

import { cn } from "@/lib/utils";
import { de } from "date-fns/locale";
import { CheckCircle, CircleDashed, Hourglass } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const STEPS = [
  {
    name: "Step 1: Add your Image",
    description: "Upload your image to start designing.",
    url: "/upload",
  },
  {
    name: "Step 2: Customize Design",
    description: "Make the case Yours",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    description: "Review your design.",
    url: "/preview",
  },
];

function Steps({}: Props) {
  const pathname = usePathname();

  return (
    <ol className="rounded-md bg-background lg:flex lg:rounded-none lg:border-1  lg:border-muted-foreground/30">
      {STEPS.map((step, index) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(index + 1).some((step) =>
          pathname.endsWith(step.url)
        );
        return (
          <li key={step.name} className="relative overflow-hidden lg:flex-1">
            <div>
              <span
                className={cn(
                  "absolute left-0 top-0 h-full w-1 bg-muted-foreground/30 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
                  {
                    "bg-foreground/80": isCurrent,
                    "bg-primary": isCompleted,
                  }
                )}
              />
              <span
                className={cn(
                  index !== 0 ? "lg:pl-9" : "",
                  "flex items-center px-6 py-4 text-sm font-medium"
                )}
              >
                <span className="flex-shrink-0">
                  {isCurrent ? (
                    <CircleDashed className="h-4 w-4 text-primary animate-pulse" />
                  ) : isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-foreground" />
                  ) : (
                    <Hourglass className="h-4 w-4 text-muted-foreground/30" />
                  )}
                </span>
                <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                  <span
                    className={cn("text-sm font-semibold text-foreground/60", {
                      "text-primary": isCompleted,
                      "text-muted-foreground": isCurrent,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {step.description}
                  </span>
                </span>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default Steps;
