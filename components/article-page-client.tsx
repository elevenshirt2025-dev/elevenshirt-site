"use client";

import { usePreloadedQuery, Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function ArticlePageClient(props: {
  preloadedArticle: Preloaded<typeof api.articles.getBySlug>;
}) {
  const article = usePreloadedQuery(props.preloadedArticle);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo Não Encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O artigo que procuras não existe ou foi removido.
          </p>
          <Button asChild>
            <Link href="/blog">← Voltar ao Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Button asChild variant="ghost">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Blog
              </Link>
            </Button>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/">Site Principal</Link>
              </Button>
              <Button asChild>
                <Link href="/admin">Admin Panel</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex gap-4 mb-4">
              <Badge variant="secondary">
                {new Date(article.createdAt).toLocaleDateString('pt-PT')}
              </Badge>
              <Badge variant="outline">
                Por {article.author.name}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            {article.excerpt && (
              <p className="text-xl text-muted-foreground">
                {article.excerpt}
              </p>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-12 pt-8 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Publicado em {new Date(article.createdAt).toLocaleDateString('pt-PT')}
                {article.updatedAt !== article.createdAt && (
                  <span> • Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-PT')}</span>
                )}
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">← Voltar ao Blog</Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}