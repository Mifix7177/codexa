import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandName } from './Logo'
import './Comparison.css'

gsap.registerPlugin(ScrollTrigger)

const comparisons = [
  { feature: 'Dizayn Sifati', traditional: 'Shablonga asoslangan', codexa: 'Maxsus yaratilgan' },
  { feature: 'Ishlab chiqish Vaqti', traditional: '3–6 oy', codexa: '4–8 hafta' },
  { feature: 'Texnologiya', traditional: 'Eskirgan texnologiyalar', codexa: 'Eng zamonaviy' },
  { feature: 'Aloqa', traditional: 'Faqat elektron pochta', codexa: 'Haqiqiy vaqtda hamkorlik' },
  { feature: "Ishga tushirilgandan so'ng", traditional: "E'tiborsiz qoldirilgan", codexa: "24/7 qo'llab-quvvatlash va o'sish" },
  { feature: 'AI Integratsiyasi', traditional: 'Mavjud emas', codexa: "O'rnatilgan AI yechimlari" },
  { feature: 'Kengayuvchanlik', traditional: 'Cheklangan', codexa: 'Korporativ darajada' },
  { feature: 'Tahlil', traditional: 'Asosiy hisobotlar', codexa: 'Chuqur tushunchalar va KPI' },
]

export default function Comparison() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Header — blur reveal
      gsap.fromTo('.cmp__header > *', 
        { opacity: 0, y: 70, filter: 'blur(10px)' }, 
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power4.out', 
          scrollTrigger: { trigger: section, start: 'top 78%' } }
      )

      // Table rows — slide in from left with blur
      gsap.fromTo('.cmp__row', 
        { opacity: 0, x: -50, filter: 'blur(6px)' }, 
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.06, ease: 'power3.out', 
          scrollTrigger: { trigger: '.cmp__table', start: 'top 82%' } }
      )

      // Green highlights — scale with spring bounce
      gsap.fromTo('.cmp__highlight', 
        { scaleX: 0, transformOrigin: 'left center' }, 
        { scaleX: 1, duration: 0.7, stagger: 0.05, ease: 'back.out(1.7)', 
          scrollTrigger: { trigger: '.cmp__table', start: 'top 78%' } }
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cmp section" ref={sectionRef}>
      <div className="container">
        <div className="cmp__header">
          <span className="badge"><span className="badge__dot" />Nima uchun <BrandName /></span>
          <h2 className="heading-1"><span className="text-gradient">Code<span className="brand-name__x">x</span>aning</span> Farqi</h2>
          <p className="text-secondary cmp__desc">Biz an'anaviy agentliklar bilan qanday solishtirilishimizni — va nima uchun bizneslar bizni tanlashini ko'ring.</p>
        </div>
        <div className="cmp__table glass-card">
          <div className="cmp__row cmp__row--header">
            <div className="cmp__cell cmp__cell--feature">Xususiyat</div>
            <div className="cmp__cell cmp__cell--trad">An'anaviy Agentlik</div>
            <div className="cmp__cell cmp__cell--codexa"><BrandName /></div>
          </div>
          {comparisons.map((row) => (
            <div key={row.feature} className="cmp__row">
              <div className="cmp__cell cmp__cell--feature">{row.feature}</div>
              <div className="cmp__cell cmp__cell--trad">
                <span className="cmp__icon cmp__icon--bad">✕</span>
                {row.traditional}
              </div>
              <div className="cmp__cell cmp__cell--codexa">
                <span className="cmp__icon cmp__icon--good">✓</span>
                <span className="cmp__highlight" />
                {row.codexa}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
