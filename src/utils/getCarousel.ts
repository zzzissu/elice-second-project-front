import axios from "axios";

export const getCarousel = async () => {
  try {
    const response = await axios.get("/data/carousel.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};
