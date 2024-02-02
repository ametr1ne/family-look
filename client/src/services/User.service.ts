import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { IUser } from "types/User";

export const UserService = {
  async getAll(limit: number = 10, page: number = 1) {
    try {
      const { data } = await $host.get("/user/users", {
        params: {
          limit: limit,
          page: page,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getOne(id: number) {
    const { data } = await $host.get<IUser>("/user/" + id);
    return data;
  },
  async getUserByEmail(email: string) {
    const { data } = await $host.get("/user/", {
      params: {
        email,
      },
    });
    return data;
  },
  async registration(name: string, email: string, password: string) {
    const { data } = await $host.post("/user/registration", { name, email, password });
    Cookies.set("token", data.token, { path: "/", secure: true, sameSite: "none" });
    return jwtDecode(data.token) as IUser;
  },

  async login(email: string, password: string) {
    const { data } = await $host.post("/user/login", { email, password });
    Cookies.set("token", data.token, { path: "/", secure: true, sameSite: "none" });
    return jwtDecode(data.token) as IUser;
  },

  async checkAuth() {
    try {
      const { data } = await $host.get("/user/auth/");

      if (data.status === "authorized") {
        Cookies.set("token", data.token, { path: "/" });
        return jwtDecode(data.token);
      } else {
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
