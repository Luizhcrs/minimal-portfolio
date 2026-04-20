"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"
import { ProjectModal } from "./project-modal"

const projects = [
  {
    title: "Orb",
    description: "Assistente AI flutuante pra desktop",
    fullDescription:
      "Aplicação desktop que mantém um assistente AI sempre acessível, flutuante na tela. Integra modelos locais e remotos, com foco em produtividade e interação natural. Escrita em C# .NET.",
    technologies: ["C#", ".NET", "Desktop", "AI/LLM"],
    image: "./orb-preview.jpg",
    github: "https://github.com/Luizhcrs/orb",
    demo: "#",
  },
  {
    title: "FlowAgentic",
    description: "Framework de agentes autônomos em TypeScript",
    fullDescription:
      "Infraestrutura pra composição de agentes AI com fluxos determinísticos e estado persistente. Construído em TypeScript moderno.",
    technologies: ["TypeScript", "Node.js", "Agentes AI", "LLM"],
    image: "./flowagentic.jpg",
    github: "https://github.com/Luizhcrs/FlowAgentic",
    demo: "#",
  },
  {
    title: "LuminAI",
    description: "Aplicação AI mobile em Kotlin",
    fullDescription:
      "Aplicativo Android focado em assistência via LLM com interface nativa. Kotlin + componentes modernos do ecossistema Android.",
    technologies: ["Kotlin", "Android", "LLM", "Mobile"],
    image: "./luminai.jpg",
    github: "https://github.com/Luizhcrs/LuminAI",
    demo: "#",
  },
  {
    title: "Automação de Testes",
    description: "Framework completo com Selenium + Pytest",
    fullDescription:
      "Framework robusto de automação end-to-end: relatórios detalhados, screenshots de falhas, execução paralela e integração com CI/CD. Reduz drasticamente o tempo de testes manuais em aplicações web.",
    technologies: ["Python", "Selenium", "Pytest", "CI/CD", "Allure"],
    image: "./test-automation.jpg",
    github: "https://github.com/Luizhcrs",
    demo: "#",
  },
  {
    title: "Reverse Engineering",
    description: "Análise binária e patching de formatos custom",
    fullDescription:
      "Trabalhos de engenharia reversa em formatos proprietários: decifrar streams XOR MT19937, mapear estruturas binárias byte a byte via diff de arquivos, gerar patches cirúrgicos em executáveis. Ferramental em TypeScript/Python.",
    technologies: ["TypeScript", "Binary Analysis", "MT19937", "Patching"],
    image: "./re-work.jpg",
    github: "https://github.com/Luizhcrs",
    demo: "#",
  },
  {
    title: "Análise de Dados",
    description: "Pipelines de dados e visualização interativa",
    fullDescription:
      "Processamento de datasets grandes, identificação de padrões e dashboards. Stack Python com Pandas e visualizações em Metabase/Matplotlib.",
    technologies: ["Python", "Pandas", "SQL", "Metabase"],
    image: "./data-analysis.jpg",
    github: "https://github.com/Luizhcrs",
    demo: "#",
  },
]

export function Projects() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null)

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-black dark:text-white">
          Projetos
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg">
          Uma seleção dos trabalhos públicos
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              onClick={() => setSelected(project)}
              className="group cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
                <span className="text-5xl font-bold text-gray-300 dark:text-gray-700 tracking-tight">
                  {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      Código
                    </a>
                  </Button>
                  {project.demo !== "#" && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          isOpen={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
