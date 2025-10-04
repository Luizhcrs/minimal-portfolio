"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"
import { ProjectModal } from "./project-modal"

const projects = [
  {
    title: "Agente IA no WhatsApp",
    description: "Integração inteligente com Google Sheets e Streamlit",
    fullDescription:
      "Bot inteligente para WhatsApp que utiliza IA para responder automaticamente mensagens, integrado com Google Sheets para armazenamento de dados e Streamlit para dashboard de análise. Processa linguagem natural e aprende com as interações.",
    technologies: ["Python", "WhatsApp API", "Google Sheets API", "Streamlit", "NLP"],
    image: "./whatsapp-ai-chatbot-interface.jpg",
    github: "#",
    demo: "#",
  },
  {
    title: "Cardápio Digital",
    description: "Sistema de menu dinâmico com Google Sheets",
    fullDescription:
      "Plataforma web responsiva para restaurantes gerenciarem seus cardápios digitalmente. Integração com Google Sheets permite atualização em tempo real dos pratos, preços e disponibilidade sem necessidade de código.",
    technologies: ["React", "Next.js", "Google Sheets API", "Tailwind CSS", "TypeScript"],
    image: "./digital-menu-restaurant-interface.jpg",
    github: "#",
    demo: "#",
  },
  {
    title: "Automação de Testes",
    description: "Framework completo com Selenium e Pytest",
    fullDescription:
      "Framework robusto de automação de testes end-to-end para aplicações web. Inclui relatórios detalhados, screenshots de falhas, execução paralela e integração com CI/CD. Reduz tempo de testes manuais em 80%.",
    technologies: ["Python", "Selenium", "Pytest", "GitHub Actions", "Allure Reports"],
    image: "./test-automation-selenium-dashboard.jpg",
    github: "#",
    demo: "#",
  },
  {
    title: "C# Evolution",
    description: "10 projetos progressivos de estudo em C#",
    fullDescription:
      "Série de 10 projetos que demonstram evolução no aprendizado de C#, desde conceitos básicos até padrões avançados. Inclui POO, LINQ, async/await, Entity Framework, APIs REST e arquitetura limpa.",
    technologies: ["C#", ".NET Core", "Entity Framework", "ASP.NET", "SQL Server"],
    image: "./csharp-code-development-projects.jpg",
    github: "#",
    demo: "#",
  },
  {
    title: "LHC Data Analysis",
    description: "Análise de dados científicos do Large Hadron Collider",
    fullDescription:
      "Análise e visualização de dados reais do CERN. Processamento de grandes volumes de dados de colisões de partículas, identificação de padrões e criação de visualizações interativas para facilitar descobertas científicas.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter", "ROOT"],
    image: "./data-analysis-scientific-visualization.jpg",
    github: "#",
    demo: "#",
  },
  {
    title: "API RESTful E-commerce",
    description: "Backend completo para plataforma de vendas online",
    fullDescription:
      "API RESTful completa para e-commerce com autenticação JWT, gerenciamento de produtos, carrinho de compras, processamento de pagamentos e painel administrativo. Documentação completa com Swagger.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Stripe API", "Swagger"],
    image: "./api-ecommerce-backend-architecture.jpg",
    github: "#",
    demo: "#",
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <>
      <section id="projects" className="py-32 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center space-y-4 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white">Projetos</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Alguns dos meus trabalhos recentes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                onClick={() => handleCardClick(project)}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white hover:shadow-2xl transition-all duration-500 overflow-hidden animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={project.image || "./placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.description}</p>
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-300 dark:border-gray-600 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-300 bg-transparent dark:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.github, "_blank")
                      }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.demo, "_blank")
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal isOpen={isModalOpen} onClose={handleCloseModal} project={selectedProject} />
    </>
  )
}
