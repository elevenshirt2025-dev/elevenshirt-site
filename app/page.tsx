import type { Metadata } from "next"
import HomePageContent from "@/components/home-page-content"

console.log("NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);

export const metadata: Metadata = {
  title: 'Mystery Box de Camisolas de Futebol Oficiais | ElevenShirt',
  description: 'Descobre a mystery box de camisolas de futebol oficiais. Surpresa, autenticidade e exclusividade.',
  keywords: 'mystery box, camisolas futebol, jerseys originais, Portugal, Benfica, Porto, Sporting, Real Madrid, Barcelona, Manchester United',
  authors: [{ name: 'Eleven Shirt' }],
  openGraph: {
    title: 'Mystery Box de Camisolas de Futebol Oficiais | ElevenShirt',
    description: 'Descobre a mystery box de camisolas de futebol oficiais. Surpresa, autenticidade e exclusividade.',
    url: 'https://q9slqqtxiper1cgp3ka5cacr.macaly.dev',
    siteName: 'ElevenShirt',
    images: [
      {
        url: 'https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png',
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
    title: 'Mystery Box de Camisolas de Futebol Oficiais | ElevenShirt',
    description: 'Descobre a mystery box de camisolas de futebol oficiais. Surpresa, autenticidade e exclusividade.',
    images: ['https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png'],
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
}

export default function Home() {
  return <HomePageContent />
}
