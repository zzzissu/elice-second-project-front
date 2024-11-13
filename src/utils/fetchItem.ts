export const fetchItems = async () => {
  const response = await fetch("/data/items.json");
  const data = await response.json();
  return data;
};
