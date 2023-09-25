import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export const UserService = {
  async getAll(limit: number = 10, page: number = 1) {
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
  async getOne(id: number) {
    const { data } = await $host.get("api/user/" + id);
    return data;
  },
  async getUserByEmail(email: string) {
    const { data } = await $host.get("api/user/", {
      params: {
        email,
      },
    });
    return data;
  },
  async registration(name: string, email: string, password: string) {
    const { data } = await $host.post("api/user/registration", { name, email, password });
    Cookies.set("token", data.token, { path: "/", secure: true, sameSite: "none" });
    // localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  },

  async login(email: string, password: string) {
    const { data } = await $host.post("api/user/login", { email, password });
    Cookies.set("token", data.token, { path: "/", secure: true, sameSite: "none" });
    // localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  },

  async checkAuth() {
    try {
      const { data } = await $host.get("api/user/auth/");

      if (data.status === "authorized") {
        Cookies.set("token", data.token, { path: "/" });
        // localStorage.setItem("token", data.token);
        return jwtDecode(data.token);
      } else {
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
