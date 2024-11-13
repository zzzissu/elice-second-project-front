import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  border-radius: 8px;
`;



export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  input {
    margin-bottom: 0;
  }
`;

export const CheckButton = styled.button`
  margin-left: 8px;
  padding: 11px 12px;
  font-size: ${({ theme }) => theme.font.small};
  color: #fff;
  background-color: ${({ theme }) => theme.color.grey};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.color.blue};
  }
`;

export const HelperText = styled.span`
  width: 100%;
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.color.blue};
  margin-top: -10px;
`;
