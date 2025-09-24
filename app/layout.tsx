import "./globals.css"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { CartProvider } from "@/contexts/cart-context"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Mystery Box de Camisolas de Futebol Oficiais | ElevenShirt",
    template: "%s | ElevenShirt"
  },
  description: "Descobre a mystery box de camisolas de futebol oficiais. Surpresa, autenticidade e exclusividade.",
  keywords: 'mystery box, camisolas futebol, jerseys originais, Portugal, Benfica, Porto, Sporting, Real Madrid, Barcelona, Manchester United',
  authors: [{ name: 'Eleven Shirt' }],
  creator: 'Eleven Shirt',
  publisher: 'Eleven Shirt',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://q9slqqtxiper1cgp3ka5cacr.macaly.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mystery Box de Camisolas de Futebol Oficiais | ElevenShirt",
    description: "Descobre a mystery box de camisolas de futebol oficiais. Surpresa, autenticidade e exclusividade.",
    url: 'https://q9slqqtxiper1cgp3ka5cacr.macaly.dev',
    siteName: 'ElevenShirt',
    images: [
      {
        url: "https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png",
        width: 1200,
        height: 630,
        alt: 'Mystery Box de Camisolas de Futebol Oficiais ElevenShirt',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mystery Box de Camisolas de Futebol Oficiais | ElevenShirt",
    description: "Descobre a mystery box de camisolas de futebol oficiais. Surpresa, autenticidade e exclusividade.",
    images: ["https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  icons: {
    icon: 'https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png',
    shortcut: 'https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png',
    apple: 'https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ConvexClientProvider>
          <Toaster />
        </body>
    </html>
  )
}

