import React, { useEffect, useState } from "react";
import { OrderService } from "@/services/Order.service";
import ProductItem from "../admin/orders/ProductItem";

const OrderItem = ({ order }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await OrderService.getOrderProducts(order.id);
      setProducts(res);
    };

    fetchProducts();
  }, []);

  const cancelOrder = async () => {
    const cancelledOrder = await OrderService.update({ id: order.id, workingStatus: "cancelled" });
  };

  return (
    <li className='bg-white border-l-2 border-black flex px-4'>
      <div>
        <div className='flex gap-4 items-center mb-4'>
          <h3 className='font-bold text-xl'>Заказ #{order.id}</h3>
          <p className='text-zinc-400 font-semibold text-sm'>
            {new Date(order.createdAt).toLocaleDateString()},{" "}
            {new Date(order.createdAt).toLocaleTimeString().slice(0, -3)}
          </p>
          {order.workingStatus === "new" && (
            <button
              onClick={cancelOrder}
              className='uppercase ml-4 font-semibold text-red-400 hover:text-red-500'>
              Отменить
            </button>
          )}
          {order.workingStatus === "cancelled" && (
            <p className='uppercase ml-4 font-semibold text-zinc-400'>Отменен</p>
          )}
        </div>
        <ul className='flex flex-col gap-2'>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default OrderItem;
