import React from "react";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "../../../components/EmptyMessage/EmptyMessage";
import ROUTE_LINK from "../../../routes/RouterLink";
import { useSearchParams } from "react-router-dom";

const PaymentFail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <>
      <EmptyMessage
        iconType="card"
        message="결제를 실패했습니다."
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
      <p>{`에러 코드: ${searchParams.get("code")}`}</p>
      <p>{`실패 사유: ${searchParams.get("message")}`}</p>
    </>
  );
};

export default PaymentFail;
