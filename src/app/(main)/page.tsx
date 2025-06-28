"use client";
import { Icons } from "@/components/global/icons";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import PhoneMockup from "@/components/global/phone";
import Reviews from "@/components/global/reviews";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, CheckIcon, StarIcon, Verified } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
type Props = {};

function MainPage({}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="bg-background">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-foreground text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="text-primary relative px-2">
                  Custom
                  <Icons.underline className="hidden sm:block pointer-events-none inset-x-0 -bottom-6 text-primary absolute" />
                </span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 text-3xl">
                  YouCase
                </span>{" "}
                <span className="text-3xl">
                  allows you to protect your memories not just your phone case.
                </span>
                <br />
                Capture your favorite memories with your own,{" "}
                <span className="">one-of-one</span> phone case.
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="size-5 shrink-0 text-primary" />
                    High-Quality Durable Material.
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="size-5 shrink-0 text-primary" />
                    Modern iPhone Models Supported.
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="size-5 shrink-0 text-primary" />5 year
                    Build Guarantee.
                  </li>
                </div>
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-muted-foreground/50"
                    src="/users/user-1.png"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-muted-foreground/50"
                    src="/users/user-2.png"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-muted-foreground/50"
                    src="/users/user-3.png"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-muted-foreground/50"
                    src="/users/user-4.jpg"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-muted-foreground/50"
                    src="/users/user-5.jpg"
                  />
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <StarIcon className="size-5 text-primary fill-primary" />
                    <StarIcon className="size-5 text-primary fill-primary" />
                    <StarIcon className="size-5 text-primary fill-primary" />
                    <StarIcon className="size-5 text-primary fill-primary" />
                    <StarIcon className="size-5 text-primary fill-primary" />
                  </div>
                  <p>
                    <span className="font-semibold">1,250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <img
                src="/your-image.png"
                alt=""
                className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              />
              <img
                src="/line.png"
                className="absolute w-20 -left-6 -bottom-6 select-none"
                alt=""
              />
              <PhoneMockup
                dark={isDark}
                className="w-64"
                imgSource={"/testimonials/1.jpg"}
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      {/* value proposition section */}
      <section className="bg-background py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-foreground">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="hidden sm:block pointer-events-none inset-x-0 -bottom-6 text-primary absolute" />
              </span>{" "}
              say!
            </h2>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.6 mb-2">
                <StarIcon className="size-5 text-green-600 fill-green-600" />
                <StarIcon className="size-5 text-green-600 fill-green-600" />
                <StarIcon className="size-5 text-green-600 fill-green-600" />
                <StarIcon className="size-5 text-green-600 fill-green-600" />
                <StarIcon className="size-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p className="text-muted-foreground text-justify">
                  "The case feels durable and I even got a compliment on the
                  design. Had a case fro 2 and a half months now and it still
                  looks brand new. I love it!{" "}
                  <span className="bg-foreground rounded-sm p-1 text-background">
                    The image is super clear and accurate.
                  </span>{" "}
                  the case fits my phone perfectly."
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="/users/user-1.png"
                  className="rounded-full h-12 w-12 object-cover"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-muted-foreground">
                    <Verified className="size-5 shrink-0 text-green-600" />
                    <p className="text-sm">Verified Customer Review</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.6 mb-2">
                <StarIcon className="size-5 text-green-600 fill-green-600" />
                <StarIcon className="size-5 text-green-600 fill-green-600" />
                <StarIcon className="size-5 text-green-600 fill-green-600" />
                <StarIcon className="size-5 text-green-600 fill-green-600" />
                <StarIcon className="size-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p className="text-muted-foreground text-justify">
                  "I've been searching for a case that truly reflects my style,
                  and YouCase delivered beyond expectations! Every detail of my
                  photo is preserved perfectly.{" "}
                  <span className="bg-foreground rounded-sm p-1 text-background">
                    Absolutely worth every penny for something so personalized.
                  </span>{" "}
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="/users/user-2.png"
                  className="rounded-full h-12 w-12 object-cover"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Tiffany</p>
                  <div className="flex gap-1.5 items-center text-muted-foreground">
                    <Verified className="size-5 shrink-0 text-green-600" />
                    <p className="text-sm">Verified Customer Review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-foreground">
                Upload your Photo and get{" "}
                <span className="relative px-2">
                  your own case{" "}
                  <Icons.underline className="hidden sm:block pointer-events-none inset-x-0 -bottom-6 text-primary absolute" />
                </span>{" "}
                now!
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img
                src="/arrow.png"
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
                alt=""
              />
              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-foreground/10 ring-inset ring-muted-foreground lg:rounded-2xl">
                <img
                  src="/horse.jpg"
                  className={
                    "rounded-md object-cover bg-background shadow-2xl ring-1 ring-foreground/30 h-full w-full"
                  }
                  alt="image"
                />
              </div>
              <PhoneMockup
                dark={isDark}
                className="w-60"
                imgSource="/horse_phone.jpg"
              />
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <CheckIcon className="size-5 text-primary inline mr-2" />
              High Quality Silicone Material
            </li>
            <li className="w-fit">
              <CheckIcon className="size-5 text-primary inline mr-2" />
              Wireless Charging Compatible
            </li>
            <li className="w-fit">
              <CheckIcon className="size-5 text-primary inline mr-2" />5 Year
              Build Guarantee
            </li>
            <li className="w-fit">
              <CheckIcon className="size-5 text-primary inline mr-2" />5 Year
              Finger Print proof Guarantee
            </li>
            <div className="flex justify-center">
              <Link
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "mx-auto mt-8"
                )}
                href={"/configure/upload"}
              >
                Create Your Case Now
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

export default MainPage;
