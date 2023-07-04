import { CategoryService } from "@/services/Category.service";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const CategoryItem = ({ setUpdateId, setCurrentName, category, setOpened }) => {
  const removeCategory = async () => {
    const removed = await CategoryService.remove(category.id);

    console.log(removed);
  };

  const updateCategory = async () => {
    setUpdateId(category.id);
    setCurrentName(category.name);
    setOpened(true);
  };

  return (
    <li className='flex py-2 px-4 gap-5 items-center border-b-2'>
      <p className='text-md font-semibold'>{category.name}</p>
      <div className='flex ml-auto gap-4'>
        <button
          onClick={updateCategory}
          className='flex justify-center items-center bg-slate-200 h-8 w-8 rounded-md group hover:bg-white transition-colors duration-300'>
          <PencilIcon className='h-4 w-4 group-hover:text-blue-300 transition-colors duration-300' />
        </button>
        <button
          onClick={removeCategory}
          className='flex justify-center items-center bg-slate-200 h-8 w-8 rounded-md group hover:bg-white transition-colors duration-300'>
          <TrashIcon className='h-4 w-4 group-hover:text-red-300 transition-colors duration-300' />
        </button>
      </div>
    </li>
  );
};

export default CategoryItem;
