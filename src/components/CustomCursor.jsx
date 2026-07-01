import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Removed useSpring to give perfect 1:1 control and eliminate lag/spread
  const mouseX = cursorX
  const mouseY = cursorY

  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true)
      return
    }

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      if (
        e.target.closest('a') || 
        e.target.closest('button') || 
        e.target.closest('.magnetic')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  if (isMobile) return null

  return (
    <>
      {/* Glowing dot at the exact cursor point */}
      <motion.div
        className="cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-4px",
          translateY: "-4px"
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      {/* Rounded polygon arrow following the dot */}
      <motion.div
        className="cursor-outline"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-2px",
          translateY: "-2px"
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        <svg 
          width="40" height="40" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: isHovering ? "drop-shadow(0 0 12px rgba(0, 229, 255, 0.9))" : "drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))",
            transition: 'filter 0.3s ease'
          }}
        >
          {/* Main filled shape matching default Windows cursor angle */}
          <path 
            d="M4 4 L4 34 L15 23 L28 23 Z" 
            fill="rgba(0, 60, 80, 0.85)" 
            stroke="rgba(0, 229, 255, 0.9)" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
          
          {/* Internal constellation / 3D lines */}
          <path 
            d="M4 4 L12 18 L4 34 M12 18 L15 23 M12 18 L28 23" 
            stroke="rgba(0, 229, 255, 0.5)" 
            strokeWidth="1" 
          />
          
          {/* Glowing nodes at vertices */}
          <circle cx="4" cy="4" r="2.5" fill="#fff" />
          <circle cx="4" cy="34" r="2" fill="#fff" />
          <circle cx="15" cy="23" r="1.5" fill="#fff" />
          <circle cx="28" cy="23" r="2" fill="#fff" />
          
          {/* Center geometry node */}
          <circle cx="12" cy="18" r="2.5" fill="#fff" />
        </svg>
      </motion.div>
    </>
  )
}
