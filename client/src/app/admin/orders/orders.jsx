import AdminLayout from "@/components/admin/AdminLayout";
import OrderItem from "@/components/admin/orders/OrderItem";
import { OrderService } from "@/services/Order.service";
import React, { useEffect, useState } from "react";

const statuses = [
  { status: "new", name: "Новый" },
  { status: "in work", name: "В работе" },
  { status: "done", name: "Готов" },
  { status: "closed", name: "Закрыт" },
  { status: "cancelled", name: "Отменен" },
];

const Orders = ({ orders }) => {
  console.log(orders);

  const [activeStatus, setActiveStatus] = useState(statuses[0]);
  const [filteredOrders, setFilteredOrders] = useState(orders.rows);

  useEffect(() => {
    setActiveStatus(statuses[0]);
  }, []);

  useEffect(() => {
    const items = orders.rows.filter((item) => item.workingStatus === activeStatus.status);
    setFilteredOrders(items);
  }, [activeStatus]);

  return (
    <AdminLayout>
      <div className='flex flex-col gap-4'>
        <div className='flex rounded-xl bg-white gap-1 p-4 items-center'>
          <p className='text-sm mr-2'>По статусу:</p>
          {statuses.map((item) => (
            <div
              onClick={() => setActiveStatus(item)}
              key={item.status}
              className={`px-2 text-sm cursor-pointer py-1 rounded-md ${
                activeStatus == item ? "bg-zinc-200" : ""
              }`}>
              {item.name}
              <div></div>
            </div>
          ))}
        </div>
        <ul className='flex flex-col gap-3'>
          {filteredOrders &&
            filteredOrders.map((order) => (
              <OrderItem key={order.id} order={order} statuses={statuses} />
            ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Orders;

export const getStaticProps = async () => {
  const orders = await OrderService.getAll();

  if (!orders) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      orders: orders,
    },
  };
};
