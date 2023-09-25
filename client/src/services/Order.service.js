import { $authHost, $host } from "./index";

export const OrderService = {
  async create(userId, products) {
    const { data } = await $authHost.post("api/order", {
      userId,
      products,
    });
    return data;
  },

  async getAll() {
    try {
      const { data } = await $host.get("api/order");
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getOrderProducts(id) {
    try {
      const { data } = await $host.get("api/order/products/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getUserOrders(id) {
    try {
      const { data } = await $host.get("api/order/user/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async update(orderData) {
    try {
      const { data } = await $authHost.patch("api/order", orderData);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async createStatus(body) {
    const { data } = await $authHost.post("api/order/status", body);
    return data;
  },
  async createPaymentStatus(body) {
    const { data } = await $authHost.post("api/order/payment_status", body);
    return data;
  },
  async getStatuses() {
    const { data } = await $host.get("api/order/statuses");
    return data;
  },
};
