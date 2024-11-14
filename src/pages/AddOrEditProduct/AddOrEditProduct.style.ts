import styled from "styled-components";

export const S = {
  AddOrEditProduct: styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 1260px;

    margin: 0 auto;
  `,
  TitleBox: styled.div`
    width: 910px;
    height: 60px;
    margin-top: 100px;

    font-size: ${(props) => props.theme.font.title};

    border-bottom: 1px solid ${(props) => props.theme.color.lightGrey};
  `,

  InfoTable: styled.div`
    display: grid;
  `,
  GridTitle: styled.div``,

  UploadImg: styled.div``,
  UploadIcon: styled.div``,
  UploadText: styled.span``,
};
