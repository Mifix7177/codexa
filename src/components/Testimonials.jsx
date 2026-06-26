import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandName } from './Logo'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { name: 'Alexander Petrov', role: 'CEO, GastroHub', text: <><BrandName /> bizning restoran tarmog'imizni o'zgartirdi. Birinchi chorakda onlayn buyurtmalar 340% ga oshdi. Ularning tafsilotlarga e'tibori tengsiz.</>, avatar: 'AP', color: '#f97316' },
  { name: 'Maria Ivanova', role: 'Direktor, MedConnect', text: <>Ular qurgan bemorlarni boshqarish tizimi har kuni 5000 dan ortiq qabullarni muammosiz ko'rib chiqadi. Biz qilgan eng yaxshi sarmoya.</>, avatar: 'MI', color: '#06b6d4' },
  { name: 'Dmitry Volkov', role: 'Asoschi, EduFlow', text: <>Konsepsiyadan tortib ishga tushirishgacha 6 hafta. Bizning LMS hozirda 12 mamlakatda 50,000+ talabaga xizmat ko'rsatmoqda. <BrandName /> kutilganidan ham a'lo darajada bajardi.</>, avatar: 'DV', color: '#8b5cf6' },
  { name: 'Sarah Chen', role: 'CTO, BuildPro', text: <>Ularning ERP yechimi bizni operatsion xarajatlarda har yili $2M tejashimizga yordam berdi. Jamoa birinchi kundanoq bizning murakkab talablarimizni tushundi.</>, avatar: 'SC', color: '#f59e0b' },
  { name: 'Elena Sokolova', role: 'Egasi, StyleStudio', text: <>Yangi tizimni ishga tushirgandan so'ng band qilish ko'rsatkichimiz 280% ga oshdi. Mijozlar qulaylikni yaxshi ko'radilar. AI tavsiyalari ajoyib.</>, avatar: 'ES', color: '#ec4899' },
  { name: 'James Mitchell', role: "Operatsiyalar bo'yicha VP, LogiTrack", text: <>Haqiqiy vaqtda parkni kuzatish, avtomatlashtirilgan jo'natish, marshrutni optimallashtirish — hamma narsa mukammal ishlaydi. <BrandName /> hamma narsani o'ylagan.</>, avatar: 'JM', color: '#14b8a6' },
]

function TestimonialCard({ t }) {
  return (
    <article className="test__card glass-card">
      <div className="test__card-stars">
        {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
      </div>
      <p className="test__card-text">"{t.text}"</p>
      <div className="test__card-author">
        <div className="test__card-avatar" style={{ background: `${t.color}20`, color: t.color }}>{t.avatar}</div>
        <div><div className="test__card-name">{t.name}</div><div className="test__card-role">{t.role}</div></div>
      </div>
    </article>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.test__header > *', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } })
    }, section)
    return () => ctx.revert()
  }, [])

  const allTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="test section" ref={sectionRef}>
      <div className="container">
        <div className="test__header">
          <span className="badge"><span className="badge__dot" />Mijozlar Hikoyalari</span>
          <h2 className="heading-1">Soha Yetakchilari Tomonidan <span className="text-gradient">Ishonch Bildirilgan</span></h2>
          <p className="text-secondary test__desc">Haqiqiy bizneslardan haqiqiy natijalar. Mijozlarimiz <BrandName /> bilan ishlash haqida nima deyishlarini ko'ring.</p>
        </div>
      </div>
      <div className="test__marquee" ref={trackRef}>
        <div className="test__track">
          {allTestimonials.map((t, i) => <TestimonialCard key={`${t.name}-${i}`} t={t} />)}
        </div>
      </div>
    </section>
  )
}
