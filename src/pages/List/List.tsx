import axios from "axios";
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { Nav, ItemCard, Dropdown, Sidebar } from "components";
import Carousel from "./Carousel/Carousel.tsx";

import { getAxios } from "../../utils/axios.ts";

import { ItemProps } from "components/ItemCard/ItemCard.tsx";
import { CarouselItem } from "../../types/types.ts";

import { S } from "./List.style";
import useDropdown from "../../hooks/useDropdown";

const options = ["최신순", "오래된순"];

const List = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { selectedItem, handleSelect } = useDropdown(options);

  const location = useLocation();

  // 쿼리 파라미터에서 categoryName 값을 가져오기
  const params = new URLSearchParams(location.search);
  const categoryName = params.get("categoryName");

  const currentPage = 1;
  const limit = 8;
  let url = `/products?currentPage=${currentPage}&limit=${limit}`;
  if (categoryName) {
    url += `&categoryName=${categoryName}`;
  }
  if (selectedItem) {
    const sort = () => {
      if (selectedItem === "오래된순") {
        return "oldest";
      } else return "latest";
    };
    url += `&sort=${sort()}`;
  }

  useEffect(() => {
    getAxios(url).then((res) => {
      setItems(res.data.products);
    });

    getCarousel();
  }, [categoryName, selectedItem]);

  const getCarousel = async () => {
    try {
      const response = await axios.get("/data/carousel.json");
      setCarouselData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.ListWrap>
      <Nav />
      <S.List>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <S.ListContent>
          <Carousel carouselData={carouselData} />
          <S.DropdownWrap>
            <Dropdown
              options={options}
              selectedItem={selectedItem}
              onClick={handleSelect}
            />
          </S.DropdownWrap>

          <S.ItemGrid>
            {items.map((item, idx) => {
              const column = 4;
              const row = Math.floor(idx / column) + 1;

              return (
                <Link to={`/products/${item._id}`} key={item._id}>
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
