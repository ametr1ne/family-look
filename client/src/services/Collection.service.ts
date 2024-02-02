import { $authHost, $host } from "./index";

export const CollectionService = {
  async getAll() {
    try {
      const { data } = await $host.get("/collection");
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
