import { db } from "@/db";
import sharp from "sharp";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      const res = await fetch(file.ufsUrl);
      const buffer = await res.arrayBuffer();

      const imageMetadata = await sharp(buffer).metadata();
      const { height, width } = imageMetadata;
      if (!configId) {
        const configuration = await db.configuration.create({
          data: {
            height: height ?? 500,
            width: width ?? 500,
            imageUrl: file.ufsUrl,
          },
        });
        return { configId: configuration.id };
      } else {
        const updatedConfiguration = await db.configuration.update({
          where: { id: configId },
          data: {
            height: height ?? 500,
            width: width ?? 500,
            imageUrl: file.ufsUrl,
          },
        });
        return { configId: updatedConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
