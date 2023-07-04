import Input from "../../UI/input/Input";
import { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { MaterialService } from "@/services/Material.service";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Button from "@/components/UI/button/Button";

const CreateMaterial = ({ opened, setOpened }) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [color, setColor] = useState("");
  const [preview, setPreview] = useState(null);

  const selectFile = (files) => {
    setImg(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("color", color);
    formData.append("img", img);

    const created = await MaterialService.create(formData);
    console.log(created);
    setOpened(false);
  };

  return (
    <ModalWrapper opened={opened} setOpened={setOpened}>
      <b className='text-2xl font-semibold'>Создать материал</b>

      <form className='flex flex-col max-w-2xl gap-y-4 mt-6'>
        <div>
          <div className='font-semibold text-sm mb-1'>Изображение</div>
          <div className='border border-dotted p-4 rounded-md flex flex-col justify-center items-center'>
            {preview ? (
              <Image src={preview} width={80} height={80} />
            ) : (
              <PhotoIcon className='h-6 w-6 text-zinc-400' />
            )}
            <label className='flex flex-col mt-2 font-semibold text-xs text-indigo-600 cursor-pointer'>
              <span>Загрузить</span>
              <input
                type={"file"}
                className='sr-only'
                onChange={(e) => selectFile(e.target.files)}
              />
            </label>
          </div>
        </div>
        <Input
          placeholder={"Название категории"}
          type={"text"}
          value={name}
          setValue={(e) => setName(e)}
        />
        <Input placeholder={"Цвет"} type={"text"} value={color} setValue={(e) => setColor(e)} />

        <Button onClick={handleSubmit}>Создать</Button>
      </form>
    </ModalWrapper>
  );
};

export default CreateMaterial;
