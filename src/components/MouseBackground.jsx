import { useEffect, useRef } from 'react'
import './MouseBackground.css'

export default function MouseBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false }) // Optimize and remove alpha channel to reduce banding
    let w, h

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Create liquid orbs using RGBA values for smooth gradients
    const orbs = [
      { x: 0.2, y: 0.3, radius: 0.6, r: 255, g: 255, b: 255, a: 0.05 }, // Chrome/Silver
      { x: 0.8, y: 0.7, radius: 0.55, r: 255, g: 255, b: 255, a: 0.04 }, // Chrome
      { x: 0.5, y: 0.5, radius: 0.65, r: 0, g: 0, b: 0, a: 0.8 }, // Black core
      { x: 0.7, y: 0.2, radius: 0.45, r: 0, g: 229, b: 255, a: 0.06 }, // Icy Blue
      { x: 0.3, y: 0.8, radius: 0.6, r: 10, g: 10, b: 10, a: 0.8 } // Charcoal
    ]

    let time = 0;

    const draw = () => {
      // Base background
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, w, h)

      // Additive blending for glows
      ctx.globalCompositeOperation = 'screen'

      time += 0.002;

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Draw orbs
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i]
        
        // Sine wave movement
        const offsetX = Math.sin(time + i * 15) * w * 0.15
        const offsetY = Math.cos(time + i * 15) * h * 0.15
        
        let targetX = w * orb.x + offsetX
        let targetY = h * orb.y + offsetY

        // Mouse reaction
        if (mx > -500) {
           const dx = mx - targetX
           const dy = my - targetY
           const dist = Math.sqrt(dx * dx + dy * dy)
           if (dist < w * 0.4) {
              targetX -= dx * 0.08
              targetY -= dy * 0.08
           }
        }

        const radius = w * orb.radius
        
        ctx.beginPath()
        const grad = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, radius)
        grad.addColorStop(0, `rgba(${orb.r}, ${orb.g}, ${orb.b}, ${orb.a})`)
        grad.addColorStop(1, `rgba(${orb.r}, ${orb.g}, ${orb.b}, 0)`)
        
        ctx.fillStyle = grad
        ctx.arc(targetX, targetY, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.globalCompositeOperation = 'source-over'

      // Update glass-card local coordinates
      const cards = document.querySelectorAll('.glass-card')
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect()
        const x = mx - rect.left
        const y = my - rect.top
        cards[i].style.setProperty('--mouse-x', `${x}px`)
        cards[i].style.setProperty('--mouse-y', `${y}px`)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="mouse-bg"
      aria-hidden="true"
    />
  )
}
