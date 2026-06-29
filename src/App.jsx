import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BusinessShowcase from './components/BusinessShowcase'
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

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return

    // GSAP ScrollTrigger setup
    gsap.ticker.lagSmoothing(0)
    
    return () => {
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
