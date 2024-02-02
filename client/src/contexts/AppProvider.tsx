"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { TCartProduct, TCategory } from "types/Product";
import { TUserCart } from "types/User";

type TAppContext = {
  categories: TCategory[];
  setCategories: Dispatch<SetStateAction<TCategory[]>>;
  cartProducts: TCartProduct[];
  setCartProducts: Dispatch<SetStateAction<TCartProduct[]>>;
  userCart: TUserCart | null;
  setUserCart: Dispatch<SetStateAction<TUserCart | null>>;
};

const defaultState: TAppContext = {
  categories: [],
  setCategories: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  userCart: null,
  setUserCart: () => {},
};

export const AppContext = createContext<TAppContext>(defaultState);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState(defaultState.categories);
  const [cartProducts, setCartProducts] = useState(defaultState.cartProducts);
  const [userCart, setUserCart] = useState(defaultState.userCart);

  return (
    <AppContext.Provider
      value={{ categories, setCategories, cartProducts, setCartProducts, userCart, setUserCart }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
