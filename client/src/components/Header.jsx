import { AppContext, AuthContext } from "@/pages/_app";
import { ADMIN_URL, CART_URL, HOME_URL, LOGIN_URL, PROFILE_URL, SHOP_URL } from "@/utils/consts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext, Fragment } from "react";
import styles from "./Header.module.scss";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, PhoneIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import {
  ArrowSmallRightIcon,
  PencilIcon,
  PencilSquareIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Cormorant } from "next/font/google";
import { authRoutes } from "@/utils/routes";
import { UserService } from "@/services/User.service";

export const Header = () => {
  const router = useRouter();
  const [active, setActive] = useState(HOME_URL);
  const [openMenu, setOpenMenu] = useState(false);

  const { cartProducts } = useContext(AppContext);

  const { isAuth, setIsAuth, setUser, user } = useContext(AuthContext);

  useEffect(() => {
    UserService.checkAuth().then((res) => {
      if (res) {
        setIsAuth(true);
        setUser(res);
      }
    });
  }, []);

  useEffect(() => {
    setActive(router.asPath);
  }, [router.asPath]);

  const logOut = () => {
    setIsAuth(false);
    setUser(null);

    localStorage.removeItem("token");
    if (authRoutes.some((route) => route === router.asPath)) {
      router.push(HOME_URL);
    }
  };

  return (
    <header className='w-full md:h-20 bg-white bg-opacity-60 backdrop-blur-md fixed top-0 left-0 z-20'>
      <div className='max-w-[1100px] h-full mx-auto flex justify-between items-center font-semibold'>
        <Link href={HOME_URL}>
          <h4 className={"text-lg font-bold text-center leading-5 "}>
            FAMILY
            <br /> LOOK
          </h4>
        </Link>
        <div className='links flex space-x-5'>
          <Link className={active === HOME_URL ? styles.active : ""} href={HOME_URL}>
            Главная
          </Link>
          <Link className={active === SHOP_URL ? styles.active : ""} href={SHOP_URL}>
            Каталог
          </Link>
        </div>
        <div>
          {isAuth ? (
            <div className='flex space-x-4 items-center'>
              <Link href={CART_URL + "/" + user.cart} className='group relative'>
                <ShoppingBagIcon className='h-6 w-6 group-hover:text-indigo-600 transition-colors duration-300' />
                {cartProducts.length > 0 && (
                  <div className='absolute rounded-full -bottom-2 -right-2 bg-red-300 text-white h-4 w-4 text-xs flex justify-center items-center'>
                    {cartProducts?.length}
                  </div>
                )}
              </Link>
              <div className='relative'>
                <button onClick={() => setOpenMenu(!openMenu)} className='flex items-center'>
                  <span>{user ? user.name : "Пользователь"}</span>
                  <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                </button>
                <div
                  className={`absolute w-max bg-white rounded-md shadow-lg transition-all duration-300 top-9 right-0 py-5 -translate-y-1 ${
                    openMenu ? "opacity-100 visible translate-y-0" : " opacity-0 invisible"
                  }`}>
                  <ul className='w-full flex flex-col gap-3 px-4'>
                    <li className='flex space-x-4'>
                      <Link
                        className='group flex gap-4 justify-center rounded-lg'
                        href={PROFILE_URL + "/" + user.id}
                        onClick={() => setOpenMenu(false)}>
                        <div className='font-semibold text-gray-900 group-hover:text-indigo-600'>
                          Профиль
                        </div>
                      </Link>
                    </li>

                    {user.role === "ADMIN" && (
                      <li className='flex gap-4 group'>
                        <Link
                          className='font-semibold text-gray-900 group-hover:text-indigo-600'
                          href={ADMIN_URL}
                          onClick={() => setOpenMenu(false)}>
                          Админ-панель
                        </Link>
                      </li>
                    )}

                    <li onClick={logOut} className='flex gap-4 group cursor-pointer'>
                      <div className='font-semibold text-gray-900 group-hover:text-indigo-600'>
                        Выйти
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <Link href={LOGIN_URL} className={"flex items-center gap-1 " + styles.login}>
              Войти
              <ArrowSmallRightIcon className='h-4 w-4 text-black' aria-hidden='true' />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
