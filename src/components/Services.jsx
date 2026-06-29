import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TiltCard from './TiltCard'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { title: 'Veb-saytlar', desc: "Tashrif buyuruvchilarni mijozlarga aylantiradigan yuqori samarali, chiroyli dizayndagi veb-saytlar. Landing sahifalardan murakkab veb-ilovalargacha.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 3v18"/></svg> },
  { title: 'CRM Tizimlar', desc: "Mijozlar bilan munosabatlarni soddalashtiruvchi, ish jarayonlarini avtomatlashtiradigan va jamoangiz uchun tahlillar beradigan maxsus CRM yechimlar.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { title: 'Telegram Botlar', desc: "Mijozlarga xizmat ko'rsatish, buyurtma boshqaruvi, uchrashuvlarni belgilash va avtomatlashtirilgan aloqa oqimlari uchun aqlli chatbotlar.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  { title: 'Avtomatlashtirish', desc: "Takroriy vazifalarni yo'q qiladigan, xatolarni kamaytiradigan va jamoangizga muhim ishlarga e'tibor qaratish imkonini beradigan to'liq avtomatlashtirish.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg> },
  { title: "Sun'iy Intellekt", desc: "Bashoratli tahlil, tabiiy til qayta ishlash, tavsiya tizimlari va aqlli avtomatlashtirish uchun sun'iy intellektdan foydalaning.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.92"/><path d="M8.24 9.92A4 4 0 0 1 12 2"/><circle cx="12" cy="12" r="3"/><path d="M12 15v7"/><path d="M8 22h8"/><path d="m5 12-3 0"/><path d="m22 12-3 0"/><path d="m17 7 2-2"/><path d="m5 19 2-2"/><path d="m7 7-2-2"/><path d="m19 19-2-2"/></svg> },
  { title: 'ERP', desc: "Barcha biznes operatsiyalaringizni — moliya, HR, ta'minot zanjiri — bitta kuchli platformaga birlashtiruvchi korxona resurslarini rejalashtirish tizimlari.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3h-8l-2 4h12l-2-4z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg> },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Header — blur + slide up
      gsap.fromTo('.srv__header > *', 
        { autoAlpha: 0, y: 70, filter: 'blur(10px)' }, 
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power4.out', 
          scrollTrigger: { trigger: section, start: 'top 78%' } }
      )

      // Cards — 3D perspective, stagger from center for a "burst" feel
      gsap.fromTo('.srv__card', 
        { autoAlpha: 0, y: 70, scale: 0.88 }, 
        { autoAlpha: 1, y: 0, scale: 1, duration: 1, 
          stagger: { each: 0.07, from: 'center' }, 
          ease: 'power3.out', 
          scrollTrigger: { trigger: '.srv__grid', start: 'top 82%' } }
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="srv section" ref={sectionRef}>
      <div className="container">
        <div className="srv__header">
          <span className="badge"><span className="badge__dot" />Bizning Xizmatlar</span>
          <h2 className="heading-1">Biz Nima <span className="text-gradient">Qila Olamiz</span></h2>
          <p className="text-secondary srv__desc">Sizning biznesingiz ehtiyojlariga moslashtirilgan zamonaviy raqamli xizmatlar to'plami.</p>
        </div>

        <div className="srv__grid">
          {services.map((service, i) => (
            <TiltCard key={i} className="srv__card glass-card">
              <div className="srv__icon">{service.icon}</div>
              <h3 className="srv__title">{service.title}</h3>
              <p className="srv__card-desc text-secondary">{service.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
