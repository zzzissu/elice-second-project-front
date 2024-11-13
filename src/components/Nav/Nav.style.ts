import styled from "styled-components";

export const S = {
  Nav: styled.div`
    position: fixed;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0 auto;
    padding: 16px;

    border-bottom: 1px solid ${(props) => props.theme.color.lightGrey};

    width: 1260px;
    height: 60px;
  `,
  Logo: styled.div`
    display: flex;
    align-items: center;

    gap: 4px;

    font-family: ${(props) => props.theme.font.LogoFont};
    color: ${(props) => props.theme.color.orange};
    font-size: ${(props) => props.theme.font.title};
  `,
  LogoIcon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url("/logo.png");
    background-size: contain;
    background-repeat: no-repeat;

    width: 28px;
    height: 27px;
  `,
  SignInBtn: styled.button`
    padding: 0px;

    background-color: #fff;
    color: ${(props) => props.theme.color.grey};

    border: none;
    cursor: pointer;

    outline: none;
    &:focus {
      outline: none;
    }
    &:hover {
      outline: none;
    }
  `,
};
