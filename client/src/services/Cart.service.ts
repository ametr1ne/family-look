import { $authHost, $host } from "./index";

export const CartService = {
  async add(
    cartId: number,
    productId: number,
    size: string | null = null,
    height: string | null = null,
    description: string | null = null,
    materialId: string | null = null
  ) {
    const { data } = await $authHost.post("/cart", {
      cartId,
      productId,
      size,
      height,
      description,
      materialId,
    });
    return data;
  },

  async removeCartItem(id: number) {
    const res = await $authHost.delete("/cart/product?id=" + id);
    return res;
  },

  async getAllCarts() {
    try {
      const { data } = await $host.get("/cart");
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getOne(id: number) {
    try {
      const { data } = await $authHost.get("/cart/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getCartProducts(id: number) {
    try {
      const { data } = await $host.get("/cart/products/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
