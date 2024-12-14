import { Button } from "@/components/ui/button.tsx";

import { useCart } from "@/context/CartContext";
import CheckoutModal from "./CheckoutModal";
import { useState } from "react";
import CartPopover from "./CartPopover";

interface CartSummaryProps {
  eventId: string | null;
}

function CartSummary({ eventId }: CartSummaryProps) {
  const { cart, removeFromCart } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);

  const sortedSeats = [...cart.seats].sort((a, b) => {
    if (a.seatRow === b.seatRow) {
      return a.seatNumber - b.seatNumber;
    }
    return a.seatRow - b.seatRow;
  });

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
      <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        {/* Total in cart */}
        <div className="flex flex-col">
          <span>Total for {cart.seats.length} tickets</span>
          <span className="text-2xl font-semibold">{cart.total} CZK</span>
        </div>

        {/* Container for buttons (View Cart and Checkout) */}
        <div className="flex items-center gap-4">
          <CartPopover
            sortedSeats={sortedSeats}
            removeFromCart={removeFromCart}
          />

          {/* Checkout Button */}
          <Button
            disabled={!cart.seats.length}
            variant="default"
            onClick={() => setModalOpen(true)} // Открыть модальное окно
          >
            Checkout now
          </Button>
        </div>

        {/* Модальное окно */}
        {isModalOpen && (
          <CheckoutModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            eventId={eventId}
          />
        )}
      </div>
    </nav>
  );
}

export default CartSummary;
