import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const CollectionItem = ({ collection }) => {
  const updateCollection = () => {};
  const removeCollection = () => {};
  return (
    <li className='flex py-2 px-4 gap-5 items-center border-b-2'>
      <p className='text-md font-semibold'>{collection.name}</p>
      <div className='flex ml-auto gap-4'>
        <button
          onClick={updateCollection}
          className='flex justify-center items-center bg-slate-200 h-8 w-8 rounded-md group hover:bg-white transition-colors duration-300'>
          <PencilIcon className='h-4 w-4 group-hover:text-blue-300 transition-colors duration-300' />
        </button>
        <button
          onClick={removeCollection}
          className='flex justify-center items-center bg-slate-200 h-8 w-8 rounded-md group hover:bg-white transition-colors duration-300'>
          <TrashIcon className='h-4 w-4 group-hover:text-red-300 transition-colors duration-300' />
        </button>
      </div>
    </li>
  );
};

export default CollectionItem;
