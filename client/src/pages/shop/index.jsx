import Search from "@/components/UI/input/Search";
import ProductItem from "@/components/shop/ProductItem";
import { CategoryService } from "@/services/Category.service";
import { ProductService } from "@/services/Product.service";

import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../_app";
import Filter from "@/components/shop/filter/Filter";
import { CollectionService } from "@/services/Collection.service";

const Shop = ({ products, categories, collections }) => {
  const { setCategories } = useContext(AppContext);

  useEffect(() => {
    setCategories(categories);
  }, []);

  // const [filteredProducts, setFilteredProducts] = useState(products.rows);

  const filterProducts = (value) => {
    const newArr = products.rows.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    // setFilteredProducts(newArr);
  };

  console.log(products);

  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>
      <main className='pt-20 text-black mx-auto max-w-2xl w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex gap-10 w-full'>
          {/* <Filter
            products={products}
            categories={categories}
            collections={collections}
            setFilteredProducts={setFilteredProducts}
          />
          <div className='flex flex-col w-4/5'>
            <Search filter={filterProducts} confirmation={false} className='mb-6 ml-auto' />
            <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
              {filteredProducts &&
                filteredProducts.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Shop;

export const getStaticProps = async () => {
  const products = await ProductService.getAll();
  const categories = await CategoryService.getAll();
  const collections = await CollectionService.getAll();

  if (!products || !categories || !collections) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: { products: products, categories: categories, collections: collections },
  };
};
