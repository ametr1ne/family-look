import React, { createContext, useState } from "react";

const CartContext = createContext(null);

const CartProvider = () => {
  const [cart, setCart] = useState(null);

  return <CartContext.Provider value={{ cart, setCart }}></CartContext.Provider>;
};

export default CartProvider;
