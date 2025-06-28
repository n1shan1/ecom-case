"use server";

import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

export const getAuthStatus = async () => {
  const user = await currentUser();

  if (!user?.emailAddresses || user.emailAddresses.length === 0) {
    throw new Error("User does not have an email address.");
  }

  const existingUser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!existingUser) {
    await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  return {
    success: true,
  };
};
