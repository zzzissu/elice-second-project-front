import Nav from "../../components/Nav/Nav";
import { S } from "./MyPage.style";
import { getItems } from "../../utils/getItems";
import { useEffect, useState } from "react";
import { ItemProps } from "../../types/types";
import ItemCard from "../../components/ItemCard/ItemCard";
import { Link } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";
import Button from "../../components/Button/Button";

const MyPage = () => {
  const [sellingItems, setSellingItems] = useState<ItemProps[]>([]);
  const [pageNum, setPageNum] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sellingItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const paginationNum = () => {
    const num = Math.ceil(sellingItems.length / itemsPerPage);
    let nums = [];
    for (let i = 1; i <= num; i++) {
      nums.push(i);
    }

    setPageNum(nums);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setSellingItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    paginationNum();
  }, [sellingItems]);

  const editProfile = () => {};

  const goToPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    } else return;
  };
  const goToNextPage = () => {
    if (currentPage !== pageNum[-1]) {
      setCurrentPage((prev) => prev + 1);
    } else return;
  };

  if (!paginatedItems || !sellingItems || !pageNum) return null;
  return (
    <S.MyPageWrap>
      <Nav />
      <S.MyPage>
        <S.SideProfile>
          <S.ProfileImg />
          <S.UserName>엘리스</S.UserName>
          <Button
            btnText="정보 수정하기"
            bgcolor="orange70"
            handleClick={editProfile}
          />
        </S.SideProfile>
        <S.MyPageContent>
          <S.SellingBox>
            <S.TitleBox>판매중인 상품</S.TitleBox>
            <S.ItemGrid>
              {paginatedItems.map((sellingItem, idx) => {
                const column = 4;
                const row = Math.floor(idx / column) + 1;

                return (
                  <Link to={ROUTE_LINK.DETAIL.link}>
                    <ItemCard
                      {...sellingItem}
                      key={sellingItem.id}
                      idx={idx}
                      row={row}
                    />
                  </Link>
                );
              })}
            </S.ItemGrid>
            <S.PaginationBox>
              <S.ArrowIconBox>
                <S.LeftArrowIcon onClick={goToPrevPage} />
              </S.ArrowIconBox>
              {pageNum.map((num) => {
                return (
                  <S.PaginationNum
                    key={num}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </S.PaginationNum>
                );
              })}
              <S.ArrowIconBox>
                <S.RightArrowIcon onClick={goToNextPage} />
              </S.ArrowIconBox>
            </S.PaginationBox>
          </S.SellingBox>
          <S.CartGrid>
            <S.TitleBox>구매 내역</S.TitleBox>
          </S.CartGrid>
        </S.MyPageContent>
      </S.MyPage>
    </S.MyPageWrap>
  );
};

export default MyPage;
