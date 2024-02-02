"use client";

import ShopProductItem from "components/shop/ShopProductItem";
import Filter from "components/shop/filter/Filter";
import { useState, useEffect } from "react";
import { CategoryService } from "services/Category.service";
import { CollectionService } from "services/Collection.service";
import { ProductService } from "services/Product.service";
import Search from "components/UI/input/Search";
import { TCategory, TProduct } from "types/Product";

const Shop = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [collections, setCollections] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const getData = async () => {
      const productsRes = await ProductService.getAll();
      const categoriesRes = await CategoryService.getAll();
      const collectionsRes = await CollectionService.getAll();
 
      productsRes && setProducts(productsRes.rows);
      categoriesRes && setCategories(categoriesRes);
      setCollections(collectionsRes);
      productsRes && setFilteredProducts(productsRes.rows);
    };
    getData();
  }, []);

  const filterProducts = (value: string) => {
    if (products) {
      const newArr: TProduct[] = products.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(newArr);
    }
  };

  return (
    <main className='pt-20 text-black mx-auto max-w-5xl w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-[1440px] lg:px-8'>
      <div className='flex gap-10 w-full'>
        <Filter
          products={products}
          categories={categories}
          collections={collections}
          setFilteredProducts={setFilteredProducts}
        />
        <div className='flex flex-col w-4/5'>
          <Search filter={filterProducts} confirmation={false} className='mb-6 ml-auto' />
          {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
              {filteredProducts.map((product) => (
                <ShopProductItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className='flex h-full items-center justify-center'>
              <h3 className='text-xl'>Здесь пока ничего нет :(</h3>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Shop;
