"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, Palette, Cloud } from "lucide-react"

interface Skill {
  name: string
  level: number
  category: string
}

interface SkillCategory {
  title: string
  icon: React.ElementType
  color: string
  skills: Skill[]
}

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({})
  const sectionRef = useRef<HTMLElement>(null)

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      icon: Code2,
      color: "text-blue-500",
      skills: [
        { name: "React", level: 60, category: "frontend" },
        { name: "Next.js", level: 50, category: "frontend" },
        { name: "TypeScript", level: 30, category: "frontend" },
        { name: "Tailwind CSS", level: 40, category: "frontend" },
      ],
    },
    {
      title: "Backend",
      icon: Database,
      color: "text-green-500",
      skills: [
        { name: ".NET & C#", level: 70, category: "backend" },
        { name: "Node.js", level: 50, category: "backend" },
        { name: "PHP", level: 60, category: "backend" },
        { name: "Python", level: 50, category: "backend" },
        { name: "MySQL", level: 80, category: "backend" },
        { name: "SQL Server", level: 75, category: "backend" },
      ],
    },
    {
      title: "Design",
      icon: Palette,
      color: "text-purple-500",
      skills: [
        { name: "Figma", level: 60, category: "design" },
        { name: "UI/UX", level: 75, category: "design" },
      ],
    },
    {
      title: "DevOps & Ferramentas",
      icon: Cloud,
      color: "text-orange-500",
      skills: [
        { name: "Git", level: 85, category: "devops" },
        { name: "GitHub", level: 85, category: "devops" },
        { name: "Postman", level: 80, category: "devops" },
      ],
    },
  ]

  const tools = [
    "VS Code",
    "VS 2022",
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
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          skillCategories.forEach((category) => {
            category.skills.forEach((skill) => {
              setTimeout(() => {
                setAnimatedSkills((prev) => ({
                  ...prev,
                  [skill.name]: skill.level,
                }))
              }, Math.random() * 800)
            })
          })
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Habilidades Técnicas
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Tecnologias e ferramentas que aplico para construir soluções web completas
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <Card
                key={category.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{animatedSkills[skill.name] || 0}%</span>
                      </div>
                      <Progress value={animatedSkills[skill.name] || 0} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tools & Technologies */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-8">Ferramentas & Tecnologias</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <Badge
                key={tool}
                variant="secondary"
                className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out forwards ${index * 0.05}s` : "none",
                }}
              >
                {tool}
              </Badge>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
