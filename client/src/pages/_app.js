import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.scss";
import { Montserrat } from "next/font/google";
import { createContext, useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { UserService } from "@/services/User.service";
import { useRouter } from "next/router";
import { ADMIN_URL, HOME_URL } from "@/utils/consts";
import { authRoutes } from "@/utils/routes";
import { CartService } from "@/services/Cart.service";

const montserrat = Montserrat({ subsets: ["latin"] });

export const AuthContext = createContext(null);
export const AppContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const { pathname } = useRouter();

  const { push } = useRouter();

  const [categories, setCategories] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  const fetchAppData = async () => {
    const userRes = await UserService.checkAuth();

    if (userRes) {
      setUser(userRes);
      setIsAuth(true);

      const cartRes = await CartService.getOne(userRes.id);

      if (cartRes) {
        setCartProducts(cartRes.products);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppData();

    if (!isAuth && authRoutes.some((item) => item === pathname)) {
      push(HOME_URL);
    }
  }, []);

  if (loading) {
    return <div className='h-screen w-screen flex justify-center items-center'>Loading...</div>;
  }

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
    <>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <AppContext.Provider value={{ categories, setCategories, cartProducts, setCartProducts }}>
        <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
          <AppLayout>
            {!pathname.includes(ADMIN_URL) && <Header />}
            <Component {...pageProps} />
            {!pathname.includes(ADMIN_URL) && <Footer />}
          </AppLayout>
        </AuthContext.Provider>
      </AppContext.Provider>
    </>
  );
}
