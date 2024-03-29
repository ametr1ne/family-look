import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductService } from "services/Product.service";
import { TProduct } from "types/Product";
import { SHOP_URL } from "utils/consts";

const ProductItem = ({ product }: { product: any }) => {
  const [productData, setProductData] = useState<TProduct | null>(null);

  useEffect(() => {
    ProductService.getOne(product.productId).then((res) => {
      res && setProductData(res);
    });
  }, []);

  return (
    productData && (
      <li className='group'>
        <Link
          target='_blank'
          href={SHOP_URL + "/product/" + product.productId}
          className='flex gap-6'>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL + "/" + productData.coverImg}
            width={500}
            height={500}
            className='object-cover h-12 w-12 object-top rounded-2xl'
            alt='cover'
          />
          <div>
            <h4 className='font-semibold text-sm group-hover:text-violet-900'>
              {productData.name}
            </h4>
            {product.size && (
              <p className='font-medium text-xs text-zinc-400'>
                Размер: <span className='font-semibold text-black'>{product.size}</span>
              </p>
            )}
            {product.height && (
              <p className='font-medium text-xs text-zinc-400'>
                Рост: <span className='font-semibold text-black'>{product.height}</span>
              </p>
            )}
            {product.description && (
              <p className='font-medium text-xs text-zinc-400'>
                Дополнительная информация:{" "}
                <span className='font-semibold text-black'>{product.description}</span>
              </p>
            )}
          </div>
        </Link>
      </li>
    )
  );
};

export default ProductItem;
