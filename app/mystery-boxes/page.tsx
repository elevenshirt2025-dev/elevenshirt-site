import type { Metadata } from 'next';
import MysteryBoxesPageContent from '../../components/mystery-boxes-page-content';

export const metadata: Metadata = {
  title: 'Mystery Boxes de Camisolas de Futebol | ElevenShirt',
  description: 'Descobre as nossas mystery boxes de camisolas de futebol oficiais. Camisolas retro e modernas numa experiência única de surpresa.',
  openGraph: {
    title: 'Mystery Boxes de Camisolas de Futebol | ElevenShirt',
    description: 'Descobre as nossas mystery boxes de camisolas de futebol oficiais. Camisolas retro e modernas numa experiência única de surpresa.',
    images: ['https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png'],
  },
};

export default function MysteryBoxesPage() {
  return <MysteryBoxesPageContent />;
}