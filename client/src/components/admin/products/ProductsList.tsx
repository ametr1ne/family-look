"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { TProduct } from "types/Product";

const ProductsList = ({ products }: { products: TProduct[] }) => {
  return (
    <div className='mt-10 '>
      <h3 className='text-2xl font-bold mb-4'>Все товары</h3>
      <div className='bg-[#F4F7FF] px-8 py-4 rounded-xl'>
        <div className='grid grid-cols-5 text-xs py-2 px-4 mb-2 rounded-md'>
          <div className='col-span-2 flex gap-4'>
            <p>id</p>
            <p className='w-10'>img</p>
            <p>Название</p>
          </div>
          <p>Последнее обновление</p>
          <p>Цена</p>
          <div></div>
        </div>
        <ul className='flex flex-col gap-2'>
          {products.map((item) => (
            <ProductItem product={item} key={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
