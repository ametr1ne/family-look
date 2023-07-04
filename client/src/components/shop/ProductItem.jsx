import React from "react";
import Link from "next/link";
import { PRODUCT_URL } from "@/utils/consts";
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <Link key={product.id} href={PRODUCT_URL + "/" + product.id} className='group'>
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + product.coverImg}
          className='object-cover h-72 object-center group-hover:opacity-75'
          width={500}
          height={500}
          alt='product'
        />
      </div>
      <p className='mt-4 text-sm text-gray-700'>{product.name}</p>
      <p className='mt-1 text-lg font-medium text-gray-900'>{product.price.toLocaleString()}₽</p>
    </Link>
  );
};

export default ProductItem;
