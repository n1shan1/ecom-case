"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { changeOrderStatus } from "../_actions/change-status";

type Props = { id: string; orderStatus: OrderStatus };
const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: "ORDER PLACED",
  shipped: "SHIPPED",
  fulfilled: "DELIVERED",
};

function StatusDropDown({ id, orderStatus }: Props) {
  const router = useRouter();
  const { mutate: changeOrderStatusMutation } = useMutation({
    mutationKey: ["update-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => {
      router.refresh();
      toast.success("Order status updated successfully");
    },
    onError: (error) => {
      router.refresh();
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="w-52 flex justify-between items-center"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="size-4 ml-2 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            onClick={() =>
              changeOrderStatusMutation({ id, newState: status as OrderStatus })
            }
            key={status}
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-pointer hover:bg-foreground/10",
              {
                "bg-muted-foreground/20": orderStatus === status,
              }
            )}
          >
            <Check
              className={cn(
                "mr-2 size-4 text-primary",
                orderStatus === status ? "opacity-100" : "opacity-0"
              )}
            />
            {LABEL_MAP[status as keyof typeof OrderStatus] || status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StatusDropDown;
