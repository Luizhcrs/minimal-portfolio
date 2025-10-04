"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    image: string
    fullDescription: string
    technologies: string[]
    github: string
    demo: string
  } | null
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl animate-scale-in modal-scrollbar"
        onClick={(e) => e.stopPropagation()}
        style={{ borderRadius: '0.5rem' }}
      >
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Fechar modal (ESC)"
          title="Fechar modal (ESC)"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 space-y-6" style={{ borderRadius: '0 0 0.5rem 0.5rem' }}>
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-black dark:text-white">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{project.fullDescription}</p>

            <div className="pt-4">
              <h3 className="text-sm font-bold text-black dark:text-white mb-3 uppercase tracking-wider">
                Tecnologias
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600 hover:border-black dark:hover:border-white transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 text-center border-2 border-black dark:border-white text-black dark:text-white font-medium rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                Ver no GitHub
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 text-center bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
              >
                Ver Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
