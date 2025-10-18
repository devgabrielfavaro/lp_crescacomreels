import React from 'react'
import Link from 'next/link'

export default function TermosDeUso() {
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
          <h1 className="text-4xl font-bold gradient-text mb-4">Termos e Condições de Uso</h1>
          <p className="text-gray-400 mb-8"><strong>Última atualização:</strong> 18 de outubro de 2025</p>
          
          <div className="prose prose-invert prose-purple max-w-none text-gray-300 space-y-6">
            <p>Bem-vindo(a) ao <strong>Cresça com Reels</strong>!</p>
            
            <p>
              Estes Termos de Uso ("Termos") regem o seu acesso e uso do site <strong>https://crescacomreels.com.br</strong> ("Site") e de todos os serviços, conteúdos e produtos oferecidos pela empresa <strong>53.955.859 ANNA BEATRIZ SABINO FERRARI</strong>, inscrita no CNPJ sob o nº <strong>53.955.859/0001-10</strong> ("Nós", "Empresa").
            </p>
            
            <p>
              Ao acessar ou utilizar nossa plataforma, você concorda em cumprir e estar vinculado a estes Termos. Se você não concordar com qualquer parte dos termos, não deverá acessar o serviço.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Objeto do Serviço</h2>
            <p>
              O Cresça com Reels é uma plataforma online que oferece um serviço de criação e disponibilização de conteúdos, estratégias e materiais ("Conteúdo") destinados a auxiliar os usuários a criarem postagens para redes sociais. O acesso ao conteúdo completo da plataforma é concedido mediante cadastro e confirmação de pagamento.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Acesso e Cadastro</h2>
            <p><strong>2.1.</strong> Para acessar o conteúdo exclusivo da plataforma, o usuário deverá realizar um cadastro, fornecendo informações precisas, completas e atualizadas.</p>
            <p><strong>2.2.</strong> O acesso integral ao serviço é condicionado à confirmação do pagamento referente ao plano ou produto escolhido.</p>
            <p><strong>2.3.</strong> Você é o único responsável por manter a confidencialidade de sua senha e conta. Você concorda em nos notificar imediatamente sobre qualquer uso não autorizado de sua conta.</p>
            <p><strong>2.4.</strong> É estritamente proibido compartilhar, vender ou transferir suas credenciais de acesso (login e senha) a terceiros. A conta é de uso pessoal e intransferível.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Obrigações e Conduta do Usuário</h2>
            <p>Ao utilizar o Cresça com Reels, você concorda em <strong>NÃO</strong>:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>a) Utilizar a plataforma para qualquer finalidade ilegal ou não autorizada.</li>
              <li>b) Tentar copiar, modificar, fazer engenharia reversa, descompilar ou extrair o código-fonte do nosso site ou de qualquer parte do nosso serviço.</li>
              <li>c) Utilizar robôs, scripts ou qualquer outro meio automatizado para acessar a plataforma e coletar informações.</li>
              <li>d) Interferir ou interromper a integridade ou o desempenho do serviço.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Pagamentos e Cancelamento</h2>
            <p>
              <strong>4.1. Formas de Pagamento:</strong> Os pagamentos podem ser realizados via <strong>Cartão de Crédito</strong> e <strong>Pix</strong>, processados através da nossa parceira de pagamentos, a Asaas. Ao realizar a compra, você concorda com os termos de serviço da processadora de pagamento.
            </p>
            <p><strong>4.2. Acesso:</strong> O acesso ao serviço será liberado após a confirmação do pagamento pela instituição financeira.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Política de Reembolso (Direito de Arrependimento)</h2>
            <p>
              <strong>5.1.</strong> Conforme o Artigo 49 do Código de Defesa do Consumidor (Lei nº 8.078/1990), o cliente tem o prazo de <strong>7 (sete) dias corridos</strong>, a contar da data da compra, para solicitar o cancelamento e o reembolso integral do valor pago.
            </p>
            <p>
              <strong>5.2.</strong> Para solicitar o reembolso, o cliente deverá entrar em contato através do e-mail de suporte: <strong>suporte@crescacomreels.com.br</strong>, informando o desejo de cancelamento.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo disponibilizado na plataforma, incluindo textos, gráficos, vídeos, templates, logotipos e software, é de propriedade exclusiva da <strong>53.955.859 ANNA BEATRIZ SABINO FERRARI</strong> ou de seus licenciadores e é protegido pelas leis de direitos autorais e propriedade intelectual. Ao adquirir o serviço, você recebe uma licença limitada, não exclusiva e intransferível para usar o conteúdo para seus fins pessoais ou profissionais, conforme o escopo do serviço, sendo proibida a sua redistribuição, venda ou uso para fins comerciais não autorizados.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Limitação de Responsabilidade</h2>
            <p>
              <strong>7.1.</strong> Nosso serviço é fornecido "como está". Não garantimos que o uso do nosso conteúdo resultará em viralização, engajamento ou qualquer métrica de desempenho específica em suas redes sociais.
            </p>
            <p>
              <strong>7.2.</strong> Não nos responsabilizamos por quaisquer danos diretos ou indiretos decorrentes do uso ou da incapacidade de usar nosso serviço, incluindo falhas técnicas, interrupções ou instabilidade da plataforma.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, avisaremos com pelo menos 30 dias de antecedência antes que os novos termos entrem em vigor. O uso contínuo da plataforma após as alterações constitui sua aceitação dos novos Termos.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Lei Aplicável e Foro</h2>
            <p>
              Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Fica eleito o foro da comarca de Londrina, Estado do Paraná, para dirimir quaisquer controvérsias oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Contato</h2>
            <p>
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail: <strong>suporte@crescacomreels.com.br</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

