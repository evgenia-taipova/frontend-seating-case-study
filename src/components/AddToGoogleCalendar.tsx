// AddToGoogleCalendar.tsx
import { Button } from "@/components/ui/button.tsx";

// Create Google Calendar Link
const createGoogleCalendarLink = (event: { namePub: string; description: string; place: string; dateFrom: string; dateTo: string }) => {
  const startDate = new Date(event.dateFrom);
  const endDate = new Date(event.dateTo);

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.namePub
  )}&details=${encodeURIComponent(
    event.description
  )}&location=${encodeURIComponent(event.place)}&dates=${startDate
    .toISOString()
    .replace(/-|:|\.\d+/g, "")}/${endDate
    .toISOString()
    .replace(/-|:|\.\d+/g, "")}&sf=true&output=xml`;

  return googleCalendarUrl;
};

// Component for the "Add to Google Calendar" button
const AddToGoogleCalendar = ({ event }: { event: { namePub: string; description: string; place: string; dateFrom: string; dateTo: string } }) => {
  const googleCalendarLink = createGoogleCalendarLink(event);

  return (
    <Button variant="secondary" onClick={() => window.open(googleCalendarLink, "_blank")}>
      Add to Google Calendar
    </Button>
  );
};

export default AddToGoogleCalendar;
