import React, { useContext, useEffect, useState } from "react";
import { CartService } from "@/services/Cart.service";
import Head from "next/head";
import Image from "next/image";
import CartProduct from "@/components/cart/CartProduct";
import { AppContext, AuthContext } from "../_app";
import { OrderService } from "@/services/Order.service";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ProductService } from "@/services/Product.service";

const CartPage = ({ cart }) => {
  const [products, setProducts] = useState(cart.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderModalOpened, setOrderModalOpened] = useState(false);

  const fetchProducts = async () => {
    const res = await ProductService.getOne(product.productId);
  };

  const { user } = useContext(AuthContext);
  const { cartProducts, setCartProducts } = useContext(AppContext);

  console.log(cartProducts);

  const removeItem = async (id) => {
    await CartService.removeCartItem(id);
    const newArray = products.filter((item) => item.id !== id);
    setProducts(newArray);
    setCartProducts(newArray);
  };

  const createOrder = async () => {
    const res = await OrderService.create(user.id, cart.products);
    cart.products.map(async (item) => {
      await CartService.removeCartItem(item.id);
    });
    setOrderModalOpened(true);
    setProducts([]);
    setCartProducts([]);
  };

  const calculateTotalPrice = async () => {
    let count = 0;
    cart.products.map(async (item) => {
      const data = await ProductService.getOne(item.productId);
      count += await data.price;
      setTotalPrice(count);
    });
  };

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
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
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;

export const getStaticPaths = async () => {
  const carts = await CartService.getAllCarts();

  let paths = [];

  if (carts) {
    paths = carts.map((cart) => ({
      params: { id: cart.id.toString() },
    }));
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const cart = await CartService.getOne(params.id);

  if (!cart) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      cart,
    },
  };
};
