import axios from "axios";

export const getCartItems = async () => {
  try {
    const res = await axios.get("/data/cartItem.json");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
