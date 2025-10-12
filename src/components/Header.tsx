'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-effect py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image 
              src="/logo_desafio_cresca_com_reels.png" 
              alt="Desafio Cresça com Reels" 
              width={64} 
              height={64}
              className="h-16 w-auto"
            />
          </div>
          <a 
            href="#pricing" 
            className="px-6 py-2.5 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            Assinar Agora
          </a>
        </div>
      </div>
    </header>
  )
}


