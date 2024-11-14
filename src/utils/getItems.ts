import axios from "axios";

export const getItems = async () => {
  try {
    const response = await axios.get("/data/items.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};
