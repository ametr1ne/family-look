import CartProduct from "@/components/cart/CartProduct";
import { ProductService } from "@/services/Product.service";
import { SHOP_URL } from "@/utils/consts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductItem = ({ product }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    ProductService.getOne(product.productId).then((res) => {
      setProductData(res);
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
            src={process.env.NEXT_PUBLIC_API_URL + productData.coverImg}
            width={500}
            height={500}
            className='object-cover h-20 w-20 object-top'
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
