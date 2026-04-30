"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Lock } from "lucide-react"
import { useState } from "react"
import { ProjectModal } from "./project-modal"

type Project = {
  title: string
  kind: "case-study" | "public"
  category: string
  description: string
  fullDescription: string
  technologies: string[]
  highlights?: string[]
  github?: string
  demo?: string
  icon: string
}

const projects: Project[] = [  {
    title: "Glico",
    kind: "public",
    category: "Mobile · Saúde · Sage Calm",
    description: "App Android offline-first pra registro de glicemia em diabetes tipo 1",
    fullDescription:
      "Aplicativo single-user pra registro de glicemia capilar, doses de insulina e episódios de hipoglicemia em T1 diabetes. Offline por construção: dados locais via SQLite, zero backend, zero analytics, zero tracking. Lembretes inteligentes que silenciam quando já houve medição na janela. Backup AES-256-GCM com PBKDF2-SHA256. Identidade visual própria (Sage Calm: verde sálvia + Plus Jakarta Sans + Lucide). Distribuição via APK no GitHub Releases + landing page no GitHub Pages. Cobertura de testes domain layer 99%.",
    technologies: ["React Native", "Expo SDK 54", "TypeScript", "expo-sqlite", "victory-native", "AES-256-GCM", "PBKDF2", "Plus Jakarta Sans", "Lucide"],
    highlights: [
      "Lembretes silenciam automaticamente quando já houve medição na janela ±tolerância",
      "Identidade visual própria: ícone, splash e adaptive Android gerados a partir de SVGs versionados",
      "63 testes (98.7% statements, 100% functions/lines em domain)",
      "PDF report Sage Calm com episódios de hipo + buckets manhã/tarde/noite",
    ],
    github: "https://github.com/Luizhcrs/glico-app",
    demo: "https://luizhcrs.github.io/glico-app/",
    icon: "health",
  },
  {
    title: "tfs-test-runner",
    kind: "public",
    category: "QA · Test Automation · Offline",
    description: "Converte exports xlsx do Azure DevOps em kit HTML de execução de testes offline",
    fullDescription:
      "Ferramenta de QA que transforma exports xlsx do Azure DevOps / TFS em um kit HTML self-contained pra execução de casos de teste, captura de screenshots, tracking de status e geração de PDF de evidência. Funciona 100% offline, sem servidor. Tradução opcional via OpenAI. Bilíngue PT-BR/EN, com docs no GitHub Pages e CI verde. Substitui ferramentas pagas pra times que precisam rodar planos de teste sem infraestrutura adicional.",
    technologies: ["Python", "Jinja2", "HTML/CSS", "PDF generation", "OpenAI API", "GitHub Actions"],
    highlights: [
      "Self-contained HTML — abre em qualquer navegador, sem dependências",
      "Captura de evidência embarcada (screenshots + PDF)",
      "Bilíngue PT-BR / EN com docs estruturadas",
      "CI com gates + GitHub Pages pra documentação",
    ],
    github: "https://github.com/Luizhcrs/tfs-test-runner",
    demo: "https://luizhcrs.github.io/tfs-test-runner/",
    icon: "qa",
  },
  {
    title: "Orb",
    kind: "public",
    category: "Desktop · AI",
    description: "Assistente AI flutuante pra desktop em C# .NET",
    fullDescription:
      "Aplicação desktop que mantém um assistente AI sempre acessível, flutuante na tela. Integra modelos locais e remotos, com foco em produtividade e interação natural.",
    technologies: ["C#", ".NET", "Desktop", "AI/LLM"],
    github: "https://github.com/Luizhcrs/orb",
    icon: "orb",
  },
]

const ICON_MAP: Record<string, JSX.Element> = {
  health: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  ),
  qa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <polyline points="9 11 11 13 15 9" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  ),
  auth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" />
    </svg>
  ),
  saas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  orb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    </svg>
  ),
  agent: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="3" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      <path d="M5 12h2M17 12h2" />
    </svg>
  ),
  re: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            Trabalhos &amp; Projetos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Seleção de projetos públicos com código aberto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              onClick={() => setSelected(project)}
              className="group cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 flex flex-col"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors">
                <div className="w-20 h-20">
                  {ICON_MAP[project.icon]}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                    {project.category}
                  </span>
                  {project.kind === "case-study" && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <Lock className="w-3 h-3" />
                      Privado
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 text-black dark:text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] px-2 py-0.5 text-gray-500 dark:text-gray-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  {project.github ? (
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
                  ) : (
                    <span className="text-xs text-gray-400 dark:text-gray-600 px-2 py-1">
                      Código privado
                    </span>
                  )}
                  {project.demo && (
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
                  <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                    Ver detalhes →
                  </span>
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
