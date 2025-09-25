import type { Metadata } from 'next';
import AdminPageContent from "../components/admin-page-content";

export const metadata: Metadata = {
  title: "Admin Dashboard - Eleven Shirt Blog",
  description: "Interface de administraÃ§Ã£o para gerir artigos e conteÃºdo do blog.",
};

export default function AdminPage() {
  return <AdminPageContent />;
}

