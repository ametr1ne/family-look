"use client";

import Input from "../../UI/input/Input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { CategoryService } from "services/Category.service";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const CreateCategory = ({ opened, setOpened }: Props) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", name);

    try {
      await CategoryService.create(formData);
      setOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalWrapper opened={opened} close={setOpened}>
      <b className='text-2xl font-semibold'>Создать категорию</b>

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
          Создать
        </button>
      </form>
    </ModalWrapper>
  );
};

export default CreateCategory;
