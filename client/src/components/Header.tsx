"use client";

import { AppContext } from "src/contexts/AppProvider";
import { AuthContext } from "src/contexts/AuthProvider";
import { ADMIN_URL, CART_URL, HOME_URL, LOGIN_URL, PROFILE_URL, SHOP_URL } from "src/utils/consts";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext, Fragment } from "react";
import styles from "./Header.module.scss";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { authRoutes } from "src/utils/routes";
import { UserService } from "src/services/User.service";
import { Popover, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ChartBarSquareIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Cookies from "js-cookie";

export const Header = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [active, setActive] = useState(HOME_URL);
  const [openMenu, setOpenMenu] = useState(false);

  const { userCart } = useContext(AppContext);

  const { isAuth, setIsAuth, setUser, user } = useContext(AuthContext);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  if (pathname.includes(ADMIN_URL)) {
    return null;
  }

  const logOut = () => {
    setIsAuth(false);
    setUser(null);

    Cookies.remove("token");

    if (authRoutes.some((route) => route === pathname)) {
      push(HOME_URL);
    }
  };

  return (
    <header className='w-full md:h-20 bg-white bg-opacity-60 backdrop-blur-md fixed top-0 left-0 z-20'>
      <div className='max-w-[1440px] h-full mx-auto flex justify-between items-center font-semibold'>
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
          {user ? (
            <div className='flex gap-4'>
              <Link href={CART_URL} className='group relative'>
                <ShoppingBagIcon className='h-6 w-6 group-hover:text-indigo-600 transition-colors duration-300' />
                {userCart?.products.length > 0 && (
                  <div className='absolute rounded-full -bottom-2 -right-2 bg-red-300 text-white h-4 w-4 text-xs flex justify-center items-center'>
                    {userCart?.products?.length}
                  </div>
                )}
              </Link>
              <Popover className='relative'>
                <Popover.Button className='flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none'>
                  {user.name ? user.name : "Пользователь"}
                  <ChevronDownIcon className='h-5 w-5 flex-none text-gray-400' aria-hidden='true' />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0 translate-y-1'
                  enterTo='opacity-100 translate-y-0'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 translate-y-1'>
                  <Popover.Panel className='absolute -right-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'>
                    <div className='p-2'>
                      <div className='group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50'>
                        <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                          {user.image ? (
                            <Image
                              className='h-10 w-10 rounded-lg'
                              src={user.image}
                              width={40}
                              height={40}
                              alt='avatar'
                            />
                          ) : (
                            <UserCircleIcon
                              className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
                              aria-hidden='true'
                            />
                          )}
                        </div>
                        <div className='flex-auto'>
                          <Link href={PROFILE_URL} className='block font-semibold text-gray-900'>
                            Профиль
                            <span className='absolute inset-0' />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {user?.role === "ADMIN" && (
                      <div className='p-2'>
                        <div className='group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50'>
                          <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                            <ChartBarSquareIcon
                              className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
                              aria-hidden='true'
                            />
                          </div>
                          <div className='flex-auto'>
                            <Link href={ADMIN_URL} className='block font-semibold text-gray-900'>
                              Админ-панель
                              <span className='absolute inset-0' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className='p-2'>
                      <div className='group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50'>
                        <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                          <ArrowLeftOnRectangleIcon
                            className='h-6 w-6 text-gray-600 group-hover:text-red-400'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='flex-auto'>
                          <button onClick={logOut} className='block font-semibold text-red-400'>
                            Выйти
                            <span className='absolute inset-0' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          ) : (
            <Link href={"/auth/login"}>Войти</Link>
          )}
        </div>
      </div>
    </header>
  );
};
