"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { CheckCircle, Shield, Truck, Gift, ArrowLeft, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FaqPageContent() {
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
            <img 
              src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
              alt="Eleven Shirt – Mystery Box de Camisolas de Futebol Originais"
              className="h-24 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => router.push("/")}
              className="bg-gold hover:bg-gold/90 text-black font-semibold"
            >
              Página Inicial
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-gold/10 text-gold border-gold/30 shadow-lg">
            <HelpCircle className="h-4 w-4 mr-2" />
            Perguntas Frequentes
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            FAQ - <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">Perguntas Frequentes</span>
          </h1>
          <p className="text-xl text-silver mb-8 max-w-2xl mx-auto leading-relaxed">
            Encontra respostas às perguntas mais comuns sobre as Mystery Boxes da Eleven Shirt.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm border border-gold/20 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-white mb-4">
                Tudo o que Precisas de Saber
              </CardTitle>
              <CardDescription className="text-lg text-silver">
                Esclarecemos as tuas dúvidas sobre autenticidade, envios, devoluções e muito mais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-gold/20 rounded-lg bg-black/40 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-gold transition-colors py-6">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gold mr-3" />
                      1. As camisolas são originais?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-silver text-base leading-relaxed pb-6">
                    <div className="bg-gradient-to-r from-gold/10 to-transparent p-4 rounded-lg border-l-4 border-gold">
                      <p className="font-semibold text-white mb-2">✅ Sim! Todas as camisolas incluídas na Eleven Shirt Mystery Box são 100% originais, licenciadas e oficiais, vindas de clubes, seleções ou distribuidores autorizados.</p>
                      <p className="text-gold font-medium">🚫 Nunca trabalhamos com réplicas.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-gold/20 rounded-lg bg-black/40 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-gold transition-colors py-6">
                    <div className="flex items-center">
                      <Gift className="h-5 w-5 text-gold mr-3" />
                      2. Posso escolher o clube ou a camisola que vou receber?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-silver text-base leading-relaxed pb-6">
                    <div className="bg-gradient-to-r from-gold/10 to-transparent p-4 rounded-lg border-l-4 border-gold">
                      <p className="font-semibold text-white mb-2">🎁 Não — o conceito da Mystery Box é precisamente a surpresa! ⚽🎁</p>
                      <p className="text-gold font-medium">🔜 No entanto, em breve poderás indicar clubes a evitar, garantindo que não recebes rivais diretos.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-gold/20 rounded-lg bg-black/40 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-gold transition-colors py-6">
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 text-gold mr-3" />
                      3. E se receber uma camisola de um clube rival?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-silver text-base leading-relaxed pb-6">
                    <div className="bg-gradient-to-r from-gold/10 to-transparent p-4 rounded-lg border-l-4 border-gold">
                      <p className="font-semibold text-white mb-2">🎲 Esse é o espírito da Mystery Box — a surpresa faz parte da experiência.</p>
                      <p className="text-gold font-medium">✨ Mesmo assim, garantimos que todas as camisolas são autênticas, de qualidade premium e colecionáveis.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-gold/20 rounded-lg bg-black/40 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-gold transition-colors py-6">
                    <div className="flex items-center">
                      <ArrowLeft className="h-5 w-5 text-gold mr-3" />
                      4. Posso devolver uma camisola se não gostar?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-silver text-base leading-relaxed pb-6">
                    <div className="bg-gradient-to-r from-gold/10 to-transparent p-4 rounded-lg border-l-4 border-gold">
                      <p className="font-semibold text-white mb-2">📋 De acordo com a nossa política de devolução, não aceitamos devoluções apenas por motivo de gosto ou clube recebido.</p>
                      <p className="text-gold font-medium">✅ Apenas aceitamos devoluções em caso de defeito de fabrico, dano de transporte ou erro de envio.</p>
                      <div className="mt-3">
                        <Button 
                          onClick={() => router.push("/politica-devolucoes")}
                          variant="outline"
                          size="sm"
                          className="border-gold text-gold hover:bg-gold/10"
                        >
                          Ver Política Completa
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border border-gold/20 rounded-lg bg-black/40 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-gold transition-colors py-6">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-gold mr-3" />
                      5. Quanto tempo demora a entrega?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-silver text-base leading-relaxed pb-6">
                    <div className="bg-gradient-to-r from-gold/10 to-transparent p-4 rounded-lg border-l-4 border-gold">
                      <p className="font-semibold text-white mb-2">🚚 Os envios são gratuitos em Portugal e Europa e chegam normalmente em 3 a 5 dias úteis.</p>
                      <p className="text-gold font-medium">⚡ Em breve lançaremos opções de entrega expressa.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border border-gold/20 rounded-lg bg-black/40 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-gold transition-colors py-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-gold mr-3" />
                      6. Como funcionam as Mystery Boxes Retro?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-silver text-base leading-relaxed pb-6">
                    <div className="bg-gradient-to-r from-gold/10 to-transparent p-4 rounded-lg border-l-4 border-gold">
                      <p className="font-semibold text-white mb-2">🕰️ As Mystery Boxes Retro incluem camisolas raras e colecionáveis dos anos 80, 90 e 2000.</p>
                      <p className="text-gold font-medium mb-2">✅ Todas também são 100% originais e licenciadas, mas a quantidade é limitada e algumas peças são únicas.</p>
                      <div className="mt-3 flex gap-2">
                        <Badge className="bg-silver/20 text-silver">Anos 80</Badge>
                        <Badge className="bg-silver/20 text-silver">Anos 90</Badge>
                        <Badge className="bg-silver/20 text-silver">Anos 2000</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-gold/10 to-yellow-100 p-8 rounded-2xl border border-gold/30">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Ainda tens dúvidas?
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Contacta-nos diretamente ou descobre as nossas Mystery Boxes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push("/")}
                size="lg"
                className="bg-gold hover:bg-gold/90 text-black font-bold text-lg px-8 py-6"
              >
                <Gift className="mr-2 h-5 w-5" />
                Ver Mystery Boxes
              </Button>
              <Button 
                onClick={() => {
                  // You can add contact functionality here
                  window.location.href = "mailto:elevenshirt2025@gmail.com"
                }}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-gold text-gold hover:bg-gold/10"
              >
                📧 elevenshirt2025@gmail.com
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
                alt="Eleven Shirt Logo"
                className="h-24 w-auto"
              />
            </div>
            <p className="text-slate-400 mb-6">
              Eleven Shirt é uma marca portuguesa especializada em Mystery Boxes de camisolas de futebol originais e licenciadas.
            </p>
            <div className="border-t border-slate-800 pt-6">
              <p className="text-slate-400">&copy; 2025 Eleven Shirt. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
