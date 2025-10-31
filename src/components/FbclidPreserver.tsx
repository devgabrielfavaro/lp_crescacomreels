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
      if (typeof window !== 'undefined' && 'dataLayer' in window && Array.isArray((window as { dataLayer?: unknown[] }).dataLayer)) {
        (window as { dataLayer: Array<{ event: string; fbclid: string }> }).dataLayer.push({
          event: 'fbclid_captured',
          fbclid: fbclid
        })
      }
    }
  }, [searchParams])
  
  return null
}

