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
      type: "education",
      title: "Ensino Médio - 3º Ano",
      company: "Escola Estadual de Educação Básica Estado de Goiás",
      location: "Santa Cruz do Sul, RS",
      period: "2023 - Atual",
      description: "Cursando o 3º ano do ensino médio, focado em tecnologia.",
      achievements: ["Projetos escolares de tecnologia", "Atividades em grupo", "Destaque em matemática e informática"],
      current: true,
    },
    {
      id: "2",
      type: "education",
      title: "Lógica de Programação",
      company: "Senac RS",
      location: "Santa Cruz do Sul, RS",
      period: "Set 2023 - Nov 2023",
      description: "Curso introdutório em lógica de programação web.",
      achievements: ["Fundamentos de programação", "Resolução de problemas", "Pequenos projetos práticos"],
      technologies: ["HTML", "CSS", "JavaScript"],
    },   
    {
      id: "3",
      type: "education",
      title: "Curso Técnico em TI",
      company: "Senac RS",
      location: "Santa Cruz do Sul, RS",
      period: "2024 - 2026",
      description: "Técnico em TI com foco em Back-End (.NET, C#) e desenvolvimento web.",
      achievements: ["Desenvolvimento web", "Projetos de TI", "Manutenção de computadores"],
      technologies: ["C#", ".NET", "PHP", "Python", "Django", "HTML5", "CSS", "JS", "MySQL", "Git"],
      current: true,
    }    
  ]

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.3 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Experiência & Educação</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Minha jornada profissional e acadêmica ao longo dos anos
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <Card key={exp.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    {exp.type === "work" ? <Building className="h-4 w-4 text-primary" /> : <GraduationCap className="h-4 w-4 text-primary" />}
                    <Badge variant={exp.current ? "default" : "secondary"} className="text-xs">
                      {exp.current ? "Atual" : exp.type === "work" ? "Trabalho" : "Educação"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                  <h4 className="text-sm text-primary mb-2">{exp.company}</h4>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {exp.period}</div>
                    <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {exp.location}</div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                      {exp.achievements.slice(0, 2).map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                      {exp.achievements.length > 2 && <li>...</li>}
                    </ul>
                  )}
                  {exp.technologies && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {exp.technologies.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                      {exp.technologies.length > 5 && <Badge variant="outline" className="text-xs">...</Badge>}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs sm:text-sm">
            {[
              { number: "2+", label: "Anos de Estudos em TI" },
              { number: "14", label: "Formações / Cursos" },
              { number: "20+", label: "Tecnologias" },
              { number: "1", label: "Experiência Profissional" },
            ].map((stat, i) => (
              <div key={i} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="text-lg sm:text-xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
