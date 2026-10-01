import { NextResponse } from "next/server";
import { processPaynkolayPayment, paynkolayConfig } from "@/lib/paynkolay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      amount,
      examId,
      examName,
      packageCount,
      cardHolder,
      cardNumber,
      cardExpiry,
      cardCvv,
      installment = "1",
      userEmail,
    } = body;

    if (!amount || !cardHolder || !cardNumber || !cardExpiry || !cardCvv) {
      return NextResponse.json(
        { success: false, error: "Eksik ödeme parametreleri." },
        { status: 400 }
      );
    }

    const orderId = `1MQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await processPaynkolayPayment({
      orderId,
      amount: Number(amount),
      cardHolder,
      cardNumber,
      cardExpiry,
      cardCvv,
      installment,
      examId: examId || "YDT",
      examName: examName || "Genel Sınav",
      packageCount: Number(packageCount) || 5,
      userEmail,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      result: {
        orderId: result.orderId,
        transactionId: result.transactionId,
        paidAmount: result.paidAmount,
        authCode: result.authCode,
        message: result.message,
        examId,
        examName,
        packageCount,
        merchantId: paynkolayConfig.merchantId,
      },
    });
  } catch (error: any) {
    console.error("Paynkolay payment error:", error);
    return NextResponse.json(
      { success: false, error: "Ödeme işlemi sırasında bir sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
