import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";

interface GuestCheckoutFormProps {
  onSubmit: (guestDetails: { firstName: string; lastName: string; email: string }) => void;
}

const GuestCheckoutForm = ({ onSubmit }: GuestCheckoutFormProps) => {
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ firstName: guestFirstName, lastName: guestLastName, email: guestEmail });
  };

  return (
    <div>
    <h2 className="text-lg font-medium text-gray-700 mb-2">
      Guest Checkout
    </h2>
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          First Name
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          value={guestFirstName}
          onChange={(e) => setGuestFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Last Name
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          value={guestLastName}
          onChange={(e) => setGuestLastName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" variant="default">
        Buy Now
      </Button>
    </form>
  </div>
  );
};

export default GuestCheckoutForm;
