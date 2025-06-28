import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

function LoginModal({ isDialogOpen, setIsDialogOpen }: Props) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="absolute z-[99999999] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight text-foreground">
            Login To Continue.
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-foreground flex flex-col items-center text-nowrap">
              Your configurations has been saved, no progress has been lost at
              all.
            </span>
            <span>
              Please login to continue to checkout and place your order.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between gap-4">
          <Link
            href={"/sign-up"}
            className={buttonVariants({
              variant: "default",
              className: "mt-4 w-full mx-auto",
              size: "lg",
            })}
          >
            Sign Up
          </Link>
          <Link
            href={"/sign-in"}
            className={buttonVariants({
              variant: "outline",
              className: "mt-4 w-full mx-auto",
              size: "lg",
            })}
          >
            Login
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
