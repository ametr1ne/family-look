"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { CategoryService } from "@/services/Category.service";
import { CollectionService } from "@/services/Collection.service";
import { ProductService } from "@/services/Product.service";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductsList from "@/components/admin/products/ProductsList";
import CreateProduct from "@/components/admin/modals/CreateProduct";
import Search from "@/components/UI/input/Search";
import { useEffect } from "react";

const Products = () => {
  const [productModalOpened, setProductModalOpened] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const products = await ProductService.getAll();
      const resCategories = await CategoryService.getAll();
      const resCollections = await CollectionService.getAll();

      setFilteredProducts(products.rows);
      setCategories(resCategories.rows);
      setCollections(resCollections.rows);
    }

    fetchData();
  }, []);

  const filterProducts = (value) => {
    const newArr = products.rows.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(newArr);
  };

  return (
    <AdminLayout>
      <div>
        <div className='flex justify-between'>
          <Search filter={filterProducts} />
          <button
            className='flex py-2 px-4 bg-zinc-800 text-white rounded-md'
            onClick={() => setProductModalOpened(true)}>
            Создать
          </button>
        </div>
        <ProductsList products={filteredProducts} setProducts={setFilteredProducts} />
        <CreateProduct
          opened={productModalOpened}
          setOpened={setProductModalOpened}
          categories={categories}
          collections={collections}
        />
      </div>
    </AdminLayout>
  );
};

export default Products;

// export const getStaticProps = async () => {
//   const products = await ProductService.getAll();
//   const categories = await CategoryService.getAll();
//   const collections = await CollectionService.getAll();

//   if (!products || !categories || !collections) {
//     return {
//       props: {
//         notFound: true,
//       },
//     };
//   }

//   return {
//     props: {
//       products,
//       categories,
//       collections,
//     },
//   };
// };
