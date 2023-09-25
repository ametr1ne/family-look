import { $authHost, $host } from "./index";

export const CartService = {
  async add(
    cartId: number,
    productId: number,
    size: number | null = null,
    height: number | null = null,
    description: string | null = null,
    materialId: string | null = null
  ) {
    const { data } = await $authHost.post("api/cart", {
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
    const res = await $authHost.delete("api/cart/product?id=" + id);
    return res;
  },

  async getAllCarts() {
    try {
      const { data } = await $host.get("api/cart");
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getOne(id: number) {
    try {
      const { data } = await $authHost.get("api/cart/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  //   async getCartProducts(id) {
  //     try {
  //       const { data } = await $host.get("api/cart/products/" + id);
  //       return data;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
};
