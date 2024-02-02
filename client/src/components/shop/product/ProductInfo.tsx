import Image from "next/image";
import { TProduct } from "types/Product";
import AddToCartSection from "./addToCartSection";

type Props = {
  product: TProduct;
};

const ProductInfo = ({ product }: Props) => {
  console.log(product);

  return (
    <div className='grid grid-cols-2 gap-x-10 mt-10'>
      {product && (
        <Image
          src={process.env.NEXT_PUBLIC_SERVER_URL + product.coverImg}
          width={500}
          height={900}
          className='w-full'
          alt='product_img'
          priority
          quality={100}
        />
      )}
      <div className='flex flex-col'>
        <div className='mb-3'>
          <div className='flex justify-between items-center mb-1'>
            {product && <h2 className='text-2xl font-medium'>{product.name}</h2>}
            {product && <p className='text-2xl font-semibold'>{product.price.toLocaleString()}₽</p>}
          </div>
          <div>
            {product.category && (
              <div className='py-1 px-2 w-fit flex justify-center rounded-md text-xs bg-slate-200 mb-2'>
                {product.category.name}
              </div>
            )}
          </div>
        </div>
        <AddToCartSection product={product} />
        <div className='mt-10'>
          {product?.description && (
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
