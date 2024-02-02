export type TProduct = {
  category: TCategory;
  collection: TCollection;
  coverImg: string;
  description: "";
  id: number;
  info: [];
  materials: [];
  name: string;
  price: number;
  rating: number;
  updatedAt: string;
};

export type TCartProduct = {
  coverImg: string;
  description: "";
  id: number;
  productId: number;
  name: string;
  price: number;
  rating: number;
  updatedAt: string;
};

export type TCategory = {
  id: number;
  name: string;
};
export type TCollection = {
  id: number;
  name: string;
};
