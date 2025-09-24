import type { Metadata } from 'next';
import AdminPageContent from '@/components/admin-page-content';

export const metadata: Metadata = {
  title: "Admin Dashboard - Eleven Shirt Blog",
  description: "Interface de administração para gerir artigos e conteúdo do blog.",
};

export default function AdminPage() {
  return <AdminPageContent />;
}