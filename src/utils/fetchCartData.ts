import axios from "axios";

interface CartItem {
  id: number;
  itemName: string;
  imageSrc: string;
  price: number;
  description: string;
  shopName: string;
  checked?: boolean;
}

interface Shop {
  shopName: string;
  items: CartItem[];
}

export const fetchCartData = async (): Promise<Shop[]> => {
  try {
    const res = await axios.get("/data/mockItems.json");
    const groupedData: Record<string, CartItem[]> = res.data.reduce(
      (acc: Record<string, CartItem[]>, item: CartItem) => {
        const { shopName } = item;
        if (!acc[shopName]) acc[shopName] = [];
        acc[shopName].push({ ...item, checked: false });
        return acc;
      },
      {},
    );

    return Object.entries(groupedData).map(([shopName, items]) => ({
      shopName,
      items,
    }));
  } catch (error) {
    console.error("Failed to fetch cart data:", error);
    return [];
  }
};
