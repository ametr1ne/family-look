import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { OrderService } from "services/Order.service";
import { UserService } from "services/User.service";
import { TOrder, TOrderShort } from "types/Order";
import { IUser } from "types/User";
import { TProduct } from "types/Product";
import clsx from "clsx";

const OrderItem = ({ order }: { order: TOrderShort }) => {
  const [orderItems, setOrderItems] = useState<TProduct[]>([]);
  const [customer, setCustomer] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const productsResponse = await OrderService.getOrderProducts(order.id);
      const customerResponse = await UserService.getOne(order.userId);
      setOrderItems(productsResponse);
      setCustomer(customerResponse);
    };
    fetchItems();
  }, []);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: order.id,
    data: {
      container: order.order_status.name,
      orderData: order,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <li className='bg-white border hover:border border-white p-3 rounded-xl flex gap-5 justify-between'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex gap-4 items-center justify-between'>
            <h2 className='font-bold text-xl'>#{order.id}</h2>
            <div className='flex px-2 bg-blue-100 rounded-md font-medium text-sm py-1'>
              {order.payment_status.name}
            </div>
          </div>

          <div className='flex gap-3'>
            <p className='font-semibold'>email@email.com</p>
          </div>

          <p className='text-xs'>Товары:</p>
          <ul>
            {orderItems && orderItems.map((item) => <ProductItem key={item.id} product={item} />)}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li
      style={{ transform: style.transform }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className={clsx(
        "bg-white border hover:border border-white p-3 rounded-xl flex gap-5 justify-between",
        { "opacity-40": isDragging }
      )}>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex gap-4 items-center justify-between'>
          <h2 className='font-bold text-xl'>#{order.id}</h2>
          <div className='flex px-2 bg-blue-100 rounded-md font-medium text-sm py-1'>
            {order.payment_status.name}
          </div>
        </div>
        {customer && (
          <div className='flex gap-3'>
            <p className='font-semibold'>{customer.email}</p>
          </div>
        )}
        <p className='text-xs'>Товары:</p>
        <ul>
          {orderItems && orderItems.map((item) => <ProductItem key={item.id} product={item} />)}
        </ul>
      </div>
    </li>
  );
};

export default OrderItem;
