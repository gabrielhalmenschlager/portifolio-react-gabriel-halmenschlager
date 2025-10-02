"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const projects = [
  // {
  //   title: "Car Sales Website",
  //   category: "Desenvolvimento Web",
  //   description: "Website para venda de carros com interface moderna e responsiva",
  //   images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  //   githubUrl: "https://github.com/gabrielhalmenschlager/car-sales-website",
  // },
  {
    title: "Controle de Ativos Senac",
    category: "Sistema de Gestão",
    description: "Sistema para controle e gestão de ativos empresariais",
    images: [
      "/controle-ativos/img1.jpeg",
      "/controle-ativos/img2.jpeg",
      "/controle-ativos/img3.jpeg",
      "/controle-ativos/img4.jpeg",
      "/controle-ativos/img5.jpeg",
      "/controle-ativos/img6.jpeg",
      "/controle-ativos/img7.jpeg",
      "/controle-ativos/img8.jpeg",
      "/controle-ativos/img9.jpeg",
      "/controle-ativos/img10.jpeg",
      "/controle-ativos/img11.jpeg",
      "/controle-ativos/img12.jpeg",
      "/controle-ativos/img13.jpeg",
      "/controle-ativos/img14.jpeg",
      "/controle-ativos/img15.jpeg",
      "/controle-ativos/img16.jpeg",
      "/controle-ativos/img17.jpeg",
      "/controle-ativos/img18.jpeg",
      "/controle-ativos/img19.jpeg",
    ],
    githubUrl: "https://github.com/gabrielhalmenschlager/controle-de-ativos-senac",
  },
  {
    title: "Sieg Gestão Escolar",
    category: "Sistema de Gestão",
    description: "Sistema completo de gestão escolar com CRUD para professores, alunos e cursos",
    images: [
      "/sieg-gestao-escolar/img1.png",
      "/sieg-gestao-escolar/img2.png",
      "/sieg-gestao-escolar/img3.png",
      "/sieg-gestao-escolar/img4.png",
      "/sieg-gestao-escolar/img5.png",
      "/sieg-gestao-escolar/img6.png",
      "/sieg-gestao-escolar/img7.png",
      "/sieg-gestao-escolar/img8.png",
      "/sieg-gestao-escolar/img9.png",
      "/sieg-gestao-escolar/img10.png",
      "/sieg-gestao-escolar/img11.png",
      "/sieg-gestao-escolar/img12.png",
      "/sieg-gestao-escolar/img13.png",
      "/sieg-gestao-escolar/img14.png",
      "/sieg-gestao-escolar/img15.png",
      "/sieg-gestao-escolar/img16.png",
    ],
    githubUrl: "https://github.com/gabrielhalmenschlager/Senac.SiegGestaoEscolar",
  },
  {
    title: "Sistema Biblioteca Senac",
    category: "Sistema de Gestão",
    description: "Sistema completo de gestão de biblioteca com controle de empréstimos",
    images: [
      "/sistema-biblioteca/img1.png",
      "/sistema-biblioteca/img2.png",
      "/sistema-biblioteca/img3.png",
      "/sistema-biblioteca/img4.png",
      "/sistema-biblioteca/img5.png"
    ],
    githubUrl: "https://github.com/gabrielhalmenschlager/sistemaBibliotecaSenac",
  },  
]

export function PortfolioSection() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            projects.forEach((_, index) => {
              setTimeout(() => {
                setVisibleProjects((prev) => [...prev, index])
              }, index * 100) // delay sequencial
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const nextImage = (projectIndex: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const project = projects[projectIndex]
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] ?? 0) + 1) % project.images.length
    }))
  }

  const prevImage = (projectIndex: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const project = projects[projectIndex]
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectIndex]: prev[projectIndex] === 0 ? project.images.length - 1 : (prev[projectIndex] ?? 0) - 1
    }))
  }

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 md:py-32 bg-accent/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance transition-all duration-700 ${
              visibleProjects.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Projetos Recentes
          </h2>
          <div
            className={`h-1 w-16 md:w-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/70 to-primary/30 transition-all duration-700 origin-center ${
              visibleProjects.length > 0 ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
          <p
            className={`text-lg text-muted-foreground text-pretty leading-relaxed transition-all duration-700 delay-100 ${
              visibleProjects.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Conheça alguns dos projetos que desenvolvemos para nossos clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 ${
                visibleProjects.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => setOpenProjectIndex(index)}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.images[currentImageIndex[index] || 0] || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => prevImage(index, e)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ChevronLeft className="w-4 h-4 text-foreground" />
                    </button>
                    <button
                      onClick={(e) => nextImage(index, e)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ChevronRight className="w-4 h-4 text-foreground" />
                    </button>
                  </>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.githubUrl, "_blank")
                  }}
                  className="absolute top-2 right-2 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ExternalLink className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <CardContent className="p-6">
                <span className="text-sm text-muted-foreground">{project.category}</span>
                <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal de galeria */}
      <Dialog open={openProjectIndex !== null} onOpenChange={(open) => !open && setOpenProjectIndex(null)}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden" showCloseButton>
          {openProjectIndex !== null && (
            <div className="bg-background">
              <DialogHeader className="px-6 pt-6">
                <DialogTitle>{projects[openProjectIndex].title}</DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                  <img
                    src={projects[openProjectIndex].images[currentImageIndex[openProjectIndex] || 0]}
                    alt={projects[openProjectIndex].title}
                    className="w-full h-full object-cover"
                  />
                  {projects[openProjectIndex].images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => prevImage(openProjectIndex, e)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 hover:bg-background rounded-full flex items-center justify-center shadow"
                      >
                        <ChevronLeft className="w-5 h-5 text-foreground" />
                      </button>
                      <button
                        onClick={(e) => nextImage(openProjectIndex, e)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 hover:bg-background rounded-full flex items-center justify-center shadow"
                      >
                        <ChevronRight className="w-5 h-5 text-foreground" />
                      </button>
                    </>
                  )}
                </div>

                {projects[openProjectIndex].images.length > 1 && (
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {projects[openProjectIndex].images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(prev => ({ ...prev, [openProjectIndex]: i }))}
                        className={`relative aspect-video rounded overflow-hidden border ${
                          (currentImageIndex[openProjectIndex] || 0) === i ? 'border-foreground' : 'border-border'
                        }`}
                      >
                        <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
