"use client";

import AdminLayout from "src/components/admin/AdminLayout";
import OrderItem from "src/components/admin/orders/OrderItem";
import { OrderService } from "src/services/Order.service";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "src/app/loading";
import StatusColumn from "src/components/admin/orders/StatusColumn";
import { DndContext, DragEndEvent, DragOverlay, rectIntersection } from "@dnd-kit/core";
import CreateStatusModal from "src/components/admin/Modals/CreateStatus";
import CreatePaymentStatusModal from "src/components/admin/Modals/CreatePaymentStatus";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TStatus } from "src/types/Order";

const statuses = [
  { status: "new", name: "Новый", multipleName: "Новые", showInDesk: true, color: "gray-400" },
  {
    status: "in work",
    name: "В работе",
    multipleName: "В работе",
    showInDesk: true,
    color: "blue-400",
  },
  { status: "done", name: "Готов", multipleName: "Готовы", showInDesk: true, color: "green-400" },
  {
    status: "closed",
    name: "Закрыт",
    multipleName: "Закрыты",
    showInDesk: false,
    color: "black-400",
  },
  {
    status: "cancelled",
    name: "Отменен",
    multipleName: "Отменены",
    showInDesk: false,
    color: "red-400",
  },
];

const Orders = () => {
  const [opened, setOpened] = useState(false);
  const [paymentOpened, setPaymentOpened] = useState(false);
  const [statuses, setStatuses] = useState<TStatus[]>([]);
  const [refreshToken, setRefreshToken] = useState(Math.random());

  const getOrders = async () => {
    const res = await OrderService.getStatuses();
    return res;
  };

  useEffect(() => {
    getOrders()
      .then(setStatuses)
      .finally(() => setTimeout(() => setRefreshToken(Math.random()), 3000));
  }, [refreshToken]);

  const onDragEndHandler = (e: DragEndEvent) => {
    const destination = e.over?.id;
    const draggable = e.active.data.current?.title ?? "";
    const index = e.active.data.current?.index ?? 0;
    const parent = e.active.data.current?.parent ?? statuses[0];

    if (destination !== parent) {
      const draggableOrder = statuses
        .find((item) => item.id === parent)
        .orders.find((item) => item.id === draggable);

      const parentStatus = statuses.find((item) => item.id === parent);
      const destinationStatus = statuses.find((item) => item.id === destination);

      destinationStatus.orders.push(draggableOrder);
      const filtered = parentStatus.orders.filter((item) => item.id !== draggable);

      setStatuses((prev) =>
        prev.map((item) => {
          if (item.id === parent) {
            return { ...item, orders: filtered };
          } else if (item.id === destination) {
            return destinationStatus;
          } else {
            return item;
          }
        })
      );

      updateOrderStatus(draggable, destination);
    }
  };

  const updateOrderStatus = async (id, orderStatusId) => {
    const updated = await OrderService.update({ id, orderStatusId });
  };

  return (
    <AdminLayout>
      <button onClick={() => setPaymentOpened(true)}>Создать платежный статус</button>
      <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEndHandler}>
        <div className='flex flex-col gap-4 h-full'>
          <h2 className='font-bold text-4xl mb-4'>Заказы</h2>
          <div className='flex gap-2 w-full h-full'>
            {statuses.map((status) => (
              <StatusColumn key={status.id} status={status} />
            ))}
          </div>
          <button
            onClick={() => setOpened(true)}
            className='h-10 w-10 min-w-10 flex justify-center items-center rounded-md bg-black group hover:bg-zinc-700'>
            <PlusIcon className='h-6 w-6 text-white' />
          </button>
        </div>
        <CreateStatusModal opened={opened} setOpened={(e) => setOpened(e)} />
        <CreatePaymentStatusModal opened={paymentOpened} setOpened={(e) => setPaymentOpened(e)} />
      </DndContext>
    </AdminLayout>
  );
};

export default Orders;
