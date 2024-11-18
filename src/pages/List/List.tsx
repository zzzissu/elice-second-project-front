import ROUTE_LINK from "../../routes/RouterLink.ts";
import axios from "axios";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "../../components/Nav/Nav.tsx";
import ItemCard from "../../components/ItemCard/ItemCard.tsx";
import Dropdown from "../../components/Dropdown/Dropdown.tsx";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import Carousel from "./Carousel/Carousel.tsx";

import { getAxios } from "../../utils/axios.ts";

import { ItemProps } from "../../types/types.ts";
import { CarouselItem } from "../../types/types.ts";

import { S } from "./List.style";

const List = () => {
  const options = ["최신순", "오래된순"];

  const [items, setItems] = useState<ItemProps[]>([]);
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);

  const getCarousel = async () => {
    try {
      const response = await axios.get("/data/carousel.json");
      setCarouselData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAxios("/products").then((res) => {
      setItems(res.data);
    });

    // getAxios("/data/carousel.json").then((res) => setCarouselData(res.data));
    getCarousel();
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
                  <ItemCard {...item} key={item._id} idx={idx} row={row} />
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
