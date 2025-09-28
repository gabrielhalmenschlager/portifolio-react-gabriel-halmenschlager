"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Zap, Users } from "lucide-react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const specialties = [
    {
      icon: Code,
      title: "Desenvolvimento",
      description: "Criação de aplicações web modernas com foco em performance e usabilidade.",
    },
    {
      icon: Palette,
      title: "Design",
      description: "Interfaces intuitivas que combinam estética e funcionalidade.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Otimização de aplicações para máxima velocidade e eficiência.",
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Trabalho em equipe e comunicação efetiva em projetos complexos.",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">Sobre Mim</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-6"></div>
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/professional-developer-portrait.png"
                    alt="Gabriel Halmenschlager - Desenvolvedor"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Desenvolvedor Full Stack apaixonado por tecnologia
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Com mais de 5 anos de experiência em desenvolvimento web, especializo-me em criar soluções digitais
                  inovadoras que combinam design excepcional com código limpo e eficiente.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Minha jornada começou com curiosidade sobre como as coisas funcionam na web, e hoje trabalho com as
                  mais modernas tecnologias para transformar ideias em realidade digital.
                </p>
              </div>

              {/* Key Areas */}
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-4">Áreas de Atuação</h4>
                <div className="flex flex-wrap gap-2">
                  {["Frontend", "Backend", "UI/UX", "Mobile", "DevOps", "Consultoria"].map((area) => (
                    <Badge key={area} variant="secondary" className="text-sm">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specialties Grid */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">Minhas Especialidades</h3>
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
