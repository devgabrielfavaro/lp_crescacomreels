import React from 'react'

export default function Differentials() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            O Fim do <span className="gradient-text">Conteúdo Genérico</span>
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12">
          <div className="mb-6 sm:mb-8">
            <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed text-center">
              Esqueça as dicas que servem para todo mundo e ao mesmo tempo para ninguém. 
              Nossa inteligência analisa as informações do seu negócio para criar sugestões 
              que falam a língua da sua audiência e se conectam com os seus produtos ou serviços.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-3xl">
                  🔄
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3">
                  <span className="gradient-text">Mudou de estratégia ou de nicho?</span>
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Sem problemas! Acesse suas configurações e atualize suas informações a qualquer 
                  momento para que a plataforma se adapte instantaneamente à sua nova fase.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm font-semibold text-gray-300">100% Personalizado</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-gray-300">Atualização Instantânea</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-3xl mb-2">🧠</div>
              <div className="text-sm font-semibold text-gray-300">Inteligência Adaptável</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


