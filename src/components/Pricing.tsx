'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Pricing() {
  const router = useRouter()
  
  // URLs dos planos vindas das variáveis de ambiente
  const annualUrl = process.env.NEXT_PUBLIC_PAYMENT_URL_ANNUAL || ''
  const monthlyUrl = process.env.NEXT_PUBLIC_PAYMENT_URL_MONTHLY || ''
  const handlePlanClick = (planType: 'annual' | 'monthly', url: string) => {
    // Recupera o fbclid do localStorage
    const fbclid = typeof window !== 'undefined' ? localStorage.getItem('fbclid') : null
    
    // Constrói a URL com fbclid se existir
    let checkoutUrl = `/pre-checkout?plan=${planType}&checkout=${encodeURIComponent(url)}`
    if (fbclid) {
      checkoutUrl += `&fbclid=${encodeURIComponent(fbclid)}`
    }
    
    router.push(checkoutUrl)
  }

  const features = [
    'Acesso Ilimitado à Plataforma',
    'Ideias de Conteúdo Personalizadas Diariamente',
    'Ganchos, Legendas, Músicas e Dicas',
    'Atualização de Nicho a Qualquer Momento'
  ]

  const plans = [
    {
      id: 'annual',
      badge: 'Menos de R$ 0,33 por dia',
      title: 'Plano Anual',
      price: 'R$ 9,90',
      billing: '/mês',
      note: 'Cobrança anual única de R$ 118,80. Economize escolhendo o plano anual.',
      cta: 'QUERO O PLANO ANUAL',
      highlight: true,
      link: annualUrl
    },
    {
      id: 'monthly',
      badge: 'Menos de R$ 0,67 por dia',
      title: 'Plano Mensal',
      price: 'R$ 19,90',
      billing: '/mês',
      note: 'Assinatura mensal, com possibilidade de cancelar quando quiser.',
      cta: 'QUERO O PLANO MENSAL',
      link: monthlyUrl
    }
  ]

  const guarantees = [
    { icon: '🔓', text: 'Cancele quando quiser: Sem burocracia ou fidelidade.' },
    { icon: '✅', text: '7 Dias de Garantia: Se não amar, peça seu dinheiro de volta. Simples assim.' },
    { icon: '🔒', text: 'Pagamento Seguro: Pague com Pix ou Cartão de Crédito em um ambiente 100% seguro.' }
  ]

  return (
    <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Comece a crescer hoje por menos de{' '}
            <span className="gradient-text">R$0,33 por dia</span>
          </h2>
          <p className="text-lg text-gray-300">
            Escolha o plano ideal e comece a receber ideias certeiras todos os dias.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-card rounded-3xl p-8 sm:p-10 relative border ${
                plan.highlight ? 'border-pink-500/40 shadow-2xl shadow-pink-500/20' : 'border-white/5'
              }`}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl -z-10"></div>
              
              {/* Ícone de desconto para o plano anual */}
              {plan.highlight && (
                <div className="absolute sm:-top-6 sm:-right-6 -top-8 -right-4">
                  <Image 
                    src="/desconto-49.svg" 
                    alt="49% de desconto" 
                    width={120}
                    height={120}
                    className="w-18 h-18 sm:w-20 sm:h-20"
                  />
                </div>
              )}

              {plan.badge && (
                <span className={`inline-block px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white rounded-full mb-6 ${
                  plan.highlight 
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500' 
                    : 'bg-white/10'
                }`}>
                  {plan.badge}
                </span>
              )}

              <h3 className="text-2xl font-semibold text-gray-200 mb-2">{plan.title}</h3>

              <div className="flex items-end space-x-2 mb-6">
                <span className="text-5xl sm:text-6xl font-bold gradient-text">{plan.price}</span>
                <span className="text-gray-300 text-xl mb-2">{plan.billing}</span>
              </div>

              <p className="text-gray-300 mb-8">{plan.note}</p>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-200 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePlanClick(plan.id as 'annual' | 'monthly', plan.link)}
                className={`block w-full py-4 rounded-full font-bold text-lg text-center transition-transform duration-300 hover:scale-105 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 shadow-2xl hover:shadow-pink-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12 mt-8 sm:mt-10 border border-white/5">
          <div className="space-y-4 md:flex md:items-start md:space-x-6 md:space-y-0">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-start space-x-3 md:flex-1">
                <span className="text-2xl flex-shrink-0">{guarantee.icon}</span>
                <p className="text-gray-300 leading-relaxed">{guarantee.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup removido: agora navegamos para /pre-checkout */}
    </section>
  )
}

