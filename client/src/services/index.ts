import axios from "axios";
import Cookies from "js-cookie";

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const authInterceptor = async (config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
