import {
    DragStartEvent,
    DragEndEvent,
    DndContext,
    rectIntersection,
    DragOverlay,

} from "@dnd-kit/core";
import StatusColumn from "./StatusColumn";
import {useEffect, useState} from "react";
import {TOrderShort, TStatus} from "types/Order";
import {OrderService} from "services/Order.service";
import OrderItem from "./OrderItem";

// const statuses = [
//   { status: "new", name: "Новый", multipleName: "Новые", showInDesk: true, color: "gray-400" },
//   {
//     status: "in work",
//     name: "В работе",
//     multipleName: "В работе",
//     showInDesk: true,
//     color: "blue-400",
//   },
//   { status: "done", name: "Готов", multipleName: "Готовы", showInDesk: true, color: "green-400" },
//   {
//     status: "closed",
//     name: "Закрыт",
//     multipleName: "Закрыты",
//     showInDesk: false,
//     color: "black-400",
//   },
//   {
//     status: "cancelled",
//     name: "Отменен",
//     multipleName: "Отменены",
//     showInDesk: false,
//     color: "red-400",
//   },
// ];

const OrdersField = () => {
    const [activeOrder, setActiveOrder] = useState<TOrderShort | null>(null);
    const [statuses, setStatuses] = useState<TStatus[]>([]);
    const [refreshToken, setRefreshToken] = useState(Math.random());

    const getOrders = async () => {
        const res = await OrderService.getStatuses();
        return res;
    };

    useEffect(() => {
        getOrders().then((res) => setStatuses(res));
        //   .finally(() => setTimeout(() => setRefreshToken(Math.random()), 3000));
    }, [refreshToken]);

    const onDragStartHandler = ({active}: DragStartEvent) => {
        const order = statuses
            .find((status) => status.name === active.data.current?.container)
            ?.orders.find((order) => order.id === active.id);

        order && setActiveOrder(order);
    };

    const onDragEndHandler = ({over, active}: DragEndEvent) => {
        const destination = over?.id;
        if (over && active) {
            const currentStatus = statuses.find(
                (status) => status.name === activeOrder?.order_status.name
            );

            if (over.id !== currentStatus?.name) {
                const destinationStatus = statuses.find((item) => item.name === destination);

                if (destinationStatus && currentStatus) {
                    const filtered = currentStatus.orders.filter((item) => item.id !== activeOrder?.id);
                    destinationStatus.orders.push(active.data.current?.orderData);

                    setStatuses((prev) =>
                        prev.map((status) => {
                            if (status.id === destinationStatus.id) {
                                return destinationStatus;
                            } else if (status.id === currentStatus.id) {
                                return {...status, orders: filtered};
                            } else return status;
                        })
                    );
                }

                if (activeOrder && destinationStatus) {
                    updateOrderStatus(activeOrder?.id, destinationStatus?.id);
                }
            }
            setActiveOrder(null);
        }
    };

    const updateOrderStatus = async (id: number, orderStatusId: number) => {
        const res = await OrderService.update({id, orderStatusId});
    };

    console.log("statuses", statuses);

    return (
        <div className='flex gap-2 w-full h-full'>
            <DndContext
                collisionDetection={rectIntersection}
                onDragEnd={onDragEndHandler}
                onDragStart={onDragStartHandler}>
                {statuses.map((status) => (
                    <StatusColumn key={status.id} status={status}/>
                ))}
                <DragOverlay>{activeOrder ? <OrderItem order={activeOrder}/> : null}</DragOverlay>
            </DndContext>
        </div>
    );
};

export default OrdersField;
