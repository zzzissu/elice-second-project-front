import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token") || "";

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const successInterceptor = (response: AxiosResponse) => {
  return response;
};

export const errorInterceptor = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    const navigate = useNavigate();

    console.warn("❗️Unauthorized error: Redirecting to login");
    navigate("/login");
  } else {
    if (error.response) {
      console.error({
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("❌ No response: ", error.request);
    } else {
      console.error("❌Error message: ", error.message);
    }
    return Promise.reject(error);
  }
};
