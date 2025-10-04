"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 relative transition-colors duration-300">
      <div className="text-center space-y-8 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold text-black dark:text-white tracking-tight leading-none">
          Luiz Cavalcanti
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light tracking-wide">
          QA Engineer | Full Stack Dev | AI Enthusiast
        </p>
        <div className="pt-6">
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-10 py-7 text-base hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Ver Projetos
            <ArrowDown className="ml-2 w-4 h-4 animate-bounce" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
