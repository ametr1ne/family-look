import { SHOP_URL } from "@/utils/consts";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className='h-screen bg-gradient-to-r from-[#F9F1DD] to-[#CFB494] pt-20'>
      <div className='wrapper h-full max-w-[1100px] mx-auto'>
        <div className='text max-w-xl flex flex-col gap-5 h-full justify-center'>
          <h1 className='text-6xl font-bold'>Family Look - это индивидуальность</h1>
          <p className='text-base'>
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable
            English.
          </p>
          <Link
            className='bg-[#313131] text-white flex items-center justify-center rounded-md h-12 w-36'
            href={SHOP_URL}>
            Смотреть
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
