import { Seat } from "@/components/Seat.tsx";
import { useState, useEffect } from "react";

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
}

function SeatingMap({ eventId }: SeatingMapProps) {
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
      {seatingData.seatRows.map((row) => (
        <div key={row.seatRow} className="flex justify-center space-x-2 mb-2">
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
              // Занятое место
              return (
                <Seat
                  key={seat.seatId}
                  seatNumber={seat.place}
                  className="flex-shrink-0"
                  ticketType={ticketType?.name}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-zinc-400 font-medium">
                      {seat.place}
                    </span>
                    <span className="text-xs text-zinc-400">
                      ({ticketType ? ticketType.name : "No ticket"})
                    </span>
                  </div>
                </Seat>
              );
            } else {
              // Пропущенное место
              return (
                <Seat
                  key={`missing-${place}`}
                  className="flex-shrink-0 bg-red-100 text-center"
                  seatNumber={place}
                >
                  {/* <div className="flex flex-col items-center">
                    <span className="text-lg text-red-400 font-medium">
                      {place}
                    </span>
                  </div> */}
                </Seat>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}

export default SeatingMap;
