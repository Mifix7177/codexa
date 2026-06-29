import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'
import './Hero.css'
import ParticleGrid from './ParticleGrid'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a cinematic entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.fromTo('.hero__badge', 
        { autoAlpha: 0, y: 30, scale: 0.9 }, 
        { autoAlpha: 1, y: 0, scale: 1, duration: 1, delay: 2.2 } // wait for Loader
      )
      .fromTo('.hero__title .char', 
        { autoAlpha: 0, y: 40, rotateX: -90, transformOrigin: '50% 50% -50px' }, 
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03 }, 
        "-=0.5"
      )
      .fromTo('.hero__subtitle', 
        { autoAlpha: 0, y: 20 }, 
        { autoAlpha: 1, y: 0, duration: 1 }, 
        "-=0.6"
      )
      .fromTo('.hero__actions', 
        { autoAlpha: 0, y: 20 }, 
        { autoAlpha: 1, y: 0, duration: 1 }, 
        "-=0.8"
      )
      .fromTo('.hero__stat', 
        { autoAlpha: 0, x: -20 }, 
        { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.1 }, 
        "-=0.6"
      )
      .fromTo('.hero__scroll', 
        { autoAlpha: 0 }, 
        { autoAlpha: 1, duration: 1 }, 
        "-=0.5"
      )

      // Parallax effect on scroll
      gsap.to('.hero__content', {
        yPercent: 30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const splitTextToChars = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section className="hero" ref={heroRef}>
      <ParticleGrid />
      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__content-inner">
            <div className="hero__badge glass-panel">
              <span className="hero__badge-dot" />
              <span className="hero__badge-text">Yangi Raqamli Davrga Xush Kelibsiz</span>
            </div>
            
            <h1 className="hero__title heading-hero">
              <div className="line"><div className="line-inner">{splitTextToChars('Biznesingizni')}</div></div>
              <div className="line"><div className="line-inner"><span className="text-gradient">{splitTextToChars('Kelajakka')}</span></div></div>
              <div className="line"><div className="line-inner">{splitTextToChars('Olib Chiqamiz')}</div></div>
            </h1>
            
            <p className="hero__subtitle">
              Codexa – ilg'or texnologiyalar, betakror dizayn va ma'lumotlarga asoslangan strategiyalar yordamida korxonangiz uchun raqamli mukammallikni yaratadi.
            </p>

            <div className="hero__actions">
              <MagneticButton className="btn btn--primary">
                Loyihani Boshlash
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </MagneticButton>
              <MagneticButton className="btn btn--secondary">
                Bizning Ishlar
              </MagneticButton>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number text-gradient">200+</span>
                <span className="hero__stat-label">Muvaffaqiyatli<br/>Loyihalar</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number text-gradient">98%</span>
                <span className="hero__stat-label">Mijozlar<br/>Qoniqishi</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number text-gradient">5+</span>
                <span className="hero__stat-label">Yillik<br/>Tajriba</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-text">PASTGA</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
