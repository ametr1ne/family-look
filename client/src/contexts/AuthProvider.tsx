"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { AppContext } from "./AppProvider";
import { IUser } from "types/User";
import { CartService } from "services/Cart.service";
import { HOME_URL } from "utils/consts";
import { authRoutes } from "utils/routes";

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

  const pathname = usePathname();

  const { push } = useRouter();

  const fetchAppData = async () => {
    const data: IUser | null = Cookies.get("token")
      ? jwtDecode(Cookies.get("token") as string)
      : null;

    if (data) {
      setUser(data);
      setIsAuth(true);

      const res = await CartService.getOne(data.cart);

      res && setUserCart(res);
    }

    if (!data && authRoutes.some((item) => item === pathname)) {
      push(HOME_URL);
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
