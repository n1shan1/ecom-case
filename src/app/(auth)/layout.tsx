import React from "react";

type Props = { children: React.ReactNode };

function AuthLayout({ children }: Props) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen min-h-screen w-full min-w-full">
      {children}
    </div>
  );
}

export default AuthLayout;
