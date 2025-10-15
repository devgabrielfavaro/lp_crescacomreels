import React from 'react'

export default function ForWho() {
  const personas = [
    { icon: '👔', text: 'Empreendedores e Donos de Negócios Locais' },
    { icon: '⭐', text: 'Criadores de Conteúdo e Influenciadores' },
    { icon: '⚕️', text: 'Profissionais Liberais (Advogados, Médicos, Terapeutas, etc.)' },
    { icon: '📱', text: 'Social Medias e Agências de Marketing' },
    { icon: '🛍️', text: 'Lojistas e Vendedores de E-commerce' },
    { icon: '🌟', text: 'Qualquer pessoa que queira usar o Instagram para crescer sua marca' }
  ]

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            O Desafio Cresça com Reels é{' '}
            <span className="gradient-text">perfeito para</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300 text-center"
            >
              <div className="text-5xl mb-4">{persona.icon}</div>
              <p className="text-gray-200 font-medium leading-relaxed">{persona.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


