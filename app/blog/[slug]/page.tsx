import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import ArticlePageClient from "@/components/article-page-client";
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug.replace(/-/g, ' ')} - Eleven Shirt Blog`,
    description: `Lê sobre ${slug.replace(/-/g, ' ')} no blog da Eleven Shirt`,
    openGraph: {
      title: `${slug.replace(/-/g, ' ')} - Eleven Shirt Blog`,
      description: `Lê sobre ${slug.replace(/-/g, ' ')} no blog da Eleven Shirt`,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const preloadedArticle = await preloadQuery(api.articles.getBySlug, { slug });

  return <ArticlePageClient preloadedArticle={preloadedArticle} />;
}