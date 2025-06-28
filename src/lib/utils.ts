import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

export function constructMetadata({
  title = "YouCase - Custom Phone Cases",
  description = "YouCase is a platform to design and order custom phone cases.",
  image = "/thumbnail-new.png",
  icons = "/favicon.png",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image }],
      creator: "@n1sh_an1",
    },
    icons,
  };
}
