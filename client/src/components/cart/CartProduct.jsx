import { CartService } from "@/services/Cart.service";
import { MaterialService } from "@/services/Material.service";
import { ProductService } from "@/services/Product.service";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartProduct = ({ product, removeItem }) => {
  const [data, setData] = useState(null);
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await ProductService.getOne(product.productId);
      const materialResponse = product.materialId
        ? await MaterialService.getOne(product.materialId)
        : null;

      setData(res);
      materialResponse && setMaterial(materialResponse);
    }

    fetchData();
  }, []);

  return data ? (
    <li className='flex p-4 border border-slate-300 rounded-md gap-4 relative'>
      <Image
        src={process.env.NEXT_PUBLIC_API_URL + data.coverImg}
        width={100}
        height={100}
        className='object-cover w-[100px] h-[100px]'
        alt='cover'
      />
      <div className='w-full'>
        <p className='font-bold text-xl'>{data.name}</p>
        <p className='text-sm font-semibold'>
          Размер: <span className='font-medium'>{product.size}</span>
        </p>
        <p className='text-sm font-semibold'>
          Рост: <span className='font-medium'>{product.height}</span>
        </p>
        {product.description && (
          <p className='text-sm font-semibold'>
            Дополнительная информация: <br />
            <span className='font-medium'>{product.description}</span>
          </p>
        )}
        {material && (
          <div className='text-sm font-semibold'>
            Материал: <br />
            <div className='p-2 border border-zinc-300 rounded-md flex gap-4 w-fit'>
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + material.img}
                width={50}
                height={50}
                alt='img'
              />
              <div className='flex flex-col'>
                <span className='font-medium'>{material.name}</span>
                <span className='font-medium'>{material.color}</span>
              </div>
            </div>
          </div>
        )}
        <hr className='mt-3 mb-2' />
        <div className='flex justify-between'>
          <p className='font-semibold'>Цена:</p>
          <b className='font-bold text-xl'>{(+data.price).toLocaleString()}₽</b>
        </div>
      </div>
      <button
        onClick={() => removeItem(product.id)}
        className='absolute right-2 top-2 p-2 border rounded-md border-slate-200 group hover:border-red-400 transition-colors'>
        <TrashIcon className='h-6 w-6 group-hover:text-red-400 transition-colors' />
      </button>
    </li>
  ) : (
    <p>Нет данных</p>
  );
};

export default CartProduct;
