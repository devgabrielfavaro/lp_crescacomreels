"use client"

import React, { useState, useRef } from 'react'

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const [showSoundButton, setShowSoundButton] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const toggleMute = () => {
    if (iframeRef.current) {
      const newMuteState = !isMuted
      setIsMuted(newMuteState)
      setShowSoundButton(false) // Esconde o botão após o clique
      
      // Envia comandos para o iframe do YouTube
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [0, true] // Volta para o início (0 segundos)
        }),
        '*'
      )
      
      // Desmuta o vídeo
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'unMute'
        }),
        '*'
      )
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Vídeo do lado esquerdo */}
          <div className="order-1 lg:order-1 animate-fade-in-left">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                ref={iframeRef}
                width="560"
                height="315"
                src="https://www.youtube.com/embed/2wbT77Kec5c?si=5X3QyD2JP0AkoZbH&controls=0&autoplay=1&mute=1&enablejsapi=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              
              {/* Botão de controle de áudio personalizado - Centralizado */}
              {showSoundButton && (
                <button
                  onClick={toggleMute}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-all duration-300 backdrop-blur-sm group"
                  aria-label="Clique para ativar o som"
                >
                  <div className="bg-white/20 rounded-full p-6 mb-4 group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.79L5.617 14H3a1 1 0 01-1-1V7a1 1 0 011-1h2.617l2.766-2.79a1 1 0 011-.134zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold">Clique para ativar o som</span>
                </button>
              )}
            </div>
          </div>

          {/* Texto do lado direito */}
          <div className="order-2 lg:order-2 text-center lg:text-left animate-fade-in-right">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                Destrave seu crescimento no Instagram com{' '}
                <span className="gradient-text">ideias de Reels virais</span>, todos os dias.
              </h1>
            </div>
            
            <div className="mb-8">
              <h2 className="text-base sm:text-lg lg:text-xl text-gray-300 font-light leading-relaxed">
                Receba todos os dias um conteúdo, 100% personalizado para o seu nicho, e transforme seus Reels em uma máquina de crescimento. Chega de bloqueio criativo.
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#pricing" 
                className="group relative px-6 py-3 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-full font-bold text-base hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 w-full sm:w-auto"
              >
                QUERO CRESCER COM REELS AGORA
                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Terceiro container centralizado - Garantias */}
        <div className="mt-12 flex justify-center animate-fade-in">
          <div className="glass-card rounded-3xl p-6 max-w-2xl">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Cancele quando quiser • 7 dias de garantia • Pagamento seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


