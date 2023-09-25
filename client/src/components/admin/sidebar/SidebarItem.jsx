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
    <li>
      <Link
        href={href}
        className={`flex py-2 cursor-pointer transition-all text-base duration-200 px-5 text-black font-medium rounded-xl items-center gap-4 ${
          active ? "bg-white" : "hover:bg-white hover:bg-opacity-50"
        }`}>
        {icon}
        {title}
      </Link>
    </li>
  );
};

export default SidebarItem;
