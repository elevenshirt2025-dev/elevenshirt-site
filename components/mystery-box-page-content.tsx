
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ShoppingCart, Gift, ArrowLeft, Star, Shield, Package, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MysteryBoxPageContent() {
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
            Mystery Box
          </h1>
          <p className="text-xl md:text-2xl text-silver mb-8 leading-relaxed">
            Descobre a experiência única da Mystery Box ElevenShirt: uma caixa surpresa que traz camisolas de futebol 100% oficiais, de clubes e seleções de todo o mundo.
          </p>
        </div>
      </section>

      {/* What is Mystery Box Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
            O que é a Mystery Box ElevenShirt?
          </h2>
          <p className="text-xl text-slate-700 leading-relaxed text-center">
            A Mystery Box é uma forma inovadora de colecionar camisolas. Cada caixa contém uma camisola oficial, escolhida aleatoriamente, que pode ser retro, atual ou rara. Nunca sabes o que vais receber — e é isso que torna tudo emocionante.
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Porque escolher a nossa Mystery Box?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gold mb-3">Autenticidade garantida</h3>
              <p className="text-silver">
                Só camisolas oficiais verificadas
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gold mb-3">Variedade</h3>
              <p className="text-silver">
                Clubes, seleções, edições retro e modernas
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gold mb-3">Exclusividade</h3>
              <p className="text-silver">
                Peças que não encontras facilmente em loja
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gold mb-3">Presente perfeito</h3>
              <p className="text-silver">
                Ideal para surpreender fãs de futebol
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Como funciona a Mystery Box
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Faz a tua pré-encomenda online</h3>
              <p className="text-slate-700">
                Escolhe o teu tamanho e finaliza a encomenda no nosso site
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">A nossa equipa seleciona</h3>
              <p className="text-slate-700">
                Escolhemos cuidadosamente uma camisola oficial para ti
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Recebes em casa</h3>
              <p className="text-slate-700">
                Uma caixa premium com a tua surpresa chega à tua porta
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-slate-700 font-semibold">
              Simples, rápido e com a garantia ElevenShirt.
            </p>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Exemplos de camisolas que podem estar na tua Mystery Box
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-gradient-to-b from-gold/20 to-transparent rounded-xl p-6 border border-gold/20">
                <img 
                  src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/760AMph8i_Y4CDQQXjkZF/captura-de-ecra-2025-08-27-172101.png"
                  alt="mystery box camisolas de futebol retro"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold mb-2">Clássicos retro dos anos 90</h3>
                <p className="text-silver">
                  Camisolas icónicas que marcaram uma era do futebol
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-b from-gold/20 to-transparent rounded-xl p-6 border border-gold/20">
                <img 
                  src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/LhcdHEv4MWu4nFDqCtP6N/captura-de-ecra-2025-08-27-172040.png"
                  alt="camisola oficial mystery box"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold mb-2">Camisolas de seleções históricas</h3>
                <p className="text-silver">
                  Equipamentos oficiais de seleções nacionais emblemáticas
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-b from-gold/20 to-transparent rounded-xl p-6 border border-gold/20">
                <img 
                  src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
                  alt="mystery box camisolas de futebol retro"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold mb-2">Edições limitadas recentes</h3>
                <p className="text-silver">
                  Camisolas especiais de clubes europeus de topo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gold/10 to-yellow-400/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Encomenda já a tua Mystery Box
          </h2>
          <p className="text-xl text-silver mb-8">
            Garante a tua box antes do lançamento oficial. Pré-encomendas abertas por tempo limitado.
          </p>
          <Button 
            onClick={() => router.push("/mystery-boxes")}
            className="bg-gold hover:bg-gold/90 text-black font-bold text-lg px-8 py-4"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Encomendar Mystery Box
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            FAQ sobre a Mystery Box
          </h3>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-semibold">
                É garantido que todas as camisolas são oficiais?
              </AccordionTrigger>
              <AccordionContent className="text-black text-base">
                Sim, todas passam por verificação de autenticidade. Cada camisola vem com certificado de autenticidade e garantia de que é 100% oficial e licenciada.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Posso escolher clube ou país?
              </AccordionTrigger>
              <AccordionContent className="text-black text-base">
                Não, parte da experiência é a surpresa. Não podes escolher o clube, seleção ou época específica. É isso que torna cada Mystery Box única e emocionante!
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-semibold">
                E se não servir?
              </AccordionTrigger>
              <AccordionContent className="text-black text-base">
                Tens política de troca por tamanho. Se a camisola não servir, podes trocar por outro tamanho disponível dentro de 30 dias após a receção, desde que a camisola esteja em perfeitas condições.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
