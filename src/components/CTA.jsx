import { useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CTA.css'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Content — blur + slide up
      gsap.fromTo('.cta__content > *', 
        { opacity: 0, y: 60, filter: 'blur(12px)' }, 
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power4.out', 
          scrollTrigger: { trigger: section, start: 'top 80%' } }
      )

      // Orbs — parallax on scroll
      gsap.to('.cta__orb--1', {
        y: -80, x: 30, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to('.cta__orb--2', {
        y: 60, x: -40, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    }, section)
    return () => ctx.revert()
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!glowRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(79, 125, 245, 0.15), rgba(139, 92, 246, 0.05), transparent 50%)`
  }, [])

  return (
    <section id="contact" className="cta" ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className="cta__glow" ref={glowRef} />
      <div className="cta__orbs">
        <div className="cta__orb cta__orb--1" />
        <div className="cta__orb cta__orb--2" />
      </div>
      <div className="container cta__container">
        <div className="cta__content">
          <h2 className="heading-1 cta__title">
            Keling, <span className="text-gradient">G'ayrioddiy</span> Narsa Quramiz.
          </h2>
          <p className="cta__desc text-secondary">
            Biznesingizni o'zgartirishga tayyormisiz? Loyihangiz haqida bizga xabar bering va birgalikda ajoyib narsa yarataylik.
          </p>
          <motion.a href="mailto:hello@codexa.com" className="btn btn--primary cta__btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Loyihani Boshlash
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="cta__btn-glow" />
          </motion.a>
          <p className="cta__note text-secondary">Bepul maslahat · Majburiyatsiz · 24 soat ichida javob</p>
        </div>
      </div>
    </section>
  )
}
