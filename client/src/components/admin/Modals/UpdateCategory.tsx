import Input from "../../UI/input/Input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { CategoryService } from "services/Category.service";
import { TCategory } from "types/Product";

type Props = {
  updatingCategory: TCategory;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const UpdateCategoryModal = ({ updatingCategory, opened, setOpened }: Props) => {
  const [name, setName] = useState(updatingCategory.name);
  const [categoryId, setCategoryId] = useState(updatingCategory.id);

  const handleSubmit = async () => {
    const updated = await CategoryService.update({ id: categoryId, name: name });

    setOpened(false);
  };

  return (
    <ModalWrapper opened={opened} close={setOpened}>
      <b className='text-2xl font-semibold'>Обновить</b>

      <form className='flex flex-col max-w-2xl gap-y-4 mt-6'>
        <Input
          placeholder={"Название категории"}
          type={"text"}
          value={name}
          setValue={(e) => setName(e)}
        />
        <button
          type='button'
          onClick={handleSubmit}
          className='bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white py-2 px-5 rounded-md font-semibold'>
          Обновить
        </button>
      </form>
    </ModalWrapper>
  );
};

export default UpdateCategoryModal;
