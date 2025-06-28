"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getPaymentStatus } from "../_actions/getPaymentStatus";
import { Loader2 } from "lucide-react";
import PhoneInHandMockup from "@/components/global/phone-in-hand";
import { formatPrice } from "@/lib/utils";

function ThankYouComponent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  if (!orderId) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-primary" />
          <h3 className="font-semibold text-xl">Invalid Order ID</h3>
          <p>Please check your order ID and try again.</p>
        </div>
      </div>
    );
  }

  const { data: orderData, isLoading: loadingOrder } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 1000,
  });

  if (orderData === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-primary" />
          <h3 className="font-semibold text-xl">Loading Your Order...</h3>
          <p>This wont take long, hang tight.</p>
        </div>
      </div>
    );
  }

  if (orderData === false) {
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-primary" />
        <h3 className="font-semibold text-xl">
          Checking your payment status...
        </h3>
        <p>Please wait. Thank you for your cooperation.</p>
      </div>
    </div>;
  }

  if (orderData && orderData.isPaid) {
    const { configuration, billingAddress, shippingAddress, amount } =
      orderData;
    const { caseColor } = configuration;
    return (
      <div className="mx-auto">
        <div className="max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-12">
          <div className="max-w-xl">
            <h1 className="font-medium text-primary text-3xl sm:text-5xl">
              Thank you for Your Order.
            </h1>
            <p className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">
              Your case is on the Way!
            </p>
            <p className="mt-2 text-base">
              We have received your order, and it will be shipped in a moment!
            </p>
            <div className="mt-12 text-sm font-medium">
              <p className="text-foreground">Order Number</p>
              <p className="mt-2 text-base text-muted-foreground">{orderId}</p>
            </div>
          </div>
          <div className="mt-10 border-t border-foreground/40">
            <div className="mt-10 flex flex-auto flex-col">
              <h4 className="font-semibold text-foreground/80 text-xl sm:text-4xl">
                You made a great choice!
              </h4>
              <p className="mt-2 text-sm text-foreground/40">
                We at YouCase believe that, your case just not looks good, but
                also lasts longer. We use the best materials to ensure that your
                case is durable and reliable. If you have any questions or
                concerns, please feel free to contact us.
              </p>
            </div>
          </div>
          <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-foreground/10 ring-1 ring-inset ring-muted-foreground/60 lg:rounded-xl">
            <PhoneInHandMockup
              imageUrl={configuration.imageUrl!}
              color={caseColor!}
            />
          </div>

          <div className="">
            <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <p className="font-medium text-foreground text-xl">
                  Shipping Address
                </p>
                <div className="mt-2 text-foreground">
                  <address className="non-italic">
                    <span className="block">{shippingAddress?.name}</span>
                    <span className="block">{shippingAddress?.street}</span>
                    <span className="block">
                      {shippingAddress?.zip} {shippingAddress?.city}
                    </span>
                  </address>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground text-xl">
                  Billing Address
                </p>
                <div className="mt-2 text-foreground">
                  <address className="non-italic">
                    <span className="block">{billingAddress?.name}</span>
                    <span className="block">{billingAddress?.street}</span>
                    <span className="block">
                      {billingAddress?.city} {billingAddress?.zip}
                    </span>
                  </address>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 border-t border-foreground py-10 text-sm">
              <div>
                <p className="font-medium text-foreground">Payment Status: </p>
                <p className="mt-2 text-foreground/60">PAID</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Shipping Method: </p>
                <p className="mt-2 text-foreground/60">
                  EKart, Takes upto 3 working days.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6 border-t border-foreground/50 pt-10 text-sm">
            <div className="flex justify-between">
              <p className="font-medium text-foreground">Shipping</p>
              <p className="text-foreground">{formatPrice(50)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-foreground">Subtotal</p>
              <p className="text-foreground">{formatPrice(amount)}</p>
            </div>
            <div className="h-px w-full bg-foreground"></div>
            <div className="flex justify-between">
              <p className="font-medium text-foreground text-3xl">Total</p>
              <p className="text-foreground font-bold text-3xl">
                {formatPrice(amount + 50)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <p>Something went wrong :/</p>;
}

export default ThankYouComponent;
