import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAxios } from "../utils/axios"; // 수정된 axios 메서드 가져오기

interface Product {
  id: number;
  checked: boolean;
  shop: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  shop: string;
  checked: boolean;
}

interface CartState {
  products: Product[];
  cartData: Record<string, CartItem[]>; // 상점별로 분류된 데이터
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  fetchCartData: () => Promise<void>;
  toggleProductCheck: (id: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [], // 로컬스토리지에 저장된 상품 리스트
      cartData: {}, // 상점별 분류된 장바구니 데이터

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      fetchCartData: async () => {
        const { products } = get();
        if (products.length === 0) {
          set({ cartData: {} });
          return;
        }

        try {
          // 모든 제품의 ID를 사용해 API 호출
          const responses = await Promise.all(
            products.map(
              (product) => getAxios(`/api/products/${product.id}`), // API 경로에 맞게 수정
            ),
          );

          const cartItems: CartItem[] = responses.map((response, index) => ({
            ...response.data,
            checked: products[index].checked,
            shop: products[index].shop,
          }));

          // 상점별로 그룹화
          const groupedData = cartItems.reduce(
            (acc, item) => {
              if (!acc[item.shop]) acc[item.shop] = [];
              acc[item.shop].push(item);
              return acc;
            },
            {} as Record<string, CartItem[]>,
          );

          set({ cartData: groupedData });
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      },

      toggleProductCheck: (id) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, checked: !product.checked }
              : product,
          ),
        })),

      clearCart: () => set({ products: [], cartData: {} }),
    }),
    { name: "cart-storage" }, // 로컬스토리지 키 이름
  ),
);

export default useCartStore;
