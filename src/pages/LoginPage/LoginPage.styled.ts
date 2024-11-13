import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.background};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  border-radius: 5px;
  background-color: #fff;
`;

export const LogoImage = styled.img`
  height: 60px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  border-radius: 4px;
  outline: none;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  color: #fff;
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.color.primaryHover};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 25px;
`;

export const FooterLink = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.color.deepGrey};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.color.black};
  }
`;
