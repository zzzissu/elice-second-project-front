import styled from "styled-components";

export const S = {
  MyPageWrap: styled.div`
    width: 1260px;

    margin: 0 auto;
    margin-top: 100px;
  `,
  MyPage: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 50px;

    width: 90%;

    margin: 0 auto;
  `,

  SideProfile: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    width: 350px;
    height: 400px;

    border-radius: 5px;

    border: 1px solid ${(props) => props.theme.color.lightGrey};
  `,
  ProfileImg: styled.div`
    width: 170px;
    height: 170px;

    background-image: url("/icons/profile.svg");
    background-repeat: no-repeat;
    background-size: contain;
  `,
  UserName: styled.div`
    font-size: ${(props) => props.theme.font.title};
    font-weight: 600;
  `,
  MyPageContent: styled.div`
    width: 100%;
  `,
  SellingBox: styled.div`
    width: 100%;
    height: 670px;
    margin-bottom: 36px;

    overflow: hidden;
  `,
  TitleBox: styled.div`
    width: 100%;
    height: 60px;

    font-size: ${(props) => props.theme.font.title};

    border-bottom: 1px solid ${(props) => props.theme.color.lightGrey};
  `,
  ItemGrid: styled.div`
    display: grid;

    width: 100%;
    height: auto;

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: 24px;

    margin-top: 24px;
  `,
  PaginationBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    margin-top: 40px;

    width: 100%;
    height: auto;
  `,
  ArrowIconBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 36px;
    height: 36px;

    border-radius: 10px;

    box-shadow: 0px 0px 14px 0px ${(props) => props.theme.color.lightGrey};

    &:hover {
      cursor: pointer;
    }
  `,
  LeftArrowIcon: styled.div`
    width: 13px;
    height: 11px;
    background-image: url("/icons/arrowLeft.svg");
    background-size: contain;
    background-repeat: no-repeat;

    margin-left: 3px;
  `,
  RightArrowIcon: styled.div`
    width: 13px;
    height: 11px;
    background-image: url("/icons/arrowRight.svg");
    background-size: contain;
    background-repeat: no-repeat;

    margin-left: 3px;
  `,
  PaginationNum: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 36px;
    height: 36px;

    color: ${(props) => props.theme.color.grey};

    &:hover {
      cursor: pointer;
    }
  `,
  CartGrid: styled.div``,
};
