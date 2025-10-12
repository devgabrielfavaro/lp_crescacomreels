import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="glass-effect mt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Image 
            src="/logo_desafio_cresca_com_reels.png" 
            alt="Logo" 
            width={32} 
            height={32}
            className="h-8 w-8" 
          />
          <span className="font-semibold gradient-text">Desafio Cresça com Reels</span>
        </div>
        <p className="text-gray-400 text-sm">© 2025 Desafio Cresça com Reels. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}


