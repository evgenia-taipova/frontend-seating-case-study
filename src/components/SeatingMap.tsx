import { Seat } from "@/components/Seat.tsx";
import { useState, useEffect } from "react";
import Legend from "./Legend";

interface TicketType {
  id: string;
  name: string;
  price: number;
}

interface SeatData {
  seatId: string;
  place: number;
  ticketTypeId: string;
}

interface SeatRow {
  seatRow: number;
  seats: SeatData[];
}

interface EventTicketsResponse {
  ticketTypes: TicketType[];
  seatRows: SeatRow[];
}

interface SeatingMapProps {
  eventId: string | null;
  onAddToCart: (
    seatId: string,
    price: number,
    ticketType: string,
    seatRow: number,
    seatNumber: number
  ) => void;
  onRemoveFromCart: (seatId: string, price: number) => void;
  cart: {
    seats: {
      seatId: string;
      ticketType: string;
      seatRow: number;
      seatNumber: number;
      seatPrice: number;
    }[];
    total: number;
  };
}

function SeatingMap({
  eventId,
  onAddToCart,
  onRemoveFromCart,
  cart,
}: SeatingMapProps) {
  const [seatingData, setSeatingData] = useState<EventTicketsResponse | null>(
    null
  );

  useEffect(() => {
    if (!eventId) return;

    const fetchSeatingData = async () => {
      const response = await fetch(
        `https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=${eventId}`
      );
      const data = await response.json();
      setSeatingData(data);
    };

    fetchSeatingData();
  }, [eventId]);

  if (!seatingData) return <div>Loading seating...</div>;

  // Определяем максимальное количество мест в ряду
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
          {/* Номер ряда слева */}
          <div className="flex-shrink-0 w-12 text-center font-medium text-gray-600">
            {row.seatRow}
          </div>

          {/* Генерируем полный ряд с учетом отсутствующих мест */}
          <div className="flex justify-center space-x-2 grow">
            {/* Генерируем полный ряд с учетом отсутствующих мест */}
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
                    className="flex-shrink-0"
                    ticketType={ticketType?.name}
                    isInCart={isInCart}
                    onAddToCart={() =>
                      onAddToCart(
                        seat.seatId,
                        ticketType?.price || 0,
                        ticketType?.name || "",
                        row.seatRow,
                        seat.place
                      )
                    }
                    onRemoveFromCart={() =>
                      onRemoveFromCart(seat.seatId, ticketType?.price || 0)
                    }
                  />
                );
              } else {
                // Пропущенное место
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
