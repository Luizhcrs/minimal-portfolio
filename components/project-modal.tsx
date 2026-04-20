"use client"

import { X, Lock, ExternalLink, Github } from "lucide-react"
import { useEffect } from "react"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    kind?: "case-study" | "public"
    category?: string
    description: string
    fullDescription: string
    technologies: string[]
    highlights?: string[]
    github?: string
    demo?: string
  } | null
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  const isCaseStudy = project.kind === "case-study"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-2xl animate-scale-in modal-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 z-10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 space-y-6">
          {project.category && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                {project.category}
              </span>
              {isCaseStudy && (
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                  <Lock className="w-3 h-3" />
                  Case study · código privado
                </span>
              )}
            </div>
          )}

          <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-black dark:text-white">
            {project.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {project.fullDescription}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-bold text-black dark:text-white mb-3 uppercase tracking-wider">
                Destaques técnicos
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-black dark:text-white font-mono flex-shrink-0">→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-black dark:text-white mb-3 uppercase tracking-wider">
              Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(project.github || project.demo) && (
            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-black dark:border-white text-black dark:text-white font-medium rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live demo
                </a>
              )}
            </div>
          )}

          {isCaseStudy && !project.github && !project.demo && (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
              Código fonte privado. Para entender melhor o trabalho, entre em contato.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
