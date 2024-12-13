import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx"; // Import the popover components
// import { cn } from "@/lib/utils";

import { TrashIcon } from "@heroicons/react/24/outline";

interface CartSummaryProps {
  cart: {
    seats: {
      seatId: string;
      ticketType: string;
      seatRow: number;
      seatNumber: number;
      seatPrice: number;
    }[];
    total: number;
  };
  onRemoveFromCart: (seatId: string, price: number) => void;
}

function CartSummary({ cart, onRemoveFromCart }: CartSummaryProps) {
  const sortedSeats = cart.seats.sort((a, b) => {
    if (a.seatRow === b.seatRow) {
      return a.seatNumber - b.seatNumber; // Сортировка по месту в ряду
    }
    return a.seatRow - b.seatRow; // Сортировка по ряду
  });
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
      {/* inner content */}
      <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        {/* total in cart state */}
        <div className="flex flex-col">
          <span>Total for {cart.seats.length} tickets</span>
          <span className="text-2xl font-semibold">{cart.total} CZK</span>
        </div>
        {/* Popover to show cart details */}
        {/* Popover to show cart details */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">View Cart</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-6 bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Your Cart
              </h3>
              {cart.seats.length === 0 ? (
                <p className="text-gray-600">No tickets in your cart.</p>
              ) : (
                <ul>
                  {sortedSeats.map((ticket, index) => (
                    <li
                      key={index}
                      className="mb-4 flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col">
                        <p className="font-medium text-lg">
                          {ticket.ticketType}
                        </p>
                        <p className="text-sm text-gray-600">
                          Row: <strong>{ticket.seatRow}</strong> | Seat:{" "}
                          <strong>{ticket.seatNumber}</strong>
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="mr-2 text-lg font-semibold text-gray-900">
                          {ticket.seatPrice} CZK
                        </span>
                        <button
                          onClick={() =>
                            onRemoveFromCart(ticket.seatId, ticket.seatPrice)
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

        {/* checkout button */}
        <Button disabled={!cart.seats.length} variant="default">
          Checkout now
        </Button>
      </div>
    </nav>
  );
}

export default CartSummary;
