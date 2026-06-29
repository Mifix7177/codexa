import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './CustomCursor.css'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true)
      return
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      if (
        e.target.closest('a') || 
        e.target.closest('button') || 
        e.target.closest('.magnetic') ||
        e.target.closest('.glass-card')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(0, 229, 255, 0.5)' : 'rgba(255, 255, 255, 0.5)'
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  )
}
