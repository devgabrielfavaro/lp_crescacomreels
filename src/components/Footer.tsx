import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
        
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Link 
            href="/politica-de-privacidade" 
            className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
          >
            Política de Privacidade
          </Link>
          <span className="text-gray-600">|</span>
          <Link 
            href="/termos-de-uso" 
            className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
          >
            Termos de Uso
          </Link>
        </div>
        
        <p className="text-gray-400 text-sm">© 2025 Desafio Cresça com Reels. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}


