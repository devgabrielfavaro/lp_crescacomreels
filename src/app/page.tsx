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
    <div className="min-h-screen overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 -z-10">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <Header />

      {/* Main Content */}
      <main className="pt-20">
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
    </div>
  )
}
