import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue, useInView } from 'framer-motion'
import './Marquee.css'

const wrap = (min, max, v) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)
  const directionFactor = useRef(1)
  
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: "200px 0px" })

  useAnimationFrame((t, delta) => {
    if (!isInView) return // Optimization: Don't calculate if not visible

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="parallax" ref={containerRef}>
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="marquee-section">
      <ParallaxText baseVelocity={-2}>INNOVATSIYA • KELAJAK • MUKAMMALIK •</ParallaxText>
      <ParallaxText baseVelocity={2}>RAQAMLASHTIRISH • AVTOMATLASHTIRISH •</ParallaxText>
    </section>
  )
}
