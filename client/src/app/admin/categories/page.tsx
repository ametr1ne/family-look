"use client";

import AdminLayout from "components/admin/AdminLayout";
import CategoriesList from "components/admin/categories/CategoriesList";
import CreateCategory from "components/admin/modals/CreateCategory";
import { useEffect, useState } from "react";
import { CategoryService } from "services/Category.service";
import { TCategory } from "types/Product";

const Categories = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await CategoryService.getAll();
      response && setCategories(response);
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className='flex justify-between'>
        <button
          className='flex py-2 px-4 bg-zinc-800 text-white rounded-md'
          onClick={() => setModalOpened(true)}>
          Создать
        </button>
      </div>
      <CategoriesList categories={categories} />
      <CreateCategory opened={modalOpened} setOpened={setModalOpened} />
    </AdminLayout>
  );
};

export default Categories;
