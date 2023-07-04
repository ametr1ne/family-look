import React from "react";
import Link from "next/link";
import Image from "next/image";

const ListItem = ({ data, deleteHandler, link = null }) => {
  return (
    <li className='cursor-pointer transition-all duration-200 hover:shadow-zinc-200 hover:shadow-lg border border-l-2 border-l-black border-transparent'>
      <Link href={link} className='grid grid-cols-5 auto-cols-min items-center px-4 py-1'>
        <div className='flex gap-4 col-span-2 items-center'>
          <p className='font-bold'>{data.id}</p>
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + data.coverImg}
            width={500}
            height={500}
            className='h-10 w-10 object-cover object-top'
            alt='cover'
          />
          <h4 className='font-bold text-sm'>{data.name}</h4>
        </div>
        <p className='font-semibold text-sm text-zinc-500'>
          {new Date(data.updatedAt).toLocaleDateString()},{" "}
          {new Date(data.updatedAt).toLocaleTimeString().slice(0, -3)}
        </p>
        <p className='font-semibold text-sm text-zinc-500'>{(+data.price).toLocaleString()}₽</p>
        <button
          onClick={deleteHandler}
          className='uppercase place-self-end text-red-400 hover:text-red-500 font-semibold'>
          Удалить
        </button>
      </Link>
    </li>
  );
};

export default ListItem;
