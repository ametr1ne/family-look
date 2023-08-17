import React from "react";
import CategoryItem from "./CategoryItem";

const CategoriesList = ({ categories, setUpdateId, setCurrentName, setOpened }) => {
  return (
    <div className='mt-10'>
      <h3 className='text-2xl font-bold mb-4'>Все категории</h3>
      <ul className='flex flex-col gap-4'>
        {categories &&
          categories.map((item) => (
            <CategoryItem
              setOpened={setOpened}
              setUpdateId={setUpdateId}
              setCurrentName={setCurrentName}
              category={item}
              key={item.id}
            />
          ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
