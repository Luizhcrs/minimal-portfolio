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

const projects: Project[] = [
  {
    title: "Plataforma de identidade multi-tenant",
    kind: "case-study",
    category: "Auth · OIDC · Multi-tenant",
    description: "Serviço central de autenticação com RBAC completo, OTP multicanal e JWT RS256",
    fullDescription:
      "Serviço OIDC-compliant construído pra ser o single source of truth de autenticação de uma plataforma multi-produto. Multi-tenant isolado por design, RBAC com roles + permissions hierárquicas, OTP via WhatsApp e email com rate limiting por Redis. JWT RS256 com JWKS público permite aos produtos consumidores validarem tokens sem round-trip. Refresh tokens opacos com hash-only no DB e rotação com detecção de replay — reuso de token já consumido dispara revogação da cadeia inteira. Admin UI completa com dashboard, audit log estruturado e gestão de API keys.",
    technologies: ["FastAPI", "SQLAlchemy async", "PostgreSQL", "Redis", "Argon2id", "JWT RS256", "React 19", "Docker"],
    highlights: [
      "OIDC discovery + JWKS público pra integração descentralizada",
      "Refresh token rotation com replay detection revogando cadeia inteira",
      "Rate limit sliding window + bootstrap idempotente de admin",
      "Audit trail completo com eventos namespaced (auth.otp.sent, auth.login.failed)",
    ],
    icon: "auth",
  },
  {
    title: "Gateway federado de pagamentos",
    kind: "case-study",
    category: "Pagamentos · Stripe · Pix",
    description: "Multi-account federado com credenciais por tenant encriptadas at-rest (Fernet AES)",
    fullDescription:
      "Serviço de cobrança que suporta Stripe (cartão) e Mercado Pago (Pix) operando em modelo federado: cada tenant configura suas próprias credenciais de gateway, encriptadas at-rest com chave-mestre Fernet. Webhooks path-per-tenant com validação HMAC + pg_advisory_xact_lock pra serializar retentativas do gateway e impedir contabilização duplicada. Refund via SDK do provedor correto, audit log pra toda mutação de config. Admin UI com dashboard de volume 24h/7d, listagem de pagamentos com filtros, viewer de webhooks pra debug.",
    technologies: ["FastAPI", "Stripe SDK", "Mercado Pago", "Fernet AES-128", "PostgreSQL", "Webhooks HMAC", "React 19"],
    highlights: [
      "Credenciais de gateway encriptadas por tenant (zero compartilhamento)",
      "Webhook idempotente com advisory lock (sem double-charging em retry)",
      "Rate limit EXPIRE NX correto (sliding window real)",
      "Security review multi-agente antes do deploy em prod",
    ],
    icon: "payment",
  },
  {
    title: "SaaS de gestão operacional multi-tenant",
    kind: "case-study",
    category: "SaaS · Multi-tenant · B2B",
    description: "Plataforma B2B com contratos, pagamentos recorrentes e integrações em tempo real",
    fullDescription:
      "SaaS multi-tenant construído pra gestão operacional completa: contratos, pagamentos recorrentes via assinaturas Stripe, dashboards, comunicação via WhatsApp e email, isolamento de dados por tenant. Arquitetura baseada em MCP (Model Context Protocol) pra integração com agentes. Stack FastAPI + React, banco único com row-level filtering, observabilidade estruturada.",
    technologies: ["FastAPI", "PostgreSQL", "Stripe Subscriptions", "React", "MCP", "Docker", "Traefik"],
    highlights: [
      "Isolamento multi-tenant via tenant_id FK em todo modelo",
      "Assinaturas recorrentes com lifecycle completo (trial → active → past_due)",
      "Integrações síncronas e assíncronas (WhatsApp, email, webhooks externos)",
    ],
    icon: "saas",
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
  {
    title: "FlowAgentic",
    kind: "public",
    category: "Agentes AI · TypeScript",
    description: "Framework de composição de agentes autônomos em TypeScript",
    fullDescription:
      "Infraestrutura pra composição de agentes AI com fluxos determinísticos e estado persistente. Construído em TypeScript moderno.",
    technologies: ["TypeScript", "Node.js", "Agentes AI", "LLM"],
    github: "https://github.com/Luizhcrs/FlowAgentic",
    icon: "agent",
  },
  {
    title: "Reverse Engineering de formato proprietário",
    kind: "case-study",
    category: "RE · Binary Analysis",
    description: "Decifragem e patching de arquivos de save de um jogo comercial",
    fullDescription:
      "Trabalho de engenharia reversa em formato proprietário de arquivos de save de um jogo de console/PC. Implementação do algoritmo de cifragem (MT19937 XOR stream) em TypeScript a partir de análise estática, mapeamento byte-a-byte de estruturas binárias via diff de saves, injeção de patches cirúrgicos em executáveis + recifragem. Ferramental em Electron pra expor o trabalho via UI.",
    technologies: ["Electron", "TypeScript", "C#", "Binary Analysis", "MT19937", "Reverse Engineering"],
    highlights: [
      "Reimplementação de stream cipher via RE estática",
      "Mapeamento manual de ~50 campos de save via diff byte-a-byte",
      "UI desktop com hot-reload dos patches",
    ],
    icon: "re",
  },
]

const ICON_MAP: Record<string, JSX.Element> = {
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
            Seleção de case studies de trabalhos em produção e projetos públicos. Case
            studies descrevem o trabalho técnico sem identificar clientes.
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
