"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import CategoriesList from "@/components/admin/categories/CategoriesList";
import CreateCategory from "@/components/admin/modals/CreateCategory";
import UpdateCategory from "@/components/admin/modals/UpdateCategory";
import { CategoryService } from "@/services/Category.service";

const Categories = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [categories, setCategories] = useState(null);

  const [currentName, setCurrentName] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const openModal = () => {
    setModalOpened(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await CategoryService.getAll();
      setCategories(response);
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className='flex justify-between'>
        <button className='flex py-2 px-4 bg-zinc-800 text-white rounded-md' onClick={openModal}>
          Создать
        </button>
      </div>
      <CategoriesList
        setOpened={setUpdateModalOpened}
        setCurrentName={(e) => setCurrentName(e)}
        setUpdateId={(e) => setUpdateId(e)}
        categories={categories}
      />
      <CreateCategory
        updateCategories={(created) => setCategories([...categories, created])}
        opened={modalOpened}
        setOpened={setModalOpened}
      />
      <UpdateCategory
        currentName={currentName}
        id={updateId}
        opened={updateModalOpened}
        setOpened={setUpdateModalOpened}
      />
    </AdminLayout>
  );
};

export default Categories;
