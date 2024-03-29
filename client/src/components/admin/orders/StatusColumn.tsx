import React from "react";
import OrderItem from "./OrderItem";
import { useDroppable } from "@dnd-kit/core";
import { TStatus } from "types/Order";

const StatusColumn = ({ status }: { status: TStatus }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status.name,
  });

  return (
    <div
      className={`flex flex-col rounded-md bg-[#F4F7FF] py-4 px-2 w-full h-full max-h-[700px]  transition-colors duration-300 ${
        isOver ? "bg-green-100" : ""
      }`}>
      <div className='flex justify-between'>
        <h4 className={`font-bold text-black py-2 px-4 rounded-md mb-4 text-xl`}>
          {status?.multipleName}
        </h4>
        <h4 className={`font-bold text-black py-2 px-4 rounded-md mb-4 text-xl`}>
          {status.orders.length}
        </h4>
      </div>

      <ul className={`flex flex-col gap-3 h-full overflow-hidden overflow-y-auto`} ref={setNodeRef}>
        {status.orders.map((order, index) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default StatusColumn;
