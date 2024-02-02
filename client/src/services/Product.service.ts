import { TProduct } from "types/Product";
import { $authHost, $host } from "./index";

type TCreateProduct = Partial<TProduct>;

export const ProductService = {
  async create(product: TCreateProduct) {
    const { data } = await $authHost.post("/product", product);
    return data;
  },

  async getAll(
    categoryId: number | null = null,
    collectionId: number | null = null,
    limit: number = 20,
    page: number = 1
  ) {
    try {
      const { data } = await $host.get<{ rows: TProduct[] }>("/product", {
        params: { categoryId, collectionId, limit, page },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getOne(id: number = 1) {
    try {
      const { data } = await $host.get<TProduct>("/product/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async remove(id: number) {
    const res = await $authHost.delete("/product?id=" + id);
    return res;
  },
  async update(product: Partial<TProduct>) {
    const { data } = await $authHost.patch("/product", product);
    return data;
  },
};
