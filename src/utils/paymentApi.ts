import { ApprovalInfo, OrderInfo } from "types/paymentTypes";
import { postAxios } from "./axios";

export const createOrder = async (orderInfo: OrderInfo) => {
  try {
    const response = await postAxios("/orders", orderInfo);
    return response.data;
  } catch (error) {
    console.log("주문 생성 실패:", error);
    throw error;
  }
};

export const approvePayment = async (approvalInfo: ApprovalInfo) => {
  try {
    const response = await postAxios("/payments/approval", approvalInfo);
    return response.data;
  } catch (error) {
    console.error("결제 승인 실패:", error);
    throw error;
  }
};

export const callTossPaymentsApi = async (
  orderId: string,
  totalAmount: number,
) => {
  const API_URL = "https://api.tosspayments.com/v1/payments"; // 토스 API 엔드포인트
  const SECRET_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"; // 토스 테스트용 Secret Key (환경 변수로 관리 추천)

  const basicAuthHeader = `Basic ${btoa(SECRET_KEY + ":")}`; // Basic 인증 헤더

  const paymentPayload = {
    method: "카드", // 결제 수단
    orderId: orderId, // 주문 ID
    amount: totalAmount, // 결제 금액
    orderName: "주문 상품", // 주문 이름
    successUrl: "http://localhost:3000/success", // 성공 시 리디렉션 URL
    failUrl: "http://localhost:3000/fail", // 실패 시 리디렉션 URL
  };

  try {
    const response = await postAxios(API_URL, paymentPayload, {
      headers: {
        Authorization: basicAuthHeader,
        "Content-Type": "application/json",
      },
    });
    return response.data; // 반환된 결제 요청 데이터
  } catch (error) {
    console.error("토스페이먼츠 API 호출 실패:", error);
    throw error;
  }
};
