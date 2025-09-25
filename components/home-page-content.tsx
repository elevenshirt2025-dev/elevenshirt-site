












"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { CheckCircle, Star, Shield, Truck, Gift, ShoppingCart, Instagram, Youtube, User, LogOut } from "lucide-react"
import { useToast } from "../hooks/use-toast"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useQuery } from "convex/react"
import { useAuthActions } from "@convex-dev/auth/react"
import { api } from "../convex/_generated/api"
import { Label } from "./ui/label"

export default function HomePageContent() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sizeDialogOpen, setSizeDialogOpen] = useState(false)
  const [selectedBoxType, setSelectedBoxType] = useState<'regular' | 'retro' | 'both' | null>(null)
  const [clubExclusionDialogOpen, setClubExclusionDialogOpen] = useState(false)
  const [regularExcludedClubs, setRegularExcludedClubs] = useState('')
  const [retroExcludedClubs, setRetroExcludedClubs] = useState('')
  const { toast } = useToast()
  const router = useRouter()
  const { addItem, getItemCount, items } = useCart()
  
  // Authentication
  const user = useQuery(api.users.currentLoggedInUser)
  const { signOut } = useAuthActions()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "SessÃ£o terminada",
        description: "AtÃ© breve! Volta sempre que quiseres.",
      })
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao terminar a sessÃ£o.",
        variant: "destructive",
      })
    }
  }

  const handleVipSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Email necessÃ¡rio",
        description: "Por favor, insere o teu email para entrares na lista VIP.",
        variant: "destructive",
      })
      return
    }

    if (!email.includes("@")) {
      toast({
        title: "Email invÃ¡lido",
        description: "Por favor, insere um email vÃ¡lido.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Bem-vindo Ã  Lista VIP! ðŸŽ‰",
        description: "ReceberÃ¡s em breve acesso exclusivo Ã s nossas Mystery Boxes.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleDiscoverBox = () => {
    router.push("/mystery-box")
  }

  const handleBuyBox = () => {
    router.push("/comprar")
  }

  const handleBuyRetroBox = () => {
    router.push("/comprar-retro")
  }

  const handleAddToCart = (type: 'regular' | 'retro') => {
    // Check if user is authenticated
    if (user === null) {
      toast({
        title: "Iniciar SessÃ£o NecessÃ¡rio",
        description: "Para adicionar itens ao carrinho, precisas de iniciar sessÃ£o ou criar uma conta.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // If user is still loading, show loading message
    if (user === undefined) {
      toast({
        title: "A carregar...",
        description: "Por favor aguarda enquanto verificamos a tua sessÃ£o.",
      })
      return
    }

    // Check if the other box type is already in cart
    const hasRegular = items.some(item => item.type === 'regular')
    const hasRetro = items.some(item => item.type === 'retro')
    
    if (type === 'regular' && hasRetro) {
      // Adding regular when retro is already in cart - show club exclusion dialog
      setSelectedBoxType('both')
      setClubExclusionDialogOpen(true)
    } else if (type === 'retro' && hasRegular) {
      // Adding retro when regular is already in cart - show club exclusion dialog
      setSelectedBoxType('both')
      setClubExclusionDialogOpen(true)
    } else {
      // Single box addition - show size selection dialog
      setSelectedBoxType(type)
      setSizeDialogOpen(true)
    }
  }

  const handleSizeSelection = (size: 'S' | 'M' | 'L') => {
    if (!selectedBoxType) return

    if (selectedBoxType === 'both') {
      // Add both mystery boxes with their respective excluded clubs
      const regularItem = {
        id: 'mystery-box-regular',
        name: 'Mystery Box Atual',
        price: 0,
        image: 'https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/LhcdHEv4MWu4nFDqCtP6N/captura-de-ecra-2025-08-27-172040.png',
        type: 'regular' as const
      }

      const retroItem = {
        id: 'mystery-box-retro',
        name: 'Mystery Box Retro',
        price: 0,
        image: 'https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/760AMph8i_Y4CDQQXjkZF/captura-de-ecra-2025-08-27-172101.png',
        type: 'retro' as const
      }

      // Parse excluded clubs
      const regularExcluded = regularExcludedClubs.trim() 
        ? regularExcludedClubs.split(',').map(c => c.trim()).filter(c => c.length > 0)
        : undefined
      const retroExcluded = retroExcludedClubs.trim() 
        ? retroExcludedClubs.split(',').map(c => c.trim()).filter(c => c.length > 0)
        : undefined

      addItem(regularItem, size, regularExcluded)
      addItem(retroItem, size, retroExcluded)

      setSizeDialogOpen(false)
      setSelectedBoxType(null)
      setClubExclusionDialogOpen(false)
      setRegularExcludedClubs('')
      setRetroExcludedClubs('')
      
      toast({
        title: "Adicionado ao Carrinho! ðŸ›’",
        description: "Mystery Box Atual e Retro foram adicionadas ao teu carrinho.",
      })
    } else {
      // Single box addition
      const item = selectedBoxType === 'regular' 
        ? {
            id: 'mystery-box-regular',
            name: 'Mystery Box Atual',
            price: 0,
            image: 'https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/LhcdHEv4MWu4nFDqCtP6N/captura-de-ecra-2025-08-27-172040.png',
            type: 'regular' as const
          }
        : {
            id: 'mystery-box-retro',
            name: 'Mystery Box Retro',
            price: 0,
            image: 'https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/760AMph8i_Y4CDQQXjkZF/captura-de-ecra-2025-08-27-172101.png',
            type: 'retro' as const
          }

      addItem(item, size)
      setSizeDialogOpen(false)
      setSelectedBoxType(null)
      toast({
        title: "Adicionado ao Carrinho! ðŸ›’",
        description: `${item.name} (Tamanho ${size}) foi adicionada ao teu carrinho.`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Top Announcement Bar */}
      <div className="bg-gold text-black py-2 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-lg font-bold mx-16 uppercase">
            PRODUTOS 100% ORIGINAIS.
          </span>
          <span className="text-lg font-bold mx-16 uppercase">
            NUNCA RÃ‰PLICAS.
          </span>
          <span className="text-lg font-bold mx-16 uppercase">
            ENVIO GRÃTIS.
          </span>
          <span className="text-lg font-bold mx-16 uppercase">
            PRODUTOS 100% ORIGINAIS.
          </span>
          <span className="text-lg font-bold mx-16 uppercase">
            NUNCA RÃ‰PLICAS.
          </span>
          <span className="text-lg font-bold mx-16 uppercase">
            ENVIO GRÃTIS.
          </span>
          <span className="text-lg font-bold mx-16 uppercase">
            PRODUTOS 100% ORIGINAIS.
          </span>
          <span className="text-lg font-bold mx-16 uppercase">
            NUNCA RÃ‰PLICAS.
          </span>
          <span className="text-lg font-bold mx-16 uppercase">
            ENVIO GRÃTIS.
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gold/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
              alt="Eleven Shirt â€“ Mystery Box de Camisolas de Futebol Originais"
              className="h-32 w-auto"
            />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center">
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => router.push("/carrinho")}
              variant="ghost"
              className="text-white hover:text-gold transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {getItemCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-gold text-black text-xs min-w-[20px] h-5 flex items-center justify-center p-0">
                  {getItemCount()}
                </Badge>
              )}
            </Button>
            
            {/* Authentication Section */}
            {user === undefined ? (
              // Loading state
              <div className="w-8 h-8 animate-pulse bg-gray-600 rounded-full"></div>
            ) : user === null ? (
              // Not authenticated - show login button
              <Button 
                onClick={() => router.push("/login")}
                variant="ghost"
                className="text-white hover:text-gold transition-colors"
              >
                <User className="h-5 w-5 mr-2" />
                Iniciar SessÃ£o
              </Button>
            ) : (
              // Authenticated - show user info and logout
              <div className="flex items-center gap-2">
                <span className="text-gold text-sm hidden sm:block">
                  OlÃ¡, {user.name || user.email?.split('@')[0]}
                </span>
                <Button 
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-gold transition-colors"
                  title="Terminar SessÃ£o"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <Button 
              asChild
              variant="ghost"
              className="text-white hover:text-gold transition-colors"
            >
              <a href="/blog">Blog</a>
            </Button>
            <Button 
              asChild
              variant="ghost"
              className="text-white hover:text-gold transition-colors"
            >
              <a href="/faq">FAQ</a>
            </Button>
            <Button 
              onClick={() => {
                const vipSection = document.querySelector('[data-section="vip"]')
                vipSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-gold hover:bg-gold/90 text-black font-semibold border border-gold/30 shadow-lg shadow-gold/20"
            >
              Entrar na Lista VIP
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-gold/10 text-gold border-gold/30 shadow-lg">
            ðŸ‡µðŸ‡¹ Marca Portuguesa de Mystery Boxes
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
             Mystery Box de Camisolas de Futebol <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">100% Originais</span></h1>
          <p className="text-xl text-silver mb-2 max-w-2xl mx-auto leading-relaxed font-semibold">
            âš½ O Futebol Cabe Numa Box.
          </p>
          <p className="text-lg text-silver mb-8 max-w-2xl mx-auto leading-relaxed">
            Camisolas oficiais, licenciadas e autÃªnticas numa experiÃªncia Ãºnica. Compra uma Mystery Box e recebe uma camisola surpresa â€” sempre original, nunca rÃ©plica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleDiscoverBox}
              className="bg-gold hover:bg-gold/90 text-black font-semibold text-lg px-8 py-6 shadow-lg shadow-gold/30"
            >
              <Gift className="mr-2 h-5 w-5" />
              Descobrir Mystery Box
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 mb-20">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/offhwMTMTQvJCAPZiWega/omar-ramadan-m-e8-ij-9-r48-oo-unsplash.jpg" 
              alt="camisola oficial autÃªntica ElevenShirt - Manchester United, Barcelona, Real Madrid"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold text-gold">ðŸ‘‰ Camisolas de Clubes Oficiais</p>
              <p className="text-sm opacity-90">Manchester United, Manchester City, Barcelona e muito mais</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre NÃ³s Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gold mb-6">
              Somos a melhor escolha
            </h2>
            <h3 className="text-4xl font-bold text-white mb-6">
              Sobre NÃ³s
            </h3>
          </div>
          
          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg text-silver leading-relaxed mb-6">
                A Eleven Shirt nasceu de uma paixÃ£o simples: o futebol. âš½
              </p>
              
              <p className="text-lg text-silver leading-relaxed mb-6">
                Sempre acreditÃ¡mos que uma camisola nÃ£o Ã© apenas tecido com cores e patrocinadores â€” Ã© memÃ³ria, emoÃ§Ã£o e identidade. Ã‰ aquele momento em que te lembras da primeira vez que foste ao estÃ¡dio, da celebraÃ§Ã£o de um golo inesquecÃ­vel ou do jogador que fez sonhar geraÃ§Ãµes.
              </p>

              <p className="text-lg text-silver leading-relaxed mb-6">
                Foi com essa ideia que surgiu a pergunta:<br />
                <span className="text-gold font-semibold">ðŸ‘‰ "E se o futebol coubesse dentro de uma box?"</span>
              </p>

              <p className="text-lg text-silver leading-relaxed mb-6">
                Daqui nasceu a Mystery Box Eleven Shirt â€” uma experiÃªncia Ãºnica que junta o elemento surpresa Ã  autenticidade. Cada box traz uma camisola 100% original, licenciada e oficial, escolhida entre clubes e seleÃ§Ãµes de todo o mundo. Nunca rÃ©plicas, nunca falsificaÃ§Ãµes â€” apenas paixÃ£o verdadeira.
              </p>

              <p className="text-lg text-silver leading-relaxed mb-6">
                Mais do que vender camisolas, queremos criar momentos de emoÃ§Ã£o. A cada box aberta, hÃ¡ um coraÃ§Ã£o a bater mais rÃ¡pido, uma expectativa a crescer e um sorriso que se desenha no rosto.
              </p>

              <p className="text-lg text-silver leading-relaxed mb-8">
                A Eleven Shirt Ã© uma marca portuguesa ðŸ‡µðŸ‡¹, criada para os adeptos e colecionadores que vivem o futebol em cada detalhe. O nosso compromisso Ã© claro:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
                  <Shield className="h-8 w-8 text-gold mx-auto mb-3" />
                  <h3 className="text-gold font-semibold mb-2">Autenticidade</h3>
                  <p className="text-silver text-sm">sÃ³ trabalhamos com produtos oficiais.</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
                  <Gift className="h-8 w-8 text-gold mx-auto mb-3" />
                  <h3 className="text-gold font-semibold mb-2">ExperiÃªncia</h3>
                  <p className="text-silver text-sm">cada box Ã© surpresa, cada box Ã© diferente.</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-b from-gold/10 to-transparent rounded-xl border border-gold/20">
                  <Star className="h-8 w-8 text-gold mx-auto mb-3" />
                  <h3 className="text-gold font-semibold mb-2">Comunidade</h3>
                  <p className="text-silver text-sm">queremos criar uma famÃ­lia de fÃ£s e colecionadores que partilham esta paixÃ£o.</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-silver leading-relaxed mb-4">
                  Este Ã© apenas o inÃ­cio. O jogo estÃ¡ em aberto, e tu podes fazer parte dele.
                </p>
                <p className="text-xl font-bold text-gold">
                  ðŸ‘‰ O Futebol Cabe Numa Box.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Garantia de Autenticidade Eleven Shirt
            </h2>
            <p className="text-xl text-silver">
              A tua confianÃ§a Ã© a nossa prioridade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border border-gold/20 shadow-2xl bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-sm">
              <CardContent className="pt-8">
                <Shield className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">100% AutÃªnticas</h3>
                <p className="text-silver">
                  todas as camisolas sÃ£o originais e licenciadas pelos clubes oficiais.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border border-gold/20 shadow-2xl bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-sm">
              <CardContent className="pt-8">
                <Truck className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Envio RÃ¡pido</h3>
                <p className="text-silver">
                  entrega gratuita em Portugal e Europa em 3-5 dias Ãºteis.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border border-gold/20 shadow-2xl bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-sm">
              <CardContent className="pt-8">
                <Star className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">SatisfaÃ§Ã£o Garantida</h3>
                <p className="text-silver">
                  certificado de autenticidade incluÃ­do em cada camisola.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona - How It Works */}
      <section className="py-20 px-4 bg-slate-50" data-section="how-it-works">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Camisolas Oficiais AutÃªnticas â€“ Como Funciona a Mystery Box
            </h2>
            <p className="text-xl text-slate-600">
              Simples, rÃ¡pido e sempre uma surpresa autÃªntica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <span className="text-3xl font-bold text-black">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                  <Gift className="h-4 w-4 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Escolhe a Tua Mystery Box</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Seleciona entre a <strong>Mystery Box Atual</strong> (â‚¬49.99) com camisolas das Ãºltimas temporadas ou a <strong>Mystery Box Retro</strong> (â‚¬59.99) com peÃ§as vintage dos anos 80, 90 e 2000.
              </p>
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gold/20">
                <p className="text-sm text-slate-500 font-medium">âœ“ Todas 100% originais e licenciadas</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <span className="text-3xl font-bold text-black">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Recebe em Casa</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                A tua Mystery Box chega Ã  tua porta em <strong>3-5 dias Ãºteis</strong> com envio gratuito para Portugal e Europa. Embalagem cuidada e discreta.
              </p>
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gold/20">
                <p className="text-sm text-slate-500 font-medium">ðŸšš Envio gratuito e rÃ¡pido</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <span className="text-3xl font-bold text-black">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Desfruta da Surpresa</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Abre a tua box e descobre a <strong>camisola oficial surpresa</strong>! Cada camisola vem com certificado de autenticidade e Ã© uma peÃ§a Ãºnica para a tua coleÃ§Ã£o.
              </p>
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gold/20">
                <p className="text-sm text-slate-500 font-medium">ðŸ† Certificado de autenticidade incluÃ­do</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gold/10 to-yellow-100 p-8 rounded-2xl border border-gold/30">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Pronto para a Tua Primeira Mystery Box?
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Junta-te a milhares de fÃ£s que jÃ¡ descobriram camisolas incrÃ­veis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleDiscoverBox}
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-black font-bold text-lg px-8 py-6"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Ver Mystery Boxes
                </Button>
                <Button 
                  onClick={() => {
                    const vipSection = document.querySelector('[data-section="vip"]')
                    vipSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-gold text-gold hover:bg-gold/10"
                >
                  Entrar na Lista VIP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIP List Signup */}
      <section className="py-20 px-4 bg-black" data-section="vip">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gold mb-4">
            Junta-te Ã  Comunidade Eleven Shirt
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Recebe acesso exclusivo a Mystery Boxes limitadas e ofertas especiais.
          </p>
          
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <form onSubmit={handleVipSignup} className="space-y-4">
                <Input 
                  type="email" 
                  placeholder="O teu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center text-lg py-6"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-black font-semibold text-lg py-6"
                >
                  {isSubmitting ? "A processar..." : "Entrar na Lista VIP"}
                </Button>
                <p className="text-sm text-slate-600">
                  Sem spam. Apenas novidades e as melhores ofertas em camisolas de futebol oficiais.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"
                  alt="Eleven Shirt Logo"
                  className="h-24 w-auto"
                />
              </div>
              <p className="text-slate-400">
                Eleven Shirt Ã© uma marca portuguesa especializada em Mystery Boxes de camisolas de futebol originais e licenciadas, com ediÃ§Ãµes atuais e retro.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={handleDiscoverBox} className="hover:text-gold transition-colors">Mystery Box Oficial</button></li>
                <li><button onClick={handleDiscoverBox} className="hover:text-gold transition-colors">Mystery Box Retro</button></li>
                <li><a href="/blog" className="hover:text-gold transition-colors">Blog & Novidades</a></li>
                <li><button onClick={() => {
                  const howItWorksSection = document.querySelector('[data-section="how-it-works"]')
                  howItWorksSection?.scrollIntoView({ behavior: 'smooth' })
                }} className="hover:text-gold transition-colors">Como Funciona</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => {
                  toast({
                    title: "Contacto",
                    description: "ðŸ“§ elevenshirt2025@gmail.com",
                  })
                }} className="hover:text-gold transition-colors">ðŸ“§ elevenshirt2025@gmail.com</button></li>
                <li><button onClick={() => {
                  toast({
                    title: "Contacto",
                    description: "ðŸ“§ elevenshirt2025@gmail.com",
                  })
                }} className="hover:text-gold transition-colors">ðŸ“§ elevenshirt2025@gmail.com</button></li>
                <li><button onClick={() => {
                  toast({
                    title: "Envios",
                    description: "Envio gratuito em Portugal e Europa em 3-5 dias Ãºteis.",
                  })
                }} className="hover:text-gold transition-colors">Envio gratuito em Portugal e Europa em 3-5 dias Ãºteis</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">PolÃ­tica de DevoluÃ§Ãµes</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Button 
                    onClick={() => router.push("/politica-devolucoes")}
                    variant="ghost"
                    className="text-slate-400 hover:text-gold transition-colors p-0 h-auto font-normal text-left justify-start"
                  >
                    Ver PolÃ­tica de DevoluÃ§Ãµes
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Eleven Shirt. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Large Social Media Section */}
      <section className="bg-black py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Segue-nos nas Redes Sociais
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl px-12 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <a href="https://www.instagram.com/elevenshirt_pt/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Instagram className="h-8 w-8 mr-4" />
                Segue-nos no Insta
              </a>
            </Button>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl px-12 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <a href="https://www.youtube.com/@ElevenShirt_pt" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Youtube className="h-8 w-8 mr-4" />
                YouTube
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Size Selection Dialog */}
      <Dialog open={sizeDialogOpen} onOpenChange={setSizeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Seleciona o Tamanho</DialogTitle>
            <DialogDescription>
              Escolhe o tamanho da tua camisola mystery box.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            <Button
              onClick={() => handleSizeSelection('S')}
              variant="outline"
              className="h-16 text-lg font-semibold hover:bg-gold/10 hover:border-gold"
            >
              S
            </Button>
            <Button
              onClick={() => handleSizeSelection('M')}
              variant="outline"
              className="h-16 text-lg font-semibold hover:bg-gold/10 hover:border-gold"
            >
              M
            </Button>
            <Button
              onClick={() => handleSizeSelection('L')}
              variant="outline"
              className="h-16 text-lg font-semibold hover:bg-gold/10 hover:border-gold"
            >
              L
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Club Exclusion Dialog */}
      <Dialog open={clubExclusionDialogOpen} onOpenChange={setClubExclusionDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Excluir Clubes das Tuas Mystery Boxes</DialogTitle>
            <DialogDescription>
              Especifica atÃ© 3 clubes que nÃ£o queres que calhem em cada Mystery Box. Separa os clubes por vÃ­rgulas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="regular-clubs" className="text-sm font-medium">
                Mystery Box Atual - Clubes a excluir:
              </Label>
              <Input
                id="regular-clubs"
                placeholder="Ex: Real Madrid, Barcelona, Manchester United"
                value={regularExcludedClubs}
                onChange={(e) => setRegularExcludedClubs(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retro-clubs" className="text-sm font-medium">
                Mystery Box Retro - Clubes a excluir:
              </Label>
              <Input
                id="retro-clubs"
                placeholder="Ex: Benfica, Porto, Sporting"
                value={retroExcludedClubs}
                onChange={(e) => setRetroExcludedClubs(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  setClubExclusionDialogOpen(false)
                  setSizeDialogOpen(true)
                }}
                className="flex-1 bg-gold hover:bg-gold/90 text-black font-semibold"
              >
                Continuar para SeleÃ§Ã£o de Tamanho
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}






















