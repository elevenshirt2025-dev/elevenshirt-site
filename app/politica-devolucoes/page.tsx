import type { Metadata } from 'next';
import PoliticaDevolucoes from '@/components/politica-devolucoes-content';

export const metadata: Metadata = {
  title: 'Política de Devoluções | Eleven Shirt',
  description: 'Política de devoluções da Eleven Shirt - 30 dias para devolver a tua Mystery Box com reembolso garantido.',
  openGraph: {
    title: 'Política de Devoluções | Eleven Shirt',
    description: 'Política de devoluções da Eleven Shirt - 30 dias para devolver a tua Mystery Box com reembolso garantido.',
    images: ['https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png'],
  },
};

export default function PoliticaDevolucoesPagina() {
  return <PoliticaDevolucoes />;
}