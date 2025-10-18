import React from 'react'
import Link from 'next/link'

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          ← Voltar para a página inicial
        </Link>
        
        <div className="glass-effect p-8 md:p-12 rounded-2xl">
          <h1 className="text-4xl font-bold gradient-text mb-4">Política de Privacidade</h1>
          <p className="text-gray-400 mb-8"><strong>Última atualização:</strong> 18 de outubro de 2025</p>
          
          <div className="prose prose-invert prose-purple max-w-none text-gray-300 space-y-6">
            <p>
              A sua privacidade é fundamental para nós. Esta Política de Privacidade descreve como a <strong>53.955.859 ANNA BEATRIZ SABINO FERRARI</strong>, inscrita no CNPJ sob o nº <strong>53.955.859/0001-10</strong> ("Nós", "Empresa"), controladora dos seus dados, coleta, utiliza, armazena e compartilha suas informações pessoais ao utilizar o site <strong>https://crescacomreels.com.br</strong> ("Site").
            </p>
            
            <p>Esta política foi elaborada em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD) - Lei nº 13.709/2018.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Dados Pessoais que Coletamos</h2>
            <p>Coletamos diferentes tipos de informações para fornecer e melhorar nosso serviço:</p>
            <p><strong>a) Dados de Cadastro e Contato:</strong> Nome, e-mail, telefone, CPF, endereço e segmento de trabalho/profissão.</p>
            <p><strong>b) Dados de Pagamento:</strong> As informações necessárias para o processamento da compra são inseridas diretamente na plataforma do nosso parceiro de pagamentos e não são armazenadas em nossos servidores.</p>
            <p><strong>c) Dados de Navegação e Técnicos:</strong> Endereço IP, tipo de dispositivo, user agent (informações do navegador), páginas visitadas, tempo de permanência, origem do tráfego (referrer) e data/hora dos acessos.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Finalidade e Base Legal para o Tratamento dos Dados</h2>
            <p>Utilizamos seus dados para as seguintes finalidades, com base nas respectivas bases legais da LGPD:</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-700 mt-4">
                <thead>
                  <tr className="bg-purple-900/30">
                    <th className="border border-gray-700 px-4 py-2 text-left">Finalidade</th>
                    <th className="border border-gray-700 px-4 py-2 text-left">Dados Utilizados</th>
                    <th className="border border-gray-700 px-4 py-2 text-left">Base Legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2"><strong>Cadastro e Gerenciamento da Conta</strong></td>
                    <td className="border border-gray-700 px-4 py-2">Nome, e-mail, CPF, telefone, endereço, profissão</td>
                    <td className="border border-gray-700 px-4 py-2">Execução de Contrato</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2"><strong>Processamento de Pagamentos</strong></td>
                    <td className="border border-gray-700 px-4 py-2">Nome, CPF, dados de pagamento</td>
                    <td className="border border-gray-700 px-4 py-2">Execução de Contrato</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2"><strong>Suporte e Atendimento ao Cliente</strong></td>
                    <td className="border border-gray-700 px-4 py-2">Nome, e-mail, telefone</td>
                    <td className="border border-gray-700 px-4 py-2">Execução de Contrato</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2"><strong>Envio de Marketing e Comunicações</strong></td>
                    <td className="border border-gray-700 px-4 py-2">Nome, e-mail, telefone</td>
                    <td className="border border-gray-700 px-4 py-2">Consentimento / Legítimo Interesse</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2"><strong>Análise e Melhoria do Site</strong></td>
                    <td className="border border-gray-700 px-4 py-2">Dados de Navegação (IP, dispositivo, etc.)</td>
                    <td className="border border-gray-700 px-4 py-2">Legítimo Interesse</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2"><strong>Prevenção a Fraudes e Segurança</strong></td>
                    <td className="border border-gray-700 px-4 py-2">IP, dados de cadastro</td>
                    <td className="border border-gray-700 px-4 py-2">Legítimo Interesse</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Compartilhamento de Dados com Terceiros</h2>
            <p>Não vendemos seus dados pessoais. No entanto, compartilhamos informações com parceiros e fornecedores de serviços para viabilizar nossa operação, incluindo:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Processadora de Pagamentos (Asaas):</strong> Para processar as transações de compra de forma segura.</li>
              <li><strong>Ferramentas de Análise (Google Analytics):</strong> Para entender como os usuários interagem com nosso site e melhorar a experiência.</li>
              <li><strong>Ferramentas de Marketing (Meta Pixel, Mautic):</strong> Para gerenciar nossas campanhas de marketing, comunicações por e-mail e segmentar anúncios.</li>
            </ul>
            <p>Estes parceiros são obrigados contratualmente a proteger suas informações e a utilizá-las apenas para as finalidades para as quais foram compartilhadas.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies e Tecnologias de Rastreamento</h2>
            <p>
              Utilizamos cookies e tecnologias similares para coletar dados de navegação. Cookies são pequenos arquivos de texto armazenados no seu navegador que nos ajudam a reconhecer suas preferências, personalizar sua experiência e analisar o tráfego do site. Você pode gerenciar ou desativar os cookies através das configurações do seu navegador.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Segurança dos Dados</h2>
            <p>
              Adotamos medidas de segurança técnicas e administrativas para proteger seus dados pessoais contra acessos não autorizados, perda, alteração ou destruição. Utilizamos criptografia SSL (Secure Socket Layer) em nosso site e controlamos o acesso às informações.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Tempo de Armazenamento dos Dados</h2>
            <p>
              Manteremos seus dados pessoais armazenados somente pelo tempo necessário para cumprir as finalidades para as quais foram coletados, incluindo obrigações legais, fiscais ou contratuais. Dados de contas de usuários são mantidos enquanto a conta estiver ativa.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Seus Direitos como Titular dos Dados</h2>
            <p>De acordo com a LGPD, você tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Confirmar</strong> a existência de tratamento de seus dados.</li>
              <li><strong>Acessar</strong> seus dados.</li>
              <li><strong>Corrigir</strong> dados incompletos, inexatos ou desatualizados.</li>
              <li><strong>Solicitar a anonimização, bloqueio ou eliminação</strong> de dados desnecessários ou tratados em desconformidade com a lei.</li>
              <li><strong>Solicitar a portabilidade</strong> dos seus dados a outro fornecedor.</li>
              <li><strong>Revogar o consentimento</strong> a qualquer momento.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Como Exercer Seus Direitos</h2>
            <p>
              Para exercer qualquer um dos seus direitos, ou se tiver dúvidas sobre o tratamento dos seus dados pessoais, entre em contato com nosso Encarregado pela Proteção de Dados (DPO) através do e-mail: <strong>suporte@crescacomreels.com.br</strong>.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Alterações nesta Política de Privacidade</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova versão nesta página e atualizando a data no topo do documento.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

