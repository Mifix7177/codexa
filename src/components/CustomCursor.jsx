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
      {/* Glowing dot at the exact cursor point */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      {/* Rounded polygon arrow following the dot */}
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePosition.x - 2, // slightly offset so dot is at the tip
          y: mousePosition.y - 2,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        <svg 
          width="24" height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: "rotate(-10deg)",
          }}
        >
          <path 
            d="M3 3L20 9L12 12L9 20L3 3Z" 
            stroke={isHovering ? "rgba(0, 229, 255, 0.8)" : "rgba(255, 255, 255, 0.5)"} 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
            fill={isHovering ? "rgba(0, 229, 255, 0.2)" : "transparent"} 
            style={{ transition: 'all 0.3s ease' }}
          />
        </svg>
      </motion.div>
    </>
  )
}
