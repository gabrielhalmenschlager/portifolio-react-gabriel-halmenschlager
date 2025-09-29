"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building, GraduationCap } from "lucide-react"

interface Experience {
  id: string
  type: "work" | "education"
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies?: string[]
  current?: boolean
}

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const experiences: Experience[] = [
    {
      id: "1",
      type: "work",
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "São Paulo, SP",
      period: "2022 - Presente",
      current: true,
      description:
        "Liderança técnica no desenvolvimento de aplicações web escaláveis, mentoria de desenvolvedores juniores e implementação de melhores práticas de desenvolvimento.",
      achievements: [
        "Reduziu tempo de carregamento das aplicações em 40%",
        "Implementou arquitetura de microserviços",
        "Liderou equipe de 5 desenvolvedores",
        "Aumentou cobertura de testes para 85%",
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    },
    {
      id: "2",
      type: "work",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Rio de Janeiro, RJ",
      period: "2020 - 2022",
      description:
        "Desenvolvimento de MVP e features para plataforma de e-commerce, trabalhando em ambiente ágil com deploy contínuo.",
      achievements: [
        "Desenvolveu sistema de pagamentos integrado",
        "Criou dashboard administrativo completo",
        "Implementou sistema de notificações em tempo real",
        "Otimizou performance do banco de dados",
      ],
      technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "Redis"],
    },
    {
      id: "3",
      type: "education",
      title: "Bacharelado em Ciência da Computação",
      company: "Universidade Federal do Rio de Janeiro",
      location: "Rio de Janeiro, RJ",
      period: "2016 - 2020",
      description:
        "Formação sólida em fundamentos da computação, algoritmos, estruturas de dados e engenharia de software.",
      achievements: [
        "Projeto de conclusão em Machine Learning",
        "Monitor de Programação Orientada a Objetos",
        "Participação em competições de programação",
        "Iniciação científica em IA",
      ],
    },
    {
      id: "4",
      type: "work",
      title: "Desenvolvedor Frontend",
      company: "WebAgency",
      location: "Rio de Janeiro, RJ",
      period: "2019 - 2020",
      description:
        "Desenvolvimento de interfaces responsivas e interativas para clientes diversos, com foco em experiência do usuário.",
      achievements: [
        "Criou mais de 20 websites responsivos",
        "Implementou animações CSS avançadas",
        "Otimizou SEO e performance",
        "Trabalhou com design systems",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React", "Sass"],
    },
    {
      id: "5",
      type: "work",
      title: "Estagiário de Desenvolvimento",
      company: "TechStart",
      location: "Rio de Janeiro, RJ",
      period: "2018 - 2019",
      description:
        "Primeiro contato profissional com desenvolvimento web, aprendendo boas práticas e metodologias ágeis.",
      achievements: [
        "Desenvolveu componentes reutilizáveis",
        "Participou de code reviews",
        "Aprendeu metodologias ágeis",
        "Contribuiu para documentação técnica",
      ],
      technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap"],
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Experiência & Educação
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Minha jornada profissional e acadêmica ao longo dos anos
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : `opacity-0 ${index % 2 === 0 ? "-translate-x-10" : "translate-x-10"}`
                  }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-2 md:-translate-x-2 z-10">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            {exp.type === "work" ? (
                              <Building className="h-5 w-5 text-primary" />
                            ) : (
                              <GraduationCap className="h-5 w-5 text-primary" />
                            )}
                            <Badge variant={exp.current ? "default" : "secondary"} className="text-xs">
                              {exp.current ? "Atual" : exp.type === "work" ? "Trabalho" : "Educação"}
                            </Badge>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2">{exp.title}</h3>
                        <h4 className="text-lg font-semibold text-primary mb-3">{exp.company}</h4>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                        {exp.achievements.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-semibold text-foreground mb-2">Principais conquistas:</h5>
                            <ul className="space-y-1">
                              {exp.achievements.map((ach, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {exp.technologies && (
                          <div>
                            <h5 className="font-semibold text-foreground mb-2">Tecnologias:</h5>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Period Badge */}
                  <div
                    className={`hidden md:block absolute top-6 ${
                      index % 2 === 0 ? "right-4" : "left-4"
                    } bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {exp.period.split(" - ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5+", label: "Anos de Experiência" },
              { number: "4", label: "Empresas" },
              { number: "15+", label: "Tecnologias" },
              { number: "1", label: "Graduação" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
