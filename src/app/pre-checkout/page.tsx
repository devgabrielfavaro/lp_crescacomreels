import PreCheckoutClient from './precheckout-client'

export default function PreCheckoutPage({
  searchParams,
}: {
  searchParams: { plan?: string; checkout?: string }
}) {
  const planParam = searchParams?.plan === 'annual' ? 'annual' : 'monthly'
  const checkout = searchParams?.checkout ?? ''
  return <PreCheckoutClient planType={planParam} checkoutUrl={checkout} />
}



