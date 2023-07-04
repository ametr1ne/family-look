import { $authHost, $host } from "./index";

export const MaterialService = {
  async create(material) {
    try {
      const { data } = await $authHost.post("api/material", material);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getOne(id) {
    try {
      const { data } = await $host.get("api/material/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getAll() {
    try {
      const { data } = await $host.get("api/material");
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async update(material) {
    try {
      const { data } = await $authHost.patch("api/material", category);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async remove(id) {
    try {
      const { data } = await $authHost.delete("api/material?id=" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
