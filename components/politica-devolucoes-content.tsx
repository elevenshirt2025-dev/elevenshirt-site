"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ArrowLeft, Shield, Clock, RefreshCw, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PoliticaDevolucoes() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gold/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="text-white hover:text-gold transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
                alt="Eleven Shirt Logo"
                className="h-24 w-auto"
              />
            </div>
          </div>
          <Button 
            onClick={() => router.push("/")}
            className="bg-gold hover:bg-gold/90 text-black font-semibold"
          >
            Página Inicial
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Política de <span className="text-gold">Devoluções</span>
            </h1>
            <p className="text-xl text-silver">
              A tua satisfação é a nossa prioridade
            </p>
          </div>

          <Card className="mb-8 border border-gold/20 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Shield className="h-6 w-6 text-gold mr-3" />
                A Nossa Garantia
              </CardTitle>
            </CardHeader>
            <CardContent className="text-silver text-lg leading-relaxed">
              <p className="mb-4">
                Na Eleven Shirt, a tua satisfação é a nossa prioridade. Todas as nossas camisolas são 100% originais, licenciadas e autênticas, selecionadas dentro do conceito de Mystery Box, onde o elemento surpresa faz parte da experiência.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border border-gold/20 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Clock className="h-5 w-5 text-gold mr-3" />
                  Prazo de Devolução
                </CardTitle>
              </CardHeader>
              <CardContent className="text-silver">
                <p className="mb-4">
                  Tens <strong className="text-gold">5 dias</strong> a partir da data de receção para devolver a tua Mystery Box se não estiveres completamente satisfeito.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-gold mr-2" />
                    <span className="text-sm">5 dias para devoluções</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-gold mr-2" />
                    <span className="text-sm">Sem perguntas desnecessárias</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gold/20 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <RefreshCw className="h-5 w-5 text-gold mr-3" />
                  Processo de Devolução
                </CardTitle>
              </CardHeader>
              <CardContent className="text-silver">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-gold text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                    <span>Contacta-nos via email: elevenshirt2025@gmail.com</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-gold text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                    <span>Envia a camisola nas condições originais</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-gold text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                    <span>Reembolso processado em 5-7 dias úteis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border border-gold/20 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Condições para Devolução
              </CardTitle>
            </CardHeader>
            <CardContent className="text-silver">
              <p className="mb-4">Para garantir um processo de devolução rápido e eficiente, a camisola deve estar:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gold mr-3" />
                    <span>Em perfeitas condições</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gold mr-3" />
                    <span>Com etiquetas originais intactas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gold mr-3" />
                    <span>Com recibo ou comprovativo de compra</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gold mr-3" />
                    <span>Com solicitação prévia de devolução</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gold mr-3" />
                    <span>Na embalagem original</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 border border-gold/20 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Custos de Envio de Devolução
              </CardTitle>
            </CardHeader>
            <CardContent className="text-silver">
              <p className="text-lg mb-4">
                O cliente ao querer fazer a devolução da Mystery Box, terá de pagar o envio para a morada:
              </p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-4">
                <p className="text-gold font-semibold text-lg">
                  Eleven Shirt<br />
                  Rua da Devolução, nº 123<br />
                  1000-000 Lisboa<br />
                  Portugal
                </p>
              </div>
              <p className="text-sm text-silver/80">
                Os custos de envio de devolução são da responsabilidade do cliente e não são reembolsados.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gold/20 bg-gradient-to-br from-gold/10 to-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Reembolso Garantido
              </CardTitle>
            </CardHeader>
            <CardContent className="text-silver">
              <p className="text-lg mb-4">
                Oferecemos <strong className="text-gold">reembolso total</strong> do valor pago pela Mystery Box (exceto custos de envio de devolução). 
              </p>
              <p>
                O reembolso é processado em <strong className="text-gold">5-7 dias úteis</strong> após recebermos e verificarmos a camisola devolvida.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <p className="text-silver mb-6">
              Tens alguma dúvida sobre a nossa política de devoluções?
            </p>
            <Button 
              onClick={() => {
                window.location.href = "mailto:elevenshirt2025@gmail.com?subject=Dúvida sobre Política de Devoluções"
              }}
              className="bg-gold hover:bg-gold/90 text-black font-semibold text-lg px-8 py-6"
            >
              elevenshirt2025@gmail.com
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-slate-400">&copy; 2025 Eleven Shirt. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

