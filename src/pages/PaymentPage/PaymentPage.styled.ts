import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 40px;
  gap: 20px;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

export const LeftSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RightSection = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Section = styled.div`
  padding: 20px;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AddressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const EditButton = styled.button`
  color: ${({ theme }) => theme.color.black};
  font-size: 14px;
  cursor: pointer;
  border: none;
  background: none;
`;

export const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    color: #666;
  }

  input {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.color.lightGrey};
    border-radius: 4px;
    outline: none;
  }
`;

export const PaymentMethod = styled.div`
  display: flex;
  gap: 8px;

  button {
    flex: 1;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.color.lightGrey};
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    color: ${({ theme }) => theme.color.lightGrey};

    &:hover {
      border-color: ${({ theme }) => theme.color.orange30};
    }

    &:active {
      border-color: ${({ theme }) => theme.color.orange};
      color: ${({ theme }) => theme.color.orange};
    }
  }
`;

export const SummaryBox = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SummaryTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

export const TotalAmount = styled.div`
  font-weight: bold;

  span {
    float: right;
  }
`;

export const AgreementText = styled.p`
  font-size: 14px;
  color: #666;
`;

export const AgreementTextBox = styled.div`
  padding: 12px;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.font.small};
  background-color: ${({ theme }) => theme.color.lightGrey};
  margin-bottom: 16px;
  word-break: keep-all;
`;
