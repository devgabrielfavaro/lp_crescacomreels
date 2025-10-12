import React from 'react'

export default function FinalCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Decorative gradient blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-500/30 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-orange-500/30 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Sua jornada para o crescimento no Instagram{' '}
              <span className="gradient-text">começa agora</span>
            </h2>
            
            <p className="text-xl text-gray-200 leading-relaxed mb-8 max-w-3xl mx-auto">
              Chega de esperar a inspiração chegar. Com o <span className="font-bold gradient-text">Desafio Cresça com Reels</span>, 
              você terá um plano de ação diário para transformar seu perfil em uma referência no seu nicho. 
              O próximo viral pode ser seu.
            </p>

            <a 
              href="#pricing" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
            >
              SIM, EU QUERO CRESCER NO INSTAGRAM POR R$19,90
            </a>

            <div className="mt-8 flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Garantia de 7 dias • Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


