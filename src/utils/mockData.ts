import axios from "axios";

export const fetchAddressInfo = async () => {
  try {
    const response = await axios.get("/data/mockAddress.json");
    return response.data[0];
  } catch (error) {
    console.error("Failed to fetch address info:", error);
    return null;
  }
};

export const fetchOrderItems = async () => {
  try {
    const response = await axios.get("/data/mockItems.json");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch order items:", error);
    return [];
  }
};
