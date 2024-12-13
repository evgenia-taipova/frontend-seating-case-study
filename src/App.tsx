import "./App.css";
import Header from "./components/Header";
import SeatingMap from "./components/SeatingMap";
import EventInfo from "./components/EventInfo";
import CartSummary from "./components/CartSummary";
import { useState } from "react";

function App() {
  const [eventId, setEventId] = useState<string | null>(null);

  const [cart, setCart] = useState<{ seats: string[]; total: number }>({
    seats: [],
    total: 0,
  });

  const isLoggedIn = false;

  // Fetch the eventId when EventInfo is rendered
  const handleEventIdChange = (id: string) => {
    setEventId(id);
  };

  const handleAddToCart = (seatId: string, price: number) => {
    setCart((prevCart) => ({
      seats: [...prevCart.seats, seatId],
      total: prevCart.total + price,
    }));
  };

  const handleRemoveFromCart = (seatId: string, price: number) => {
    setCart((prevCart) => ({
      seats: prevCart.seats.filter((id) => id !== seatId),
      total: prevCart.total - price,
    }));
  };

  return (
    <div className="flex flex-col grow">
      {/* header (wrapper) */}
      <Header isLoggedIn={isLoggedIn} />

      {/* main body (wrapper) */}
      <main className="grow flex flex-col justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
          {/* seating card */}
          <SeatingMap
            eventId={eventId}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            cart={cart}
          />
          {/* event info */}
          <EventInfo onEventIdChange={handleEventIdChange} />
        </div>
      </main>

      {/* bottom cart affix (wrapper) */}
      <CartSummary cart={cart} />
    </div>
  );
}

export default App;
