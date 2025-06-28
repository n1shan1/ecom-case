"use client";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./theme-toggle";

type Props = {};

function Navbar({}: Props) {
  const user = useUser();
  const email = user.user?.emailAddresses[0]?.emailAddress || "";

  const isAdmin = email === "nishantdev03@gmail.com";
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-foreground/30 bg-background backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between px-4 border-b border-foreground/10">
          <Link
            href={"/"}
            className="flex z=40 font-semibold text-lg sm:text-2xl"
          >
            You<span className="text-green-500">Case</span>
          </Link>
          <div className="h-full flex items-center space-x-4">
            <SignedIn>
              <ModeToggle />
              {isAdmin ? (
                <Link
                  href={"/admin/dashboard"}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
              ) : null}
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                Create Case
                <ArrowRight className="size-5 text-secondary" />
              </Link>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <ModeToggle />
              <Link
                href={"/sign-in"}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                SignIn
              </Link>
              <Link
                href={"/sign-up"}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                SignUp
              </Link>
              <div className="h-6 bg-foreground/10 w-px hidden sm:block" />
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                Create Case
                <ArrowRight className="size-5 text-secondary" />
              </Link>
            </SignedOut>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
