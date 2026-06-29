import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandName } from './Logo'
import './BusinessShowcase.css'

gsap.registerPlugin(ScrollTrigger)

const businesses = [
  { name: 'Restoran', icon: '🍽️', desc: 'Onlayn buyurtma, joy band qilish va sodiqlik dasturlari', color: '#f97316' },
  { name: 'Klinika', icon: '🏥', desc: 'Qabulga yozilish va bemorlar boshqaruvi', color: '#06b6d4' },
  { name: 'Ustaxona', icon: '🔧', desc: 'Jadval, inventar va mijozlarni kuzatish', color: '#eab308' },
  { name: "Ta'lim", icon: '🎓', desc: "O'quv platformalari, ro'yxatga olish va tahlil", color: '#8b5cf6' },
  { name: 'Savdo', icon: '🛍️', desc: 'E-tijorat, POS va inventar boshqaruvi', color: '#ec4899' },
  { name: 'Qurilish', icon: '🏗️', desc: 'Loyiha boshqaruvi va resurslarni rejalashtirish', color: '#f59e0b' },
  { name: 'Mehmonxona', icon: '🏨', desc: 'Band qilish tizimlari va mehmonlar tajribasi', color: '#14b8a6' },
  { name: 'Ishlab chiqarish', icon: '🏭', desc: "ERP, ishlab chiqarishni kuzatish va logistika", color: '#64748b' },
  { name: 'Startap', icon: '🚀', desc: "MVP ishlab chiqish va tez kengayish", color: '#4f7df5' },
  { name: 'Korporativ', icon: '🏢', desc: 'Korporativ yechimlar va raqamli transformatsiya', color: '#8b5cf6' },
]

export default function BusinessShowcase() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      // Header — blur in with stagger
      gsap.fromTo('.biz__title', 
        { opacity: 0, y: 80, filter: 'blur(12px)' }, 
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 80%' } }
      )
      gsap.fromTo('.biz__subtitle', 
        { opacity: 0, y: 50, filter: 'blur(8px)' }, 
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay: 0.2, ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 80%' } }
      )

      // Horizontal scroll
      const totalWidth = track.scrollWidth - window.innerWidth
      gsap.to(track, {
        x: -totalWidth, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${totalWidth * 1.2}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true }
      })

      // Cards — 3D perspective stagger
      gsap.fromTo('.biz__card', 
        { opacity: 0, y: 80, scale: 0.85, rotateX: 12, transformPerspective: 1200, transformOrigin: 'center bottom' }, 
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%' } }
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="industries" className="biz section" ref={sectionRef}>
      <div className="biz__header container">
        <span className="badge biz__badge"><span className="badge__dot" />Xizmat Ko'rsatilgan Sohalar</span>
        <h2 className="heading-1 biz__title">Har Qanday Biznesni <span className="text-gradient">Raqamlashtramiz</span></h2>
        <p className="biz__subtitle text-secondary">Qaysi sohada bo'lishingizdan qat'i nazar, <BrandName /> o'sishni tezlashtiradigan raqamli yechimlarni taqdim etadi.</p>
      </div>
      <div className="biz__track" ref={trackRef}>
        <div className="biz__cards">
          {businesses.map((biz, i) => (
            <article key={biz.name} className="biz__card glass-card" style={{ '--card-accent': biz.color }}>
              <div className="biz__card-glow" />
              <div className="biz__card-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="biz__card-icon">{biz.icon}</div>
              <h3 className="biz__card-name">{biz.name}</h3>
              <p className="biz__card-desc">{biz.desc}</p>
              <div className="biz__card-line" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
