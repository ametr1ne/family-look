import { useState } from "react";
import Input from "@/components/UI/input/Input";
import Button from "@/components/UI/button/Button";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import MaterialItem from "./MaterialItem";

const AddToCartSection = ({ product, addedToCart, onAddToCart }) => {
  const [size, setSize] = useState(0);
  const [height, setHeight] = useState(0);
  const [material, setMaterial] = useState(0);
  const [description, setDescription] = useState("");

  const [added, setAdded] = useState(addedToCart);

  const addToCart = (e) => {
    e.preventDefault();
    console.log({ size, height, description, material });
    onAddToCart({ size, height, description });
  };

  const sizes = [36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70];

  return (
    <div>
      <div className='content'>
        <form className='flex flex-col' onSubmit={(e) => addToCart(e)}>
          <div className='flex flex-col gap-2 mb-10'>
            <div>
              <span className='font-medium text-sm mb-2'>Размер</span>
              <div className='flex gap-2 flex-wrap'>
                {sizes.map((sizeValue) => (
                  <label
                    key={sizeValue}
                    className={`flex cursor-pointer px-2 justify-center items-center border rounded-xl ${
                      size == sizeValue
                        ? "border-black text-black"
                        : "border-zinc-400 text-zinc-400"
                    }`}>
                    <span>{sizeValue}</span>
                    <input
                      type='radio'
                      value={size == sizeValue ? true : false}
                      onChange={() => setSize(sizeValue)}
                      className='sr-only'
                    />
                  </label>
                ))}
              </div>
            </div>

            <label className='flex flex-col'>
              <span className='font-medium text-sm mb-2'>Рост</span>
              <Input
                type={"number"}
                placeholder={"Рост"}
                value={height}
                setValue={(value) => setHeight(value ? parseInt(value) : "")}
              />
            </label>

            {product.materials && (
              <div>
                <span className='font-medium text-sm mb-2'>Цвет / метериал:</span>
                <ul className='flex gap-2 flex-wrap'>
                  {product.materials.map((item) => (
                    <MaterialItem
                      material={item}
                      activeMaterial={material}
                      key={item}
                      setMaterial={() => setMaterial(item)}
                    />
                  ))}
                </ul>
              </div>
            )}

            <label className='flex flex-col'>
              <span className='font-medium text-sm mb-2'>
                Дополнительную информацию, а также корректировки и пожелания к вашему заказу можете
                оставить ниже:
              </span>
              <textarea
                rows={3}
                type={"textarea"}
                placeholder={"Ваш текст..."}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='px-3 py-2 outline-none bg-transparent border border-zinc-300 rounded-lg'
              />
            </label>
          </div>

          <div className='flex flex-col gap-1'>
            {addedToCart ? (
              <button
                disabled
                className='bg-slate-400 text-white flex items-center justify-center rounded-md h-12 px-4'>
                Уже в корзине
              </button>
            ) : (
              <Button customStyle={"w-52"}>
                <ShoppingBagIcon className='h-6 w-6' />В корзину
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToCartSection;
