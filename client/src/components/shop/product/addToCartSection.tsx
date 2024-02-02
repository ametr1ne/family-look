"use client";

import { ButtonHTMLAttributes, useContext, useEffect, useState } from "react";
import Input from "components/UI/input/Input";
import Button from "components/UI/button/Button";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import MaterialItem from "./MaterialItem";
import { TProduct } from "types/Product";
import { CartService } from "services/Cart.service";
import { AuthContext } from "contexts/AuthProvider";
import { AppContext } from "contexts/AppProvider";

const AddToCartSection = ({ product }: { product: TProduct }) => {
  const [size, setSize] = useState("");
  const [height, setHeight] = useState("");
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [inCart, setInCart] = useState(false);

  const { user } = useContext(AuthContext);

  const { userCart, setUserCart } = useContext(AppContext);

  useEffect(() => {
    if (userCart) {
      setInCart(userCart.products.some((item) => item.productId === product.id));
    }
  }, [userCart]);

  const addToCart = async (e: any) => {
    e.preventDefault();
    console.log({ size, height, description, material });

    if (user) {
      try {
        const res = await CartService.add(
          user.cart,
          product.id,
          size,
          height,
          description,
          material
        );

        userCart && setUserCart({ ...userCart, products: [...userCart.products, res] });

        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      <div className='content'>
        <form className='flex flex-col' onSubmit={(e) => addToCart(e)}>
          <div className='flex flex-col gap-2 mb-10'>
            <label className='flex flex-col'>
              <span className='font-medium text-sm mb-2'>Размер</span>
              <Input
                type={"number"}
                placeholder={"Рост"}
                value={size}
                setValue={(value) => setSize(value)}
              />
            </label>

            <label className='flex flex-col'>
              <span className='font-medium text-sm mb-2'>Рост</span>
              <Input
                type={"number"}
                placeholder={"Рост"}
                value={height}
                setValue={(value) => setHeight(value)}
              />
            </label>

            {/* {product.materials && product.materials.length > 0 && (
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
            )} */}

            <label className='flex flex-col'>
              <span className='font-medium text-sm mb-2'>
                Дополнительную информацию, а также корректировки и пожелания к вашему заказу можете
                оставить ниже:
              </span>
              <textarea
                rows={3}
                placeholder={"Ваш текст..."}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='px-3 py-2 outline-none bg-transparent border border-zinc-300 rounded-lg'
              />
            </label>
          </div>

          <div className='flex flex-col gap-1'>
            {inCart ? (
              <button
                disabled
                className='bg-slate-400 text-white flex items-center justify-center rounded-md h-12 px-4'>
                Уже в корзине
              </button>
            ) : (
              <Button customStyle={"w-52"} onClick={undefined}>
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
