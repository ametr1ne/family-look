import React from "react";
import CategoryItem from "./CategoryItem";
import { TCategory } from "types/Product";

const CategoriesList = ({ categories }: { categories: TCategory[] }) => {
  return (
    <div className='mt-10'>
      <h3 className='text-2xl font-bold mb-4'>Все категории</h3>
      <ul className='flex flex-col gap-4'>
        {categories ? (
          categories.map((item) => <CategoryItem category={item} key={item.id} />)
        ) : (
          <>
            <h4>Здесь пока ничего нет :(</h4>
          </>
        )}
      </ul>
    </div>
  );
};

export default CategoriesList;
