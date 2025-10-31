'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function FbclidPreserver() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Captura o parâmetro fbclid da URL
    const fbclid = searchParams.get('fbclid')
    
    if (fbclid) {
      // Armazena no localStorage para preservar entre navegações
      localStorage.setItem('fbclid', fbclid)
      
      // Também envia para o dataLayer do GTM para tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'fbclid_captured',
          fbclid: fbclid
        })
      }
    }
  }, [searchParams])
  
  return null
}

