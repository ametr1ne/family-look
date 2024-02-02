import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type Props = {
  filter: (value: string) => void;
  confirmation: boolean;
  className?: string;
};

const Search = ({ filter, confirmation = true, className }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!confirmation) {
      filter(searchValue);
    }
  }, [searchValue]);

  return (
    <div className={clsx("search flex gap-2", className)}>
      <div className='relative'>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type='text'
          className='px-5 py-2 rounded-md border border-slate-300 outline-none focus:border-slate-700'
          placeholder='Поиск...'
        />
        <MagnifyingGlassIcon className='h-4 w-4 absolute top-1/2 -translate-y-1/2 right-4 text-slate-300' />
      </div>
      {confirmation && (
        <button
          onClick={() => filter(searchValue)}
          className='flex py-2 px-4 bg-zinc-800 text-white rounded-md'>
          Найти
        </button>
      )}
    </div>
  );
};

export default Search;
