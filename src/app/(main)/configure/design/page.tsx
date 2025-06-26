import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignConfigurator from "./_components/design-configurator";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function DesignPage({ searchParams }: Props) {
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
    <DesignConfigurator
      imageUrl={imageUrl}
      configId={id}
      dimensions={{ height, width }}
    />
  );
}

export default DesignPage;
