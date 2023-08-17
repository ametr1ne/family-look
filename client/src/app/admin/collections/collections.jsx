import AdminLayout from "@/components/admin/AdminLayout";
import CreateCollection from "@/components/admin/modals/CreateCollection";
import CollectionsList from "@/components/admin/collections/CollectionsList";
import { CollectionService } from "@/services/Collection.service";
import React, { useState } from "react";

const Collections = ({ collections }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <AdminLayout>
      <div className='flex justify-between'>
        <button
          className='flex py-2 px-4 bg-zinc-800 text-white rounded-md'
          onClick={() => setOpenCreateModal(true)}>
          Создать
        </button>
      </div>
      <CollectionsList collections={collections} />
      <CreateCollection opened={openCreateModal} setOpened={setOpenCreateModal} />
    </AdminLayout>
  );
};

export default Collections;

export const getStaticProps = async () => {
  const collections = await CollectionService.getAll();

  if (!collections) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      collections,
    },
  };
};
