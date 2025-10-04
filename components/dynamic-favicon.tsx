"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function DynamicFavicon() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const updateFavicon = () => {
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (!favicon) return

      // Use resolvedTheme to get the actual theme being applied
      const currentTheme = resolvedTheme || theme || 'light'
      
      // Create a new favicon SVG based on the current theme
      const svgContent = createFaviconSVG(currentTheme)
      const blob = new Blob([svgContent], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      
      favicon.href = url
      
      // Clean up the previous URL to prevent memory leaks
      return () => URL.revokeObjectURL(url)
    }

    const cleanup = updateFavicon()
    
    return () => {
      if (cleanup) cleanup()
    }
  }, [theme, resolvedTheme])

  return null
}

function createFaviconSVG(theme: string): string {
  const isDark = theme === 'dark'
  
  const bgColor = isDark ? '#000000' : '#ffffff'
  const textColor = isDark ? '#ffffff' : '#000000'
  const strokeColor = isDark ? '#ffffff' : '#000000'
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${bgColor};stop-opacity:1" />
      </linearGradient>
    </defs>

    <!-- Background circle -->
    <circle cx="16" cy="16" r="15.5" fill="url(#bg)" stroke="${strokeColor}" stroke-width="1"/>

    <!-- Letter L -->
    <rect x="8" y="8" width="3" height="16" fill="${textColor}" rx="0.5"/>
    <rect x="8" y="20" width="10" height="3" fill="${textColor}" rx="0.5"/>

    <!-- Letter C -->
    <path d="M20 7 C16 7 13 10 13 16 C13 22 16 25 20 25 C22 25 24 23 24 21 L20 21 L20 19 L26 19 L26 21 C26 25 24 27 20 27 C14 27 9 22 9 16 C9 10 14 5 20 5 C22 5 24 7 24 9 L20 9 Z" fill="${textColor}"/>
  </svg>`
}
