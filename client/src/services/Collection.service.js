import { $authHost, $host } from "./index";

export const CollectionService = {
  async getAll() {
    try {
      const { data } = await $host.get("api/collection");
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
