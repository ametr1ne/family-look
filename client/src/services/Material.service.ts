import { TMaterial } from "types/Material";
import { $authHost, $host } from "./index";

export const MaterialService = {
  async create(material: FormData) {
    try {
      const { data } = await $authHost.post("/material", material);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getOne(id: number) {
    try {
      const { data } = await $host.get("/material/" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async getAll() {
    try {
      const { data } = await $host.get("/material");
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async update(material: TMaterial) {
    try {
      const { data } = await $authHost.patch("/material", material);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async remove(id: number) {
    try {
      const { data } = await $authHost.delete("/material?id=" + id);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
