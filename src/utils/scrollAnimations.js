import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ultra scroll animations utility.
 * Creates premium scroll-triggered animations with stagger, parallax, and reveal effects.
 */

// Reveal animation presets
export const PRESETS = {
  fadeUp: { from: { opacity: 0, y: 80 }, to: { opacity: 1, y: 0 } },
  fadeDown: { from: { opacity: 0, y: -60 }, to: { opacity: 1, y: 0 } },
  fadeLeft: { from: { opacity: 0, x: -80 }, to: { opacity: 1, x: 0 } },
  fadeRight: { from: { opacity: 0, x: 80 }, to: { opacity: 1, x: 0 } },
  scaleUp: { from: { opacity: 0, scale: 0.8, y: 40 }, to: { opacity: 1, scale: 1, y: 0 } },
  rotateIn: { from: { opacity: 0, rotateX: 15, y: 60, transformPerspective: 1000 }, to: { opacity: 1, rotateX: 0, y: 0 } },
  clipReveal: { from: { clipPath: 'inset(100% 0% 0% 0%)' }, to: { clipPath: 'inset(0% 0% 0% 0%)' } },
  splitLines: { from: { opacity: 0, y: 100, skewY: 3 }, to: { opacity: 1, y: 0, skewY: 0 } },
  blurIn: { from: { opacity: 0, filter: 'blur(20px)', y: 30 }, to: { opacity: 1, filter: 'blur(0px)', y: 0 } },
}

// Easing presets
export const EASINGS = {
  smooth: [0.16, 1, 0.3, 1],      // expo out
  bounce: [0.34, 1.56, 0.64, 1],   // with overshoot
  sharp: [0.25, 1, 0.5, 1],        // quart out
  elastic: 'elastic.out(1, 0.5)',
  power4: 'power4.out',
}

/**
 * Hook to apply ultra scroll animations to a section.
 * @param {Function} animationFn - Function receiving (sectionEl, gsap, ScrollTrigger, PRESETS)
 * @param {Array} deps - Dependencies array
 */
export function useScrollAnimations(animationFn, deps = []) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Wait for fonts and layout
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        animationFn(section, gsap, ScrollTrigger, PRESETS, EASINGS)
      }, section)
      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, deps)

  return sectionRef
}

/**
 * Create a parallax effect on scroll for an element.
 */
export function createParallax(element, speed = 0.5, trigger) {
  gsap.to(element, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  })
}

/**
 * Create a horizontal scroll section with ultra effects.
 */
export function createHorizontalScroll(trigger, track, options = {}) {
  const totalWidth = track.scrollWidth - window.innerWidth
  
  // Main horizontal scroll
  gsap.to(track, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: () => `+=${totalWidth * 1.2}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  })

  // Animate cards as they come into view during scroll
  const cards = track.querySelectorAll('.biz__card, .glass-card')
  cards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 80, scale: 0.85, rotateY: -8, transformPerspective: 1200 },
      {
        opacity: 1, y: 0, scale: 1, rotateY: 0,
        duration: 1,
        delay: i * 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger,
          start: 'top 60%',
        }
      }
    )
  })
}

/**
 * Animate section header with ultra text reveal.
 */
export function animateHeader(section, selector = '> *') {
  const headerEl = section.querySelector('.proc__header, .svc__header, .cmp__header, .port__header, .test__header, .biz__header, .cta__content')
  if (!headerEl) return

  const children = headerEl.querySelectorAll(selector)
  
  gsap.fromTo(children,
    { opacity: 0, y: 70, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
      }
    }
  )
}

/**
 * Staggered card reveal with 3D perspective.
 */
export function animateCards(trigger, cardSelector, options = {}) {
  const {
    start = 'top 80%',
    stagger = 0.1,
    duration = 0.9,
    from = 'start',
  } = options

  gsap.fromTo(cardSelector,
    {
      opacity: 0,
      y: 60,
      scale: 0.92,
      rotateX: 8,
      transformPerspective: 1200,
      transformOrigin: 'center bottom',
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration,
      stagger: { each: stagger, from },
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start,
      }
    }
  )
}

/**
 * Row-by-row table reveal with slide + fade.
 */
export function animateRows(trigger, rowSelector, options = {}) {
  const { start = 'top 80%', stagger = 0.06 } = options

  gsap.fromTo(rowSelector,
    { opacity: 0, x: -40, filter: 'blur(4px)' },
    {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger, start }
    }
  )
}

/**
 * Counter reveal with scale punch effect.
 */
export function animateCounters(trigger, itemSelector) {
  gsap.fromTo(itemSelector,
    { opacity: 0, y: 50, scale: 0.8 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.12,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger,
        start: 'top 80%',
      }
    }
  )
}
