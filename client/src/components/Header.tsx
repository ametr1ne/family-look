"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftOnRectangleIcon,
  ChartBarSquareIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { authRoutes } from "utils/routes";
import { AppContext } from "contexts/AppProvider";
import { AuthContext } from "contexts/AuthProvider";
import { HOME_URL, ADMIN_URL, SHOP_URL, CART_URL, PROFILE_URL } from "utils/consts";

export const Header = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  const { userCart } = useContext(AppContext);

  const { setIsAuth, setUser, user } = useContext(AuthContext);

  if (pathname.includes(ADMIN_URL)) {
    return null;
  }

  const logOut = () => {
    setIsAuth(false);
    setUser(null);

    Cookies.remove("token");
  };

  return (
    <header className='w-full md:h-20 bg-white bg-opacity-60 backdrop-blur-md fixed top-0 left-0 z-20'>
      <div className='max-w-[1440px] h-full mx-auto flex justify-between items-center font-semibold px-8'>
        <Link href={HOME_URL}>
          <h4 className={"text-lg font-bold text-center leading-5 "}>
            FAMILY
            <br /> LOOK
          </h4>
        </Link>
        <div className='links flex space-x-5'>
          <Link className={pathname === HOME_URL ? styles.active : ""} href={HOME_URL}>
            Главная
          </Link>
          <Link className={pathname === SHOP_URL ? styles.active : ""} href={SHOP_URL}>
            Каталог
          </Link>
        </div>
        <div>
          {user ? (
            <div className='flex gap-4'>
              <Link href={CART_URL} className='group relative'>
                <ShoppingBagIcon className='h-6 w-6 group-hover:text-indigo-600 transition-colors duration-300' />
                {userCart && userCart.products?.length > 0 && (
                  <div className='absolute rounded-full -bottom-2 -right-2 bg-red-300 text-white h-4 w-4 text-xs flex justify-center items-center'>
                    {userCart.products.length}
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
