import { $authHost, $host } from "./index";

export const CategoryService = {
  async create(category) {
    try {
      const { data } = await $authHost.post("api/category", category);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getAll() {
    try {
      const { data } = await $host.get("api/category");
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async update(category) {
    try {
      const { data } = await $authHost.patch("api/category", category);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async remove(id) {
    try {
      const { data } = await $authHost.delete("api/category?id=" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
