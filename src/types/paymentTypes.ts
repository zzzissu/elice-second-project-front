export interface OrderItem {
  categoryName: string;
  description?: string;
  image: string;
  name: string;
  price: number;
  sellerId: string;
}

export interface OrderInfo {
  name: string;
  phone: string;
  postalCode: string;
  address: string;
  detailAddress?: string;
  requestMessage: string;
  items: OrderItem[];
  totalAmount: number;
}

export interface ApprovalInfo {
  orderId: string;
}
