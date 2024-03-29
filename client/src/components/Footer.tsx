"use client";

import { usePathname } from "next/navigation";
import { ADMIN_URL } from "utils/consts";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes(ADMIN_URL)) {
    return null;
  }

  return (
    <div className='footer bg-zinc-800 text-white py-10 mt-auto'>
      <div className='wrapper max-w-[1100px] mx-auto flex flex-col items-center justify-center'>
        <div className='logo'>
          <h3 className='text-xl font-semibold text-center mb-4 leading-5'>
            FAMILY
            <br /> LOOK
          </h3>
        </div>
        <p className='text-sm font-normal'>
          По всем вопросам писать на <a href='mailto:example@mail.ru'>example@mail.ru</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
