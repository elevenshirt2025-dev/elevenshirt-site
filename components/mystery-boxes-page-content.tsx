"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, ShoppingCart, Gift, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MysteryBoxesPageContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-gold/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => router.push("/")}
              variant="ghost"
              className="text-white hover:text-gold transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Button>
            <img 
              src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
              alt="Eleven Shirt – Mystery Box de Camisolas de Futebol Originais"
              className="h-16 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
            Mystery Boxes de Camisolas de Futebol
          </h1>
          <p className="text-xl md:text-2xl text-silver mb-8 leading-relaxed">
            Descobre a emoção da surpresa com camisolas 100% oficiais e autênticas
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <Badge className="bg-gold/20 text-gold border-gold/30 px-4 py-2">
              ✓ 100% Originais
            </Badge>
            <Badge className="bg-gold/20 text-gold border-gold/30 px-4 py-2">
              ✓ Envio Grátis
            </Badge>
            <Badge className="bg-gold/20 text-gold border-gold/30 px-4 py-2">
              ✓ Certificado de Autenticidade
            </Badge>
          </div>
        </div>
      </section>

      {/* Mystery Box Products */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Escolhe a Tua Mystery Box
            </h2>
            <p className="text-xl text-slate-600">
              Cada box é uma experiência única de surpresa e autenticidade
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mystery Box Regular */}
            <div className="space-y-8">
              <div>
                <img 
                  src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/LhcdHEv4MWu4nFDqCtP6N/captura-de-ecra-2025-08-27-172040.png"
                  alt="mystery box de camisolas de futebol retro"
                  className="w-full rounded-2xl shadow-xl bg-gray-800"
                />
              </div>
              
              <Card className="border-2 border-gold/30 bg-gradient-to-br from-gold to-gray-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">Mystery Box Atual</CardTitle>
                  <CardDescription className="text-lg">
                    Uma camisola oficial surpresa na tua porta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gold/10 text-gold">Envio Grátis</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gold" />
                      <span>✓ Camisolas 100% originais e licenciadas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gold" />
                      <span>✓ Clubes e Seleções Internacionais</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gold" />
                      <span>✓ Temporadas Atuais e das 2 anteriores</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      disabled
                      variant="outline"
                      className="flex-1 border-gold text-gold hover:bg-gold/10 font-semibold py-6"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Esgotado
                    </Button>
                    <Button 
                      disabled
                      className="flex-1 bg-gold hover:bg-gold/90 text-black font-semibold py-6"
                    >
                      <Gift className="mr-2 h-5 w-5" />
                      Esgotado
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mystery Box Retro */}
            <div className="space-y-8">
              <div>
                <img 
                  src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/760AMph8i_Y4CDQQXjkZF/captura-de-ecra-2025-08-27-172101.png"
                  alt="Mystery Box Retro Eleven Shirt"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
              
              <Card className="border-2 border-silver/30 bg-gradient-to-br from-silver to-gray-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">Mystery Box Retro</CardTitle>
                  <CardDescription className="text-lg">
                    Camisolas vintage e clássicas dos anos 80, 90 e 2000
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-silver/10 text-slate-700">Edição Limitada</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-silver" />
                      <span>✓ Camisolas de futebol vintage autênticas (anos 80, 90, 2000)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-silver" />
                      <span>✓ 100% originais e licenciadas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-silver" />
                      <span>✓ Peças raras e colecionáveis</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      disabled
                      variant="outline"
                      className="flex-1 border-silver text-silver hover:bg-silver/10 font-semibold py-6"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Esgotado
                    </Button>
                    <Button 
                      disabled
                      className="flex-1 bg-silver hover:bg-silver/90 text-black font-semibold py-6"
                    >
                      <Gift className="mr-2 h-5 w-5" />
                      Esgotado
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              O Que Podes Encontrar
            </h2>
            <p className="text-xl text-silver">
              Cada mystery box contém surpresas autênticas e oficiais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gold mb-3">Clubes Europeus</h3>
              <p className="text-silver">
                Real Madrid, Barcelona, Manchester United, Liverpool, PSG, Bayern Munich e muito mais
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gold mb-3">Seleções Nacionais</h3>
              <p className="text-silver">
                Portugal, Brasil, Argentina, França, Alemanha, Itália e outras seleções icónicas
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gold mb-3">Edições Especiais</h3>
              <p className="text-silver">
                Camisolas comemorativas, edições limitadas e designs únicos de temporadas especiais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gold/10 to-yellow-400/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para a Surpresa?
          </h2>
          <p className="text-xl text-silver mb-8">
            Junta-te à nossa lista VIP e sê o primeiro a saber quando as mystery boxes voltam
          </p>
          <Button 
            onClick={() => router.push("/")}
            className="bg-gold hover:bg-gold/90 text-black font-bold text-lg px-8 py-4"
          >
            Juntar à Lista VIP
          </Button>
        </div>
      </section>
    </div>
  );
}