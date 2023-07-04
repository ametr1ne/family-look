import React, { useContext, useState } from "react";
import { ADMIN_URL, HOME_URL } from "@/utils/consts";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import {
  ArchiveBoxArrowDownIcon,
  ArrowLeftIcon,
  CubeIcon,
  HomeIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  TagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "@/pages/_app";

const menu = [
  { id: 1, title: "Главная", href: ADMIN_URL, icon: <HomeIcon className='h-6 w-6' /> },
  {
    id: 2,
    title: "Заказы",
    href: ADMIN_URL + "/orders",
    icon: <ArchiveBoxArrowDownIcon className='h-6 w-6' />,
  },
  { id: 3, title: "Товары", href: ADMIN_URL + "/products", icon: <TagIcon className='h-6 w-6' /> },
  {
    id: 4,
    title: "Категории",
    href: ADMIN_URL + "/categories",
    icon: <Squares2X2Icon className='h-6 w-6' />,
  },
  {
    id: 5,
    title: "Коллекции",
    href: ADMIN_URL + "/collections",
    icon: <Square3Stack3DIcon className='h-6 w-6' />,
  },
  {
    id: 6,
    title: "Пользователи",
    href: ADMIN_URL + "/users",
    icon: <UsersIcon className='h-6 w-6' />,
  },
  {
    id: 7,
    title: "Материалы",
    href: ADMIN_URL + "/materials",
    icon: <CubeIcon className='h-6 w-6' />,
  },
];

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='sidebar fixed left-0 top-0 flex flex-col justify-between w-[300px] h-screen bg-white py-6 px-4'>
      <Link href={HOME_URL}>
        <div className='font-bold text-center text-xl'>
          FAMILY <br /> LOOK
        </div>
      </Link>
      <div className='h-full'>
        <ul className='flex flex-col gap-2 mt-8'>
          {menu.map((item) => (
            <SidebarItem key={item.title} title={item.title} icon={item.icon} href={item.href} />
          ))}
        </ul>
      </div>
      <Link
        href={HOME_URL}
        className='flex w-full justify-center items-center bg-zinc-700 hover:bg-zinc-900 uppercase font-semibold text-white rounded-xl py-2 gap-3 group'>
        <ArrowLeftIcon className='h-4 w-4 group-hover:-translate-x-1 transition-transform' />В
        магазин
      </Link>
      <div className='mt-4 p-4 border-t-2 border-zinc-100'>
        <h3 className='font-bold'>{user.name}</h3>
        <p className='text-xs'>{user.email}</p>
      </div>
    </div>
  );
};

export default Sidebar;
