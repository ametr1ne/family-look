"use client";

import { useState, createContext } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <AppContext.Provider value={{ categories, setCategories, cartProducts, setCartProducts }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
