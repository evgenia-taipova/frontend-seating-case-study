// CartPopover.tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { Seat } from "@/types/types";
import { useTranslation } from "react-i18next";

interface CartPopoverProps {
  sortedSeats: Seat[]; // замените any на точный тип ваших билетов
  removeFromCart: (seatId: string, seatPrice: number) => void;
}

const CartPopover = ({ sortedSeats, removeFromCart }: CartPopoverProps) => {
  const { t } = useTranslation();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">{t("view_cart")}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-6 bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            {t("your_cart")}
          </h3>
          {sortedSeats.length === 0 ? (
            <p className="text-gray-600">{t("no_tickets_in_cart")}</p>
          ) : (
            <ul>
              {sortedSeats.map((ticket, index) => (
                <li
                  key={index}
                  className="mb-4 flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col">
                    <p className="font-medium text-lg">
                      {t(ticket.ticketType)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("row")}: <strong>{ticket.seatRow}</strong> |{" "}
                      {t("seat")}: <strong>{ticket.seatNumber}</strong>
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="mr-2 text-lg font-semibold text-gray-900">
                      {ticket.seatPrice} CZK
                    </span>
                    <button
                      onClick={() =>
                        removeFromCart(ticket.seatId, ticket.seatPrice)
                      }
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
