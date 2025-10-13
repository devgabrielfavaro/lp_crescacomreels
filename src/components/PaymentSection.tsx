'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type PaymentPlan = 'monthly' | 'annual'
type PaymentMethod = 'monthly_card' | 'annual_card' | 'annual_pix'

type FormState = {
  plan: PaymentPlan
  paymentMethod: PaymentMethod
  name: string
  email: string
  cpfCnpj: string
  mobilePhone: string
  postalCode: string
  address: string
  addressNumber: string
  complement: string
  province: string
  city: string
  creditCardHolderName: string
  creditCardNumber: string
  creditCardExpiry: string
  creditCardCvv: string
}

type ViaCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

type StatusState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; message: string; boletoUrl?: string; qrCode?: { encodedImage: string; payload: string } }
  | { type: 'error'; message: string }

const INITIAL_FORM: FormState = {
  plan: 'monthly',
  paymentMethod: 'monthly_card',
  name: '',
  email: '',
  cpfCnpj: '',
  mobilePhone: '',
  postalCode: '',
  address: '',
  addressNumber: '',
  complement: '',
  province: '',
  city: '',
  creditCardHolderName: '',
  creditCardNumber: '',
  creditCardExpiry: '',
  creditCardCvv: '',
}

const PLAN_DETAILS: Record<PaymentPlan, { title: string; description: string; value: number }> = {
  monthly: {
    title: 'Assinatura mensal',
    description: 'Renova automaticamente todo mês. Cancele quando quiser.',
    value: 19.9,
  },
  annual: {
    title: 'Assinatura anual',
    description: 'R$ 118,80 dividido em 12x sem juros no cartão de crédito.',
    value: 9.9,
  },
}

const METHOD_LABELS: Record<PaymentMethod, string> = {
  monthly_card: 'Cartão de crédito',
  annual_card: 'Cartão em 12x',
  annual_pix: 'Pix à vista',
}

const METHOD_DESCRIPTIONS: Record<PaymentMethod, string> = {
  monthly_card: 'Renova mensalmente. Você pode cancelar quando quiser.',
  annual_card: '12x de R$ 9,90 no cartão de crédito.',
  annual_pix: 'Liberação imediata após confirmação do pagamento.',
}

const AVAILABLE_METHODS: Record<PaymentPlan, PaymentMethod[]> = {
  monthly: ['monthly_card'],
  annual: ['annual_card', 'annual_pix'],
}

function getPlanFromHash(hash: string): PaymentPlan | null {
  if (!hash.startsWith('#checkout')) {
    return null
  }

  const [, queryString] = hash.split('?')

  if (!queryString) {
    return null
  }

  const params = new URLSearchParams(queryString)
  const planParam = params.get('plan')

  if (planParam === 'annual' || planParam === 'monthly') {
    return planParam
  }

  return null
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function requiresCard(method: PaymentMethod) {
  return method === 'monthly_card' || method === 'annual_card'
}

export default function PaymentSection() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window !== 'undefined') {
      const planFromHash = getPlanFromHash(window.location.hash)

      if (planFromHash) {
        return {
          ...INITIAL_FORM,
          plan: planFromHash,
          paymentMethod: AVAILABLE_METHODS[planFromHash][0],
        }
      }
    }

    return { ...INITIAL_FORM }
  })
  const [status, setStatus] = useState<StatusState>({ type: 'idle' })
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [cepError, setCepError] = useState<string | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastConsultedCepRef = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const applyPlan = (plan: PaymentPlan) => {
      setForm((previous) => {
        const defaultMethod = AVAILABLE_METHODS[plan][0]

        if (previous.plan === plan && previous.paymentMethod === defaultMethod) {
          return previous
        }

        return {
          ...previous,
          plan,
          paymentMethod: defaultMethod,
        }
      })
    }

    const syncPlanFromHash = () => {
      const planFromHash = getPlanFromHash(window.location.hash)

      if (planFromHash) {
        applyPlan(planFromHash)
      }
    }

    const handleSelectPlan = (event: Event) => {
      const customEvent = event as CustomEvent<{ plan?: PaymentPlan }>
      const plan = customEvent.detail?.plan

      if (plan && AVAILABLE_METHODS[plan]) {
        applyPlan(plan)
      }
    }

    syncPlanFromHash()
    window.addEventListener('hashchange', syncPlanFromHash)
    window.addEventListener('selectPlan', handleSelectPlan as EventListener)

    return () => {
      window.removeEventListener('hashchange', syncPlanFromHash)
      window.removeEventListener('selectPlan', handleSelectPlan as EventListener)
    }
  }, [])

  // Effect para consultar CEP automaticamente com debounce
  useEffect(() => {
    const cleanCep = form.postalCode.replace(/\D/g, '')
    
    // Limpa timer anterior se existir
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Só consulta se o CEP tem 8 dígitos e não foi consultado recentemente
    if (cleanCep.length === 8 && cleanCep !== lastConsultedCepRef.current) {
      debounceTimerRef.current = setTimeout(() => {
        lastConsultedCepRef.current = cleanCep
        fetchAddressByCep(cleanCep)
      }, 500) // Debounce de 500ms
    } else if (cleanCep.length > 0 && cleanCep.length < 8) {
      // Limpa erro se CEP está sendo digitado mas ainda não tem 8 dígitos
      setCepError(null)
    }

    // Cleanup do timer
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [form.postalCode])

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setForm((previous) => {
      if (field === 'plan') {
        const plan = value as PaymentPlan
        return {
          ...previous,
          plan,
          paymentMethod: AVAILABLE_METHODS[plan][0],
        }
      }

      if (field === 'paymentMethod') {
        return {
          ...previous,
          paymentMethod: value as PaymentMethod,
        }
      }

      if (field === 'creditCardNumber') {
        const digits = value.replace(/\D/g, '').slice(0, 16)
        const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ')
        return { ...previous, creditCardNumber: formatted }
      }

      if (field === 'creditCardExpiry') {
        const digits = value.replace(/\D/g, '').slice(0, 4)
        const formatted = digits.replace(/(\d{2})(?=\d)/g, '$1/')
        return { ...previous, creditCardExpiry: formatted }
      }

      if (field === 'creditCardCvv') {
        const digits = value.replace(/\D/g, '').slice(0, 4)
        return { ...previous, creditCardCvv: digits }
      }

      if (field === 'cpfCnpj') {
        const digits = value.replace(/\D/g, '').slice(0, 14)
        return { ...previous, cpfCnpj: digits }
      }

      if (field === 'mobilePhone') {
        const digits = value.replace(/\D/g, '').slice(0, 11)
        return { ...previous, mobilePhone: digits }
      }

      if (field === 'postalCode') {
        const digits = value.replace(/\D/g, '').slice(0, 8)
        return { ...previous, postalCode: digits }
      }

      return { ...previous, [field]: value }
    })
  }

  const isLoading = status.type === 'loading'
  const isCardPayment = requiresCard(form.paymentMethod)

  // Função para consultar CEP na API ViaCEP
  const fetchAddressByCep = async (cep: string) => {
    setIsLoadingCep(true)
    setCepError(null)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data: ViaCepResponse = await response.json()

      if (data.erro) {
        setCepError('CEP não encontrado')
        return
      }

      // Preenche automaticamente os campos de endereço
      setForm(prev => ({
        ...prev,
        address: data.logradouro || '',
        city: data.localidade || '',
        province: data.uf || '',
        complement: data.complemento || prev.complement, // Mantém o complemento existente se houver
      }))

    } catch {
      setCepError('Erro ao consultar CEP. Tente novamente.')
    } finally {
      setIsLoadingCep(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ type: 'loading' })

    try {
      const [expiryMonth = '', expiryYear = ''] = form.creditCardExpiry.split('/')

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: form.plan,
          paymentMethod: form.paymentMethod,
          customer: {
            name: form.name,
            email: form.email,
            cpfCnpj: form.cpfCnpj,
            mobilePhone: form.mobilePhone,
            postalCode: form.postalCode,
            address: form.address,
            addressNumber: form.addressNumber,
            complement: form.complement,
            province: form.province,
            city: form.city,
          },
          creditCard: isCardPayment
            ? {
                holderName: form.creditCardHolderName,
                number: form.creditCardNumber,
                expiryMonth,
                expiryYear,
                ccv: form.creditCardCvv,
              }
            : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível processar o pagamento.')
      }

      if (data.type === 'boleto') {
        setStatus({
          type: 'success',
          message: 'Boleto gerado com sucesso! Clique abaixo para baixar.',
          boletoUrl: data.payment.bankSlipUrl,
        })
        return
      }

      if (data.type === 'pix') {
        setStatus({
          type: 'success',
          message: 'QR Code gerado! Escaneie ou copie o código Pix para concluir o pagamento.',
          qrCode: data.qrCode,
        })
        return
      }

      router.push('/obrigado')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro inesperado ao processar o pagamento.'
      setStatus({ type: 'error', message })
    }
  }

  return (
    <section id="checkout" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full text-sm font-semibold mb-4">
            GARANTA SEU ACESSO
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Escolha seu <span className="gradient-text">plano ideal</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Preencha seus dados em segundos e comece a receber ideias de Reels personalizadas ainda hoje.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-3xl p-8 sm:p-10 space-y-8">
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-6">
                <p className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Selecione o plano</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(Object.keys(PLAN_DETAILS) as PaymentPlan[]).map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() =>
                        setForm((previous) => ({
                          ...previous,
                          plan,
                          paymentMethod: AVAILABLE_METHODS[plan][0],
                        }))
                      }
                      className={`rounded-2xl border p-4 text-left transition-all duration-300 relative ${
                        form.plan === plan
                          ? 'border-pink-500/70 bg-gradient-to-r from-pink-500/10 to-orange-500/10'
                          : 'border-white/10 hover:border-pink-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">{PLAN_DETAILS[plan].title}</span>
                        <span className="text-sm text-pink-300">{formatCurrency(PLAN_DETAILS[plan].value)}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{PLAN_DETAILS[plan].description}</p>
                      
                      {/* Selo de desconto para plano anual */}
                      {plan === 'annual' && (
                        <div className="absolute -bottom-3 -right-4 w-14 h-14">
                          <img 
                            src="/desconto-49.svg" 
                            alt="49% de desconto" 
                            className="w-full h-full object-contain drop-shadow-lg"
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 space-y-3">
                <p className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Forma de pagamento</p>
                {AVAILABLE_METHODS[form.plan].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setForm((previous) => ({ ...previous, paymentMethod: method }))}
                    className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                      form.paymentMethod === method
                        ? 'border-pink-500/70 bg-gradient-to-r from-pink-500/10 to-orange-500/10'
                        : 'border-white/10 hover:border-pink-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {method === 'annual_pix' ? (
                            <img 
                              src="/logo_pix.png" 
                              alt="Pix" 
                              className="w-10 h-10 object-contain"
                            />
                          ) : (
                            <img 
                              src="/cartao-de-credito.png" 
                              alt="Cartão de Crédito" 
                              className="w-6 h-6 object-contain"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-base font-semibold text-white">{METHOD_LABELS[method]}</p>
                          <p className="text-xs text-gray-400">{METHOD_DESCRIPTIONS[method]}</p>
                        </div>
                      </div>
                      {method === 'annual_card' && (
                        <span className="text-xs font-semibold text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full">
                          preferido
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="hidden lg:block glass-card rounded-3xl p-6 space-y-3 text-sm text-gray-300">
                <h3 className="text-xl font-semibold text-white">Pagamento seguro</h3>
                <p>Transações realizadas via Asaas, plataforma líder em pagamentos no Brasil.</p>
                <p>Dados criptografados com certificados SSL e compatíveis com PCI.</p>
                <p>Suporte humano em horário comercial para qualquer dúvida.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 sm:p-10 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-white">Dados do comprador</h3>
              <p className="text-sm text-gray-400">
                Campos obrigatórios para ativar sua assinatura com segurança.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-300">Nome completo *</label>
                <input
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Como aparece no documento"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">CPF *</label>
                <input
                  required
                  value={form.cpfCnpj}
                  onChange={handleChange('cpfCnpj')}
                  placeholder="Somente números"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Telefone (WhatsApp)</label>
                <input
                  value={form.mobilePhone}
                  onChange={handleChange('mobilePhone')}
                  placeholder="DDD + número"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-300">E-mail *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="nome@exemplo.com"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">CEP *</label>
                <div className="relative">
                  <input
                    required
                    value={form.postalCode}
                    onChange={handleChange('postalCode')}
                    placeholder="Digite seu CEP"
                    className={`mt-1 w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40 pr-10 ${
                      cepError ? 'border-red-500/70' : 'border-white/10 focus:border-pink-500'
                    }`}
                  />
                  {isLoadingCep && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-pink-500 border-t-transparent"></div>
                    </div>
                  )}
                </div>
                {cepError && (
                  <p className="mt-1 text-xs text-red-400">{cepError}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-300">Endereço *</label>
                <input
                  required
                  value={form.address}
                  onChange={handleChange('address')}
                  placeholder="Rua, avenida, etc."
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Número *</label>
                <input
                  required
                  value={form.addressNumber}
                  onChange={handleChange('addressNumber')}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Complemento</label>
                <input
                  value={form.complement}
                  onChange={handleChange('complement')}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Cidade *</label>
                <input
                  required
                  value={form.city}
                  onChange={handleChange('city')}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Estado (UF) *</label>
                <input
                  required
                  maxLength={2}
                  value={form.province}
                  onChange={(event) =>
                    setForm((previous) => ({ ...previous, province: event.target.value.toUpperCase().slice(0, 2) }))
                  }
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm uppercase text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>
            </div>

            {isCardPayment && (
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white">Dados do cartão</h3>
                  <span className="text-xs text-gray-400">Ambiente 100% seguro</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-300">Nome impresso no cartão *</label>
                    <input
                      required
                      value={form.creditCardHolderName}
                      onChange={handleChange('creditCardHolderName')}
                      className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-300">Número do cartão *</label>
                    <input
                      required
                      inputMode="numeric"
                      value={form.creditCardNumber}
                      onChange={handleChange('creditCardNumber')}
                      className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white tracking-widest focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-300">Validade (MM/AA) *</label>
                    <input
                      required
                      inputMode="numeric"
                      value={form.creditCardExpiry}
                      onChange={handleChange('creditCardExpiry')}
                      className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-300">CVV *</label>
                    <input
                      required
                      inputMode="numeric"
                      value={form.creditCardCvv}
                      onChange={handleChange('creditCardCvv')}
                      className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    />
                  </div>
                </div>
              </div>
            )}

            {status.type === 'error' && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {status.message}
              </div>
            )}

            {status.type === 'success' && (
              <div className="space-y-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-100">
                <p>{status.message}</p>
                {status.boletoUrl && (
                  <a
                    href={status.boletoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 px-5 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
                  >
                    Baixar boleto
                  </a>
                )}
                {status.qrCode && (
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <img
                      src={`data:image/png;base64,${status.qrCode.encodedImage}`}
                      alt="QR Code Pix"
                      className="w-40 h-40 rounded-xl border border-white/10 bg-white/5"
                    />
                    <div className="flex-1 space-y-2">
                      <p className="text-xs text-gray-200">Prefere copiar e colar? Use o código Pix abaixo:</p>
                      <div className="rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-xs text-gray-100 break-all">
                        {status.qrCode.payload}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 px-6 py-4 text-lg font-bold text-white shadow-2xl shadow-pink-500/30 transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Processando pagamento...' : 'Finalizar assinatura'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Ao finalizar, você concorda com os termos de uso e política de privacidade. Enviamos o recibo e instruções de acesso imediatamente.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}



