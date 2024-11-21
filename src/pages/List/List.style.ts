import styled from "styled-components";

export const S = {
  ListWrap: styled.main`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 1260px;

    margin: 0 auto;
  `,
  List: styled.div`
    margin-top: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `,
  ListContent: styled.div`
    padding-top: 40px;

    height: calc(100vh - 60px);
    padding-bottom: 100px;
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
    gap: 26px;

    padding-bottom: 100px;
  `,
  MoreBtnWrap: styled.div`
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  MoreBtn: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme.color.deepGrey};

    height: 20px;

    margin-top: 50px;

    &:hover {
      cursor: pointer;
    }
  `,
};
