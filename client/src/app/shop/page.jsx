"use client";

import Search from "@/components/UI/input/Search";
import ProductItem from "@/components/shop/ProductItem";
import { CategoryService } from "@/services/Category.service";
import { ProductService } from "@/services/Product.service";

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppProvider";
import Filter from "@/components/shop/filter/Filter";
import { CollectionService } from "@/services/Collection.service";

const Shop = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const productsRes = await ProductService.getAll();
      const categoriesRes = await CategoryService.getAll();
      const collectionsRes = await CollectionService.getAll();

      setProducts(productsRes);
      setCategories(categoriesRes);
      setCollections(collectionsRes);
    };

    getData();
  }, []);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const filterProducts = (value) => {
    if (products) {
      const newArr = products.rows.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(newArr);
    }
  };

  console.log(categories);

  return (
    <>
      <main className='pt-20 text-black mx-auto max-w-2xl w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex gap-10 w-full'>
          <Filter
            products={products}
            categories={categories}
            collections={collections}
            setFilteredProducts={setFilteredProducts}
          />
          <div className='flex flex-col w-4/5'>
            <Search filter={filterProducts} confirmation={false} className='mb-6 ml-auto' />
            {filteredProducts && filterProducts.length > 0 ? (
              <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {filteredProducts.map((product) => (
                  <ProductItem key={product.id} product={product} />
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
    </>
  );
};

export default Shop;
