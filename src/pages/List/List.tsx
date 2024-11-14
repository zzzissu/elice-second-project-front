import ROUTE_LINK from "../../routes/RouterLink.ts";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "../../components/Nav/Nav.tsx";
import ItemCard from "../../components/ItemCard/ItemCard.tsx";
import Dropdown from "../../components/Dropdown/Dropdown.tsx";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import Carousel from "./Carousel/Carousel.tsx";

import { getItems } from "../../utils/getItems.ts";
import { getCarousel } from "../../utils/getCarousel.ts";

import { ItemProps } from "../../types/types.ts";
import { CarouselItem } from "../../types/types.ts";

import { S } from "./List.style";

const List = () => {
  const options = ["최신순", "오래된순"];

  const [items, setItems] = useState<ItemProps[]>([]);
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const data = await getCarousel();
        setCarouselData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCarousel();
  }, []);

  return (
    <S.ListWrap>
      <Nav />
      <S.List>
        <Sidebar />
        <S.ListContent>
          <Carousel carouselData={carouselData} />
          <S.DropdownWrap>
            <Dropdown options={options} />
          </S.DropdownWrap>

          <S.ItemGrid>
            {items.map((item, idx) => {
              const column = 4;
              const row = Math.floor(idx / column) + 1;

              return (
                <Link to={ROUTE_LINK.DETAIL.link}>
                  <ItemCard {...item} key={item.id} idx={idx} row={row} />
                </Link>
              );
            })}
          </S.ItemGrid>
        </S.ListContent>
      </S.List>
    </S.ListWrap>
  );
};

export default List;
