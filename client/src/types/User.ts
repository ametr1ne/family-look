import { TCartProduct, TProduct } from "./Product";

export type TRole = "ADMIN" | "USER";

export interface IUser {
  id: number;
  role: TRole;
  name: string;
  cart: number;
  image: string;
  email: string;
}

export type TUserCart = {
  id: number;
  products: TCartProduct[];
  userId: number;
};
