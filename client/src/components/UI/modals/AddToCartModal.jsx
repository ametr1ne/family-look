import { useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AddToCartModal = ({ product, opened, close }) => {
  const [size, setSize] = useState("");
  const [height, setHeight] = useState("");
  const [description, setDescription] = useState("");

  const addToCart = () => {
    console.log(size, he, description);
  };

  return (
    <div
      className={`overlay fixed inset-0 bg-black transition-opacity duration-300 backdrop-blur-md bg-opacity-50 flex items-center justify-center ${
        opened ? "opacity-100 z-20" : "opacity-0 -z-10"
      }`}
      onClick={close}>
      <XMarkIcon className='absolute text-white w-10 h-10 right-10 top-10' />
      <div onClick={(e) => e.stopPropagation()} className='content bg-white p-10 w-1/2 rounded-xl'>
        <p className='mb-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi saepe, ut provident
          blanditiis neque suscipit natus velit soluta laboriosam placeat corrupti quidem quam quos
          amet vel impedit eos unde voluptatem.
        </p>
        <form className='flex flex-col'>
          <div className='flex flex-col gap-2 mb-10'>
            <label className='flex flex-col'>
              <span className='font-semibold text-sm mb-2'>Размер</span>
              <Input
                type={"number"}
                placeholder={"Размер"}
                value={size}
                setValue={(e) => setSize(e)}
              />
            </label>
            <label className='flex flex-col'>
              <span className='font-semibold text-sm mb-2'>Рост</span>
              <Input
                type={"number"}
                placeholder={"Рост"}
                value={height}
                setValue={(e) => setHeight(e)}
              />
            </label>
            <label className='flex flex-col'>
              <span className='font-semibold text-sm mb-2'>Дополнительная информация</span>
              <Input
                type={"textarea"}
                placeholder={"Дополнительная информация"}
                value={description}
                setValue={(e) => setDescription(e)}
              />
            </label>
          </div>
          <Button onClick={addToCart}>Добавить</Button>
        </form>
      </div>
    </div>
  );
};

export default AddToCartModal;
