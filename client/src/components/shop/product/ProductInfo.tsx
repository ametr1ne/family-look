"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { AppContext } from "src/contexts/AppProvider";
import { AuthContext } from "src/contexts/AuthProvider";
import { CartService } from "src/services/Cart.service";
import { TProduct } from "src/types/Product";
import AddToCartSection from "./addToCartSection";

type Props = {
  product: TProduct | null;
  category?: string | null;
};

const ProductInfo = ({ product, category }: Props) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const { userCart, setCartProducts, setUserCart } = useContext(AppContext);
  console.log(userCart);

  const { user, isAuth } = useContext(AuthContext);

  async function onAddToCart(info) {
    if (isAuth) {
      try {
        const data = await CartService.add(
          user.cart,
          product.id,
          info.size,
          info.height,
          info.description,
          info.material
        );
        setUserCart({ ...userCart, products: [...userCart.products, data] });
        setAddedToCart(true);
      } catch (e) {
        console.log(e.response.data.message);
        // setError(e.response.data.message);
      }
    }
  }

  return (
    <div className='grid grid-cols-2 gap-x-10 mt-10'>
      {product && (
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + product.coverImg}
          width={500}
          height={900}
          className='w-full'
          alt='product_img'
          priority
        />
      )}
      <div className='flex flex-col'>
        <div className='mb-3'>
          <div className='flex justify-between items-center mb-1'>
            {product && <h2 className='text-2xl font-medium'>{product.name}</h2>}
            {product && <p className='text-2xl font-semibold'>{product.price.toLocaleString()}₽</p>}
          </div>
          <div>
            {category && (
              <div className='py-1 px-2 w-fit flex justify-center rounded-md text-xs bg-slate-200 mb-2'>
                {category}
              </div>
            )}
          </div>
        </div>
        <AddToCartSection
          product={product}
          addedToCart={addedToCart}
          onAddToCart={(data) => onAddToCart(data)}
        />
        <div className='mt-10'>
          {product.description && (
            <div>
              <h4 className='font-medium'>Описание:</h4>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
