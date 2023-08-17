"use client";

import { OrderService } from "@/services/Order.service";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { UserService } from "@/services/User.service";
import OrderItem from "@/components/profile/OrderItem";
import { useRouter } from "next/navigation";
import { HOME_URL } from "@/utils/consts";
import Head from "next/head";

const Profile = () => {
  const [userOrders, setUserOrders] = useState([]);

  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(HOME_URL);
    }
    getOrders();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push(HOME_URL);
    }
  }, [user]);

  const getOrders = async () => {
    const orders = await OrderService.getUserOrders(user.id);
    setUserOrders(orders.rows.sort((a, b) => a.id - b.id));
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

export const getStaticPaths = async () => {
  const users = await UserService.getAll();

  const paths = users.rows.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const orders = await OrderService.getUserOrders(params.id);

  if (!orders) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      orders,
    },
  };
};
