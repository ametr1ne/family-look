import { TProduct } from "types/Product";
import { $authHost, $host } from "./index";

type TCreateProduct = Partial<TProduct>;

export type TGetAllOpts = {
  categoryId?: number;
  collectionId?: number;
  limit?: number;
  page?: number;
  query?: string;
};

export const ProductService = {
  async create(product: TCreateProduct) {
    const { data } = await $authHost.post("/product", product);
    return data;
  },

  async getAll({ categoryId, collectionId, limit, page, query }: TGetAllOpts) {
    try {
      const { data } = await $host.get<{ rows: TProduct[] }>("/product", {
        params: {
          categoryId: categoryId,
          collectionId: collectionId,
          limit: limit,
          page: page,
          query: query,
        },
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
