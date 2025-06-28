"use client";
// bg-blue-800 border-blue-800
// bg-zinc-800 border-zinc-800
// bg-yellow-800 border-yellow-800
// bg-amber-800 border-amber-800
// bg-rose-800 border-rose-800
// bg-green-800 border-green-800
// bg-white border-white
import { CaseColor } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { cn } from "@/lib/utils";

type Props = { imageUrl: string; color: CaseColor };

function PhoneInHandMockup({ imageUrl, color }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimensions, setRenderedDimensions] = useState<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;
    const { height, width } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Only allow known colors for Tailwind
  const allowedColors = [
    "blue",
    "zinc",
    "yellow",
    "amber",
    "rose",
    "green",
    "white",
  ];
  const safeColor = allowedColors.includes(color) ? color : "zinc";
  let caseBackgroundColor = `bg-${safeColor}-800`;

  return (
    <AspectRatio className="relative" ratio={3000 / 2001}>
      <div ref={ref} className="absolute inset-0">
        {renderedDimensions.width > 0 && renderedDimensions.height > 0 && (
          <div
            className="absolute z-20 scale-[1.0352]"
            style={{
              left:
                renderedDimensions.width / 2 -
                renderedDimensions.width / (1216 / 121),
              top: renderedDimensions.height / 6.22,
            }}
          >
            <img
              src={imageUrl}
              width={renderedDimensions.width / (3000 / 637)}
              className={cn(
                "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
                caseBackgroundColor
              )}
            />
          </div>
        )}
        <div className="relative h-full w-full z-40">
          <img
            src="/clearphone.png"
            alt="image"
            className="pointer-events-none h-full w-full antialiased rounded-md"
          />
        </div>
      </div>
    </AspectRatio>
  );
}

export default PhoneInHandMockup;
