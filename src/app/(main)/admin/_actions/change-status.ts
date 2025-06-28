"use server";
import { db } from "@/db";
import { OrderStatus } from "@prisma/client";

export const changeOrderStatus = async ({
  id,
  newState,
}: {
  id: string;
  newState: OrderStatus;
}) => {
  await db.order.update({
    where: { id },
    data: { status: newState },
  });
};
