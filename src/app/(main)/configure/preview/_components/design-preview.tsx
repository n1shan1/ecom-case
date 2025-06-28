"use client";
import PhoneMockup from "@/components/global/phone";
import { Button, buttonVariants } from "@/components/ui/button";
import { BASE_PRICE } from "@/config/product";
import { cn, formatPrice } from "@/lib/utils";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/options-validators";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, CheckIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { createCheckoutSession } from "../_actions/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import LoginModal from "./login-modal";
type Props = {
  configuration: Configuration;
};

function DesignPreview({ configuration }: Props) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => setShowConfetti(true), []);

  const router = useRouter();

  const { id, caseColor, model, caseFinish, caseMaterial } = configuration;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { user } = useUser();
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === caseColor
  )?.twColor;

  const { label: modelLabel, value } =
    MODELS.options.find(({ value }) => value === model) || {};

  let totalPrice = BASE_PRICE;

  if (caseFinish) {
    totalPrice +=
      FINISHES.options[
        FINISHES.options.findIndex((value) => value.value === caseFinish)
      ].price;
  }

  if (caseMaterial) {
    totalPrice +=
      MATERIALS.options[
        MATERIALS.options.findIndex((value) => value.value === caseMaterial)
      ].price;
  }

  const { mutate: createSession, isPending: isSessionLoading } = useMutation({
    mutationFn: createCheckoutSession,
    mutationKey: ["create-checkout-session"],
    onSuccess: (url) => {
      if (url) {
        toast.dismiss("checkout");
        router.push(url as string);
      } else {
        setShowConfetti(false);
        toast.dismiss("checkout");
        alert("Failed to create checkout session. Please try again.");
      }
    },
    onError: (error) => {
      setShowConfetti(false);
      console.error("Error creating checkout session:", error); // Debug log
      alert("Failed to create checkout session. Please try again.");
      toast.error("Failed to create checkout session. Please try again.");
    },
  });

  const handleCheckOut = () => {
    if (user) {
      createSession({
        configId: configuration.id,
      });
    } else {
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
      toast.error("Please login to continue to checkout.");
    }
  };

  return (
    <>
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center">
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>
      <LoginModal
        isDialogOpen={isLoginModalOpen}
        setIsDialogOpen={setIsLoginModalOpen}
      />
      <div className="flex flex-col items-center mt-4 md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-3 md:row-span-2 md:row-end-2 flex justify-center items-center">
          <PhoneMockup
            className={cn(
              "w-fit h-fit rounded-lg shadow-lg overflow-hidden max-w-[180px] md:max-w-full bg-white dark:bg-zinc-900 border border-muted",
              tw ? `bg-${tw}` : ""
            )}
            imgSource={configuration.imageUrl!}
          />
        </div>
        <div className="mt-4 sm:col-span-9 md:row-end-1 text-center sm:text-left flex flex-col justify-center">
          <h3 className="text-3xl font-bold tracking-tight text-foreground text-center sm:text-left leading-tight">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-blue-500">
              {modelLabel}
            </span>{" "}
            case is ready to be shipped, just waiting for your order!
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base text-center sm:text-left justify-center sm:justify-start">
            <CheckIcon className="size-5 text-primary" />
            In stock and ready to ship!
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base mt-6 md:mt-0">
          <div className="grid grid-cols-1 gap-y-4 border-b border-muted-foreground/20 py-4 sm:grid-cols-2 sm:gap-x-6 sm:py-4 md:py-10 rounded bg-muted/30">
            <div>
              <p className="font-medium text-lg text-foreground">Highlights</p>
              <ol className="mt-3 text-muted-foreground list-disc list-inside space-y-1">
                <li>Wireless Charging compatible.</li>
                <li>5 Year print Warranty</li>
                <li>TPU Shock resistance.</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-lg text-foreground">Material</p>
              <ol className="mt-3 text-muted-foreground list-disc list-inside space-y-1">
                <li>High Quality durable material.</li>
                <li>Fingerprint Resistant.</li>
                <li>Waterproof Coating overall.</li>
              </ol>
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-muted-foreground/10 p-6 sm:rounded-lg sm:p-8 rounded shadow-sm">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground capitalize flex items-center gap-2">
                    <CheckIcon className="size-5 text-primary" />
                    Base Price
                  </span>
                  <p className="font-medium text-foreground">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>
                {caseFinish ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <span className="text-foreground capitalize flex items-center gap-2">
                      <CheckIcon className="size-5 text-primary" />
                      {caseFinish.split("_")[0]} Finish
                    </span>
                    <p className="font-medium text-foreground">
                      {formatPrice(
                        FINISHES.options[
                          FINISHES.options.findIndex(
                            (value) => value.value === caseFinish
                          )
                        ].price / 100
                      )}
                    </p>
                  </div>
                ) : (
                  <span className="block text-muted-foreground">
                    Finish Not Selected
                  </span>
                )}
                {caseMaterial ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <span className="text-foreground capitalize flex items-center gap-2">
                      <CheckIcon className="size-5 text-primary" />
                      {caseMaterial.split("_")[0]} Material
                    </span>
                    <p className="font-medium text-foreground">
                      {formatPrice(
                        MATERIALS.options[
                          MATERIALS.options.findIndex(
                            (value) => value.value === caseMaterial
                          )
                        ].price / 100
                      )}
                    </p>
                  </div>
                ) : (
                  <span className="block text-muted-foreground">
                    Material Not Selected.
                  </span>
                )}
                <div className="my-2 h-px bg-primary/40" />
                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-foreground">Order Total:</p>
                  <p className="font-semibold text-foreground">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end pb-8">
              <Button
                onClick={handleCheckOut}
                variant={"default"}
                size={"lg"}
                className="shadow-md"
              >
                {isSessionLoading ? (
                  <span className="flex items-center gap-2">
                    Hold Tight!, Redirecting...
                    <Loader2 className="size-4 text-background animate-spin" />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Continue to Checkout
                    <ArrowRight className="size-4 text-background" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignPreview;
