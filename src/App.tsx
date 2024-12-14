import "./App.css";
import Header from "./components/Header";
import SeatingMap from "./components/SeatingMap";
import EventInfo from "./components/EventInfo";
import CartSummary from "./components/Footer/CartSummary";
import { useState } from "react";


function App() {
  const [eventId, setEventId] = useState<string | null>(null);
  const isLoggedIn = false;

  const handleEventIdChange = (id: string) => {
    setEventId(id);
  };

 

  return (
    <div className="flex flex-col grow">
      {/* Header */}
      <Header isLoggedIn={isLoggedIn} />

      {/* Main Body */}
      <main className="grow flex flex-col justify-center">
        <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
          {/* Seating Map */}
          <SeatingMap eventId={eventId} />

          {/* Event Info */}
          <EventInfo onEventIdChange={handleEventIdChange} />
        </div>
      </main>

      {/* Cart Summary */}
      <CartSummary eventId={eventId} />
    </div>
  );
}

export default App;
