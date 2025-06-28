"use server";

import { BASE_PRICE } from "@/config/product";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { FINISHES, MATERIALS } from "@/validators/options-validators";
import { currentUser } from "@clerk/nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  try {
    const configuration = await db.configuration.findUnique({
      where: {
        id: configId,
      },
    });

    if (!configuration) {
      throw new Error("Configuration not found");
    }

    const user = await currentUser();

    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const { caseFinish, caseMaterial } = configuration;

    let price = BASE_PRICE;

    if (!caseFinish && !caseMaterial) {
      throw new Error("Case finish and material are required");
    }
    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });
    if (!dbUser) {
      throw new Error("User not found in database");
    }
    if (caseFinish) {
      FINISHES.options.forEach((finish) => {
        if (finish.value === caseFinish) {
          price += finish.price;
        }
      });
    }

    if (caseMaterial) {
      MATERIALS.options.forEach((material) => {
        if (material.value === caseMaterial) {
          price += material.price;
        }
      });
    }

    let order: Order | undefined = undefined;

    const existingOrder = await db.order.findFirst({
      where: {
        userId: dbUser.id,
        configurationId: configId,
      },
    });

    if (existingOrder) {
      order = existingOrder;
    } else {
      order = await db.order.create({
        data: {
          configurationId: configId,
          userId: dbUser.id,
          amount: price / 100,
        },
      });
    }

    const product = await stripe.products.create({
      name: `Custom iPhone Case - ${configuration.caseColor}`,
      images: [configuration.imageUrl],
      default_price_data: {
        currency: "inr",
        unit_amount: price,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configId}`,
      payment_method_types: ["card", "paypal", "amazon_pay"],
      shipping_address_collection: {
        allowed_countries: ["IN", "US", "GB", "CA", "AU"],
      },
      mode: "payment",
      metadata: {
        userId: user.id,
        orderId: order.id,
        configurationId: configId,
      },
      line_items: [
        {
          price: product.default_price as string,
          quantity: 1,
        },
      ],
    });

    return stripeSession.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session. Please try again.");
  }
};
