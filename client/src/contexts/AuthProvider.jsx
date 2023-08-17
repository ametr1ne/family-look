"use client";

import { createContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authRoutes } from "@/utils/routes";
import { UserService } from "@/services/User.service";
import { ADMIN_URL, HOME_URL } from "@/utils/consts";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const pathname = usePathname();

  const { push } = useRouter();

  const fetchAppData = async () => {
    const userRes = await UserService.checkAuth();

    if (userRes) {
      setUser(userRes);
      setIsAuth(true);
    }
  };

  useEffect(() => {
    fetchAppData();

    if (!isAuth && authRoutes.some((item) => item === pathname)) {
      push(HOME_URL);
    }
  }, []);

  if (user) {
    if (user.role !== "ADMIN" && pathname.includes(ADMIN_URL)) {
      push(HOME_URL);
    }
  } else {
    if (pathname.includes(ADMIN_URL)) {
      push(HOME_URL);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
