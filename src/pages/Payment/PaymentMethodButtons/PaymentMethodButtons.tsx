import React, { useState } from "react";
import * as S from "./PaymentMethodButtons.styled";

const paymentMethods = [
  { id: "toss", label: "토스페이" },
  { id: "bank", label: "무통장(가상계좌)" },
];

const PaymentMethodButtons: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId);
    console.log(`${methodId} 결제선택`);
  };
  return (
    <S.Container>
      {paymentMethods.map((method) => (
        <S.Button
          key={method.id}
          isSelected={selectedMethod === method.id}
          onClick={() => handleSelectMethod(method.id)}
        >
          {method.label}
        </S.Button>
      ))}
    </S.Container>
  );
};

export default PaymentMethodButtons;
