import type { Metadata } from 'next';
import ComprarPageContent from '../../components/comprar-page-content';

export const metadata: Metadata = {
  title: 'Comprar Mystery Box de Camisolas de Futebol | ElevenShirt',
  description: 'Encomenda a tua mystery box de camisolas oficiais. Recebe peças únicas, retro e modernas.',
  openGraph: {
    title: 'Comprar Mystery Box de Camisolas de Futebol | ElevenShirt',
    description: 'Encomenda a tua mystery box de camisolas oficiais. Recebe peças únicas, retro e modernas.',
    images: ['https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/LhcdHEv4MWu4nFDqCtP6N/captura-de-ecra-2025-08-27-172040.png'],
  },
};

export default function ComprarPage() {
  return <ComprarPageContent />;
}
