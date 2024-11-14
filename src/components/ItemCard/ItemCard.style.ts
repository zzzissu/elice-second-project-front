import styled from "styled-components";

interface CellProps {
  idx: number;
  row: number;
}

interface ImgUrlProps {
  imgUrl: string;
}

export const S = {
  ItemCard: styled.div`
    position: relative;
    width: 236px;
    height: 227px;

    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }
  `,
  ProductImg: styled.div<ImgUrlProps>`
    width: 100%;
    height: 100%;

    border-radius: 5px;

    background-image: url(${(props) => props.imgUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
  ProductInfo: styled.div<CellProps>`
    position: absolute;
    bottom: 0px;
    left: 0px;

    padding: 4px 10px;
    width: 100%;

    background-color: ${(props) => {
      if (props.row % 2 !== 0 && (props.idx + 1) % 2 === 0) {
        return props.theme.color.orange30;
      }
      if (props.row % 2 !== 0 && (props.idx + 1) % 2 !== 0) {
        return props.theme.color.blue30;
      }
      if (props.row % 2 === 0 && (props.idx + 1) % 2 !== 0) {
        return props.theme.color.orange30;
      } else return props.theme.color.blue30;
    }};
    color: #fff;
  `,
  ProductName: styled.div`
    font-weight: 600;
  `,
  ProductPrice: styled.div`
    font-size: ${(props) => props.theme.font.small};
  `,
};
