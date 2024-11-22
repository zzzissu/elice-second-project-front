import { getAxios } from "../utils/axios";

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  shop: {
    nickname: string;
    _id: string;
  };
  checked: boolean;
}

interface Shop {
  nickname: string;
  _id: string;
  items: CartItem[];
}

export const fetchCartData = async (): Promise<Shop[]> => {
  const localCart = JSON.parse(localStorage.getItem("products") || "[]");

  // 각 아이템의 세부 정보를 가져오기
  const shopRequests = localCart.map(async (shop) => {
    const updatedItems = await Promise.all(
      shop.items.map(async (item) => {
        try {
          const response = await getAxios(`/products/${item._id}`);
          const product = response.data;

          return {
            ...product,
            shopId: shop.shopId,
            shopName: shop.shopName,
            checked: item.checked || false, // 기존 체크 상태 유지
          };
        } catch (error) {
          console.error(`Error fetching product with ID ${item._id}:`, error);
          return item; // 요청 실패 시 기존 데이터를 반환
        }
      }),
    );

    return {
      shopName: shop.shopName,
      shopId: shop.shopId,
      items: updatedItems,
    };
  });

  // 요청 완료 후 데이터 반환
  return await Promise.all(shopRequests);

  // const requests = localCart.map(
  //   async (cartItem: {
  //     id: string;
  //     shop: { nickname: string; _id: string };
  //   }) => {
  //     const response = await getAxios(`/products/${cartItem.id}`);
  //     const product = response.data;

  //     return {
  //       ...product,
  //       shop: cartItem.shop,
  //       checked: false,
  //     };
  //   },
  // );

  // const items = await Promise.all(requests);

  // const groupedByShop = items.reduce(
  //   (acc: Record<string, { shopId: string; items: CartItem[] }>, item) => {
  //     const shopKey = item.shop.nickname;

  //     if (!acc[shopKey]) {
  //       acc[shopKey] = {
  //         shopId: item.shop._id,
  //         items: [],
  //       };
  //     }
  //     acc[shopKey].items.push(item);
  //     return acc;
  //   },
  //   {},
  // );

  // return Object.entries(groupedByShop).map(([shopName, { shopId, items }]) => ({
  //   shopName,
  //   shopId,
  //   items,
  // }));
};
