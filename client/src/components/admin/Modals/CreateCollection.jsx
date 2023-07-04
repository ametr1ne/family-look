import Input from "../../UI/input/Input";
import { useState } from "react";
import { CategoryService } from "@/services/Category.service";
import ModalWrapper from "./ModalWrapper";

const CreateCollection = ({ opened, setOpened }) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", name);

    const res = await CategoryService.create(formData);
    console.log(res);

    setOpened(false);
  };

  return (
    <ModalWrapper opened={opened} setOpened={setOpened}>
      <b className='text-2xl font-semibold'>Создать коллекцию</b>

      <form className='flex flex-col max-w-2xl gap-y-4 mt-6'>
        <Input
          placeholder={"Название коллекции"}
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

export default CreateCollection;
