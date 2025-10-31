import PreCheckoutClient from './precheckout-client'

export default async function PreCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; checkout?: string; fbclid?: string }>
}) {
  const params = await searchParams
  const planParam = params?.plan === 'annual' ? 'annual' : 'monthly'
  const checkout = params?.checkout ?? ''
  const fbclid = params?.fbclid ?? ''
  return <PreCheckoutClient planType={planParam} checkoutUrl={checkout} fbclid={fbclid} />
}



