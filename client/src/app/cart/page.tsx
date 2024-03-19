"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import CartProduct from "components/cart/CartProduct";
import { AppContext } from "contexts/AppProvider";
import { AuthContext } from "contexts/AuthProvider";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartService } from "services/Cart.service";
import { OrderService } from "services/Order.service";
import { TCartProduct } from "types/Product";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const { userCart, setUserCart } = useContext(AppContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [orderModalOpened, setOrderModalOpened] = useState(false);

  const [products, setProducts] = useState<TCartProduct[]>([]);

  useEffect(() => {
    userCart && setProducts(userCart.products);
  }, [userCart]);

  const removeItem = async (id: number) => {
    try {
      await CartService.removeCartItem(id);
    } catch (e) {
      console.log(e);
    }
    const newArray = products.filter((item) => item.id !== id);
    setProducts(newArray);
    userCart && setUserCart({ ...userCart, products: newArray });
  };

  const createOrder = async () => {
    if (user) {
      try {
        await OrderService.create(user.id, products);

        products.map(async (item) => {
          await CartService.removeCartItem(item.id);
        });
        setOrderModalOpened(true);
        setProducts([]);
        userCart && setUserCart({ ...userCart, products: [] });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <main className='mt-20 pt-16 pb-16'>
        <div className=' max-w-[1100px] mx-auto'>
          <h2 className='text-4xl font-bold mb-5'>Корзина</h2>
          <div>
            {products.length > 0 ? (
              <div className='flex gap-5 items-start'>
                <div className='flex justify-center flex-col w-2/3 bg-white shadow-md p-4 rounded-xl'>
                  <ul className='flex flex-col gap-y-2'>
                    {products.map((item) => (
                      <CartProduct
                        key={item.id}
                        product={item}
                        removeItem={(id) => removeItem(id)}
                      />
                    ))}
                  </ul>
                </div>
                <div className='w-1/3 bg-white p-4 shadow-md rounded-xl'>
                  <div className='flex justify-between gap-x-4'>
                    <p className='text-xl font-semibold'>Итого:</p>
                    <div className='border-b-slate-400 border-b-2 border-dotted w-full h-5'></div>
                    <b className='text-2xl whitespace-nowrap'>{totalPrice.toLocaleString()}₽</b>
                  </div>
                  <button
                    onClick={createOrder}
                    className='flex mt-4 ml-auto bg-violet-500 py-2 px-4 rounded-md text-white font-semibold'>
                    Оформить
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center'>
                <Image
                  src={"/face-frown.svg"}
                  width={50}
                  height={50}
                  alt='frown'
                  className='mt-20 mb-5'
                />
                <p>Вы еще ничего не добавили в корзину :(</p>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => setOrderModalOpened(false)}
          className={`fixed inset-0 bg-black z-20 bg-opacity-70 backdrop-blur-sm transition-all duration-300 flex justify-center items-center ${
            orderModalOpened ? "opacity-100 visible" : "opacity-0 invisible"
          }`}>
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-xl w-1/2 h-1/3 flex justify-center items-center flex-col gap-5'>
            <CheckCircleIcon className='h-12 w-12 text-green-300' />
            <h3 className='font-bold text-center text-2xl'>Заказ успешно создан</h3>
            <button
              onClick={() => setOrderModalOpened(false)}
              className='bg-gray-700 rounded-xl h-10 px-8 text-white font-semibold hover:bg-gray-800'>
              Хорошо
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;
