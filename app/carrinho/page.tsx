import type { Metadata } from 'next'
import CarrinhoPageContent from '@/components/carrinho-page-content'

export const metadata: Metadata = {
  title: 'Carrinho de Compras - Eleven Shirt',
  description: 'Finaliza a tua compra de Mystery Boxes de camisolas de futebol originais.',
}

export default function CarrinhoPage() {
  return <CarrinhoPageContent />
}
