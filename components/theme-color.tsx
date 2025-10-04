"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeColor() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const updateThemeColor = () => {
      const currentTheme = resolvedTheme || theme || 'light'
      const color = currentTheme === 'dark' ? '#000000' : '#ffffff'
      
      // Remove existing theme-color meta tag
      const existingMeta = document.querySelector('meta[name="theme-color"]')
      if (existingMeta) {
        existingMeta.remove()
      }
      
      // Create new theme-color meta tag
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = color
      document.head.appendChild(meta)
    }

    updateThemeColor()
  }, [theme, resolvedTheme])

  return null
}
