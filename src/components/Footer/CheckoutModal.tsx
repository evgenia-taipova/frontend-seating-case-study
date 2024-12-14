import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useCart } from "@/context/CartContext";
import OrderResult from "./OrderResult";
import GuestCheckoutForm from "./GuestCheckoutForm";
import LoginForm from "./LoginForm";
import { UserIcon } from "@heroicons/react/24/outline";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string | null;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  eventId,
}) => {
  const { cart } = useCart();

  const tickets = cart.seats.map((seat) => ({
    ticketTypeId: seat.ticketTypeId, // Correctly access the ticketTypeId from each seat
    seatId: seat.seatId, // Correctly access the seatId from each seat
  }));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [userDetails, setUserDetails] = useState<{
    email: string;
    firstName: string;
    lastName: string;
  } | null>(null);

  const [isOrderComplete, setIsOrderComplete] = useState<boolean | null>(null);
  const [orderMessage, setOrderMessage] = useState<string>("");

  // Handle login form submission
  const handleLoginSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        "https://nfctron-frontend-seating-case-study-2024.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      setIsLoggedIn(true);
      setUserDetails({
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
      });
      setLoginError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  const handleOrder = async () => {
    if (!userDetails) {
      setOrderMessage("You must be logged in to place an order.");
      setIsOrderComplete(false);
      return;
    }

    try {
      const response = await fetch(
        "https://nfctron-frontend-seating-case-study-2024.vercel.app/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            tickets,
            user: {
              email: userDetails.email,
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      setOrderMessage(`Order successful!`);
      setIsOrderComplete(true);
    } catch (err) {
      console.error(err);
      console.error(err);
      setOrderMessage("Failed to create order");
      setIsOrderComplete(false);
    }
  };

  const handleGuestCheckout = async (guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const response = await fetch(
        "https://nfctron-frontend-seating-case-study-2024.vercel.app/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            tickets,
            user: {
              email: guestDetails.email,
              firstName: guestDetails.firstName,
              lastName: guestDetails.lastName,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error details:", data);
        throw new Error(data.message || "Failed to create order");
      }

      setOrderMessage(`Order successful!`);
      setIsOrderComplete(true);
    } catch (err) {
      console.error("Error occurred:", err);
      setOrderMessage("Failed to create order");
      setIsOrderComplete(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className={`bg-white w-full ${
            isOrderComplete !== null ? "max-w-md" : "max-w-4xl"
          } rounded-lg shadow-lg p-6`}
        >
          <DialogTitle className="text-xl font-bold text-gray-800 mb-4">
            Checkout
          </DialogTitle>

          {isOrderComplete === null && (
            <div>
              {isLoggedIn ? (
                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <UserIcon className="mx-1 h-8 w-8 stroke-yellow-400" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Hi, {userDetails?.firstName}!
                    </h2>
                  </div>
                  <p className="text-gray-600 text-center mb-6">
                    You are logged in. Please proceed to confirm
                    your tickets.
                  </p>
                  <Button onClick={handleOrder}>Buy Tickets Now</Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {/* Login Form */}
                  <LoginForm
                    onSubmit={handleLoginSubmit}
                    loginError={loginError}
                  />

                  {/* Guest Form */}
                  <GuestCheckoutForm
                    onSubmit={(guestDetails) => {
                      handleGuestCheckout(guestDetails);
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Show order result */}
          <OrderResult
            isOrderComplete={isOrderComplete}
            orderMessage={orderMessage}
            onClose={onClose}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CheckoutModal;
