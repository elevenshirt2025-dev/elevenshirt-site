
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Trash2, CreditCard, Smartphone, Building2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function CarrinhoPageContent() {
  const { items, removeItem, clearCart, getTotalPrice } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const submitClubExclusion = useMutation(api.club_exclusions.submitClubExclusion)
  
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
                Para acederes ao carrinho de compras, precisas de ter uma conta e iniciar sessão.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-gold" />
                  <span>Guarda os teus itens favoritos</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-gold" />
                  <span>Histórico das tuas compras</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <CheckCircle className="h-5 w-5 text-gold" />
                  <span>Acesso a ofertas exclusivas</span>
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

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Portugal"
  })
  
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    paypalEmail: "",
    mbwayPhone: ""
  })
  
  const [excludedClubs, setExcludedClubs] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Pre-fill customer data with user data if available
  if (user && !customerData.name && !customerData.email) {
    setCustomerData(prev => ({
      ...prev,
      name: user.name || "",
      email: user.email || ""
    }))
  }

  const handleCustomerDataChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }))
  }

  const handlePaymentDataChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!customerData.name || !customerData.email || !customerData.phone || 
        !customerData.address || !customerData.city || !customerData.postalCode) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preenche todos os campos obrigatórios.",
        variant: "destructive",
      })
      return false
    }

    if (!paymentMethod) {
      toast({
        title: "Método de pagamento",
        description: "Por favor, seleciona um método de pagamento.",
        variant: "destructive",
      })
      return false
    }

    if (paymentMethod === "card" && (!paymentData.cardNumber || !paymentData.cardName || 
        !paymentData.cardExpiry || !paymentData.cardCvv)) {
      toast({
        title: "Dados do cartão incompletos",
        description: "Por favor, preenche todos os dados do cartão.",
        variant: "destructive",
      })
      return false
    }

    if (paymentMethod === "paypal" && !paymentData.paypalEmail) {
      toast({
        title: "Email PayPal necessário",
        description: "Por favor, insere o teu email PayPal.",
        variant: "destructive",
      })
      return false
    }

    if (paymentMethod === "mbway" && !paymentData.mbwayPhone) {
      toast({
        title: "Número MB Way necessário",
        description: "Por favor, insere o teu número de telemóvel.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Get excluded clubs from cart items or from the form
      const allExcludedClubs = items.some(item => item.excludedClubs && item.excludedClubs.length > 0) 
        ? items.flatMap(item => item.excludedClubs || []).filter(Boolean)
        : excludedClubs.trim() ? excludedClubs.trim().split(',').map(c => c.trim()) : []

      // If customer has excluded clubs, send email notification
      if (allExcludedClubs.length > 0) {
        const orderDetails = JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            size: item.size,
            price: item.price,
            type: item.type,
            excludedClubs: item.excludedClubs || []
          })),
          customerData,
          paymentMethod,
          total: getTotalPrice()
        }, null, 2)

        await submitClubExclusion({
          customerName: customerData.name,
          customerEmail: customerData.email,
          excludedClubs: allExcludedClubs.join(', '),
          orderDetails: orderDetails
        })

        console.log("Club exclusion request submitted successfully")
      }

      // Simulate order processing
      setTimeout(() => {
        const clubExclusionMessage = allExcludedClubs.length > 0 ? ' O teu pedido de exclusão de clubes foi enviado.' : ''
        toast({
          title: "Encomenda Confirmada! 🎉",
          description: `A tua encomenda foi processada com sucesso.${clubExclusionMessage}`,
        })
        clearCart()
        setIsSubmitting(false)
        router.push("/")
      }, 2000)
    } catch (error) {
      console.error("Error submitting order:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a encomenda. Tenta novamente.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Header */}
        <header className="border-b border-gold/20 bg-black/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button 
              onClick={() => router.push("/")}
              variant="ghost"
              className="text-white hover:text-gold transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar à Loja
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
                alt="Eleven Shirt Logo"
                className="h-16 w-auto"
              />
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">Carrinho Vazio</h1>
            <p className="text-silver mb-8">Ainda não adicionaste nenhuma Mystery Box ao teu carrinho.</p>
            <Button 
              onClick={() => router.push("/")}
              className="bg-gold hover:bg-gold/90 text-black font-semibold"
            >
              Explorar Mystery Boxes
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Check if any items already have excluded clubs
  const hasExcludedClubs = items.some(item => item.excludedClubs && item.excludedClubs.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gold/20 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            onClick={() => router.push("/")}
            variant="ghost"
            className="text-white hover:text-gold transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à Loja
          </Button>
          <div className="flex items-center space-x-2">
            <img 
              src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
              alt="Eleven Shirt Logo"
              className="h-16 w-auto"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Carrinho de Compras</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="space-y-6">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle>Itens no Carrinho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.type === 'regular' ? 'Camisolas atuais' : 'Camisolas vintage'}
                      </p>
                      <Badge variant="outline" className="mt-1">
                        Tamanho: {item.size}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>Preço sob consulta</span>
                </div>
              </CardContent>
            </Card>

            {/* Club Exclusion Section - Only show if no clubs are already excluded */}
            {!hasExcludedClubs && (
              <Card className="bg-white/95">
                <CardHeader>
                  <CardTitle>Exclusão de Clubes (Opcional)</CardTitle>
                  <CardDescription>
                    Escreve até 3 clubes que NÃO queres que saiam na tua Mystery Box
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="excludedClubs">Clubes a excluir (separados por vírgula)</Label>
                    <Textarea
                      id="excludedClubs"
                      placeholder="Ex: Real Madrid, Barcelona, Manchester United"
                      value={excludedClubs}
                      onChange={(e) => setExcludedClubs(e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Se preencheres este campo, enviaremos o teu pedido para elevenshirt2025@gmail.com
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Checkout Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Information */}
              <Card className="bg-white/95">
                <CardHeader>
                  <CardTitle>Dados de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) => handleCustomerDataChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerData.email}
                        onChange={(e) => handleCustomerDataChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telemóvel *</Label>
                    <Input
                      id="phone"
                      value={customerData.phone}
                      onChange={(e) => handleCustomerDataChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Morada *</Label>
                    <Input
                      id="address"
                      value={customerData.address}
                      onChange={(e) => handleCustomerDataChange("address", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={customerData.city}
                        onChange={(e) => handleCustomerDataChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal *</Label>
                      <Input
                        id="postalCode"
                        value={customerData.postalCode}
                        onChange={(e) => handleCustomerDataChange("postalCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="country">País</Label>
                    <Select value={customerData.country} onValueChange={(value) => handleCustomerDataChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Portugal">Portugal</SelectItem>
                        <SelectItem value="Espanha">Espanha</SelectItem>
                        <SelectItem value="França">França</SelectItem>
                        <SelectItem value="Alemanha">Alemanha</SelectItem>
                        <SelectItem value="Itália">Itália</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white/95">
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleciona o método de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Cartão de Crédito/Débito
                        </div>
                      </SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="mbway">
                        <div className="flex items-center">
                          <Smartphone className="mr-2 h-4 w-4" />
                          MB Way
                        </div>
                      </SelectItem>
                      <SelectItem value="transfer">
                        <div className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4" />
                          Transferência Bancária
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Payment Details */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={(e) => handlePaymentDataChange("cardNumber", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          value={paymentData.cardName}
                          onChange={(e) => handlePaymentDataChange("cardName", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade (MM/AA)</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="12/25"
                            value={paymentData.cardExpiry}
                            onChange={(e) => handlePaymentDataChange("cardExpiry", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            placeholder="123"
                            value={paymentData.cardCvv}
                            onChange={(e) => handlePaymentDataChange("cardCvv", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div>
                      <Label htmlFor="paypalEmail">Email PayPal</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        value={paymentData.paypalEmail}
                        onChange={(e) => handlePaymentDataChange("paypalEmail", e.target.value)}
                      />
                    </div>
                  )}

                  {paymentMethod === "mbway" && (
                    <div>
                      <Label htmlFor="mbwayPhone">Número de Telemóvel</Label>
                      <Input
                        id="mbwayPhone"
                        placeholder="+351 123 456 789"
                        value={paymentData.mbwayPhone}
                        onChange={(e) => handlePaymentDataChange("mbwayPhone", e.target.value)}
                      />
                    </div>
                  )}

                  {paymentMethod === "transfer" && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Dados Bancários:</h4>
                      <p className="text-sm text-gray-600">
                        <strong>IBAN:</strong> PT50 0000 0000 0000 0000 0000 0<br />
                        <strong>Titular:</strong> Eleven Shirt, Lda<br />
                        <strong>Referência:</strong> Será enviada por email
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="bg-white/95">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>€{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envio:</span>
                      <span className="text-green-600">Grátis</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>Preço sob consulta</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-gold hover:bg-gold/90 text-black font-semibold text-lg py-6"
                  >
                    {isSubmitting ? "A processar..." : `Finalizar Compra - €${getTotalPrice().toFixed(2)}`}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}













