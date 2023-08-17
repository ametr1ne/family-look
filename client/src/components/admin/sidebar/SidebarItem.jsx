import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SidebarItem = ({ title, icon, href }) => {
  const [active, setActive] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === href) setActive(true);
  }, []);

  return (
    <Link href={href}>
      <li
        className={`flex py-2 cursor-pointer transition-all text-base duration-200 px-5 bg-opacity-60 text-black font-medium rounded-xl items-center gap-4 ${
          active ? "bg-zinc-200" : "hover:bg-zinc-100"
        }`}>
        {icon}
        {title}
      </li>
    </Link>
  );
};

export default SidebarItem;
