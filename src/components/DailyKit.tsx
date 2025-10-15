import React from 'react'

export default function DailyKit() {
  const items = [
    {
      title: 'Gancho Magnético',
      description: 'Uma frase de impacto inicial, testada para prender a atenção do seu público nos primeiros 3 segundos cruciais.',
      icon: '🪝'
    },
    {
      title: 'Legenda Estratégica',
      description: 'Um texto pronto para você adaptar, focado em gerar conexão, salvar posts, comentários e direcionar seus seguidores para a ação.',
      icon: '✍️'
    },
    {
      title: 'Música em Alta',
      description: 'O link direto para o áudio que o Instagram está impulsionando no momento, para aumentar seu alcance orgânico.',
      icon: '🎵'
    },
    {
      title: 'Dica Bônus de Expert',
      description: 'Um segredo ou ajuste fino para otimizar ainda mais seu Reel, seja na edição, na gravação ou na estratégia.',
      icon: '💡'
    },
    {
      title: 'Exemplo de Referência',
      description: 'Um vídeo de exemplo para você visualizar a ideia em ação e se inspirar, eliminando qualquer dúvida sobre como executar.',
      icon: '🎬'
    }
  ]

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-900/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full text-sm font-semibold mb-4">
            O QUE VOCÊ RECEBE
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Seu <span className="gradient-text">Kit Diário</span> para Viralizar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


