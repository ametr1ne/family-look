"use client";

import AdminLayout from "components/admin/AdminLayout";
import CreateProduct from "components/admin/modals/CreateProduct";
import ProductsList from "components/admin/products/ProductsList";
import { useEffect, useState } from "react";
import { CategoryService } from "services/Category.service";
import { CollectionService } from "services/Collection.service";
import { ProductService } from "services/Product.service";
import { TProduct } from "types/Product";

const Products = () => {
  const [productModalOpened, setProductModalOpened] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
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

  console.log(filteredProducts);

  // const filterProducts = (value) => {
  //   const newArr = filteredProducts.filter((item) =>
  //     item.name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilteredProducts(newArr);
  // };

  return (
    <AdminLayout>
      <div>
        <div className='flex justify-between'>
          {/* <Search filter={filterProducts} /> */}
          <button
            className='flex py-2 px-4 bg-zinc-800 text-white rounded-md'
            onClick={() => setProductModalOpened(true)}>
            Создать
          </button>
        </div>
        <ProductsList products={filteredProducts} />
        <CreateProduct
          updateProducts={(created) => setFilteredProducts([...filteredProducts, created])}
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
