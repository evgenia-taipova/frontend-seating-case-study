import { useState, useEffect } from "react";
import { Seat } from "@/components/Seat.tsx";
import Legend from "./Legend";
import { useCart } from "@/context/CartContext";
import { EventTicketsResponse, TicketTypeEnum } from "@/types/types";
import LoadingSkeletonMap from "./LoadingSkeleton/LoadingSkeletonMap";

interface SeatingMapProps {
  eventId: string | null;
}

function SeatingMap({ eventId }: SeatingMapProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [seatingData, setSeatingData] = useState<EventTicketsResponse | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchSeatingData = async () => {
      try {
        const response = await fetch(
          `https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=${eventId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch seating data");
        }
        const data: EventTicketsResponse = await response.json();
        setSeatingData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Access the error message
        } else {
          setError("An unknown error occurred"); // Fallback for unknown errors
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSeatingData();
  }, [eventId]);

  if (loading) {
    return <LoadingSkeletonMap />;
  }
  if (!seatingData || !seatingData.seatRows || !seatingData.ticketTypes) {
    return <div>No seating data available</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const maxSeatsInRow = Math.max(
    ...seatingData.seatRows.map((row) =>
      row.seats.length > 0
        ? Math.max(...row.seats.map((seat) => seat.place))
        : 0
    )
  );

  return (
    <div className="bg-white rounded-md grow p-3 self-stretch shadow-sm">
      <Legend />
      {seatingData.seatRows.map((row) => (
        <div key={row.seatRow} className="flex items-center mb-2">
          <div className="flex-shrink-0 w-12 text-center font-medium text-gray-600">
            {row.seatRow}
          </div>
          <div className="flex justify-center grow flex-wrap gap-[2px]">
            {Array.from({ length: maxSeatsInRow }, (_, index) => {
              const place = index + 1;
              const seat = row.seats.find((seat) => seat.place === place);
              const ticketType = seat
                ? seatingData.ticketTypes.find(
                    (ticket) => ticket.id === seat.ticketTypeId
                  )
                : null;

              if (seat) {
                const isInCart = cart.seats.some(
                  (ticket) => ticket.seatId === seat.seatId
                );

                return (
                  <Seat
                    key={seat.seatId}
                    seatNumber={seat.place}
                    seatRow={row.seatRow}
                    price={ticketType?.price || 0}
                    className="flex-shrink-0"
                    ticketType={
                      ticketType?.name === "VIP ticket" ||
                      ticketType?.name === "Regular ticket"
                        ? (ticketType?.name as TicketTypeEnum) // Explicitly cast to TicketTypeEnum
                        : "default"
                    }
                    isInCart={isInCart}
                    onAddToCart={() =>
                      addToCart(
                        seat.seatId,
                        ticketType?.price || 0,
                        ticketType?.name === "VIP ticket" ||
                          ticketType?.name === "Regular ticket"
                          ? ticketType?.name
                          : "default",
                        row.seatRow,
                        seat.place,
                        seat.ticketTypeId
                      )
                    }
                    onRemoveFromCart={() =>
                      removeFromCart(seat.seatId, ticketType?.price || 0)
                    }
                  />
                );
              } else {
                return (
                  <Seat
                    key={`missing-${place}`}
                    className="flex-shrink-0"
                    seatNumber={place}
                  />
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeatingMap;
