"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"
import { ProjectModal } from "./project-modal"

const projects = [
  {
    title: "Connect Auth",
    description: "Serviço OIDC multi-tenant com OTP + JWT RS256",
    fullDescription:
      "Single source of truth de autenticação pra toda a plataforma Connect Softhouse. Multi-tenant, OTP via WhatsApp/Email, RBAC completo, JWT RS256 com JWKS público pra validação descentralizada, rotação de refresh token com detecção de replay. Argon2id, rate limit sliding window, audit log estruturado, admin UI completa. Deployed via Coolify + Traefik.",
    technologies: ["FastAPI", "SQLAlchemy async", "PostgreSQL", "Redis", "React 19", "Argon2id", "JWT RS256"],
    image: "./connect-auth.jpg",
    github: "https://github.com/Luizhcrs/connect-auth",
    demo: "https://auth.connectsofthouse.com.br",
  },
  {
    title: "Connect Payment",
    description: "Gateway federado Stripe + Pix (Mercado Pago)",
    fullDescription:
      "Serviço de pagamento multi-account federado: cada tenant tem suas próprias credenciais Stripe/MP criptografadas at-rest com Fernet. Webhooks idempotentes com HMAC + pg_advisory_xact_lock, refund via gateway correto, dashboard com métricas 7 dias, admin UI pra configurar credenciais sem tocar em curl. Integra JWT do Connect Auth via JWKS.",
    technologies: ["FastAPI", "Stripe API", "Mercado Pago", "Fernet AES", "PostgreSQL", "Webhooks HMAC", "React 19"],
    image: "./connect-payment.jpg",
    github: "https://github.com/Luizhcrs/connect-payment",
    demo: "https://payment.connectsofthouse.com.br",
  },
  {
    title: "BM Seletor",
    description: "Modding de PES 2021 via reverse engineering",
    fullDescription:
      "Ferramenta desktop (Electron + TypeScript) pra modificar save files e CPK do eFootball PES 2021. Inclui decifrador MT19937 XOR próprio, parser de estruturas binárias custom, injeção de patches no executável e re-criptografia. Trabalho de RE profundo — mapeamento manual de offsets via diff byte-a-byte de saves, documentado em Obsidian.",
    technologies: ["Electron", "TypeScript", "C#", "CriPakTools", "MT19937", "Reverse Engineering"],
    image: "./bmseletor.jpg",
    github: "https://github.com/Luizhcrs/bmliga",
    demo: "#",
  },
  {
    title: "Evolution Shared",
    description: "WhatsApp API multi-tenant como serviço compartilhado",
    fullDescription:
      "Instância Evolution API compartilhada entre todos os produtos da plataforma. Traefik com basic auth bcrypt cost 12 em endpoints administrativos, Redis autenticado, Postgres dedicado, docker-socket-proxy planejado. Serve o envio de OTP do Connect Auth e chatbots dos produtos Connect.",
    technologies: ["Evolution API", "PostgreSQL", "Redis", "Traefik", "Docker Compose", "Coolify"],
    image: "./evolution-shared.jpg",
    github: "https://github.com/Luizhcrs/evolution-shared",
    demo: "#",
  },
  {
    title: "Carteira IA",
    description: "Gestão financeira pessoal com IA + Stripe",
    fullDescription:
      "SaaS de gestão financeira com integração Stripe pra billing. Dashboard analítico, categorização automática de transações por IA, multi-provedor de billing. Em produção em carteira-ia.com.",
    technologies: ["FastAPI", "React", "Stripe", "PostgreSQL", "LLM"],
    image: "./carteira-ia.jpg",
    github: "https://github.com/Luizhcrs/carteira-ia",
    demo: "#",
  },
  {
    title: "GoMov",
    description: "SaaS multi-tenant pra locadoras de moto",
    fullDescription:
      "Plataforma completa pra gestão de locadoras de moto: contratos, pagamentos recorrentes via Stripe, dashboards operacionais, integração com WhatsApp via Evolution shared. Arquitetura MCP, em migração Rust→Python. Multi-tenant com isolamento por dados.",
    technologies: ["FastAPI", "PostgreSQL", "Stripe Subscriptions", "React", "MCP", "Multi-tenant"],
    image: "./gomov.jpg",
    github: "https://github.com/Luizhcrs/GoMov",
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
          Plataforma Connect Softhouse e projetos em produção
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
