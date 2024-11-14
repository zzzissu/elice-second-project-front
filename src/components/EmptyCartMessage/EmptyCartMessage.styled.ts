import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  color: ${({ theme }) => theme.color.black};
`;

export const Icon = styled.div`
  margin-bottom: 16px;
`;

export const Message = styled.div`
  font-size: ${({ theme }) => theme.font.title};
  margin-bottom: 24px;
`;
