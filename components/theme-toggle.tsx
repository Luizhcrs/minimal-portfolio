"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-5 h-5 mx-auto text-gray-900" />
      case "dark":
        return <Moon className="w-5 h-5 mx-auto text-gray-100" />
      case "system":
        return <Monitor className="w-5 h-5 mx-auto text-gray-900 dark:text-gray-100" />
      default:
        return <Monitor className="w-5 h-5 mx-auto text-gray-900 dark:text-gray-100" />
    }
  }

  const getTooltip = () => {
    switch (theme) {
      case "light":
        return "Tema claro ativo"
      case "dark":
        return "Tema escuro ativo"
      case "system":
        return "Seguindo tema do sistema"
      default:
        return "Seguindo tema do sistema"
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-all duration-300"
      aria-label={getTooltip()}
      title={getTooltip()}
    >
      {getIcon()}
    </button>
  )
}
