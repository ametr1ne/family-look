import { OrderService } from "@/services/Order.service";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { UserService } from "@/services/User.service";

const OrderItem = ({ order, statuses }) => {
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

  const changeOrderStatus = async (e) => {
    e.preventDefault();
    const orderRes = await OrderService.update({ id: order.id, workingStatus: status });
  };

  return (
    <li className='bg-white shadow-md p-5 rounded-xl flex gap-5 justify-between'>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex gap-4 items-center'>
          <h2 className='font-bold text-xl'>Заказ #{order.id}</h2>
          <div className='flex px-2 bg-blue-100 rounded-md font-medium text-sm py-1'>
            {order.paymentStatus}
          </div>
          <div className='flex px-2 bg-blue-100 rounded-md font-medium text-sm py-1'>
            {statuses.find((item) => item.status === order.workingStatus).name}
          </div>
        </div>
        {customer && (
          <div className='flex gap-3'>
            <p>Заказчик: </p>
            <p className='font-semibold'>{customer.name}</p>
            <p>{customer.email}</p>
          </div>
        )}
        <ul>
          {orderItems && orderItems.map((item) => <ProductItem key={item.id} product={item} />)}
        </ul>
      </div>
      <div>
        <form className='flex flex-col gap-3'>
          <p className='text-sm '>Изменить статус:</p>
          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className='py-1 px-3 bg-gray-200 rounded-md font-medium'>
            {statuses.map((status) => (
              <option key={status.status} value={status.status}>
                {status.name}
              </option>
            ))}
          </select>
          <button
            onClick={(e) => changeOrderStatus(e)}
            className='bg-zinc-600 hover:bg-zinc-800 rounded-md py-1 px-3 text-white'>
            Изменить
          </button>
        </form>
      </div>
    </li>
  );
};

export default OrderItem;
