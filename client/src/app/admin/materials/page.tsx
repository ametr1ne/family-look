"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TMaterial } from "types/Material";
import AdminLayout from "components/admin/AdminLayout";
import { MaterialService } from "services/Material.service";
import Button from "components/UI/button/Button";
import TextButton from "components/UI/button/TextButton";
import CreateMaterial from "components/admin/modals/CreateMaterial";

const Materials = () => {
  const [materials, setMaterials] = useState<TMaterial[]>([]);

  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await MaterialService.getAll();
      setMaterials(response);
    };

    getData();
  }, []);

  return (
    <AdminLayout>
      <div>
        <div className='flex justify-between items-center'>
          <h3 className='text-4xl font-bold mb-8'>Материалы</h3>
          <Button onClick={() => setModalOpened(true)}>Создать</Button>
        </div>
        {materials.length > 0 && (
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
        )}
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
