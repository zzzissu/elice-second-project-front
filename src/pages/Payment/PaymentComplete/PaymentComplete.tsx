import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmptyMessage from "../../../components/EmptyMessage/EmptyMessage";
import ROUTE_LINK from "../../../routes/RouterLink";

const PaymentComplete: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <>
      <EmptyMessage
        iconType="card"
        message="결제가 완료되었습니다."
        buttons={[
          {
            btnText: "쇼핑하러 가기",
            onClick: () => navigate(ROUTE_LINK.LIST.path),
            bgcolor: "orange70",
          },
          {
            btnText: "구매내역 보기",
            onClick: () => navigate(ROUTE_LINK.MYPAGE.path),
            bgcolor: "blue70",
          },
        ]}
      />
      <p>주문 번호: {searchParams.get("orderId")}</p>
      <p>결제 금액: {searchParams.get("amount")}원</p>
    </>
  );
};

export default PaymentComplete;
