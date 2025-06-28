import { db } from "@/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import stripe, { Stripe } from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signatures = headers().get("stripe-signature");

    if (!signatures) {
      return new Response("Missing Stripe signature", { status: 400 });
    }

    const event = await stripe.webhooks.constructEvent(
      body,
      signatures,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing customer email in event data");
      }

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("Missing userId or orderId in session metadata");
      }

      const billingAddress = session.customer_details!.address!;
      const shippingAddress = session.customer_details!.address!;

      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              state: shippingAddress!.state!,
              street: shippingAddress!.line1!,
              zip: shippingAddress!.postal_code!,
              phone: session.customer_details!.phone!,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              state: billingAddress!.state!,
              street: billingAddress!.line1!,
              zip: billingAddress!.postal_code!,
              phone: session.customer_details!.phone!,
            },
          },
        },
      });
    }
    return NextResponse.json({ result: event, ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error in webhook route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
