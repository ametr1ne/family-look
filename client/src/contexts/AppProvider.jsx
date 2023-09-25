"use client";

import { useState, createContext, useEffect, useContext } from "react";
import { CartService } from "src/services/Cart.service";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [userCart, setUserCart] = useState(null);

  return (
    <AppContext.Provider
      value={{ categories, setCategories, cartProducts, setCartProducts, userCart, setUserCart }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
