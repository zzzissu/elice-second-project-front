import { Link, useNavigate, Outlet } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";
import { useEffect, useState } from "react";

import Nav from "../../components/Nav/Nav";
import Button from "../../components/Button/Button";
import ItemCard from "../../components/ItemCard/ItemCard";
import CartItem from "../../components/CartItem/CartItem";

import { CartItems, ItemProps } from "../../types/types";

import { S } from "./MyPage.style";
import { getAxios } from "../../utils/axios";

const MyPage = () => {
  const navigate = useNavigate();
  const [sellingItems, setSellingItems] = useState<ItemProps[]>([]);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [filteredCartItems, setFilteredCartItems] = useState<
    {
      date: string;
      items: CartItems[];
    }[]
  >([]);

  const [pageNum, setPageNum] = useState<number[]>([]);
  let dates: string[] = [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sellingItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const editProfile = () => {
    navigate(ROUTE_LINK.PASSWORD_CHECK.path);
  };

  const paginationNum = () => {
    const num = Math.ceil(sellingItems.length / itemsPerPage);
    let nums = [];
    for (let i = 1; i <= num; i++) {
      nums.push(i);
    }

    setPageNum(nums);
  };

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

  const showMore = () => {};

  const fetchItems = async () => {
    getAxios("/data/items.json").then((res) => setSellingItems(res.data));
  };

  const fetchCartItems = async () => {
    getAxios("/data/cartItem.json").then((res) => setCartItems(res.data));
  };

  useEffect(() => {
    fetchItems();
    fetchCartItems();
  }, []);

  useEffect(() => {
    paginationNum();
  }, [sellingItems]);

  useEffect(() => {
    const uniqueDates = [
      ...new Set(cartItems.map((item) => item.purchaseDate)),
    ];
    dates = uniqueDates;

    const groupedCartItems = dates.map((date) => ({
      date,
      items: cartItems.filter((cartItem) => cartItem.purchaseDate === date),
    }));

    setFilteredCartItems(groupedCartItems);
  }, [cartItems]);

  if (!paginatedItems || !sellingItems || !pageNum || !cartItems) return null;
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
                  <Link to={ROUTE_LINK.DETAIL.link} key={sellingItem.id}>
                    <ItemCard {...sellingItem} idx={idx} row={row} />
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
          <S.PurchaseList>
            <S.TitleBox>구매 내역</S.TitleBox>
            {filteredCartItems.length > 0 ? (
              filteredCartItems.map(({ date, items }) => (
                <div key={date}>
                  <S.DateTitle>{date}</S.DateTitle> {/* 날짜 제목 표시 */}
                  {items.map((cartItem) => (
                    <S.CartGrid>
                      <Link to="/detail">
                        <CartItem
                          page="mypage"
                          imageSrc={cartItem.imageSrc}
                          Title={cartItem.itemName}
                          description={`${cartItem.price.toLocaleString()} 원`}
                        />
                      </Link>

                      <S.Shop>
                        <S.ShopIconCircle>
                          <S.ShopIcon />
                        </S.ShopIconCircle>
                        {cartItem.shopName}
                      </S.Shop>
                    </S.CartGrid>
                  ))}
                </div>
              ))
            ) : (
              <S.EmptyCart>구매 내역이 없습니다.</S.EmptyCart>
            )}
          </S.PurchaseList>
          {cartItems.length > 0 ? (
            <S.MoreBtn onClick={showMore}>더보기</S.MoreBtn>
          ) : (
            ""
          )}
        </S.MyPageContent>
      </S.MyPage>
    </S.MyPageWrap>
  );
};

export default MyPage;
