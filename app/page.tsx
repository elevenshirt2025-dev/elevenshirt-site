import type { Metadata } from "next"
import HomePageContent from "@/components/home-page-content"
import EnvProbe from "./components/EnvProbe";
git add -A && git commit -m "Mover EnvProbe" && git push

export const metadata: Metadata = {
  title: "Mystery Box de Camisolas de Futebol Oficiais | ElevenShirt",
  description: "Descobre a mystery box de camisolas de futebol oficiais. Surpresa, autenticidade e paixão pelo futebol.",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystery Box de Camisolas de Futebol Oficiais | ElevenShirt",
    description: "Descobre a mystery box de camisolas de futebol oficiais. Surpresa, autenticidade e paixão pelo futebol.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=1200,height=630/...",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return (
    <main>
      <HomePageContent />
      <EnvProbe /> {/* 👈 este vai imprimir no console do navegador */}
    </main>
  )
}
