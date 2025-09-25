
"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Gift, ArrowLeft, Shield, Truck, Star, CreditCard, Smartphone, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function ComprarPageContent() {
  const [excludedClubs, setExcludedClubs] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    paypalEmail: "",
    mbwayPhone: "",
    bankAccount: ""
  })
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Portugal",
    size: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const sendClubExclusion = useMutation(api.club_exclusions.submitClubExclusion)
  
  // Authentication check
  const user = useQuery(api.users.currentLoggedInUser)

  // Show loading while checking authentication
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-white">A carregar...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (user === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Header */}
        <header className="border-b border-gold/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push("/")}
                className="text-white hover:text-gold transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <img 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
                alt="Eleven Shirt – Mystery Box de Camisolas de Futebol Originais"
                className="h-24 w-auto"
              />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
          <Card className="border border-gold/30 bg-black/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-gold mb-4">Necessário Iniciar Sessão</CardTitle>
              <CardDescription className="text-silver text-lg">
                Para comprares uma Mystery Box, precisas de ter uma conta e iniciar sessão.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-gold" />
                  <span>Acesso a ofertas exclusivas</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-gold" />
                  <span>Histórico das tuas compras</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-gold" />
                  <span>Personalização das Mystery Boxes</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => router.push("/login")}
                  className="w-full bg-gold hover:bg-gold/90 text-black font-semibold text-lg py-6"
                >
                  Iniciar Sessão / Criar Conta
                </Button>
                
                <Button 
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="w-full border-gold/30 text-gold hover:bg-gold/10 py-6 text-lg"
                >
                  Voltar à Página Inicial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Pre-fill customer info with user data if available
  if (user && !customerInfo.name && !customerInfo.email) {
    setCustomerInfo(prev => ({
      ...prev,
      name: user.name || "",
      email: user.email || ""
    }))
  }

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address || !customerInfo.size) {
      toast({
        title: "Informações em falta",
        description: "Por favor, preenche todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    if (!customerInfo.email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, insere um email válido.",
        variant: "destructive",
      })
      return
    }

    if (!paymentMethod) {
      toast({
        title: "Método de pagamento",
        description: "Por favor, seleciona um método de pagamento.",
        variant: "destructive",
      })
      return
    }

    // Validação específica por método de pagamento
    if (paymentMethod === "card" && (!paymentData.cardNumber || !paymentData.cardName || !paymentData.cardExpiry || !paymentData.cardCvv)) {
      toast({
        title: "Dados do cartão",
        description: "Por favor, preenche todos os dados do cartão.",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod === "paypal" && !paymentData.paypalEmail) {
      toast({
        title: "Email PayPal",
        description: "Por favor, insere o teu email PayPal.",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod === "mbway" && !paymentData.mbwayPhone) {
      toast({
        title: "Número MB Way",
        description: "Por favor, insere o teu número de telemóvel para MB Way.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Send club exclusion email if customer has excluded clubs
      if (excludedClubs.trim()) {
        await sendClubExclusion({
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          excludedClubs: excludedClubs.trim(),
          orderDetails: `Mystery Box Oficial - Tamanho: ${customerInfo.size} - Método de pagamento: ${paymentMethod} - User ID: ${user._id}`
        })
      }

      // Simular envio da encomenda
      setTimeout(() => {
        toast({
          title: "Encomenda Recebida! 🎉",
          description: "A tua Mystery Box será enviada em breve. Receberás um email de confirmação.",
        })
        
        // Aqui seria onde enviarias os dados para o backend/email
        console.log("Dados da encomenda:", {
          userId: user._id,
          userEmail: user.email,
          customerInfo,
          paymentMethod,
          paymentData,
          excludedClubs: excludedClubs.trim(),
          timestamp: new Date().toISOString()
        })
        
        setIsSubmitting(false)
        
        // Redirecionar para a homepage após 2 segundos
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }, 1500)
    } catch (error) {
      console.error("Error sending club exclusion:", error)
      setIsSubmitting(false)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a tua encomenda. Tenta novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gold/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push("/")}
              className="text-white hover:text-gold transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <img 
              src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
              alt="Eleven Shirt – Mystery Box de Camisolas de Futebol Originais"
              className="h-24 w-auto"
            />
          </div>
          <div className="text-right">
            <p className="text-gold text-sm">Bem-vindo, {user.name || user.email}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Produto - Mystery Box */}
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Comprar Mystery Box Oficial
              </h1>
              <p className="text-xl text-silver">
                Uma camisola oficial surpresa na tua porta
              </p>
            </div>

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
                  <span className="text-3xl font-bold text-slate-900">€49.99</span>
                  <Badge className="bg-gold/10 text-gold">Envio Grátis</Badge>
                </div>
                
                <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-center">
                  <p className="text-red-800 font-semibold">Produtos Esgotados</p>
                  <p className="text-red-600 text-sm">Novas unidades em breve!</p>
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
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center border border-gold/20 bg-black/80 backdrop-blur-sm">
                <CardContent className="pt-4 pb-4">
                  <Shield className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-white font-semibold">100% Autênticas</p>
                </CardContent>
              </Card>
              <Card className="text-center border border-gold/20 bg-black/80 backdrop-blur-sm">
                <CardContent className="pt-4 pb-4">
                  <Truck className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-white font-semibold">Envio Rápido</p>
                </CardContent>
              </Card>
              <Card className="text-center border border-gold/20 bg-black/80 backdrop-blur-sm">
                <CardContent className="pt-4 pb-4">
                  <Star className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-white font-semibold">Garantia</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Formulário de Compra */}
          <div className="space-y-8">
            <Card className="border border-gold/30 bg-black/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gold">Finalizar Compra</CardTitle>
                <CardDescription className="text-silver">
                  Preenche os teus dados para receberes a tua Mystery Box
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePurchase} className="space-y-6">
                  {/* Informações Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Informações Pessoais</h3>
                    
                    <div>
                      <Label htmlFor="name" className="text-silver">Nome Completo *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-silver">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="size" className="text-silver">Tamanho da Camisola *</Label>
                      <select
                        id="size"
                        value={customerInfo.size}
                        onChange={(e) => setCustomerInfo({...customerInfo, size: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      >
                        <option value="">Seleciona o tamanho</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                      </select>
                    </div>
                  </div>

                  {/* Morada de Envio */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Morada de Envio</h3>
                    
                    <div>
                      <Label htmlFor="address" className="text-silver">Morada *</Label>
                      <Input
                        id="address"
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-silver">Cidade</Label>
                        <Input
                          id="city"
                          type="text"
                          value={customerInfo.city}
                          onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode" className="text-silver">Código Postal</Label>
                        <Input
                          id="postalCode"
                          type="text"
                          value={customerInfo.postalCode}
                          onChange={(e) => setCustomerInfo({...customerInfo, postalCode: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country" className="text-silver">País</Label>
                      <Input
                        id="country"
                        type="text"
                        value={customerInfo.country}
                        onChange={(e) => setCustomerInfo({...customerInfo, country: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Clubes Excluídos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Personalização (Opcional)</h3>
                    <div>
                      <Label htmlFor="excludedClubs" className="text-silver">
                        Clubes que NÃO queres receber (máximo 3)
                      </Label>
                      <Textarea
                        id="excludedClubs"
                        placeholder="Ex: Manchester United, Barcelona, Real Madrid"
                        value={excludedClubs}
                        onChange={(e) => setExcludedClubs(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                        maxLength={200}
                      />
                      <p className="text-sm text-gray-400 mt-2">
                        Escreve até 3 clubes que preferes não receber na tua Mystery Box. Isto ajuda-nos a personalizar a tua experiência!
                      </p>
                    </div>
                  </div>

                  {/* Métodos de Pagamento */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Método de Pagamento</h3>
                    
                    {/* Seleção do método */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "card" 
                            ? "border-gold bg-gold/10" 
                            : "border-gray-600 bg-gray-800 hover:border-gray-500"
                        }`}
                      >
                        <CreditCard className="h-6 w-6 text-gold mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">Cartão de Crédito</p>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "paypal" 
                            ? "border-gold bg-gold/10" 
                            : "border-gray-600 bg-gray-800 hover:border-gray-500"
                        }`}
                      >
                        <div className="h-6 w-6 bg-blue-600 rounded mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <p className="text-white text-sm font-medium">PayPal</p>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("mbway")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "mbway" 
                            ? "border-gold bg-gold/10" 
                            : "border-gray-600 bg-gray-800 hover:border-gray-500"
                        }`}
                      >
                        <Smartphone className="h-6 w-6 text-gold mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">MB Way</p>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("transfer")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "transfer" 
                            ? "border-gold bg-gold/10" 
                            : "border-gray-600 bg-gray-800 hover:border-gray-500"
                        }`}
                      >
                        <Building2 className="h-6 w-6 text-gold mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">Transferência</p>
                      </button>
                    </div>

                    {/* Campos específicos por método de pagamento */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                        <h4 className="text-white font-medium">Dados do Cartão</h4>
                        <div>
                          <Label htmlFor="cardNumber" className="text-silver">Número do Cartão *</Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName" className="text-silver">Nome no Cartão *</Label>
                          <Input
                            id="cardName"
                            type="text"
                            placeholder="Nome como aparece no cartão"
                            value={paymentData.cardName}
                            onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry" className="text-silver">Validade *</Label>
                            <Input
                              id="cardExpiry"
                              type="text"
                              placeholder="MM/AA"
                              value={paymentData.cardExpiry}
                              onChange={(e) => setPaymentData({...paymentData, cardExpiry: e.target.value})}
                              className="bg-gray-700 border-gray-600 text-white"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv" className="text-silver">CVV *</Label>
                            <Input
                              id="cardCvv"
                              type="text"
                              placeholder="123"
                              value={paymentData.cardCvv}
                              onChange={(e) => setPaymentData({...paymentData, cardCvv: e.target.value})}
                              className="bg-gray-700 border-gray-600 text-white"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                        <h4 className="text-white font-medium">Dados PayPal</h4>
                        <div>
                          <Label htmlFor="paypalEmail" className="text-silver">Email PayPal *</Label>
                          <Input
                            id="paypalEmail"
                            type="email"
                            placeholder="o.teu.email@paypal.com"
                            value={paymentData.paypalEmail}
                            onChange={(e) => setPaymentData({...paymentData, paypalEmail: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <p className="text-sm text-gray-400">
                          Serás redirecionado para o PayPal para completar o pagamento.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "mbway" && (
                      <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                        <h4 className="text-white font-medium">Dados MB Way</h4>
                        <div>
                          <Label htmlFor="mbwayPhone" className="text-silver">Número de Telemóvel *</Label>
                          <Input
                            id="mbwayPhone"
                            type="tel"
                            placeholder="Número de telemóvel"
                            value={paymentData.mbwayPhone}
                            onChange={(e) => setPaymentData({...paymentData, mbwayPhone: e.target.value})}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <p className="text-sm text-gray-400">
                          Receberás uma notificação MB Way no teu telemóvel para confirmar o pagamento.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "transfer" && (
                      <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                        <h4 className="text-white font-medium">Transferência Bancária</h4>
                        <div className="bg-gray-700 p-4 rounded border border-gray-600">
                          <p className="text-white text-sm mb-2"><strong>IBAN:</strong> PT50 0000 0000 0000 0000 0000 0</p>
                          <p className="text-white text-sm mb-2"><strong>Titular:</strong> Eleven Shirt, Lda</p>
                          <p className="text-white text-sm"><strong>Referência:</strong> Será enviada por email</p>
                        </div>
                        <p className="text-sm text-gray-400">
                          Após a confirmação da encomenda, receberás os dados bancários completos por email.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Resumo do Pedido */}
                  <div className="border-t border-gray-600 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg text-white">Mystery Box Oficial</span>
                      <span className="text-lg text-white">€49.99</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-silver">Envio</span>
                      <span className="text-gold font-semibold">Grátis</span>
                    </div>
                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-white">Total</span>
                        <span className="text-xl font-bold text-gold">€49.99</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={true}
                    className="w-full bg-gold hover:bg-gold/90 text-black font-semibold text-lg py-6"
                  >
                    {isSubmitting ? "A processar..." : (
                      <>
                        <Gift className="mr-2 h-5 w-5" />
                        Comprar Mystery Box - €49.99
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-400 text-center">
                    Ao comprares, aceitas os nossos termos e condições. 
                    Receberás um email de confirmação com os detalhes do envio.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}












