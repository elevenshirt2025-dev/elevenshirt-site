"use client";

import { usePreloadedQuery, Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BlogPageClient(props: {
  preloadedArticles: Preloaded<typeof api.articles.getPublished>;
}) {
  const articles = usePreloadedQuery(props.preloadedArticles);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
                Eleven Shirt
              </Link>
              <p className="text-muted-foreground">Blog & Novidades</p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/">← Voltar ao Site</Link>
              </Button>
              <Button asChild>
                <Link href="/admin">Admin Panel</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tudo sobre camisolas de futebol retro e oficiais</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Descobre as últimas novidades sobre camisolas de futebol, mystery boxes e muito mais
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-4">Ainda não há artigos</h3>
            <p className="text-muted-foreground mb-6">
              Em breve teremos conteúdo exclusivo sobre o mundo do futebol!
            </p>
            <Button asChild>
              <Link href="/admin">Criar Primeiro Artigo</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 max-w-4xl mx-auto">
            {articles.map((article) => (
              <Card key={article._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">
                      {new Date(article.createdAt).toLocaleDateString('pt-PT')}
                    </Badge>
                    <Badge variant="outline">
                      Por {article.author.name}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">
                    <Link 
                      href={`/blog/${article.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {article.excerpt && (
                    <p className="text-muted-foreground mb-4">
                      {article.excerpt}
                    </p>
                  )}
                  <Button asChild variant="outline">
                    <Link href={`/blog/${article.slug}`}>
                      Ler Mais →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
