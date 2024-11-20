import { getAxios } from "../utils/axios";

interface CartItem {
  id: number;
  itemName: string;
  imageSrc: string;
  price: number;
  description: string;
  shopName: string;
}

export const fetchCartData = async (): Promise<
  { shopName: string; items: CartItem[] }[]
> => {
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

  const requests = localCart.map(
    async (cartItem: { id: number; shopName: string }) => {
      const response = await getAxios(`/products/${cartItem.id}`);
      const product = response.data;

      return {
        ...product,
        shopName: cartItem.shopName,
        checked: false,
      };
    },
  );

  const items = await Promise.all(requests);

  const groupedByShop = items.reduce(
    (acc: Record<string, CartItem[]>, item) => {
      if (!acc[item.shopName]) acc[item.shopName] = [];
      acc[item.shopName].push(item);
      return acc;
    },
    {},
  );

  return Object.entries(groupedByShop).map(([shopName, items]) => ({
    shopName,
    items,
  }));
};
