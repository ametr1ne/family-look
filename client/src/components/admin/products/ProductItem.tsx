import { ProductService } from "@/services/Product.service";
import { ADMIN_URL } from "@/utils/consts";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TProduct } from "types/Product";

const ProductItem = ({ product }: { product: TProduct }) => {
  const removeProduct = async () => {
    const removed = await ProductService.remove(product.id);

    console.log(removed);
  };

  return (
    <li className='cursor-pointer transition-all duration-200 hover:shadow-zinc-200 hover:shadow-lg border border-l-2 border-l-black border-transparent'>
      <Link
        href={ADMIN_URL + "/products/" + product.id}
        className='grid grid-cols-5 auto-cols-min items-center px-4 py-1'>
        <div className='flex gap-4 col-span-2 items-center'>
          <p className='font-bold'>{product.id}</p>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + product.coverImg}
            width={500}
            height={500}
            className='h-10 w-10 object-cover object-top'
            alt='cover'
          />
          <h4 className='font-bold text-sm'>{product.name}</h4>
        </div>
        <p className='font-semibold text-sm text-zinc-500'>
          {new Date(product.updatedAt).toLocaleDateString()},{" "}
          {new Date(product.updatedAt).toLocaleTimeString().slice(0, -3)}
        </p>
        <p className='font-semibold text-sm text-zinc-500'>{(+product.price).toLocaleString()}₽</p>
        <button
          onClick={removeProduct}
          className='uppercase place-self-end text-red-400 hover:text-red-500 font-semibold'>
          Удалить
        </button>
      </Link>
    </li>
  );
};

export default ProductItem;
