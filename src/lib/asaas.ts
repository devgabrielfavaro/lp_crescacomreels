const ASAAS_API_KEY = process.env.ASAAS_API_KEY
const ASAAS_BASE_URL = process.env.ASAAS_BASE_URL ?? "https://api.asaas.com/api/v3"

if (!ASAAS_API_KEY) {
  console.warn(
    "[Asaas] ASAAS_API_KEY is not defined. Create a .env.local file with your Asaas access token."
  )
}

type Nullable<T> = T | null | undefined

type AsaasErrorResponse = {
  errors?: Array<{ field?: string; message?: string; description?: string }>
  message?: string
}

async function asaasFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${ASAAS_BASE_URL}${path}`

  const headers = new Headers(init?.headers ?? {})

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  headers.set("access_token", ASAAS_API_KEY ?? "")
  headers.set("User-Agent", "crescacomreels_production")

  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers,
  })

  if (!response.ok) {
    let details: AsaasErrorResponse | undefined
    try {
      details = await response.json()
    } catch (error) {
      // ignore json errors
    }

    const message =
      details?.errors?.map((error) => error.description ?? error.message).join("; ") ||
      details?.message ||
      `Asaas request failed with status ${response.status}`

    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function sanitizeDocument(value: Nullable<string>) {
  return value?.replace(/\D/g, "") ?? ""
}

export function sanitizePhone(value: Nullable<string>) {
  return value?.replace(/\D/g, "") ?? ""
}

type CreateCustomerInput = {
  name: string
  email?: string
  cpfCnpj?: string
  mobilePhone?: string
  phone?: string
  address?: string
  addressNumber?: string
  complement?: string
  postalCode?: string
  province?: string
  city?: string
}

type CustomerResponse = {
  id: string
  name: string
  email?: string
}

type CustomerListResponse = {
  totalCount: number
  data: CustomerResponse[]
}

export async function findCustomerByEmail(email: string) {
  const query = new URLSearchParams({ email, limit: "1" }).toString()
  const result = await asaasFetch<CustomerListResponse>(`/customers?${query}`)
  if (result.totalCount > 0 && result.data[0]) {
    return result.data[0]
  }
  return null
}

export async function createCustomer(input: CreateCustomerInput) {
  return await asaasFetch<CustomerResponse>("/customers", {
    method: "POST",
    body: JSON.stringify({
      ...input,
      cpfCnpj: input.cpfCnpj ? sanitizeDocument(input.cpfCnpj) : undefined,
      mobilePhone: input.mobilePhone ? sanitizePhone(input.mobilePhone) : undefined,
      phone: input.phone ? sanitizePhone(input.phone) : undefined,
      postalCode: input.postalCode ? sanitizeDocument(input.postalCode) : undefined,
    }),
  })
}

export async function ensureCustomer(input: CreateCustomerInput) {
  if (input.email) {
    const existing = await findCustomerByEmail(input.email)
    if (existing) {
      return existing
    }
  }
  return createCustomer(input)
}

export type CreditCardData = {
  holderName: string
  number: string
  expiryMonth: string
  expiryYear: string
  ccv: string
}

export type CreditCardHolderInfo = {
  name: string
  email?: string
  cpfCnpj: string
  postalCode: string
  addressNumber: string
  address?: string
  complement?: string
  phone?: string
  mobilePhone?: string
  province?: string
  city?: string
}

type SubscriptionResponse = {
  id: string
  status: string
  nextDueDate?: string
}

export async function createMonthlySubscription(params: {
  customerId: string
  description: string
  creditCard: CreditCardData
  creditCardHolderInfo: CreditCardHolderInfo
}) {
  const today = new Date()
  const nextDueDate = today.toISOString().slice(0, 10)

  return await asaasFetch<SubscriptionResponse>("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      customer: params.customerId,
      billingType: "CREDIT_CARD",
      value: 19.9,
      cycle: "MONTHLY",
      description: params.description,
      nextDueDate,
      creditCard: {
        ...params.creditCard,
        number: params.creditCard.number.replace(/\s+/g, ""),
      },
      creditCardHolderInfo: {
        ...params.creditCardHolderInfo,
        cpfCnpj: sanitizeDocument(params.creditCardHolderInfo.cpfCnpj),
        postalCode: sanitizeDocument(params.creditCardHolderInfo.postalCode),
        phone: params.creditCardHolderInfo.phone
          ? sanitizePhone(params.creditCardHolderInfo.phone)
          : undefined,
        mobilePhone: params.creditCardHolderInfo.mobilePhone
          ? sanitizePhone(params.creditCardHolderInfo.mobilePhone)
          : undefined,
      },
    }),
  })
}

type LeanPaymentResponse = {
  id: string
  status: string
  bankSlipUrl?: string
  bankSlipDigitableLine?: string
  invoiceUrl?: string
}

export async function createLeanPayment(params: {
  customerId: string
  billingType: "PIX" | "BOLETO" | "CREDIT_CARD"
  description: string
  value: number
  dueDate: string
  installmentCount?: number
  installmentValue?: number
  creditCard?: CreditCardData
  creditCardHolderInfo?: CreditCardHolderInfo
}) {
  return await asaasFetch<LeanPaymentResponse>("/lean/payments", {
    method: "POST",
    body: JSON.stringify({
      customer: params.customerId,
      billingType: params.billingType,
      value: params.value,
      description: params.description,
      dueDate: params.dueDate,
      installmentCount: params.installmentCount,
      installmentValue: params.installmentValue,
      creditCard: params.creditCard
        ? {
            ...params.creditCard,
            number: params.creditCard.number.replace(/\s+/g, ""),
          }
        : undefined,
      creditCardHolderInfo: params.creditCardHolderInfo
        ? {
            ...params.creditCardHolderInfo,
            cpfCnpj: sanitizeDocument(params.creditCardHolderInfo.cpfCnpj),
            postalCode: sanitizeDocument(params.creditCardHolderInfo.postalCode),
            phone: params.creditCardHolderInfo.phone
              ? sanitizePhone(params.creditCardHolderInfo.phone)
              : undefined,
            mobilePhone: params.creditCardHolderInfo.mobilePhone
              ? sanitizePhone(params.creditCardHolderInfo.mobilePhone)
              : undefined,
          }
        : undefined,
    }),
  })
}

type PixQrCodeResponse = {
  encodedImage: string
  payload: string
  expirationDate: string
}

export async function getPixQrCode(paymentId: string) {
  return await asaasFetch<PixQrCodeResponse>(`/payments/${paymentId}/pixQrCode`, {
    method: "GET",
  })
}


