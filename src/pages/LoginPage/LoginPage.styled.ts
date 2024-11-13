import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 40px;
  border-radius: 5px;
  background-color: #fff;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-family: ${({ theme }) => theme.font.LogoFont};
  color: ${({ theme }) => theme.color.orange};
  font-size: ${({ theme }) => theme.font.title};
`;

export const LogoImage = styled.img`
  height: 50px;
`;

export const LogoTitle = styled.img``;

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
