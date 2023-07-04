import { $authHost, $host } from "./index";

export const CartService = {
  async add(cartId, productId, size = null, height = null, description = null, materialId = null) {
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

  async removeCartItem(id) {
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

  async getOne(id) {
    try {
      const { data } = await $host.get("api/cart/" + id);

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
