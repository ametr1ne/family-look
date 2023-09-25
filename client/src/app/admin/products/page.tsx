"use client";

import { AuthContext } from "src/contexts/AuthProvider";
import { CategoryService } from "src/services/Category.service";
import { CollectionService } from "src/services/Collection.service";
import { ProductService } from "src/services/Product.service";
import AdminLayout from "src/components/admin/AdminLayout";
import ProductsList from "src/components/admin/products/ProductsList";
import { useEffect, useState } from "react";
import { TProduct } from "src/types/Product";
import CreateProduct from "src/components/admin/Modals/CreateProduct";

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
