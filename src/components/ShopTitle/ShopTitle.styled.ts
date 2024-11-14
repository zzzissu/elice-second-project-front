import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.gray};
  border-radius: 50%;
  color: #fff;
  margin-right: 8px;

  svg {
    font-size: 18px;
  }
`;

export const ShopName = styled.span`
  color: ${({ theme }) => theme.color.black};
`;
