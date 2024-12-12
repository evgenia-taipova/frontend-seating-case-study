import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  seatRow?: number;
  seatNumber?: number;
  ticketType?: string;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
  ({ seatNumber, ticketType, seatRow, className, ...props }, ref) => {
    const isInCart = false;

    const seatStyle =
      ticketType === "VIP ticket"
        ? "bg-green-400 hover:bg-green-600" // Для VIP - зеленый
        : ticketType === "Regular ticket"
        ? "bg-blue-400 hover:bg-blue-600" // Для Regular - голубой
        : "bg-pink-100";

    const isDisabled =
      ticketType !== "VIP ticket" && ticketType !== "Regular ticket";

    return (
      <Popover>
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
          <div className="text-sm font-medium text-gray-700 space-y-1 mb-3">
            {/* Ticket Type */}
            <p className="text-lg font-semibold text-gray-900">{ticketType}</p>

            {/* Seat Details */}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Row:</span> {seatRow}{" "}
              <span className="font-medium">Seat:</span> {seatNumber}
            </p>
          </div>

          <footer className="flex flex-col">
            {isInCart ? (
              <Button disabled variant="destructive" size="sm">
                Remove from cart
              </Button>
            ) : (
              <Button disabled variant="default" size="sm">
                Add to cart
              </Button>
            )}
          </footer>
        </PopoverContent>
      </Popover>
    );
  }
);
