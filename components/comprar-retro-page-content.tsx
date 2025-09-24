

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Gift, ArrowLeft, Shield, Truck, Star, CreditCard, Smartphone, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function ComprarRetroPageContent() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    morada: "",
    codigoPostal: "",
    cidade: "",
    pais: "Portugal",
    tamanho: "",
    clubesExcluir: ""
  })
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-silver mx-auto mb-4"></div>
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
        <header className="border-b border-silver/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/")}
                variant="ghost"
                size="sm"
                className="text-white hover:text-silver transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <img 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
                alt="Eleven Shirt Logo"
                className="h-24 w-auto"
              />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
          <Card className="border border-silver/30 bg-black/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-silver mb-4">Necessário Iniciar Sessão</CardTitle>
              <CardDescription className="text-white text-lg">
                Para comprares uma Mystery Box Retro, precisas de ter uma conta e iniciar sessão.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-silver" />
                  <span>Acesso a ofertas exclusivas</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-silver" />
                  <span>Histórico das tuas compras</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-silver" />
                  <span>Personalização das Mystery Boxes</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => router.push("/login")}
                  className="w-full bg-silver hover:bg-silver/90 text-black font-semibold text-lg py-6"
                >
                  Iniciar Sessão / Criar Conta
                </Button>
                
                <Button 
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="w-full border-silver/30 text-silver hover:bg-silver/10 py-6 text-lg"
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

  // Pre-fill form data with user data if available
  if (user && !formData.nome && !formData.email) {
    setFormData(prev => ({
      ...prev,
      nome: user.name || "",
      email: user.email || ""
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone || !formData.morada || !formData.tamanho) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preenche todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    if (!formData.email.includes("@")) {
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
      if (formData.clubesExcluir.trim()) {
        await sendClubExclusion({
          customerName: formData.nome,
          customerEmail: formData.email,
          excludedClubs: formData.clubesExcluir.trim(),
          orderDetails: `Mystery Box Retro - Tamanho: ${formData.tamanho} - Método de pagamento: ${paymentMethod} - User ID: ${user._id}`
        })
      }

      // Simular processamento da compra
      setTimeout(() => {
        toast({
          title: "Compra realizada com sucesso! 🎉",
          description: "A tua Mystery Box Retro será enviada em breve. Receberás um email de confirmação.",
        })
        
        // Aqui seria onde enviarias os dados para o backend
        console.log("Dados da compra Mystery Box Retro:", {
          userId: user._id,
          userEmail: user.email,
          formData,
          paymentMethod,
          paymentData,
          timestamp: new Date().toISOString()
        })
        
        setIsSubmitting(false)
        
        // Redirecionar para a página inicial após 2 segundos
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }, 2000)
    } catch (error) {
      console.error("Error sending club exclusion:", error)
      setIsSubmitting(false)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a tua compra. Tenta novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-silver/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              size="sm"
              className="text-white hover:text-silver transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <img 
              src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
              alt="Eleven Shirt Logo"
              className="h-24 w-auto"
            />
          </div>
          <div className="text-right">
            <p className="text-silver text-sm">Bem-vindo, {user.name || user.email}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Produto */}
          <div className="space-y-8">
            <div>
              <img 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/760AMph8i_Y4CDQQXjkZF/captura-de-ecra-2025-08-27-172101.png"
                alt="presente original para fã de futebol - mystery box retro"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
            
            <Card className="border-2 border-silver/30 bg-gradient-to-br from-silver to-gray-50">
              <CardHeader>
                <CardTitle className="text-3xl text-slate-900">Mystery Box Retro</CardTitle>
                <CardDescription className="text-lg">
                  Camisolas vintage e clássicas dos anos 80, 90 e 2000
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-slate-900">€59.99</span>
                  <Badge className="bg-silver/10 text-slate-700">Edição Limitada</Badge>
                </div>
                
                <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-center">
                  <p className="text-red-800 font-semibold">Produtos Esgotados</p>
                  <p className="text-red-600 text-sm">Novas unidades em breve!</p>
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
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-silver" />
                    <span>✓ Envio gratuito em Portugal e Europa</span>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-silver mx-auto mb-2" />
                    <p className="text-sm font-medium">100% Autênticas</p>
                  </div>
                  <div className="text-center">
                    <Truck className="h-8 w-8 text-silver mx-auto mb-2" />
                    <p className="text-sm font-medium">Envio Rápido</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-8 w-8 text-silver mx-auto mb-2" />
                    <p className="text-sm font-medium">Satisfação Garantida</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Compra */}
          <div>
            <Card className="border border-silver/20 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 flex items-center">
                  <Gift className="h-6 w-6 mr-2 text-silver" />
                  Finalizar Compra
                </CardTitle>
                <CardDescription>
                  Preenche os teus dados para receberes a tua Mystery Box Retro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Dados Pessoais</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="O teu nome completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone">Telefone *</Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          placeholder="+351 123 456 789"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="o.teu.email@exemplo.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Morada de Envio */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Morada de Envio</h3>
                    
                    <div>
                      <Label htmlFor="morada">Morada Completa *</Label>
                      <Input
                        id="morada"
                        name="morada"
                        value={formData.morada}
                        onChange={handleInputChange}
                        placeholder="Rua, número, andar (se aplicável)"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="codigoPostal">Código Postal</Label>
                        <Input
                          id="codigoPostal"
                          name="codigoPostal"
                          value={formData.codigoPostal}
                          onChange={handleInputChange}
                          placeholder="1234-567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          name="cidade"
                          value={formData.cidade}
                          onChange={handleInputChange}
                          placeholder="Lisboa"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pais">País</Label>
                      <select
                        id="pais"
                        name="pais"
                        value={formData.pais}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-silver"
                      >
                        <option value="Portugal">Portugal</option>
                        <option value="Espanha">Espanha</option>
                        <option value="França">França</option>
                        <option value="Alemanha">Alemanha</option>
                        <option value="Itália">Itália</option>
                        <option value="Reino Unido">Reino Unido</option>
                        <option value="Outro">Outro (Europa)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferências do Produto */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Preferências</h3>
                    
                    <div>
                      <Label htmlFor="tamanho">Tamanho da Camisola *</Label>
                      <select
                        id="tamanho"
                        name="tamanho"
                        value={formData.tamanho}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-silver"
                        required
                      >
                        <option value="">Seleciona o tamanho</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="clubesExcluir">Clubes a Excluir (máximo 3)</Label>
                      <Textarea
                        id="clubesExcluir"
                        name="clubesExcluir"
                        value={formData.clubesExcluir}
                        onChange={handleInputChange}
                        placeholder="Ex: Real Madrid, Barcelona, Manchester United"
                        className="min-h-[80px]"
                      />
                      <p className="text-sm text-slate-600 mt-1">
                        Opcional: Lista até 3 clubes que não queres que saiam na tua Mystery Box Retro
                      </p>
                    </div>
                  </div>

                  {/* Métodos de Pagamento */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Método de Pagamento</h3>
                    
                    {/* Seleção do método */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "card" 
                            ? "border-silver bg-silver/10" 
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                      >
                        <CreditCard className="h-6 w-6 text-silver mx-auto mb-2" />
                        <p className="text-slate-900 text-sm font-medium">Cartão de Crédito</p>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "paypal" 
                            ? "border-silver bg-silver/10" 
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                      >
                        <div className="h-6 w-6 bg-blue-600 rounded mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <p className="text-slate-900 text-sm font-medium">PayPal</p>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("mbway")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "mbway" 
                            ? "border-silver bg-silver/10" 
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                      >
                        <Smartphone className="h-6 w-6 text-silver mx-auto mb-2" />
                        <p className="text-slate-900 text-sm font-medium">MB Way</p>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("transfer")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "transfer" 
                            ? "border-silver bg-silver/10" 
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                      >
                        <Building2 className="h-6 w-6 text-silver mx-auto mb-2" />
                        <p className="text-slate-900 text-sm font-medium">Transferência</p>
                      </button>
                    </div>

                    {/* Campos específicos por método de pagamento */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="text-slate-900 font-medium">Dados do Cartão</h4>
                        <div>
                          <Label htmlFor="cardNumber">Número do Cartão *</Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nome no Cartão *</Label>
                          <Input
                            id="cardName"
                            type="text"
                            placeholder="Nome como aparece no cartão"
                            value={paymentData.cardName}
                            onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Validade *</Label>
                            <Input
                              id="cardExpiry"
                              type="text"
                              placeholder="MM/AA"
                              value={paymentData.cardExpiry}
                              onChange={(e) => setPaymentData({...paymentData, cardExpiry: e.target.value})}
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv">CVV *</Label>
                            <Input
                              id="cardCvv"
                              type="text"
                              placeholder="123"
                              value={paymentData.cardCvv}
                              onChange={(e) => setPaymentData({...paymentData, cardCvv: e.target.value})}
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="text-slate-900 font-medium">Dados PayPal</h4>
                        <div>
                          <Label htmlFor="paypalEmail">Email PayPal *</Label>
                          <Input
                            id="paypalEmail"
                            type="email"
                            placeholder="o.teu.email@paypal.com"
                            value={paymentData.paypalEmail}
                            onChange={(e) => setPaymentData({...paymentData, paypalEmail: e.target.value})}
                          />
                        </div>
                        <p className="text-sm text-slate-600">
                          Serás redirecionado para o PayPal para completar o pagamento.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "mbway" && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="text-slate-900 font-medium">Dados MB Way</h4>
                        <div>
                          <Label htmlFor="mbwayPhone">Número de Telemóvel *</Label>
                          <Input
                            id="mbwayPhone"
                            type="tel"
                            placeholder="+351 123 456 789"
                            value={paymentData.mbwayPhone}
                            onChange={(e) => setPaymentData({...paymentData, mbwayPhone: e.target.value})}
                          />
                        </div>
                        <p className="text-sm text-slate-600">
                          Receberás uma notificação MB Way no teu telemóvel para confirmar o pagamento.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "transfer" && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="text-slate-900 font-medium">Transferência Bancária</h4>
                        <div className="bg-white p-4 rounded border border-gray-200">
                          <p className="text-slate-900 text-sm mb-2"><strong>IBAN:</strong> PT50 0000 0000 0000 0000 0000 0</p>
                          <p className="text-slate-900 text-sm mb-2"><strong>Titular:</strong> Eleven Shirt, Lda</p>
                          <p className="text-slate-900 text-sm"><strong>Referência:</strong> Será enviada por email</p>
                        </div>
                        <p className="text-sm text-slate-600">
                          Após a confirmação da encomenda, receberás os dados bancários completos por email.
                        </p>
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit"
                    disabled={true}
                    className="w-full bg-silver hover:bg-silver/90 text-black font-semibold text-lg py-6"
                  >
                    {isSubmitting ? "A processar compra..." : "Comprar Mystery Box Retro - €59.99"}
                  </Button>

                  <p className="text-sm text-slate-600 text-center">
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








