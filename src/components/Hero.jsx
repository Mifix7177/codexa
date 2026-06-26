import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { BrandName } from './Logo'
import './Hero.css'

export default function Hero() {
  const sectionRef = useRef(null)
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  const maskImage = useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 2.5 } } }
  const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section id="hero" className="hero" ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className="hero__gradient" aria-hidden="true" />
      <motion.div 
        className="hero__grid" 
        aria-hidden="true" 
        style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
      />

      <motion.div className="hero__content container" style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}>
        <motion.div className="hero__content-inner" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <span className="badge"><span className="badge__dot" />Raqamli Agentlik</span>
          </motion.div>

          <motion.h1 className="heading-hero hero__title" variants={itemVariants}>
            Biznesingizni{' '}
            <span className="text-gradient">Raqamlashtiruvchi</span>{' '}
            Yechimlar.
          </motion.h1>

          <motion.p className="hero__subtitle" variants={itemVariants}>
            Restoranlardan ta'lim markazlarigacha, ustaxonalardan korporativ kompaniyalargacha —
            <BrandName /> veb-saytlar, avtomatlashtirish, CRM tizimlar va sun'iy intellekt yechimlarini yaratadi.
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <a href="#contact" className="btn btn--primary">
              Loyihani Boshlash
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#portfolio" className="btn btn--secondary">Ishlarimizni Ko'rish</a>
          </motion.div>

          <motion.div className="hero__stats" variants={itemVariants}>
            <div className="hero__stat">
              <span className="hero__stat-number text-gradient">100+</span>
              <span className="hero__stat-label">Bajarilgan Loyihalar</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number text-gradient">10+</span>
              <span className="hero__stat-label">Xizmat Ko'rsatilgan Sohalar</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number text-gradient">98%</span>
              <span className="hero__stat-label">Mijozlar Mamnuniyati</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="hero__scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }} style={{ opacity: heroOpacity }}>
        <motion.div className="hero__scroll-line" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        <span>Pastga</span>
      </motion.div>
    </section>
  )
}

