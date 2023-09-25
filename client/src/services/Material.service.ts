import { TMaterial } from "src/types/Material";
import { $authHost, $host } from "./index";

export const MaterialService = {
  async create(material: TMaterial) {
    try {
      const { data } = await $authHost.post("api/material", material);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getOne(id: number) {
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

  async update(material: TMaterial) {
    try {
      const { data } = await $authHost.patch("api/material", material);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async remove(id: number) {
    try {
      const { data } = await $authHost.delete("api/material?id=" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
