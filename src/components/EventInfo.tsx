import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

// Define the structure of the event data
interface EventData {
  eventId: string;
  namePub: string;
  description: string;
  currencyIso: string;
  dateFrom: string;
  dateTo: string;
  headerImageUrl: string;
  place: string;
}

interface EventInfoProps {
  onEventIdChange: (eventId: string) => void;
}

function EventInfo({ onEventIdChange }: EventInfoProps) {
  // State to store event data
  const [event, setEvent] = useState<EventData | null>(null);
  // State to toggle the description visibility
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Fetch event data from API when the component mounts
  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await fetch(
          "https://nfctron-frontend-seating-case-study-2024.vercel.app/event"
        );
        const data = await response.json();

        // Set the event data in the state
        setEvent({
          eventId: data.eventId,
          namePub: data.namePub,
          description: data.description,
          currencyIso: data.currencyIso,
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          headerImageUrl: data.headerImageUrl,
          place: data.place,
        }); // Notify parent component with the eventId
        onEventIdChange(data.eventId);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }

    fetchEventData();
  }, []);

  // If event data is not loaded yet
  if (!event) {
    return <div>Loading...</div>;
  }

  // Function to format date in the format "1. října, sobota, 2024, od 12:00 do 15:00"
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-EN", options);
  };

  // Function to format time without the date for the end time
  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-EN", options);
  };

  // Check if both dates (start and end) are the same day (e.g., if they happen on the same day)
  const isSameDay =
    new Date(event.dateFrom).toDateString() ===
    new Date(event.dateTo).toDateString();

  return (
    <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-4 flex flex-col gap-4">
      {/* Event header image with dynamic size based on the image */}
      <div
        className="bg-zinc-100 rounded-md mb-4 overflow-hidden"
        style={{
          backgroundImage: `url(${event.headerImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "auto",
          paddingTop: "56.25%",
        }}
      />
      {/* Event name */}
      <h1 className="text-2xl text-zinc-900 font-semibold mb-2">
        {event.namePub}
      </h1>

      {/* Event description and toggle button */}
      <div className="flex flex-col">
        <p className="text-sm text-zinc-600 mb-1">
          {isDescriptionExpanded
            ? event.description
            : `${event.description.slice(0, 200)}...`}
        </p>
        {/* Button to toggle the description visibility */}
        <span
          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          className="self-start text-sm text-blue-500 cursor-pointer hover:text-blue-700"
        >
          {isDescriptionExpanded ? "Zobrazit méně" : "Zobrazit více"}
        </span>
      </div>

      {/* Event details */}
      <div className="text-sm text-zinc-700 font-semibold">
        {/* Date block */}
        <p className="flex items-center gap-2 mb-2">
          <CalendarIcon className="mx-1 h-6 w-6 stroke-yellow-400" />
          <span>
            {formatDate(event.dateFrom)}
            {isSameDay ? ` - ${formatTime(event.dateTo)}` : ""}
          </span>
        </p>

        {/* Place block */}
        <p className="flex items-center gap-2">
          <MapPinIcon className="mx-1 h-6 w-6 stroke-yellow-400" />
          <span>{event.place}</span>
        </p>
      </div>

      {/* Add to calendar button */}
      <Button variant="secondary" disabled>
        Add to Calendar
      </Button>
    </aside>
  );
}

export default EventInfo;
