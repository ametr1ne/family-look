import { $authHost, $host } from "./index";

export const ProductService = {
  async create(product) {
    const { data } = await $authHost.post("api/product", product);
    return data;
  },

  async getAll(categoryId, collectionId, limit = 20, page) {
    try {
      const { data } = await $host.get("api/product", {
        params: { categoryId, collectionId, limit, page },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getOne(id) {
    try {
      const { data } = await $host.get("api/product/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async remove(id) {
    const res = await $authHost.delete("api/product?id=" + id);
    return res;
  },
  async update(product) {
    const { data } = await $authHost.patch("api/product", product);
    return data;
  },
};
