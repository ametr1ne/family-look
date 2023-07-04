import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const Error = ({ message = "Непредвиденная ошибка", setOpened }) => {
  return (
    <div className='border border-red-400 absolute z-20 bg-white w-1/3 p-4 rounded-md gap-4 bottom-10 right-10'>
      <div className='relative flex gap-5'>
        <XMarkIcon
          onClick={() => setOpened(false)}
          className='h-5 w-5 text-zinc-500 absolute right-0 top-0'
        />
        <ExclamationCircleIcon className='h-6 w-6 text-red-400' />
        <div className='flex flex-col'>
          <b>Ошибка!</b>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
