import styled from "styled-components";

export const S = {
  ListWrap: styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 100px;
    width: 1260px;
  `,
  List: styled.div``,
  Carousel: styled.div`
    background-color: gray;

    width: 982px;
    height: 252px;
  `,
  DropdownWrap: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 982px;
    height: 84px;
  `,

  ItemGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 12px;
  `,
};
