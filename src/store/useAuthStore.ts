import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postAxios, putAxios } from "../utils/axios";

interface UserProfile {
  email: string;
  name: string;
  phone?: string;
  address?: string;
  detailAddress?: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
  updateUserProfile: (data: UserProfile, profileImage?: File) => Promise<void>;
}

const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email, password) => {
        try {
          const response = await postAxios("/users/signin", { email, password });
          const { user, token } = response.data;

          if (!token) {
            throw new Error("서버로부터 토큰이 발급되지 않았습니다.");
          }

          localStorage.setItem("token", token);

          set({
            isAuthenticated: true,
            user: {
              email: user.email,
              name: user.name,
              phone: user.phone,
              address: user.address,
              detailAddress: user.detailAddress,
            },
          });

          console.log("로그인 성공:", user);
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem("token");
        localStorage.removeItem("auth-storage");
        console.log("로그아웃 성공");
      },

      register: async (userData) => {
        try {
          await postAxios("/users/signup", userData);
          console.log("Registration successful");
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        }
      },

      checkPassword: async (password) => {
        try {
          const response = await postAxios("/users/password-check", { password });
          return response.data.success;
        } catch (error) {
          console.error("Password check failed:", error);
          throw error;
        }
      },

      updateUserProfile: async (data, profileImage) => {
        try {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("phone", data.phone || "");
          formData.append("address", data.address || "");
          formData.append("detailAddress", data.detailAddress || "");

          if (profileImage) {
            formData.append("image", profileImage);
          }

          const response = await putAxios("/user/update-info", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          set((state) => ({
            user: {
              ...state.user,
              ...response.data.updatedUser,
            },
          }));

          console.log("회원 정보 수정 성공:", response.data.updatedUser);
        } catch (error) {
          console.error("Update user profile failed:", error);
          throw error;
        }
      },
    }),
    { name: "auth-storage" },
  ),
);

export default useAuthStore;
