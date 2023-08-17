import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import CategoriesList from "@/components/admin/categories/CategoriesList";
import CreateCategory from "@/components/admin/modals/CreateCategory";
import UpdateCategory from "@/components/admin/modals/UpdateCategory";
import { CategoryService } from "@/services/Category.service";
import { MaterialService } from "@/services/Material.service";
import CreateMaterial from "@/components/admin/modals/CreateMaterial";
import Image from "next/image";
import TextButton from "@/components/UI/button/TextButton";
import Button from "@/components/UI/button/Button";

const Materials = ({ materials }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);

  const [currentName, setCurrentName] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const openModal = () => {
    setModalOpened(true);
  };

  return (
    <AdminLayout>
      <div>
        <div className='flex justify-between items-center'>
          <h3 className='text-4xl font-bold mb-8'>Материалы</h3>
          <Button variant='black' onClick={openModal}>
            Создать
          </Button>
        </div>
        <div className='bg-white rounded-md pb-3 px-5'>
          <div className='grid grid-cols-3 mb-7 border-b-2 border-zinc-100 py-4'>
            <div className='flex gap-4'>
              <div className='text-xs text-zinc-400'>img</div>
              <div className='text-xs text-zinc-400'>Название</div>
            </div>
            <div className='text-xs text-zinc-400'>Цвет</div>
          </div>
          <ul className='flex flex-col gap-3'>
            {materials.map((item) => (
              <li key={item.id} className='grid grid-cols-3 items-center'>
                <div className='flex gap-4 items-center'>
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + item.img}
                    width={50}
                    height={50}
                    className='w-10 h-10 object-cover'
                    alt={item.name}
                  />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='font-medium'>{item.color}</p>
                <div className='flex gap-4 place-self-end items-center'>
                  <TextButton variant='black'>Изменить</TextButton>
                  <TextButton variant='red'>Удалить</TextButton>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul></ul>
      <CreateMaterial opened={modalOpened} setOpened={setModalOpened} />
      {/* <UpdateCategory
        currentName={currentName}
        id={updateId}
        opened={updateModalOpened}
        setOpened={setUpdateModalOpened}
      /> */}
    </AdminLayout>
  );
};

export default Materials;

export const getStaticProps = async () => {
  const materials = await MaterialService.getAll();

  if (!materials) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      materials: materials,
    },
  };
};
