"use client";

import AdminLayout from "components/admin/AdminLayout";
import CreatePaymentStatusModal from "components/admin/modals/CreatePaymentStatus";
import CreateStatusModal from "components/admin/modals/CreateStatus";
import OrdersField from "components/admin/orders/OrdersField";
import { useState } from "react";

const Orders = () => {
  const [opened, setOpened] = useState(false);
  const [paymentOpened, setPaymentOpened] = useState(false);

  return (
    <AdminLayout>
      <button onClick={() => setPaymentOpened(true)}>Создать платежный статус</button>
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-4xl mb-4'>Заказы </h2>
          <button onClick={() => setOpened(true)}>Создать статус</button>
        </div>
        <OrdersField />
      </div>

      <CreateStatusModal opened={opened} close={() => setOpened(false)} />
      <CreatePaymentStatusModal opened={paymentOpened} close={() => setPaymentOpened(false)} />
    </AdminLayout>
  );
};

export default Orders;
