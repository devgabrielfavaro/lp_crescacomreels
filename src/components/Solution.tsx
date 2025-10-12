import React from 'react'

export default function Solution() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full text-sm font-semibold mb-4">
              A SOLUÇÃO
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              A ferramenta de conteúdo que{' '}
              <span className="gradient-text">trabalha para você.</span>
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed mb-6">
              Apresentamos o <span className="gradient-text font-bold">Desafio Cresça com Reels</span>, 
              a plataforma que entrega diariamente um plano completo e personalizado para você criar Reels 
              que engajam, conectam e transformam seu perfil.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Nós fazemos o trabalho criativo e estratégico para que você só precise se preocupar em 
              gravar e ver seus números subindo.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">∞</div>
              <div className="text-sm text-gray-400">Ideias Diárias</div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-pink-500 to-orange-500"></div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">100%</div>
              <div className="text-sm text-gray-400">Personalizado</div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-orange-500 to-yellow-500"></div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">0</div>
              <div className="text-sm text-gray-400">Bloqueio Criativo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


