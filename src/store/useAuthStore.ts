import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postAxios } from "../utils/axios";

interface UserState {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
}

const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email, password) => {
        try {
          const response = await postAxios("/auth/signin", {
            email,
            password,
          });
          const { user } = response.data;

          set({
            isAuthenticated: true,
            user: { email: user.email, name: user.name },
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem("auth-storage"); // Persist storage 초기화
      },

      register: async (userData) => {
        try {
          await postAxios("/auth/register", userData);
          console.log("Registration successful");
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        }
      },
    }),
    { name: "auth-storage" }, // persist storage의 키
  ),
);

export default useAuthStore;
