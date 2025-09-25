import { preloadQuery } from "convex/nextjs";
import api from "@/convex/_generated/api";
import BlogPageClient from "@/components/blog-page-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Camisolas Retro e Oficiais de Futebol | Blog ElevenShirt',
  description: 'Artigos sobre camisolas de futebol retro, oficiais e mystery boxes. Aprende, coleciona e descobre.',
  openGraph: {
    title: 'Camisolas Retro e Oficiais de Futebol | Blog ElevenShirt',
    description: 'Artigos sobre camisolas de futebol retro, oficiais e mystery boxes. Aprende, coleciona e descobre.',
    images: ['https://assets.macaly-user-data.dev/cdn-cgi/image/fit=scale-down,width=2000,height=2000,format=webp,quality=90/uddcboaoghiy5jvcgw27q2gs/q9slqqtxiper1cgp3ka5cacr/7ZqSxbGbgCd0hQaaixpdy/captura-de-ecra-2025-08-26-120014.png'],
  },
}

export default async function BlogPage() {
  const preloadedArticles = await preloadQuery(api.articles.getPublished);
  return <BlogPageClient preloadedArticles={preloadedArticles} />;
}
