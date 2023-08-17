import Error from "@/components/UI/modals/Error";
import AddToCartSection from "@/components/shop/product/addToCartSection";
import { AppContext, AuthContext } from "@/pages/_app";
import { CartService } from "@/services/Cart.service";
import { CategoryService } from "@/services/Category.service";
import { ProductService } from "@/services/Product.service";
import { SHOP_URL } from "@/utils/consts";
import { ArrowLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Product = ({ product, categories }) => {
  const [cart, setCart] = useState(null);

  const [category, setCategory] = useState("");

  const [addedToCart, setAddedToCart] = useState(false);

  const { setCartProducts } = useContext(AppContext);

  const { user, isAuth } = useContext(AuthContext);

  const [error, setError] = useState("");

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
        setCartProducts((prev) => [...prev, product.id]);
        setAddedToCart(true);
      } catch (e) {
        console.log(e.response.data.message);
        setError(e.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (cart) {
      if (cart.products.some((item) => item.productId == product.id)) {
        setAddedToCart(true);
      }
    }
  }, [cart]);

  useEffect(() => {
    async function fetchCart() {
      const data = await CartService.getOne(user.cart);
      setCart(data);
    }
    if (user) {
      fetchCart();
    }
    const cat = categories.find((item) => item.id === product.categoryId);
    if (cat) {
      setCategory(cat.name);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <main className='mt-20 pt-16 pb-28'>
        {error.length > 0 && <Error message={error} />}
        <div className='max-w-[1400px] px-6 mx-auto'>
          <div className='flex items-center gap-10'>
            <Link className='font-semibold uppercase flex gap-1 items-center' href={SHOP_URL}>
              <ArrowLeftIcon className='h-4 w-4' />
              Назад
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-x-10 mt-10'>
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + product.coverImg}
              width={500}
              height={900}
              className='w-full'
              alt='product_img'
              priority
            />
            <div className='flex flex-col'>
              <div className='mb-3'>
                <div className='flex justify-between items-center mb-1'>
                  <h2 className='text-2xl font-medium'>{product.name}</h2>
                  <p className='text-2xl font-semibold'>{product.price.toLocaleString()}₽</p>
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
        </div>
      </main>
    </>
  );
};

export default Product;

export const getStaticPaths = async () => {
  const products = await ProductService.getAll();

  const paths = products.rows.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const product = await ProductService.getOne(params.id);
  const categories = await CategoryService.getAll();

  if (!product) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      product: product,
      categories: categories,
    },
  };
};
