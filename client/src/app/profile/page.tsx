"use client";

import OrderItem from "components/profile/OrderItem";
import { AuthContext } from "contexts/AuthProvider";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { OrderService } from "services/Order.service";
import { TOrder } from "types/Order";

const Profile = () => {
  const [userOrders, setUserOrders] = useState<TOrder[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getOrders();
  }, [user]);

  const getOrders = async () => {
    if (user) {
      const orders = await OrderService.getUserOrders(user.id);
      orders && setUserOrders(orders.rows);
    }
  };

  return (
    <>
      <Head>
        <title>{user?.name}</title>
      </Head>
      <main className='mt-20 mb-20'>
        <div className='max-w-5xl mx-auto flex flex-col '>
          <div className='py-10'>
            <div className='bg-white py-4 px-7 rounded-md'>
              <h2 className='font-bold text-xl'>{user ? user.name : "Неизвестный"}</h2>
              <p className='font-medium text-sm text-zinc-500'>{user ? user.email : ""}</p>
            </div>
          </div>
          <div className='bg-white py-4 px-7 rounded-md'>
            <h2 className='text-2xl font-bold mb-6'>История заказов</h2>
            <ul className='flex flex-col gap-10'>
              {userOrders.length > 0 ? (
                userOrders.map((order) => <OrderItem key={order.id} order={order} />)
              ) : (
                <li>У вас еще не было заказов</li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
