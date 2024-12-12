import "./App.css";
import Header from "./components/Header";
import SeatingMap from "./components/SeatingMap";
import EventInfo from "./components/EventInfo";
import CartSummary from "./components/CartSummary";

function App() {
  const isLoggedIn = false;

  return (
    <div className="flex flex-col grow">
      {/* header (wrapper) */}
      <Header isLoggedIn={isLoggedIn} />

      {/* main body (wrapper) */}
      <main className="grow flex flex-col justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
          {/* seating card */}

          <SeatingMap />
          {/* event info */}
          <EventInfo />
        </div>
      </main>

      {/* bottom cart affix (wrapper) */}
      <CartSummary />
    </div>
  );
}

export default App;
