// bg-blue-800 border-blue-800
// bg-zinc-800 border-zinc-800
// bg-green-800 border-green-800

import { PRODUCT_PRICES } from "@/config/product";

export const COLORS = [
  {
    label: "Black",
    value: "zinc",
    twColor: "zinc-800",
  },
  {
    label: "Blue",
    value: "blue",
    twColor: "blue-800",
  },
  {
    label: "Green",
    value: "green",
    twColor: "green-800",
  },
  {
    label: "Yellow",
    value: "yellow",
    twColor: "yellow-800",
  },
  {
    label: "Amber",
    value: "amber",
    twColor: "amber-800",
  },
  {
    label: "Rose",
    value: "rose",
    twColor: "rose-800",
  },
  {
    label: "White",
    value: "white",
    twColor: "white",
  },
] as const;
export const MODELS = {
  name: "models",
  options: [
    {
      value: "iPhone_8",
      label: "iPhone 8",
    },
    {
      value: "iPhone_8_Plus",
      label: "iPhone 8 Plus",
    },
    {
      value: "iPhone_X",
      label: "iPhone X",
    },
    {
      value: "iPhone_XR",
      label: "iPhone XR",
    },
    {
      value: "iPhone_XS",
      label: "iPhone XS",
    },
    {
      value: "iPhone_XS_Max",
      label: "iPhone XS Max",
    },
    {
      value: "iPhone_11",
      label: "iPhone 11",
    },
    {
      value: "iPhone_11_Pro",
      label: "iPhone 11 Pro",
    },
    {
      value: "iPhone_11_Pro_Max",
      label: "iPhone 11 Pro Max",
    },
    {
      value: "iPhone_12",
      label: "iPhone 12",
    },
    {
      value: "iPhone_12_Mini",
      label: "iPhone 12 Mini",
    },
    {
      value: "iPhone_12_Pro",
      label: "iPhone 12 Pro",
    },
    {
      value: "iPhone_12_Pro_Max",
      label: "iPhone 12 Pro Max",
    },
    {
      value: "iPhone_13_Mini",
      label: "iPhone 13 Mini",
    },
    {
      value: "iPhone_13_Pro",
      label: "iPhone 13 Pro",
    },
    {
      value: "iPhone_13_Pro_Max",
      label: "iPhone 13 Pro Max",
    },
    {
      value: "iPhone_14",
      label: "iPhone 14",
    },
    {
      value: "iPhone_14_Pro",
      label: "iPhone 14 Pro",
    },
    {
      value: "iPhone_14_Plus",
      label: "iPhone 14 Plus",
    },
    {
      value: "iPhone_14_Pro_Max",
      label: "iPhone 14 Pro Max",
    },
    {
      value: "iPhone_15",
      label: "iPhone 15",
    },
    {
      value: "iPhone_15_Pro",
      label: "iPhone 15 Pro",
    },
    {
      value: "iPhone_15_Pro_Max",
      label: "iPhone 15 Pro Max",
    },
    {
      value: "iPhone_15_Plus",
      label: "iPhone 15 Plus",
    },
    {
      value: "iPhone_16",
      label: "iPhone 16",
    },
    {
      value: "iPhone_16_Pro",
      label: "iPhone 16 Pro",
    },
    {
      value: "iPhone_16_Pro_Max",
      label: "iPhone 16 Pro Max",
    },
    {
      value: "iPhone_16_Plus",
      label: "iPhone 16 Plus",
    },
  ],
} as const;
export const MATERIALS = {
  name: "materials",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: "Soft and flexible silicone material",
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "soft_polycarbonate",
      description: "Scratch resistant polycarbonate material.",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
    {
      label: "Leather",
      value: "leather",
      description: "Premium leather material for a luxurious feel.",
      price: PRODUCT_PRICES.material.leather,
    },
  ],
} as const;
export const FINISHES = {
  name: "finishes",
  options: [
    {
      label: "Smooth",
      value: "smooth_finish",
      description: "Smooth finish for a sleek look.",
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Matte",
      value: "matte_finish",
      description: "Matte finish for a non-reflective surface.",
      price: PRODUCT_PRICES.finish.matte,
    },
    {
      label: "Glossy",
      value: "glossy_finish",
      description: "Glossy finish for a shiny look.",
      price: PRODUCT_PRICES.finish.glossy,
    },
  ],
} as const;
