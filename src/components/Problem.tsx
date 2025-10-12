import React from 'react'

export default function Problem() {
  const problems = [
    {
      title: 'Bloqueio Criativo',
      description: 'Passa horas olhando para a tela sem saber o que postar?',
      icon: '🧠'
    },
    {
      title: 'Falta de Tempo',
      description: 'A correria do dia a dia te impede de criar conteúdo com consistência?',
      icon: '⏰'
    },
    {
      title: 'Incerteza',
      description: 'Não sabe quais músicas, ganchos ou legendas realmente funcionam para o algoritmo?',
      icon: '❓'
    },
    {
      title: 'Falta de Resultados',
      description: 'Você posta, posta, mas seu perfil não cresce e o engajamento é baixo?',
      icon: '📉'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Você se identifica com algum destes <span className="gradient-text">desafios?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl mb-4">{problem.icon}</div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">{problem.title}</h3>
              <p className="text-gray-300 text-lg">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-xl text-gray-200 leading-relaxed">
            Se você respondeu <span className="font-bold text-pink-400">&quot;sim&quot;</span> a qualquer uma dessas perguntas, saiba que a culpa não é sua. 
            Criar conteúdo de valor todos os dias é um desafio real. Mas e se existisse uma forma{' '}
            <span className="gradient-text font-bold">mais fácil, rápida e inteligente</span> de fazer isso?
          </p>
        </div>
      </div>
    </section>
  )
}

