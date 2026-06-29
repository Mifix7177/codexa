import { useEffect, useRef } from 'react'
import './MouseBackground.css'

export default function MouseBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
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

    // Create liquid orbs
    const orbs = [
      { x: 0.2, y: 0.3, radius: 0.4, color: 'rgba(255, 255, 255, 0.06)' }, // Chrome/Silver
      { x: 0.8, y: 0.7, radius: 0.35, color: 'rgba(255, 255, 255, 0.04)' }, // Chrome
      { x: 0.5, y: 0.5, radius: 0.45, color: 'rgba(0, 0, 0, 1)' }, // Black core
      { x: 0.7, y: 0.2, radius: 0.25, color: 'rgba(0, 229, 255, 0.1)' }, // Icy Blue
      { x: 0.3, y: 0.8, radius: 0.4, color: 'rgba(10, 10, 10, 1)' } // Charcoal
    ]

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#050505' // Base charcoal
      ctx.fillRect(0, 0, w, h)

      time += 0.002;

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Update and draw orbs
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i]
        
        // Add subtle sine wave movement
        const offsetX = Math.sin(time + i * 15) * w * 0.15
        const offsetY = Math.cos(time + i * 15) * h * 0.15
        
        let targetX = w * orb.x + offsetX
        let targetY = h * orb.y + offsetY

        // Very subtle mouse reaction
        if (mx > -500) {
           const dx = mx - targetX
           const dy = my - targetY
           const dist = Math.sqrt(dx * dx + dy * dy)
           if (dist < w * 0.4) {
              targetX -= dx * 0.08
              targetY -= dy * 0.08
           }
        }

        ctx.beginPath()
        ctx.fillStyle = orb.color
        ctx.arc(targetX, targetY, w * orb.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Update glass-card local coordinates for border glow
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
