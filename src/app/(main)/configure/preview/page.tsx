import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignPreview from "./_components/design-preview";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function PreviewPage({ searchParams }: Props) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }
  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, height, width } = configuration;
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 lg:p-6">
      <DesignPreview configuration={configuration} />
    </div>
  );
}

export default PreviewPage;
