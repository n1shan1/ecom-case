import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import Steps from "@/app/(main)/configure/upload/_components/steps";
import React from "react";

type Props = { children?: React.ReactNode; c?: string };

function ConfigLayout({ children }: Props) {
  return (
    <MaxWidthWrapper className="flex flex-1 flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}

export default ConfigLayout;
