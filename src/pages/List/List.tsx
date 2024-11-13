import { useEffect, useState } from "react";

import Nav from "../../components/Nav/Nav.tsx";
import ItemCard from "../../components/ItemCard/ItemCard.tsx";
import Dropdown from "../../components/Dropdown/Dropdown.tsx";

import { fetchItems } from "../../utils/fetchItems.ts";

import { ItemProps } from "../../types/types.ts";

import { S } from "./List.style";

const List = () => {
  const options = ["최신순", "오래된순", "인기순"];

  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    getItems();
  }, []);

  return (
    <S.ListWrap>
      <Nav />
      <S.List>
        <S.Carousel />
        {items.map((item) => {
          return <ItemCard {...item} key={item.id} />;
        })}
        <Dropdown options={options} />
      </S.List>
    </S.ListWrap>
  );
};

export default List;
