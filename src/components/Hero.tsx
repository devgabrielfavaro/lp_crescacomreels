import React from 'react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-8 animate-fade-in-down">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Destrave seu crescimento no Instagram com{' '}
            <span className="gradient-text">ideias de Reels virais</span>, todos os dias.
          </h1>
        </div>
        
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed">
            Receba um plano de conteúdo diário, 100% personalizado para o seu nicho, e transforme seus Reels em uma máquina de crescimento. Chega de bloqueio criativo.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <a 
            href="#pricing" 
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 w-full sm:w-auto"
          >
            QUERO CRESCER COM REELS AGORA
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </a>
        </div>

        <div className="mt-16 glass-card rounded-3xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Cancele quando quiser • 7 dias de garantia • Pagamento seguro</span>
          </div>
        </div>
      </div>
    </section>
  )
}


