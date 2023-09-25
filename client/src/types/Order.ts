export type TStatus = {
  id: number;
  name: string;
  multipleName: string;
  color: string;
  showInDesk: boolean;
  orders: TOrderShort[];
};

export type TPaymentStatus = {
  id: number;
  name: string;
};

export type TOrderShort = {
  createdAt: string;
  id: number;
  order_status: TStatus;
  payment_status: TPaymentStatus;
  userId: number;
};
