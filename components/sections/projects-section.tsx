"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  category: string
  featured: boolean
}

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const projects: Project[] = [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Plataforma completa de e-commerce com painel administrativo",
      longDescription:
        "Sistema completo de e-commerce desenvolvido com Next.js, incluindo carrinho de compras, sistema de pagamento, painel administrativo e dashboard de vendas.",
      image: "/ecommerce-dashboard-preview.jpg",
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      githubUrl: "https://github.com/usuario/ecommerce",
      liveUrl: "https://ecommerce-demo.vercel.app",
      category: "fullstack",
      featured: true,
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Aplicativo de gerenciamento de tarefas com colaboração em tempo real",
      longDescription:
        "Aplicativo de produtividade com funcionalidades de colaboração em tempo real, drag & drop, notificações push e sincronização entre dispositivos.",
      image: "/task-management-app-preview.jpg",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      githubUrl: "https://github.com/usuario/task-app",
      liveUrl: "https://task-app-demo.vercel.app",
      category: "fullstack",
      featured: true,
    },
    {
      id: "3",
      title: "Weather Dashboard",
      description: "Dashboard meteorológico com visualizações interativas",
      longDescription:
        "Dashboard responsivo que exibe dados meteorológicos com gráficos interativos, previsões detalhadas e mapas de temperatura.",
      image: "/weather-dashboard-preview.jpg",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind"],
      githubUrl: "https://github.com/usuario/weather-dashboard",
      liveUrl: "https://weather-dashboard-demo.vercel.app",
      category: "frontend",
      featured: false,
    },
    {
      id: "4",
      title: "AI Chat Assistant",
      description: "Assistente de chat inteligente com processamento de linguagem natural",
      longDescription:
        "Chatbot inteligente integrado com APIs de IA para processamento de linguagem natural, com interface conversacional moderna.",
      image: "/ai-chat-assistant-preview.jpg",
      technologies: ["React", "OpenAI API", "Python", "FastAPI", "WebSocket"],
      githubUrl: "https://github.com/usuario/ai-chat",
      liveUrl: "https://ai-chat-demo.vercel.app",
      category: "ai",
      featured: true,
    },
    {
      id: "5",
      title: "Portfolio Website",
      description: "Site de portfólio responsivo com animações suaves",
      longDescription: "Website de portfólio moderno com animações CSS avançadas, otimizado para performance e SEO.",
      image: "/portfolio-website-preview.jpg",
      technologies: ["Next.js", "Framer Motion", "Tailwind", "MDX"],
      githubUrl: "https://github.com/usuario/portfolio",
      liveUrl: "https://portfolio-demo.vercel.app",
      category: "frontend",
      featured: false,
    },
    {
      id: "6",
      title: "API Gateway",
      description: "Gateway de APIs com autenticação e rate limiting",
      longDescription:
        "Sistema de gateway para APIs com funcionalidades de autenticação, rate limiting, logging e monitoramento.",
      image: "/api-gateway-preview.jpg",
      technologies: ["Node.js", "Express", "Redis", "JWT", "Docker"],
      githubUrl: "https://github.com/usuario/api-gateway",
      liveUrl: "https://api-gateway-docs.vercel.app",
      category: "backend",
      featured: false,
    },
  ]

  const categories = [
    { id: "all", label: "Todos" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "ai", label: "IA & ML" },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Meus Projetos
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Uma seleção dos meus trabalhos mais recentes e impactantes
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all duration-200 hover:scale-105"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Projetos em Destaque</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {projects
                .filter((project) => project.featured)
                .slice(0, 2)
                .map((project, index) => (
                  <Card
                    key={project.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/50"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-4">
                          <Button size="sm" variant="secondary" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Demo
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Código
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-foreground mb-3">{project.title}</h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {hoveredProject === project.id ? project.longDescription : project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ver Projeto
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find((c) => c.id === project.category)?.label}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-foreground mb-2">{project.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">Interessado em ver mais projetos?</p>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/usuario" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                Ver todos no GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
