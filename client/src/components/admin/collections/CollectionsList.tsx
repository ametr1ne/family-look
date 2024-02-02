import React from "react";
import CollectionItem from "./CollectionItem";
import { TCollection } from "types/Product";

const CollectionsList = ({ collections }: { collections: TCollection[] }) => {
  return (
    <div className='mt-10'>
      <h3 className='text-2xl font-bold mb-4'>Все коллекции</h3>
      <ul className='flex flex-col gap-4'>
        {collections.length > 0
          ? collections.map((item) => <CollectionItem collection={item} key={item.id} />)
          : "Пусто"}
      </ul>
    </div>
  );
};

export default CollectionsList;
