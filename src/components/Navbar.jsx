import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.position = 'absolute'
    sentinel.style.top = '50px'
    sentinel.style.left = '0'
    sentinel.style.width = '1px'
    sentinel.style.height = '1px'
    sentinel.style.pointerEvents = 'none'
    document.body.appendChild(sentinel)

    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting)
    })
    
    observer.observe(sentinel)
    return () => {
      observer.disconnect()
      if (sentinel.parentNode) sentinel.remove()
    }
  }, [])

  const links = [
    { label: 'Xizmatlar', href: '#services' },
    { label: 'Jarayon', href: '#process' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Mijozlar', href: '#testimonials' },
  ]

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container navbar__inner">
        <Logo className="navbar__logo" />

        <nav className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link" onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="navbar__cta btn btn--primary">
          Loyihani Boshlash
        </a>

        <button
          className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menyu"
        >
          <span /><span /><span />
        </button>
      </div>

      {mobileOpen && (
        <motion.div className="navbar__mobile" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setMobileOpen(false)}>
            Loyihani Boshlash
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
