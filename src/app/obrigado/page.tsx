import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obrigado pela sua compra | Cresca com Reels',
  description: 'Obrigado por confiar no Cresca com Reels. Acesse a plataforma e comece agora mesmo.',
}

export default function ObrigadoPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 -z-10">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto text-center space-y-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
          Obrigado por sua compra!
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Seu acesso ao Cresça com Reels está liberado. Clique abaixo para entrar na plataforma e iniciar o seu crescimento.
        </p>
        <div className="flex justify-center">
          <a
            href="https://crescacomreels.com.br"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-full font-bold text-lg text-white transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-pink-500/50"
          >
            ACESSAR A PLATAFORMA
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </a>
        </div>
      </div>
    </div>
  )
}

