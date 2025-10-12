import { NextResponse } from "next/server";

import {
  ensureCustomer,
  createMonthlySubscription,
  createLeanPayment,
  getPixQrCode,
  CreditCardData,
  CreditCardHolderInfo,
} from "@/lib/asaas";

type CheckoutRequest = {
  plan: "monthly" | "annual";
  paymentMethod: "monthly_card" | "annual_card" | "annual_pix" | "annual_boleto";
  customer: {
    name: string;
    email?: string;
    cpfCnpj: string;
    mobilePhone?: string;
    postalCode: string;
    address: string;
    addressNumber: string;
    complement?: string;
    province?: string;
    city?: string;
  };
  creditCard?: CreditCardData & { holderName: string };
};

function isCreditCardPayment(method: CheckoutRequest["paymentMethod"]) {
  return method === "monthly_card" || method === "annual_card";
}

function buildHolderInfo(customer: CheckoutRequest["customer"]): CreditCardHolderInfo {
  return {
    name: customer.name,
    email: customer.email,
    cpfCnpj: customer.cpfCnpj,
    postalCode: customer.postalCode,
    addressNumber: customer.addressNumber,
    address: customer.address,
    complement: customer.complement,
    mobilePhone: customer.mobilePhone,
    province: customer.province,
    city: customer.city,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;

    if (!body?.plan || !body?.paymentMethod || !body?.customer?.name || !body.customer?.cpfCnpj || !body.customer?.postalCode || !body.customer?.address || !body.customer?.addressNumber) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes. Verifique as informações e tente novamente." },
        { status: 400 }
      );
    }

    if (isCreditCardPayment(body.paymentMethod) && !body.creditCard) {
      return NextResponse.json(
        { error: "Dados do cartão de crédito são obrigatórios para esta forma de pagamento." },
        { status: 400 }
      );
    }

    const customer = await ensureCustomer({
      name: body.customer.name,
      email: body.customer.email,
      cpfCnpj: body.customer.cpfCnpj,
      mobilePhone: body.customer.mobilePhone,
      postalCode: body.customer.postalCode,
      address: body.customer.address,
      addressNumber: body.customer.addressNumber,
      complement: body.customer.complement,
      province: body.customer.province,
      city: body.customer.city,
    });

    const today = new Date();
    const dueDate = today.toISOString().slice(0, 10);

    if (body.paymentMethod === "monthly_card" && body.creditCard) {
      const subscription = await createMonthlySubscription({
        customerId: customer.id,
        description: "Assinatura mensal Cresça com Reels",
        creditCard: {
          holderName: body.creditCard.holderName,
          number: body.creditCard.number,
          expiryMonth: body.creditCard.expiryMonth,
          expiryYear: body.creditCard.expiryYear,
          ccv: body.creditCard.ccv,
        },
        creditCardHolderInfo: buildHolderInfo(body.customer),
      });

      return NextResponse.json({
        success: true,
        type: "subscription",
        subscription,
      });
    }

    if (body.paymentMethod === "annual_card" && body.creditCard) {
      const payment = await createLeanPayment({
        customerId: customer.id,
        billingType: "CREDIT_CARD",
        description: "Plano anual Cresça com Reels (12x)",
        value: 118.8,
        dueDate,
        installmentCount: 12,
        installmentValue: 9.9,
        creditCard: {
          holderName: body.creditCard.holderName,
          number: body.creditCard.number,
          expiryMonth: body.creditCard.expiryMonth,
          expiryYear: body.creditCard.expiryYear,
          ccv: body.creditCard.ccv,
        },
        creditCardHolderInfo: buildHolderInfo(body.customer),
      });

      return NextResponse.json({
        success: true,
        type: "credit_installments",
        payment,
      });
    }

    if (body.paymentMethod === "annual_pix") {
      const payment = await createLeanPayment({
        customerId: customer.id,
        billingType: "PIX",
        description: "Plano anual Cresça com Reels (à vista PIX)",
        value: 118.8,
        dueDate,
      });

      const qrCode = await getPixQrCode(payment.id);

      return NextResponse.json({
        success: true,
        type: "pix",
        payment,
        qrCode,
      });
    }

    if (body.paymentMethod === "annual_boleto") {
      const payment = await createLeanPayment({
        customerId: customer.id,
        billingType: "BOLETO",
        description: "Plano anual Cresça com Reels (boleto à vista)",
        value: 118.8,
        dueDate,
      });

      return NextResponse.json({
        success: true,
        type: "boleto",
        payment,
      });
    }

    return NextResponse.json(
      { error: "Forma de pagamento não suportada." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Checkout]", error);
    const message = error instanceof Error ? error.message : "Erro inesperado ao processar pagamento.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}



