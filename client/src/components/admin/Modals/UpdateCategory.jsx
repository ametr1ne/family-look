import Input from "../../UI/input/Input";
import { useEffect, useState } from "react";
import { CategoryService } from "@/services/Category.service";
import ModalWrapper from "./ModalWrapper";

const UpdateCategory = ({ currentName, id, opened, setOpened }) => {
  const [name, setName] = useState(currentName);
  const [categoryId, setCategoryId] = useState(id);

  const handleSubmit = async () => {
    const updated = await CategoryService.update({ id: categoryId, name: name });
    console.log(updated);
    setOpened(false);
  };

  useEffect(() => {
    setName(currentName);
    setCategoryId(id);
  }, [currentName, id]);

  return (
    <ModalWrapper opened={opened} setOpened={setOpened}>
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

export default UpdateCategory;
