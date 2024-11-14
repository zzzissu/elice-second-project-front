import styled, { css } from "styled-components";

export const SidebarContainer = styled.div`
  width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

interface CategoryButtonProps {
  isSelected: boolean;
}

export const CategoryButton = styled.button<CategoryButtonProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  color: ${({ theme }) => theme.color.black};
  background: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: border 0.3s ease;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      border: 2px solid ${theme.color.orange};
    `}

  &:hover {
    border: 2px solid ${({ theme }) => theme.color.orange};
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;

export const CategoryName = styled.span`
  color: ${({ theme }) => theme.color.black};
`;
