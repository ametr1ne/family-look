import Error from "src/components/UI/modals/Error";
import AddToCartSection from "src/components/shop/product/addToCartSection";
import { AuthContext } from "src/contexts/AuthProvider";
import { AppContext } from "src/contexts/AppProvider";
import { CartService } from "src/services/Cart.service";
import { CategoryService } from "src/services/Category.service";
import { ProductService } from "src/services/Product.service";
import { SHOP_URL } from "src/utils/consts";
import { ArrowLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { TProduct } from "src/types/Product";
import ProductInfo from "src/components/shop/product/ProductInfo";

const Product = async ({ params }) => {
  // const [product, setProduct] = useState<TProduct | null>(null);
  // const [categories, setCategories] = useState(null);

  // console.log(product);

  // const fetchData = async () => {
  const product = await ProductService.getOne(params.id);
  const categories = await CategoryService.getAll();

  const category = categories.find((item) => item.id === product.categoryId);

  //   setProduct(product);
  //   setCategories(categories.rows);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const [cart, setCart] = useState(null);

  // const [category, setCategory] = useState("");

  // const [error, setError] = useState("");

  // useEffect(() => {
  //   if (cart) {
  //     if (cart.products.some((item) => item.productId == product.id)) {
  //       setAddedToCart(true);
  //     }
  //   }
  // }, [cart]);

  // useEffect(() => {
  //   async function fetchCart() {
  //     const data = await CartService.getOne(user.cart);
  //     setCart(data);
  //   }
  //   if (user) {
  //     fetchCart();
  //   }
  //   const cat = categories.find((item) => item.id === product.categoryId);
  //   if (cat) {
  //     setCategory(cat.name);
  //   }
  // }, []);

  return (
    <>
      <main className='mt-20 pt-16 pb-28'>
        {/* {error.length > 0 && <Error message={error} setOpened={true} />} */}
        <div className='max-w-[1400px] px-6 mx-auto'>
          <div className='flex items-center gap-10'>
            <Link className='font-semibold uppercase flex gap-1 items-center' href={SHOP_URL}>
              <ArrowLeftIcon className='h-4 w-4' />
              Назад
            </Link>
          </div>
          <ProductInfo product={product} />
        </div>
      </main>
    </>
  );
};

export default Product;
