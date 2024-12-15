// types.ts

export interface TicketType {
    id: string;
    name: string;
    price: number;
  }
  
  export interface SeatData {
    seatId: string;
    place: number;
    ticketTypeId: string;
  }
  
  export interface SeatRow {
    seatRow: number;
    seats: SeatData[];
  }
  
  export interface EventTicketsResponse {
    ticketTypes: TicketType[];
    seatRows: SeatRow[];
  }
  

export type TicketTypeEnum = "VIP ticket" | "Regular ticket" | "default";

export interface Seat {
  seatId: string;
  ticketType: TicketTypeEnum;
  seatRow: number;
  seatNumber: number;
  seatPrice: number;
  ticketTypeId: string;
}

export interface Cart {
  seats: Seat[];
  total: number;
}

  