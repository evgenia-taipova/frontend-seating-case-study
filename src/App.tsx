import "./App.css";
import Header from "./components/Header";
import SeatingMap from "./components/SeatingMap";
import EventInfo from "./components/EventInfo";
import CartSummary from "./components/CartSummary";
import { useState } from "react";

function App() {
  const [eventId, setEventId] = useState<string | null>(null);
  const isLoggedIn = false;

  // Fetch the eventId when EventInfo is rendered
  const handleEventIdChange = (id: string) => {
    setEventId(id);
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
          <SeatingMap eventId={eventId} />
          {/* event info */}
          <EventInfo onEventIdChange={handleEventIdChange} />
        </div>
      </main>

      {/* bottom cart affix (wrapper) */}
      <CartSummary />
    </div>
  );
}

export default App;
