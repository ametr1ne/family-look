"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  className?: string;
};

const Search = ({ className }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={clsx("search flex gap-2", className)}>
      <div className='relative'>
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
          type='text'
          className='px-5 py-2 rounded-md border border-slate-300 outline-none focus:border-slate-700'
          placeholder='Поиск...'
        />
        <MagnifyingGlassIcon className='h-4 w-4 absolute top-1/2 -translate-y-1/2 right-4 text-slate-300' />
      </div>
    </div>
  );
};

export default Search;
