import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React, { useState } from "react";
import { useTranslation } from "react-i18next"; 

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  seatRow?: number;
  seatNumber?: number;
  ticketType?: string;
  price?: number;
  isInCart?: boolean;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
}

const getSeatStyle = (
  ticketType: string | undefined,
  isInCart: boolean | undefined,
  isPopoverOpen: boolean
) => {
  const styleMap: { [key: string]: string } = {
    "VIP ticket-inCart": "bg-yellow-400 hover:bg-yellow-500", // Жёлтый для VIP в корзине
    "Regular ticket-inCart": "bg-yellow-400 hover:bg-yellow-500", // Жёлтый для обычного в корзине
    "VIP ticket-popoverOpen": "bg-green-600 hover:bg-green-600",
    "Regular ticket-popoverOpen": "bg-blue-600 hover:bg-blue-600",
    "VIP ticket-default": "bg-green-400 hover:bg-green-600",
    "Regular ticket-default": "bg-blue-400 hover:bg-blue-600",
    "default-default": "bg-pink-100", // Стиль для остальных билетов
  };

  const type = ticketType || "default"; // Обработка undefined значения для ticketType

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

    const seatStyle = getSeatStyle(ticketType, isInCart, isPopoverOpen);

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
          <div className="text-sm font-medium text-gray-700 space-y-2 mb-4">
            {/* Ticket Type */}
            <p className="text-xl font-semibold text-gray-900">{t(ticketType)}</p>

            {/* Seat Details */}
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t("Row")}: </span>
                {seatRow}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t("Seat")}: </span>
                {seatNumber}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t("Price")}: </span>
                {price} CZK
              </p>
            </div>
          </div>

          <footer className="flex flex-col gap-2 mt-4">
            {isInCart ? (
              <Button
                onClick={onRemoveFromCart}
                variant="destructive"
                size="sm"
                className="w-full py-2"
              >
                {t("Remove_from_cart")}
              </Button>
            ) : (
              <Button
                onClick={onAddToCart}
                variant="default"
                size="sm"
                className="w-full py-2"
              >
                {t("Add_to_cart")}
              </Button>
            )}
          </footer>
        </PopoverContent>
      </Popover>
    );
  }
);
