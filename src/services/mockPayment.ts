export type MockPaymentResult = {
  success: boolean;
  message?: string;
};

export async function mockPayment(forceSuccess?: boolean): Promise<MockPaymentResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const success = forceSuccess ?? Math.random() <= 0.85;

  return success
    ? { success: true }
    : {
        success: false,
        message: "Payment failed. Please check your card details and try again.",
      };
}
