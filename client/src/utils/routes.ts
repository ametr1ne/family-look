import {
  ADMIN_URL,
  CART_URL,
  HOME_URL,
  LOGIN_URL,
  PRODUCT_URL,
  PROFILE_URL,
  REGISTRATION_URL,
  SHOP_URL,
} from "./consts";

export const publicRoutes: string[] = [
  HOME_URL,
  SHOP_URL,
  PRODUCT_URL,
  LOGIN_URL,
  REGISTRATION_URL,
];

export const authRoutes: string[] = [PROFILE_URL, CART_URL, ADMIN_URL];
