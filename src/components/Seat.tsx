import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TicketTypeEnum } from "@/types/types";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  seatRow?: number;
  seatNumber?: number;
  ticketType?: TicketTypeEnum;
  price?: number;
  isInCart?: boolean;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
}

// Function to determine the style of a seat based on its type and state
const getSeatStyle = (
  ticketType: string | undefined,
  isInCart: boolean | undefined,
  isPopoverOpen: boolean
) => {
  const styleMap: { [key: string]: string } = {
    "VIP ticket-inCart": "bg-yellow-400 hover:bg-yellow-500", // Yellow for VIP in cart
    "Regular ticket-inCart": "bg-yellow-400 hover:bg-yellow-500", // Yellow for regular in cart
    "VIP ticket-popoverOpen": "bg-green-600 hover:bg-green-600", // Dark green for VIP with open popover
    "Regular ticket-popoverOpen": "bg-blue-600 hover:bg-blue-600", // Dark blue for regular with open popover
    "VIP ticket-default": "bg-green-400 hover:bg-green-600", // Default green for VIP
    "Regular ticket-default": "bg-blue-400 hover:bg-blue-600", // Default blue for regular
    "default-default": "bg-pink-100", // Default pink for other types
  };

  const type = ticketType || "default";

  if (isInCart) {
    return styleMap[`${type}-inCart`] || styleMap["default-default"];
  } else if (isPopoverOpen) {
    return styleMap[`${type}-popoverOpen`] || styleMap["default-default"];
  }
  return styleMap[`${type}-default`] || styleMap["default-default"];
};

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
  (
    {
      seatNumber,
      ticketType = "default",
      seatRow,
      price,
      className,

      isInCart,
      onAddToCart,
      onRemoveFromCart,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    // Determine the seat style based on state and type
    const seatStyle = getSeatStyle(ticketType, isInCart, isPopoverOpen);
    // Disable seat interaction if it's not a valid ticket type
    const isDisabled =
      ticketType !== "VIP ticket" && ticketType !== "Regular ticket";

    return (
      <Popover onOpenChange={(open) => setIsPopoverOpen(open)}>
        <PopoverTrigger className={isDisabled ? "pointer-events-none" : ""}>
          <div
            className={cn(
              "size-8 rounded-md transition-color",
              seatStyle,
              className
            )}
            ref={ref}
            {...props}
          >
            <span className="text-xs text-white font-medium">{seatNumber}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          {/* Seat details displayed inside the popover */}
          <div className="text-sm font-medium text-gray-700 space-y-2 mb-4">
            {/* Ticket Type */}
            <p className="text-xl font-semibold text-gray-900">
              {t(ticketType)}
            </p>

            {/* Seat Details */}
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t("row")}: </span>
                {seatRow}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t("seat")}: </span>
                {seatNumber}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t("price")}: </span>
                {price} CZK
              </p>
            </div>
          </div>

          {/* Action buttons for the seat */}
          <footer className="flex flex-col gap-2 mt-4">
            {isInCart ? (
              <Button
                onClick={onRemoveFromCart}
                variant="destructive"
                size="sm"
                className="w-full py-2"
              >
                {t("remove_from_cart")}
              </Button>
            ) : (
              <Button
                onClick={onAddToCart}
                variant="default"
                size="sm"
                className="w-full py-2"
              >
                {t("add_to_cart")}
              </Button>
            )}
          </footer>
        </PopoverContent>
      </Popover>
    );
  }
);
