"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PreCheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();
  const planType = (params.get("plan") === "annual" ? "annual" : "monthly") as
    | "annual"
    | "monthly";
  const checkoutUrl = params.get("checkout") || "";

  const planInfo = {
    annual: {
      title: "Plano Anual",
      price: "R$ 9,90/mês",
      description: "Cobrança anual única de R$ 118,80",
    },
    monthly: {
      title: "Plano Mensal",
      price: "R$ 19,90/mês",
      description: "Assinatura mensal",
    },
  } as const;

  const currentPlan = planInfo[planType];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  useEffect(() => {
    if (!checkoutUrl) {
      router.push("/#pricing");
    }
  }, [checkoutUrl, router]);

  function formatPhoneNumber(value: string) {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneValue(formatPhoneNumber(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("https://mautic.syonlogic.com/form/submit?formId=2", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      setIsSuccess(true);
      window.location.href = checkoutUrl;
    } catch (error) {
      alert("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 -z-10"></div>

      <div className="w-full max-w-md mx-auto">
        <div className="glass-card rounded-3xl p-8 text-center">
          {!isSuccess ? (
            <>
              <h1 className="text-3xl font-bold mb-4">
                Quase lá! <span className="gradient-text">Complete seu cadastro</span>
              </h1>
              <p className="text-gray-300 mb-6">
                Você está prestes a adquirir o <strong>{currentPlan.title}</strong> por
                {" "}
                <strong>{currentPlan.price}</strong>
              </p>
              <p className="text-sm text-gray-400 mb-8">{currentPlan.description}</p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="nome" className="block text-gray-200 font-semibold mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="mauticform[nome]"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-200 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="mauticform[email]"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Digite seu melhor email"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-gray-200 font-semibold mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="mauticform[telefone]"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                  />
                </div>

                <input type="hidden" name="mauticform[formId]" value="2" />
                <input type="hidden" name="mauticform[return]" value="" />
                <input type="hidden" name="mauticform[formName]" value="precheckoutform" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-xl font-bold text-lg text-white hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? "Enviando..." : `CONFIRMAR ${currentPlan.title.toUpperCase()}`}
                </button>
              </form>
            </>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Cadastro realizado!</h3>
              <p className="text-gray-300 mb-4">Redirecionando para o checkout...</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full animate-pulse"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


