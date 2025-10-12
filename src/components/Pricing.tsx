import React from 'react'

export default function Pricing() {
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
      highlight: true
    },
    {
      id: 'monthly',
      title: 'Plano Mensal',
      price: 'R$ 19,90',
      billing: '/mês',
      note: 'Menos de R$ 0,67 por dia. Pagamento mês a mês, cancele quando quiser.',
      cta: 'QUERO O PLANO MENSAL'
    }
  ]

  const guarantees = [
    { icon: '🔓', text: 'Cancele quando quiser: Sem burocracia ou fidelidade.' },
    { icon: '✅', text: '7 Dias de Garantia: Se não amar, peça seu dinheiro de volta. Simples assim.' },
    { icon: '🔒', text: 'Pagamento Seguro: Pague com Pix, Cartão de Crédito ou Boleto em um ambiente 100% seguro.' }
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Comece a crescer hoje por menos de{' '}
            <span className="gradient-text">R$0,70 por dia</span>
          </h2>
          <p className="text-lg text-gray-300">
            Escolha o plano ideal e comece a receber ideias certeiras todos os dias.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden border ${
                plan.highlight ? 'border-pink-500/40 shadow-2xl shadow-pink-500/20' : 'border-white/5'
              }`}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl -z-10"></div>

              {plan.badge && (
                <span className="inline-block px-4 py-1 bg-gradient-to-r from-pink-500 to-orange-500 text-xs font-semibold uppercase tracking-widest text-white rounded-full mb-6">
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

              <a
                href="#checkout"
                className={`block w-full py-4 rounded-full font-bold text-lg text-center transition-transform duration-300 hover:scale-105 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 shadow-2xl hover:shadow-pink-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12 mt-10 border border-white/5">
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
    </section>
  )
}

