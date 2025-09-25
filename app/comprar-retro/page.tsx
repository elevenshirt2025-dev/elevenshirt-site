import type { Metadata } from 'next';
import ComprarRetroPageContent from "../components/comprar-retro-page-content";

export const metadata: Metadata = {
  title: 'Comprar Mystery Box de Camisolas de Futebol Retro | ElevenShirt',
  description: 'Encomenda a tua mystery box retro de camisolas vintage. Recebe peÃ§as Ãºnicas dos anos 80, 90 e 2000.',
  openGraph: {
    title: 'Comprar Mystery Box de Camisolas de Futebol Retro | ElevenShirt',
    description: 'Encomenda a tua mystery box retro de camisolas vintage. Recebe peÃ§as Ãºnicas dos anos 80, 90 e 2000.',
    images: ['https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/760AMph8i_Y4CDQQXjkZF/captura-de-ecra-2025-08-27-172101.png'],
  },
};

export default function ComprarRetroPage() {
  return <ComprarRetroPageContent />;
}


