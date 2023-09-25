import { OrderService } from "src/services/Order.service";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { UserService } from "src/services/User.service";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const OrderItem = ({ title, order, index, parent }) => {
  const [orderItems, setOrderItems] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [status, setStatus] = useState(order.workingStatus);

  useEffect(() => {
    const fetchItems = async () => {
      const productsResponse = await OrderService.getOrderProducts(order.id);
      const customerResponse = await UserService.getOne(order.userId);
      setOrderItems(productsResponse);
      setCustomer(customerResponse);
    };
    fetchItems();
  }, []);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li
      style={{ transform: style.transform }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className='bg-white border border-white hover:border border-gray-500 p-3 rounded-xl flex gap-5 justify-between'>
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
