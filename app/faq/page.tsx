import type { Metadata } from 'next';
import FaqPageContent from '@/components/faq-page-content';

export const metadata: Metadata = {
  title: 'FAQ - Perguntas Frequentes | Eleven Shirt',
  description: 'Encontra respostas às perguntas mais frequentes sobre as Mystery Boxes da Eleven Shirt. Camisolas 100% originais, envios, devoluções e muito mais.',
  openGraph: {
    title: 'FAQ - Perguntas Frequentes | Eleven Shirt',
    description: 'Encontra respostas às perguntas mais frequentes sobre as Mystery Boxes da Eleven Shirt. Camisolas 100% originais, envios, devoluções e muito mais.',
    images: ['https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png'],
  },
};

export default function FaqPage() {
  return <FaqPageContent />;
}