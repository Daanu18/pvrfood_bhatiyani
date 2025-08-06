import React, { createContext, useState, ReactNode } from 'react';

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

type CartContextType = {
  cart: MenuItem[];
  addToCart: (item: MenuItem) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};