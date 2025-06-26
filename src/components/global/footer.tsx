import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="bg-background h-20 relative">
      <MaxWidthWrapper>
        <div className="border-t border-foreground/60" />
        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights Reserved.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="space-y-8 space-x-6">
              <Link
                href={"/"}
                className="text-sm text-muted-foreground hover:text-muted-foreground/50"
              >
                Terms
              </Link>
              <Link
                href={"/"}
                className="text-sm text-muted-foreground hover:text-muted-foreground/50"
              >
                Privacy Policy
              </Link>
              <Link
                href={"/"}
                className="text-sm text-muted-foreground hover:text-muted-foreground/50"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;
