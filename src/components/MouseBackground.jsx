import { useEffect, useRef } from 'react'
import './MouseBackground.css'

export default function MouseBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const targetRef = useRef({ x: -1000, y: -1000 })
  const dotsRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = document.documentElement.scrollHeight
    }

    // Create dot grid
    const createDots = () => {
      const spacing = 35
      const dots = []
      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseRadius: 1,
            radius: 1,
            baseAlpha: 0.12,
            alpha: 0.12,
            color: Math.random() > 0.5 ? 'blue' : 'purple',
          })
        }
      }
      dotsRef.current = dots
    }

    resize()
    createDots()

    // Resize observer for scroll height changes
    const resizeObserver = new ResizeObserver(() => {
      resize()
      createDots()
    })
    resizeObserver.observe(document.documentElement)

    window.addEventListener('resize', () => {
      resize()
      createDots()
    })

    const handleMouseMove = (e) => {
      targetRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      }
    }

    const handleScroll = () => {
      targetRef.current = {
        x: mouseRef.current.x,
        y: (targetRef.current.y - (mouseRef.current.y - window.scrollY)) + window.scrollY,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation loop
    const lerp = (a, b, t) => a + (b - a) * t

    const draw = () => {
      // Smooth interpolation toward target
      mouseRef.current.x = lerp(mouseRef.current.x, targetRef.current.x, 0.08)
      mouseRef.current.y = lerp(mouseRef.current.y, targetRef.current.y, 0.08)

      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const scrollY = window.scrollY
      const radius = 280
      const strongRadius = 120

      const dots = dotsRef.current
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const dx = dot.x - mx
        const dy = dot.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < radius) {
          const intensity = 1 - dist / radius
          const strongIntensity = dist < strongRadius ? 1 - dist / strongRadius : 0

          dot.alpha = lerp(dot.baseAlpha, 0.8, intensity)
          dot.radius = lerp(dot.baseRadius, 3.5, strongIntensity * 0.8 + intensity * 0.4)

          // Draw connecting lines to nearby illuminated dots
          if (intensity > 0.3) {
            for (let j = i + 1; j < dots.length; j++) {
              const other = dots[j]
              const odx = other.x - mx
              const ody = other.y - my
              const oDist = Math.sqrt(odx * odx + ody * ody)
              if (oDist < radius) {
                const lineDx = dot.x - other.x
                const lineDy = dot.y - other.y
                const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy)
                if (lineDist < 55 && lineDist > 5) {
                  const lineAlpha = (1 - lineDist / 55) * intensity * 0.15
                  ctx.beginPath()
                  ctx.moveTo(dot.x, dot.y - scrollY)
                  ctx.lineTo(other.x, other.y - scrollY)
                  ctx.strokeStyle = dot.color === 'blue'
                    ? `rgba(0, 136, 255, ${lineAlpha})`
                    : `rgba(157, 0, 255, ${lineAlpha})`
                  ctx.lineWidth = 0.5
                  ctx.stroke()
                }
              }
            }
          }
        } else {
          dot.alpha = dot.baseAlpha
          dot.radius = dot.baseRadius
        }

        // Only draw visible dots
        const screenY = dot.y - scrollY
        if (screenY < -10 || screenY > window.innerHeight + 10) continue

        ctx.beginPath()
        ctx.arc(dot.x, screenY, dot.radius, 0, Math.PI * 2)
        if (dot.color === 'blue') {
          ctx.fillStyle = `rgba(0, 136, 255, ${dot.alpha})`
        } else {
          ctx.fillStyle = `rgba(157, 0, 255, ${dot.alpha})`
        }
        ctx.fill()
      }

      // Update glass-card local coordinates for border glow
      const cards = document.querySelectorAll('.glass-card')
      const screenMy = my - scrollY
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect()
        const x = mx - rect.left
        const y = screenMy - rect.top
        cards[i].style.setProperty('--mouse-x', `${x}px`)
        cards[i].style.setProperty('--mouse-y', `${y}px`)
      }

      // Soft glow at cursor
      if (mx > -500) {
        const screenMy = my - scrollY
        const gradient = ctx.createRadialGradient(mx, screenMy, 0, mx, screenMy, 300)
        gradient.addColorStop(0, 'rgba(0, 136, 255, 0.06)')
        gradient.addColorStop(0.4, 'rgba(157, 0, 255, 0.03)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(mx - 300, screenMy - 300, 600, 600)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
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
