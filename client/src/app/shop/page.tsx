import Search from "components/UI/input/Search";
import ShopProductItem from "components/shop/ShopProductItem";
import Filter from "components/shop/filter/Filter";
import { CategoryService } from "services/Category.service";
import { CollectionService } from "services/Collection.service";
import { ProductService } from "services/Product.service";

const Shop = async ({ searchParams }: { searchParams: { query?: string; page?: string } }) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const products = await ProductService.getAll({query});
  // const categories = await CategoryService.getAll();
  // const collections = await CollectionService.getAll();


  return (
    <main className='pt-20 text-black mx-auto max-w-5xl w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-[1440px] lg:px-8'>
      <div className='flex flex-col gap-10 w-full'>
        <Search className='mb-6 ml-auto' />

        {products?.rows ? (
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {products.rows.map((product) => (
              <ShopProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='flex h-full items-center justify-center'>
            <h3 className='text-xl'>Здесь пока ничего нет :(</h3>
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
