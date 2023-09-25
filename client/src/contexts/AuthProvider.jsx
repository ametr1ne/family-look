"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authRoutes } from "@/utils/routes";
import { ADMIN_URL, HOME_URL } from "@/utils/consts";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { AppContext } from "./AppProvider";
import { CartService } from "src/services/Cart.service";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { setUserCart } = useContext(AppContext);

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const pathname = usePathname();

  const { push } = useRouter();

  const fetchAppData = async () => {
    const data = Cookies.get("token") ? jwtDecode(Cookies.get("token")) : null;

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
