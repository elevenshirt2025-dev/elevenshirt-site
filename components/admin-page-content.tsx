"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { Plus, Edit, Trash2, LogOut, Eye } from "lucide-react";

export default function AdminPageContent() {
  // Authentication state
  const [authStep, setAuthStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  
  // Article management state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<Id<"articles"> | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    published: false,
  });
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const user = useQuery(api.users.currentLoggedInUser);
  const isAdmin = useQuery(api.authz.isAdmin);
  const articlesResult = useQuery(api.articles.getAllForAdmin, isAdmin ? {} : "skip");
  
  const createArticle = useMutation(api.articles.create);
  const updateArticle = useMutation(api.articles.update);
  const deleteArticle = useMutation(api.articles.deleteArticle);
  const autoPromoteAdmin = useMutation(api.users.autoPromoteAdmin);
  const { signIn, signOut } = useAuthActions();

  // Auto-promote admin user when they first log in
  useEffect(() => {
    if (user && user.email === "elevenshirt2025@gmail.com" && user.role !== "admin") {
      autoPromoteAdmin();
    }
  }, [user, autoPromoteAdmin]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({ 
      ...formData, 
      title,
      // Only auto-generate slug if it hasn't been manually edited
      slug: isSlugManuallyEdited ? formData.slug : generateSlug(title)
    });
  };

  const handleSlugChange = (slug: string) => {
    setFormData({ ...formData, slug });
    setIsSlugManuallyEdited(true);
  };

  // Authentication handlers
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const emailValue = formData.get("email") as string;
      setEmail(emailValue);
      await signIn("resend-otp", formData);
      setAuthStep("code");
    } catch (error) {
      console.error("Error sending code:", error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await signIn("resend-otp", formData);
    } catch (error) {
      console.error("Error verifying code:", error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Article management handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const result = await updateArticle({ id: editingId, ...formData });
        if (result.ok) {
          resetForm();
        } else {
          alert(`Erro: ${result.message}`);
        }
      } else {
        const result = await createArticle(formData);
        if (result.ok) {
          resetForm();
        } else {
          alert(`Erro: ${result.message}`);
        }
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "", content: "", excerpt: "", published: false });
    setShowForm(false);
    setEditingId(null);
    setIsSlugManuallyEdited(false);
  };

  const handleEdit = (article: Doc<"articles"> & { author?: { name: string } }) => {
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt || "",
      published: article.published,
    });
    setEditingId(article._id);
    setShowForm(true);
    setIsSlugManuallyEdited(true); // When editing, consider slug as manually set
  };

  const handleDelete = async (id: Id<"articles">) => {
    if (confirm("Tens a certeza que queres eliminar este artigo?")) {
      const result = await deleteArticle({ id: id });
      if (!result.ok) {
        alert(`Erro: ${result.message}`);
      }
    }
  };

  // Loading state
  if (user === undefined || isAdmin === undefined) {
    return <div className="min-h-screen flex items-center justify-center">A carregar...</div>;
  }

  // Login form - shown when user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Login Admin
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {authStep === "email" ? "Introduz o teu email de admin" : "Introduz o código de verificação"}
            </p>
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              ← Voltar ao Site
            </Link>
          </CardHeader>
          <CardContent>
            {authStep === "email" ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Introduz o teu email de admin"
                    disabled={isAuthLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isAuthLoading}>
                  {isAuthLoading ? "A enviar..." : "Enviar Código de Verificação"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <input name="email" value={email} type="hidden" />
                <div>
                  <Label htmlFor="code">Código de Verificação</Label>
                  <Input
                    id="code"
                    name="code"
                    type="text"
                    required
                    placeholder="Introduz o código do teu email"
                    disabled={isAuthLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isAuthLoading}>
                  {isAuthLoading ? "A verificar..." : "Verificar Código"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setAuthStep("email")}
                  disabled={isAuthLoading}
                >
                  Usar email diferente
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Access denied - shown when user is authenticated but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">403 Proibido: Não tens acesso de administrador.</p>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/">Voltar ao Site</Link>
              </Button>
              <Button onClick={() => signOut()} variant="outline">
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading articles
  if (articlesResult === undefined) {
    return <div className="min-h-screen flex items-center justify-center">A carregar...</div>;
  }

  // Error loading articles
  if (!articlesResult.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Erro: {articlesResult.message}</p>
      </div>
    );
  }

  // Main admin dashboard
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard Admin</h1>
              <p className="text-muted-foreground">Gere os artigos do blog</p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/blog">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Blog
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Site
                </Link>
              </Button>
              <Button onClick={() => signOut()} variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Artigos ({articlesResult.articles.length})</h2>
          <Button onClick={() => {
            setShowForm(true);
            setIsSlugManuallyEdited(false); // Reset slug auto-generation for new articles
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Artigo
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Editar Artigo" : "Criar Novo Artigo"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Resumo (opcional)</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    placeholder="Um breve resumo do artigo..."
                  />
                </div>
                <div>
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    required
                    placeholder="Escreve o conteúdo do artigo aqui..."
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Publicado</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">{editingId ? "Atualizar" : "Criar"}</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {articlesResult.articles.map((article) => (
            <Card key={article._id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">/{article.slug}</p>
                    <p className="text-sm text-muted-foreground">
                      {article.published ? "Publicado" : "Rascunho"} • {article.author.name} • {new Date(article.createdAt).toLocaleDateString('pt-PT')}
                    </p>
                    {article.excerpt && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {article.published && (
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/blog/${article.slug}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleEdit(article)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(article._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}