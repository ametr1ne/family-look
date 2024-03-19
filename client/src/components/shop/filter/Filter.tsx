"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { TCategory, TCollection, TProduct } from "types/Product";

const Filter = ({
  categories,
  collections,
}: {
  categories?: TCategory[];
  collections?: TCollection[];
}) => {
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [collectionOpened, setCollectionOpened] = useState(false);

  const toggleCategory = () => {
    setCategoryOpened(!categoryOpened);
  };

  const toggleCollection = () => {
    setCollectionOpened(!collectionOpened);
  };

  const filterByCategory = async (id: number) => {};

  const filterByCollection = async (id: number) => {};

  const disableFilters = async () => {};

  console.log(categories);

  return (
    <div className='mt-20 w-1/5'>
      <div>
        <button onClick={() => disableFilters()} className='block mb-2 cursor-pointer'>
          Сбросить
        </button>
        {/* {categories && (
            <div>
              <div
                onClick={toggleCategory}
                className='flex justify-between items-center cursor-pointer'>
                <h3 className='font-semibold'>Категории</h3>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-300 ${
                    categoryOpened && "rotate-180"
                  }`}
                />
              </div>

              <div
                className={`mt-2 overflow-hidden h-0 transition-all ${categoryOpened && "h-52"}`}>
                <ul className='flex flex-col gap-y-1'>
                  {categories.map((category) => (
                    <li
                      onClick={() => filterByCategory(category.id)}
                      key={category.id}
                      className='text-sm cursor-pointer hover:text-violet-400 transition-colors duration-200'>
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )} */}
        {/* {collections && (
            <div>
              <div
                onClick={toggleCollection}
                className='flex justify-between items-center cursor-pointer'>
                <h3 className='font-semibold'>Коллекции</h3>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-300 ${
                    collectionOpened && "rotate-180"
                  }`}
                />
              </div>
              <div
                className={`mt-2 overflow-hidden h-0 transition-all ${collectionOpened && "h-52"}`}>
                <ul className='flex flex-col gap-y-1'>
                  {collections.map((collection) => (
                    <li
                      onClick={() => filterByCollection(collection.id)}
                      key={collection.id}
                      className='text-sm cursor-pointer hover:text-violet-400 transition-colors duration-200'>
                      {collection.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )} */}
      </div>
    </div>
  );
};

export default Filter;
