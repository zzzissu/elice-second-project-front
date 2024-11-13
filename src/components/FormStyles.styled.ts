import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 1320px) {
    margin: 80px 0 50px;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.title};
  color: ${({ theme }) => theme.color.black};
  margin-top: 0;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  border-radius: 5px;
  outline: none;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  width: 100%;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color.black};
  margin-top: 8px;
`;

export const ErrorMessage = styled.span`
  width: 100%;
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.color.blue};
  margin-top: -8px;
  margin-bottom: 16px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  color: #fff;
  background-color: ${({ theme }) => theme.color.orange70};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.color.orange};
  }
`;
