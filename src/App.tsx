import "./App.css";
import Header from "./components/Header";
import SeatingMap from "./components/SeatingMap";
import EventInfo from "./components/EventInfo";
import CartSummary from "./components/Footer/CartSummary";
import { useState } from "react";


function App() {
  const [eventId, setEventId] = useState<string | null>(null);

  const handleEventIdChange = (id: string) => {
    setEventId(id);
  };

 

  return (
    <div className="flex flex-col grow">
      {/* Header */}
      <Header />

      {/* Main Body */}
      <main className="grow flex flex-col justify-center">
        <div className="max-w-screen-lg m-auto p-4 flex flex-col md:flex-row items-start grow gap-3 w-full">

          {/* Event Info */}
          <EventInfo onEventIdChange={handleEventIdChange} />

          {/* Seating Map */}
          <SeatingMap eventId={eventId} />
        </div>
      </main>
      
      {/* Cart Summary */}
      <CartSummary eventId={eventId} />
    </div>
  );
}

export default App;
