import { Button } from "@/components/ui/button.tsx";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CheckoutModal from "./CheckoutModal";
import CartPopover from "./CartPopover";

interface CartSummaryProps {
  eventId: string | null;
}

function CartSummary({ eventId }: CartSummaryProps) {
  const { t } = useTranslation();
  const { cart, removeFromCart } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);

  // Sort the seats in the cart by row and seat number
  const sortedSeats = [...cart.seats].sort((a, b) => {
    if (a.seatRow === b.seatRow) {
      return a.seatNumber - b.seatNumber;
    }
    return a.seatRow - b.seatRow;
  });

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
      <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        {/* Display total price for the tickets in the cart */}
        <div className="flex flex-col">
          <span>
            {t("total_for")} {cart.seats.length} {t("tickets")}
          </span>
          <span className="md:text-2xl sm:text-sm font-semibold">
            {cart.total} CZK
          </span>
        </div>

        {/* Container for buttons (View Cart and Checkout) */}
        <div className="flex items-center gap-1 flex-col md:flex-row md:gap-3">
          <CartPopover
            sortedSeats={sortedSeats}
            removeFromCart={removeFromCart}
          />

          {/* Checkout Button */}
          <Button
            disabled={!cart.seats.length}
            variant="default"
            onClick={() => setModalOpen(true)}
          >
            {t("checkout_now")}
          </Button>
        </div>

        {/* Checkout modal */}
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
