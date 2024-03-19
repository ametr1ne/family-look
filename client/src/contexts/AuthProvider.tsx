"use client";

import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartService } from "services/Cart.service";
import { UserService } from "services/User.service";
import { IUser } from "types/User";
import { AppContext } from "./AppProvider";

type TAuthContext = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
};

const defaultState: TAuthContext = {
  isAuth: false,
  setIsAuth: () => {},
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<TAuthContext>(defaultState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUserCart } = useContext(AppContext);

  const [isAuth, setIsAuth] = useState(defaultState.isAuth);
  const [user, setUser] = useState<IUser | null>(defaultState.user);

  const fetchAppData = async () => {
    await UserService.checkAuth();

    const data: IUser | null = Cookies.get("token")
      ? jwtDecode(Cookies.get("token") as string)
      : null;

    if (data) {
      setUser(data);
      setIsAuth(true);

      const res = await CartService.getOne(data.cart);

      res && setUserCart(res);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
