import React, { createContext, useContext, useState, ReactNode } from "react";
import { TicketTypeEnum,  Cart } from "@/types/types";

interface CartContextValue {
  cart: Cart;
  addToCart: (
    seatId: string,
    price: number,
    ticketType: TicketTypeEnum,
    seatRow: number,
    seatNumber: number,
    ticketTypeId: string
  ) => void;
  removeFromCart: (seatId: string, price: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ seats: [], total: 0 });

  const addToCart = (
    seatId: string,
    price: number,
    ticketType: TicketTypeEnum,
    seatRow: number,
    seatNumber: number,
    ticketTypeId: string
  ) => {
    setCart((prevCart) => ({
      seats: [
        ...prevCart.seats,
        { seatId, ticketType, seatRow, seatNumber, seatPrice: price, ticketTypeId },
      ],
      total: prevCart.total + price,
    }));
  };

  const removeFromCart = (seatId: string, price: number) => {
    setCart((prevCart) => ({
      seats: prevCart.seats.filter((seat) => seat.seatId !== seatId),
      total: prevCart.total - price,
    }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
