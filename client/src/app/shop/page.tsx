"use client";

import Search from "src/components/UI/input/Search";
import ProductItem from "src/components/shop/ProductItem";
import { CategoryService } from "src/services/Category.service";
import { ProductService } from "src/services/Product.service";

import React, { useContext, useEffect, useState } from "react";
import Filter from "src/components/shop/filter/Filter";
import { CollectionService } from "src/services/Collection.service";

const Shop = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [collections, setCollections] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const productsRes = await ProductService.getAll();
      const categoriesRes = await CategoryService.getAll();
      const collectionsRes = await CollectionService.getAll();

      setProducts(productsRes.rows);
      setCategories(categoriesRes);
      setCollections(collectionsRes);
      setFilteredProducts(productsRes.rows);
    };

    getData();
  }, []);

  const filterProducts = (value) => {
    if (products) {
      const newArr = products.filter((item) =>
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
  );
};

export default Shop;
