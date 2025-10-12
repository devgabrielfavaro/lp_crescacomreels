'use client'

import React, { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'O conteúdo é realmente personalizado?',
      answer: 'Sim! Assim que você descreve seu nicho e seu negócio, nosso sistema usa essas informações para adaptar cada gancho, legenda e dica para a sua realidade, tornando o conteúdo relevante para o seu público.'
    },
    {
      question: 'Como funciona o cancelamento?',
      answer: 'É muito simples. Você pode cancelar sua assinatura a qualquer momento, diretamente na área de configurações da plataforma, sem precisar falar com ninguém. Sem perguntas, sem burocracia.'
    },
    {
      question: 'E a garantia de 7 dias?',
      answer: 'Você tem 7 dias completos para testar a plataforma. Se por qualquer motivo você não ficar satisfeito, basta solicitar o reembolso e nós devolveremos 100% do seu investimento. O risco é todo nosso.'
    },
    {
      question: 'Quais são as formas de pagamento?',
      answer: 'Aceitamos as principais formas de pagamento: Pix, Cartão de Crédito e Boleto Bancário.'
    },
    {
      question: 'Em quanto tempo verei resultados?',
      answer: 'Resultados dependem da sua consistência em aplicar as ideias. No entanto, a plataforma elimina a maior barreira (a falta do que postar), permitindo que você seja consistente desde o primeiro dia e veja seu engajamento e alcance aumentarem significativamente.'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text">Perguntas Frequentes</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              >
                <span className="text-lg font-semibold pr-4">{faq.question}</span>
                <svg 
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


