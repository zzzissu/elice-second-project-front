import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Price = styled.span`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.span`
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.font.small};
`;
