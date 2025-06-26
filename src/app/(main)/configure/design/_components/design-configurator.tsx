// bg-blue-800 border-blue-800
// bg-zinc-800 border-zinc-800
// bg-yellow-800 border-yellow-800
// bg-amber-800 border-amber-800
// bg-rose-800 border-rose-800
// bg-green-800 border-green-800
// bg-white border-white
"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BASE_PRICE } from "@/config/product";
import { useUploadThing } from "@/lib/uploadthing";
import { cn, formatPrice } from "@/lib/utils";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/options-validators";
import { RadioGroup } from "@headlessui/react";
import { ArrowRight, CheckIcon, ChevronsUpDown, Loader2 } from "lucide-react";
import NextImage from "next/image";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { toast } from "sonner";
import RndHandle from "./rnd-handles";
import { useMutation } from "@tanstack/react-query";
import { SaveConfigArgsType } from "../_actions/actions";
import { saveConfig as _saveConfig } from "../_actions/actions";
import { useRouter } from "next/navigation";
type Props = {
  imageUrl: string;
  configId: string;
  dimensions: {
    height: number;
    width: number;
  };
};

function DesignConfigurator({ imageUrl, configId, dimensions }: Props) {
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    materials: (typeof MATERIALS.options)[number];
    finishes: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    materials: MATERIALS.options[0],
    finishes: FINISHES.options[0],
  });
  const router = useRouter();
  const { mutate: saveConfig, isPending: isSavingConfig } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgsType) => {
      try {
        await Promise.all([saveConfiguration(), _saveConfig(args)]);
      } catch (error) {
        console.error("Error saving configuration:", error);
        throw new Error("Failed to save configuration");
      }
    },
    onError: () => {
      console.error("Failed to save configuration");
      toast.error("Failed to save configuration. Please try again.");
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
      toast.success("Configuration saved successfully!");
    },
  });

  const [renderedDimensions, setRenderedDimensions] = useState({
    width: dimensions.width / 4,
    height: dimensions.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width: caseWidth,
        height: caseHeight,
      } = phoneCaseRef.current!.getBoundingClientRect() || {};

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect() || {};

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x + leftOffset;
      const actualY = renderedPosition.y + topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = renderedDimensions.width;
      canvas.height = renderedDimensions.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }
      const userImage = new Image();
      userImage.crossOrigin = "anonymous"; // Handle CORS if needed
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimensions.width,
        renderedDimensions.height
      );

      const base64Image = canvas.toDataURL("image/png");
      const base64ImageData = base64Image.split(",")[1];

      const blob = base64ToBlob(base64ImageData, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error("Failed to save configuration. Please try again.");
    }
  }

  function base64ToBlob(base64ImageData: string, mimeType: string) {
    const byteCharacters = atob(base64ImageData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }
  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-background p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={448 / 915.5}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              alt="phone template"
              src={"/phone-template.png"}
              className={"pointer-events-none select-none"}
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.twColor}`
            )}
          />

          <Rnd
            onResizeStop={(_, __, ref, ___, { x, y }) => {
              setRenderedDimensions({
                height: parseInt(ref.style.height.slice(0, -2)),
                width: parseInt(ref.style.width.slice(0, -2)),
              });
              setRenderedPosition({ x, y });
            }}
            onDragStop={(_, data) => {
              const { x, y } = data;
              setRenderedPosition({ x, y });
            }}
            default={{
              x: 150,
              y: 205,
              height: dimensions.height / 4,
              width: dimensions.width / 4,
            }}
            lockAspectRatio
            resizeHandleComponent={{
              bottomLeft: <RndHandle />,
              bottomRight: <RndHandle />,
              topRight: <RndHandle />,
              topLeft: <RndHandle />,
            }}
            className="pointer-events-auto select-none bg-background"
          >
            <div className="relative w-full h-full">
              <NextImage
                src={imageUrl}
                fill
                alt="your image"
                className="pointer-events-none object-cover"
              />
            </div>
          </Rnd>
        </div>
      </div>
      <div className="h-[37.5rem] flex flex-col bg-background overflow-hidden col-span-full lg:col-span-1">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div className="absolute z-10 inset-x0 bottom-0 h-12 bg-gradient-to-t from-background pointer-events-none " />
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your Case
            </h2>
            <div className="w-full h-px bg-muted-foreground my-6" />
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label>{options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        className={({ active, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border border-transparent",
                            { [`border-${color.twColor}`]: active || checked }
                          )
                        }
                        key={color.label}
                        value={color}
                      >
                        <span
                          className={cn(
                            `bg-${color.twColor}`,
                            "h-8 w-8 rounded-full border border-foreground border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"outline"}
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={4}
                      className="w-64"
                      forceMount
                      side="bottom"
                      avoidCollisions={false}
                    >
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          onClick={() => {
                            setOptions((prev) => ({
                              ...prev,
                              model: model,
                            }));
                          }}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-foreground/40",
                            {
                              "bg-foreground/20":
                                options.model.label === model.label,
                            }
                          )}
                          key={model.label}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }));
                      }}
                    >
                      <Label>{name.slice(0, 1).toUpperCase()}</Label>
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.label}
                            value={option}
                            className={({ active, checked }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg bg-background px-6 py-4 shadow-sm border-2 border-foreground/20 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                                {
                                  "border-primary": active || checked,
                                }
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioGroup.Label
                                  className={"font-medium text-foreground"}
                                  as={"span"}
                                >
                                  {option.label}
                                </RadioGroup.Label>
                                {option.description ? (
                                  <RadioGroup.Description
                                    as="span"
                                    className="text-muted-foreground"
                                  >
                                    <span className="block sm:inline">
                                      {option.description}
                                    </span>
                                  </RadioGroup.Description>
                                ) : null}
                              </span>
                            </span>
                            <RadioGroup.Description
                              as="span"
                              className={
                                "mt-2 flex text-sm sm:ml-4 sm:mt-0 flex-col sm:text-right"
                              }
                            >
                              <span className="font-medium text-foreground">
                                {formatPrice(option.price / 100)}
                              </span>
                            </RadioGroup.Description>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-background">
          <div className="h-px w-full bg-muted-foreground/30" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                Total:{" "}
                {formatPrice(
                  (BASE_PRICE +
                    options.materials.price +
                    options.finishes.price) /
                    100
                )}
              </p>
              <Button
                onClick={() => {
                  saveConfig({
                    configId,
                    color: options.color.value,
                    finish: options.finishes.value,
                    material: options.materials.value,
                    model: options.model.value,
                  });
                }}
                className={cn(
                  "w-full",
                  buttonVariants({ variant: "default", size: "lg" })
                )}
              >
                {isSavingConfig ? (
                  <div>
                    <span>Saving...</span>{" "}
                    <Loader2 className="size-5 ml-1.5 inline animate-spin" />
                  </div>
                ) : (
                  <div>
                    <span>Continue</span>{" "}
                    <ArrowRight className="size-5 ml-1.5 inline" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignConfigurator;
