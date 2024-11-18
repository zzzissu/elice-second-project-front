import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  requestInterceptor,
  successInterceptor,
  errorInterceptor,
} from "./interceptors";

import { BASE_URL } from "../config/config";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export const getAxios = async (url: string) => {
  const res = await axios.get(url);
  return res;
};

export const postAxios = async <T>(url: string, option: T) => {
  const res = await axios.post(url, option);
  return res;
};

export const putAxios = async <T>(url: string, option: T) => {
  const res = await axios.put(url, option);
  return res;
};

export const deleteAxios = async (url: string) => {
  const res = await axios.delete(url);
  return res;
};
