import React from 'react'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Personalize sua Experiência',
      description: 'Ao se cadastrar, você nos informa seu nicho de atuação e descreve seu negócio. É rápido e define a base para todo o conteúdo que você receberá.'
    },
    {
      number: '02',
      title: 'Receba seu Plano Diário',
      description: 'Todos os dias, nossa plataforma gera uma ideia de conteúdo completa e 100% adaptada para você, com tudo o que precisa para criar seu Reel.'
    },
    {
      number: '03',
      title: 'Crie, Poste e Cresça',
      description: 'Use as ideias, grave seu vídeo e poste no Instagram. Assista seu engajamento, alcance e número de seguidores aumentarem com consistência.'
    }
  ]

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Seu próximo Reel viral está a{' '}
            <span className="gradient-text">3 passos de distância</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="glass-card rounded-2xl p-10 hover:scale-102 transition-transform duration-300 h-full relative">
              <div className="absolute -top-5 right-8">
                <div className="rounded-2xl px-5 py-2 bg-gradient-to-br from-pink-500 via-orange-500 to-yellow-500 text-white font-semibold text-lg">
                  {step.number}
                </div>
              </div>
              <div className="space-y-4 text-left">
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


