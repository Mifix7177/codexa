import { useState, useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BusinessShowcase from './components/BusinessShowcase'
import Services from './components/Services'
import Process from './components/Process'
import Comparison from './components/Comparison'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Numbers from './components/Numbers'
import CTA from './components/CTA'
import Footer from './components/Footer'
import MouseBackground from './components/MouseBackground'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })
ScrollTrigger.normalizeScroll(true)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!loaded) return

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [loaded])

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <Loader onComplete={handleLoadComplete} />}
      {loaded && (
        <>
          <MouseBackground />
          <Navbar />
          <main>
            <Hero />
            <BusinessShowcase />
            <Services />
            <Process />
            <Comparison />
            <Portfolio />
            <Testimonials />
            <Numbers />
            <CTA />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
