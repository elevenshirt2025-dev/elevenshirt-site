import type { Metadata } from 'next';
import LoginPageContent from '../../components/login-page-content';

export const metadata: Metadata = {
  title: 'Iniciar Sessão - Eleven Shirt',
  description: 'Inicia sessão na tua conta Eleven Shirt para acederes às tuas encomendas, histórico de compras e ofertas exclusivas.',
  openGraph: {
    title: 'Iniciar Sessão - Eleven Shirt',
    description: 'Inicia sessão na tua conta Eleven Shirt para acederes às tuas encomendas, histórico de compras e ofertas exclusivas.',
    images: ['/og-image.jpg'],
  },
};

export default function LoginPage() {
  return <LoginPageContent />;
}