import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import HowItWorks from '@/components/HowItWorks'
import DailyKit from '@/components/DailyKit'
import Differentials from '@/components/Differentials'
import Pricing from '@/components/Pricing'
import ForWho from '@/components/ForWho'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import PaymentSection from '@/components/PaymentSection'

export default function Home() {
  return (
    <>
      <Header />

      {/* Main Content */}
      <main className="pt-16 sm:pt-8">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <DailyKit />
        <Differentials />
        <Pricing />
        <ForWho />
        <FAQ />
        <PaymentSection />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
