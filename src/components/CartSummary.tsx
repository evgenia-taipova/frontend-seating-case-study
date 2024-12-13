import { Button } from "@/components/ui/button.tsx";

interface CartSummaryProps {
  cart: { seats: string[]; total: number };
}

function CartSummary({ cart }: CartSummaryProps) {
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
      {/* inner content */}
      <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        {/* total in cart state */}
        <div className="flex flex-col">
          <span>Total for {cart.seats.length} tickets</span>
          <span className="text-2xl font-semibold">{cart.total} CZK</span>
        </div>

        {/* checkout button */}
        <Button disabled={!cart.seats.length} variant="default">
          Checkout now
        </Button>
      </div>
    </nav>
  );
}

export default CartSummary;
