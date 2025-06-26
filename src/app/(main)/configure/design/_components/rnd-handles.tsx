import React from "react";

type Props = {};

function RndHandle({}: Props) {
  return (
    <div className="w-5 h-5 rounded-full shadow border bg-foreground/40 border-foreground/80 transition hover:bg-primary" />
  );
}

export default RndHandle;
