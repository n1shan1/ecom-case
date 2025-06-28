import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});
