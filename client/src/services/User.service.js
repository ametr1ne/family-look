import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export const UserService = {
  async getAll(limit = 10, page = 1) {
    try {
      const { data } = await $host.get("api/user/users", {
        params: {
          limit: limit,
          page: page,
        },
      });
      return data;
    } catch (e) {
      console.log(e.message);
    }
  },
  async getOne(id) {
    const { data } = await $host.get("api/user/" + id);
    return data;
  },
  async registration(name, email, password) {
    const { data } = await $host.post("api/user/registration", { name, email, password });
    // Cookies.set("token", data.token, { path: "/", secure: true, sameSite: "none" });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  },

  async login(email, password) {
    const { data } = await $host.post("api/user/login", { email, password });
    // Cookies.set("token", data.token, { path: "/", secure: true, sameSite: "none" });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  },

  async checkAuth() {
    try {
      const { data } = await $authHost.get("api/user/auth/");
      Cookies.set("token", data.token, { path: "/" });
      localStorage.setItem("token", data.token);
      return jwtDecode(data.token);
    } catch (e) {
      console.log(e);
    }
  },
};
