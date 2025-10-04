"use client"

import { useEffect } from "react"

export function ScrollHover() {
  useEffect(() => {
    // Só ativa em dispositivos móveis
    const isMobile = window.innerWidth <= 768
    
    if (!isMobile) return

    const handleScroll = () => {
      const centerY = window.innerHeight / 2
      const scrollY = window.scrollY
      const absoluteCenterY = centerY + scrollY

      // Elementos que devem ser afetados
      const selectors = [
        'img[src*="professional-developer-portrait"]', // Foto do perfil
        '.aspect-video img', // Imagens dos projetos
        '.project-card img' // Imagens específicas dos projetos
      ]

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        
        elements.forEach(element => {
          const rect = element.getBoundingClientRect()
          const elementCenterY = rect.top + scrollY + rect.height / 2
          
          // Distância do centro da tela
          const distance = Math.abs(elementCenterY - absoluteCenterY)
          const threshold = window.innerHeight / 3 // Zona de ativação
          
          if (distance < threshold) {
            // Elemento está próximo do centro - ativar hover
            element.classList.add('scroll-hover-active')
            element.classList.remove('scroll-hover-inactive')
          } else {
            // Elemento está longe do centro - desativar hover
            element.classList.add('scroll-hover-inactive')
            element.classList.remove('scroll-hover-active')
          }
        })
      })
    }

    // Adicionar estilos CSS para o efeito
    const style = document.createElement('style')
    style.textContent = `
      .scroll-hover-active {
        filter: grayscale(0) !important;
        transform: scale(1.05) !important;
        transition: all 0.3s ease !important;
        z-index: 10 !important;
      }
      
      .scroll-hover-inactive {
        filter: grayscale(1) !important;
        transform: scale(1) !important;
        transition: all 0.3s ease !important;
        z-index: 1 !important;
      }
      
      /* Indicador visual do "mouse virtual" */
      .scroll-mouse-indicator {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid rgba(41, 0, 96, 0.3);
        border-radius: 50%;
        background: rgba(41, 0, 96, 0.1);
        pointer-events: none;
        z-index: 1000;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
      }
      
      @media (min-width: 769px) {
        .scroll-mouse-indicator {
          display: none;
        }
      }
    `
    document.head.appendChild(style)

    // Criar indicador visual do "mouse virtual"
    const indicator = document.createElement('div')
    indicator.className = 'scroll-mouse-indicator'
    document.body.appendChild(indicator)

    // Adicionar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Executar uma vez no carregamento
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.head.removeChild(style)
      document.body.removeChild(indicator)
    }
  }, [])

  return null
}
