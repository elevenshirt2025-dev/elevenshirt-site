"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { User, Mail, Lock, ArrowLeft, Gift } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function LoginPageContent() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { signIn } = useAuthActions()
  const user = useQuery(api.users.currentLoggedInUser)

  // If user is already logged in, redirect to home
  if (user) {
    router.push("/")
    return null
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insere o teu email.",
        variant: "destructive",
      })
      return
    }

    if (!email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, insere um email válido.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      await signIn("resend-otp", formData)
      setStep("code")
      toast({
        title: "Código enviado! 📧",
        description: mode === "login" 
          ? "Verifica o teu email e insere o código de verificação."
          : "Verifica o teu email e insere o código para ativares a tua conta.",
      })
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o código. Tenta novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!code) {
      toast({
        title: "Código obrigatório",
        description: "Por favor, insere o código de verificação.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      await signIn("resend-otp", formData)
      toast({
        title: mode === "login" ? "Bem-vindo! 🎉" : "Conta criada! 🎉",
        description: mode === "login" 
          ? "Sessão iniciada com sucesso."
          : "A tua conta foi criada e sessão iniciada com sucesso.",
      })
      router.push("/")
    } catch (error) {
      console.error("Error verifying OTP:", error)
      toast({
        title: "Código inválido",
        description: "O código inserido não é válido. Tenta novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToEmail = () => {
    setStep("email")
    setCode("")
    // Keep the current mode when going back
  }

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
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="border border-gold/20 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto">
                <User className="h-8 w-8 text-black" />
              </div>
              
              {/* Mode Toggle */}
              <div className="flex bg-slate-100 rounded-lg p-1 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    mode === "login" 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Iniciar Sessão
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    mode === "signup" 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Criar Conta
                </button>
              </div>

              <CardTitle className="text-2xl text-slate-900">
                {step === "email" 
                  ? (mode === "login" ? "Iniciar Sessão" : "Criar Conta")
                  : "Verificar Email"
                }
              </CardTitle>
              <CardDescription className="text-slate-600">
                {step === "email" 
                  ? (mode === "login" 
                      ? "Insere o teu email para receberes um código de verificação."
                      : "Insere o teu email para criares a tua conta e receberes um código de verificação."
                    )
                  : `Enviámos um código de verificação para ${email}. Verifica o teu email.`
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {step === "email" ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="o-teu-email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 py-6 text-lg"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold/90 text-black font-semibold text-lg py-6"
                  >
                    {isSubmitting 
                      ? "A enviar código..." 
                      : (mode === "login" ? "Enviar Código" : "Criar Conta")
                    }
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <input name="email" value={email} type="hidden" />
                  <div className="space-y-2">
                    <Label htmlFor="code" className="text-slate-700 font-medium">
                      Código de Verificação
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="code"
                        name="code"
                        type="text"
                        placeholder="123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="pl-10 py-6 text-lg text-center tracking-widest"
                        disabled={isSubmitting}
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold/90 text-black font-semibold text-lg py-6"
                  >
                    {isSubmitting ? "A verificar..." : "Verificar Código"}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleBackToEmail}
                    variant="outline"
                    className="w-full border-gold/30 text-gold hover:bg-gold/10 py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    Voltar ao Email
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-12 space-y-6">
            <h3 className="text-xl font-bold text-white text-center">
              {mode === "login" ? "Vantagens de teres conta" : "Vantagens de criares conta"}
            </h3>
            <div className="grid gap-4">
              <Card className="border border-gold/20 bg-black/80 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Gift className="h-6 w-6 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Ofertas Exclusivas</p>
                    <p className="text-slate-400 text-sm">Acesso antecipado a Mystery Boxes limitadas</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gold/20 bg-black/80 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <User className="h-6 w-6 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Histórico de Compras</p>
                    <p className="text-slate-400 text-sm">Acompanha as tuas encomendas e camisolas</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




