"use server";

import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  const user = await currentUser();

  if (!user || !user.id || !user.emailAddresses[0].emailAddress) {
    throw new Error("User not authenticated");
  }

  const dbUser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!dbUser) {
    throw new Error("User not found in database");
  }

  const order = await db.order.findUnique({
    where: {
      id: orderId,
      userId: dbUser.id,
    },
    include: {
      billingAddress: true,
      shippingAddress: true,
      configuration: true,
      user: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
}
