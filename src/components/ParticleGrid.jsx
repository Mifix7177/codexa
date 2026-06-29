import { useEffect, useRef } from 'react'

export default function ParticleGrid() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    
    let w, h
    const spacing = 32
    const maxDist = 180
    
    let dots = []

    const initDots = () => {
      dots = []
      const cols = Math.floor(w / spacing) + 1
      const rows = Math.floor(h / spacing) + 1
      
      const offsetX = (w - (cols - 1) * spacing) / 2
      const offsetY = (h - (rows - 1) * spacing) / 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: offsetX + i * spacing,
            y: offsetY + j * spacing,
            baseRadius: 1, // 2px diameter
            targetRadius: 1,
            currentRadius: 1,
          })
        }
      }
    }

    const resize = () => {
      // Use parent element size
      const parent = canvas.parentElement
      w = canvas.width = parent.clientWidth
      h = canvas.height = parent.clientHeight
      initDots()
    }
    
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      // Check if mouse is within the hero section
      if (
        e.clientX >= rect.left && 
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
      } else {
        mouseRef.current = { x: -1000, y: -1000 }
      }
    }
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseout', handleMouseLeave, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        
        let targetR = dot.baseRadius
        let isGlowing = false

        if (mx > -500) {
          const dx = mx - dot.x
          const dy = my - dot.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDist) {
            // Map distance to radius (from 1px to 4px radius -> 2px to 8px diameter)
            // The closer, the larger
            const distNorm = 1 - (dist / maxDist)
            
            if (distNorm > 0.8) {
              targetR = 4 // Very close: 8px dia
              isGlowing = true
            } else if (distNorm > 0.5) {
              targetR = 3 // Close: 6px dia
              isGlowing = true
            } else if (distNorm > 0) {
              targetR = 2 // Medium: 4px dia
            }
          }
        }

        // Smooth interpolation (lerp)
        dot.currentRadius += (targetR - dot.currentRadius) * 0.15

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2)
        
        if (dot.currentRadius > 1.5 && isGlowing) {
          ctx.fillStyle = '#22D3EE' // Subtle cyan glow
          ctx.globalAlpha = 0.6
        } else {
          ctx.fillStyle = '#ffffff'
          ctx.globalAlpha = 0.15
        }
        
        ctx.fill()
      }
      
      ctx.globalAlpha = 1.0 // Reset alpha

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Ignore pointer events so it doesn't block interactions
        zIndex: 0
      }}
      aria-hidden="true"
    />
  )
}
