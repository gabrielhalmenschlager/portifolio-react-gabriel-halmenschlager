"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, GitBranch, Server } from "lucide-react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // dispara apenas uma vez
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2, // dispara antes de estar totalmente visível
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasMounted])

  const specialties = [
    {
      icon: Code,
      title: "Back-End",
      description: "Desenvolvimento com .NET e C#, APIs e boas práticas como MVC e DDD.",
    },
    {
      icon: Database,
      title: "Bancos de Dados",
      description: "Modelagem e consultas em MySQL e SQL Server para aplicações reais.",
    },
    {
      icon: Server,
      title: "APIs & Integrações",
      description: "Criação, testes e documentação de APIs REST com Postman, GitHub e Swagger.",
    },
    {
      icon: GitBranch,
      title: "Aprendizado Contínuo",
      description: "Explorando PHP, Python, Django e front-end moderno com React, Next.js e Tailwind CSS.",
    },
  ]

  if (!hasMounted) return null // evita SSR

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Sobre Mim
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square relative w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-6"></div>
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/imagem-gabriel-halmenschlager.jpeg"
                    alt="Gabriel Halmenschlager - Desenvolvedor"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">Quem Sou</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sou estudante de <strong>Tecnologia da Informação no SENAC</strong> e desenvolvedor em início de carreira, com foco em <strong>.NET e C#</strong>. Tenho interesse por tecnologia e gosto de entender como os sistemas funcionam por trás das telas, criando soluções eficientes e escaláveis.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Também estudo e aplico outras linguagens como PHP, Python e Django, além de front-end moderno com <strong>React, Next.js, Node.js e Tailwind CSS</strong>. Já desenvolvi APIs, trabalhei com bancos de dados <strong>MySQL e SQL Server</strong> e utilizei ferramentas como <strong>Postman, Swagger, Git e GitHub</strong>.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Atualmente, crio projetos pessoais e soluções para pequenas empresas, aplicando boas práticas de desenvolvimento, padrões de software e arquitetura para entregar aplicações organizadas, funcionais e de qualidade. Busco minha primeira oportunidade profissional para aprender com uma equipe experiente e evoluir junto com o time.
              </p>

              {/* Key Areas */}
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-4">Tecnologias e Ferramentas</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    ".NET",
                    "C#",
                    "PHP",
                    "Python",
                    "Django",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Tailwind CSS",
                    "MySQL",
                    "SQL Server",
                    "Postman",
                    "Swagger",
                    "Git",
                    "GitHub",
                  ].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specialties Grid */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">
              Minhas Especialidades
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialties.map((specialty, index) => (
                <Card
                  key={specialty.title}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <specialty.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{specialty.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{specialty.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
