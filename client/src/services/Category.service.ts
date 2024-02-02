import { TCategory } from "types/Product";
import { $authHost, $host } from "./index";

export const CategoryService = {
  async create(category: any) {
    try {
      const { data } = await $authHost.post("/category", category);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getAll() {
    try {
      const { data } = await $host.get<TCategory[]>("/category");
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async update(category: any) {
    try {
      const { data } = await $authHost.patch("/category", category);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async remove(id: number) {
    try {
      const { data } = await $authHost.delete("/category?id=" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
