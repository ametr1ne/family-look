import { TOrder } from "./../types/Order";
import { $authHost, $host } from "./index";

export const OrderService = {
  async create(userId: number, products: any) {
    const { data } = await $authHost.post("/order", {
      userId,
      products,
    });
    return data;
  },

  async getAll() {
    try {
      const { data } = await $host.get("/order");
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getOrderProducts(id: number) {
    try {
      const { data } = await $host.get("/order/products/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getUserOrders(id: number) {
    try {
      const { data } = await $host.get<{ rows: TOrder[] }>("/order/user/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async update(orderData: any) {
    try {
      const { data } = await $authHost.patch("/order", orderData);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async createStatus(body: any) {
    const { data } = await $authHost.post("/order/status", body);
    return data;
  },
  async createPaymentStatus(body: any) {
    const { data } = await $authHost.post("/order/payment_status", body);
    return data;
  },
  async getStatuses() {
    const { data } = await $host.get("/order/statuses");
    return data;
  },
};
