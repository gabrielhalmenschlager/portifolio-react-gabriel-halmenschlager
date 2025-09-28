"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, Download, ExternalLink } from "lucide-react"

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  updated_at: string
}

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const sectionRef = useRef<HTMLElement>(null)
  const { toast } = useToast()

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "gabrielh2007.scs@gmail.com",
      href: "mailto:gabrielh2007.scs@gmail.com",
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "+55 (51) 99540-2759",
      href: "tel:+5551995565922",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Santa Cruz do Sul, RS",
      href: "https://www.google.com/maps/place/Santa+Cruz+do+Sul,+RS",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/gabrielhalmenschlager",
      username: "@gabrielhalmenschlager",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/gabriel-halmenschlager-2bb312302/",
      username: "/in/gabriel-halmenschlager",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/gabriel_halmenschlager/",
      username: "@gabriel_halmenschlager",
    },
  ]

  // Simular dados do GitHub (em produção, usar API real)
  const mockGithubRepos: GitHubRepo[] = [
    {
      id: 1,
      name: "portfolio-website",
      description: "Meu portfólio pessoal desenvolvido com Next.js e Tailwind CSS",
      html_url: "https://github.com/usuario/portfolio-website",
      language: "TypeScript",
      stargazers_count: 24,
      updated_at: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      name: "ecommerce-platform",
      description: "Plataforma de e-commerce completa com React e Node.js",
      html_url: "https://github.com/usuario/ecommerce-platform",
      language: "JavaScript",
      stargazers_count: 18,
      updated_at: "2024-01-10T14:20:00Z",
    },
    {
      id: 3,
      name: "task-manager-app",
      description: "Aplicativo de gerenciamento de tarefas com colaboração em tempo real",
      html_url: "https://github.com/usuario/task-manager-app",
      language: "TypeScript",
      stargazers_count: 31,
      updated_at: "2024-01-08T09:15:00Z",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Simular carregamento dos repositórios do GitHub
          setTimeout(() => {
            setGithubRepos(mockGithubRepos)
          }, 500)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio do formulário
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve!",
      })

      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato diretamente por email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const downloadCV = () => {
    // Simular download do CV
    const link = document.createElement("a")
    link.href = "/cv-joao-silva.pdf"
    link.download = "CV-Joao-Silva.pdf"
    link.click()

    toast({
      title: "Download iniciado",
      description: "O CV está sendo baixado...",
    })
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Vamos Trabalhar Juntos
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Estou sempre aberto a novas oportunidades e projetos interessantes. Entre em contato!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary" />
                    Envie uma Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Nome *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Assunto *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Assunto da mensagem"
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Mensagem *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Descreva seu projeto ou como posso ajudar..."
                        rows={6}
                        className="bg-background resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.label === "Localização" ? "_blank" : undefined}
                      rel={info.label === "Localização" ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors duration-200 group"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{info.label}</div>
                        <div className="font-medium text-foreground">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                          <social.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{social.label}</div>
                          <div className="text-sm text-muted-foreground">{social.username}</div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Download CV */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <Button onClick={downloadCV} variant="outline" size="lg" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* GitHub Activity */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">Atividade Recente no GitHub</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {githubRepos.map((repo, index) => (
                <Card
                  key={repo.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isVisible ? "fadeInUp 0.6s ease-out forwards" : "none",
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {repo.name}
                      </h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>⭐</span>
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{repo.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors duration-200"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <a href="https://github.com/usuario" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Ver todos os repositórios
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
