"use client";

import AdminLayout from "components/admin/AdminLayout";
import CollectionsList from "components/admin/collections/CollectionsList";
import CreateCollection from "components/admin/modals/CreateCollection";
import React, { useEffect, useState } from "react";
import { CollectionService } from "services/Collection.service";
import { TCollection } from "types/Product";

const Collections = () => {
  const [collections, setCollections] = useState<TCollection[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await CollectionService.getAll();
      response && setCollections(response);
    };

    fetchData();
  }, []);

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
