import axios from "axios";

export const getItems = async () => {
  try {
    const res = await axios.get("/data/items.json");
    return res.data;
  } catch (error) {
    console.error("Error fetching items: ", error);
  }
};
