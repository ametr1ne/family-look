import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProductInfo from "components/shop/product/ProductInfo";
import Link from "next/link";
import { ProductService } from "services/Product.service";
import { SHOP_URL } from "utils/consts";

const Product = async ({ params }: { params: { id: string } }) => {
  const product = await ProductService.getOne(+params.id);

  return (
    <>
      <main className='mt-20 pt-16 pb-28'>
        <div className='max-w-[1400px] px-6 mx-auto'>
          <div className='flex items-center gap-10'>
            <Link className='font-semibold uppercase flex gap-1 items-center' href={SHOP_URL}>
              <ArrowLeftIcon className='h-4 w-4' />
              Назад
            </Link>
          </div>
          {product && <ProductInfo product={product} />}
        </div>
      </main>
    </>
  );
};

export default Product;
