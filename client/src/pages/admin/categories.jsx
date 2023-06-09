import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import CategoriesList from "@/components/admin/categories/CategoriesList";
import CreateCategory from "@/components/admin/Modals/CreateCategory";
import UpdateCategory from "@/components/admin/Modals/UpdateCategory";
import { CategoryService } from "@/services/Category.service";

const Categories = ({ categories }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);

  const [currentName, setCurrentName] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const openModal = () => {
    setModalOpened(true);
  };

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
      <CreateCategory opened={modalOpened} setOpened={setModalOpened} />
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

export const getStaticProps = async () => {
  const categories = await CategoryService.getAll();

  if (!categories) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      categories,
    },
  };
};
