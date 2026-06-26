import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
  { title: 'Mobil Ilovalar', desc: "iOS va Android qurilmalarida mukammal foydalanuvchi tajribasini taqdim etuvchi mahalliy va kross-platforma mobil ilovalar.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
  { title: 'UI/UX Dizayn', desc: "Foydalanish qulayligi, maxsus imkoniyatlar va estetik mukammallikni birinchi o'ringa qo'yuvchi tadqiqotga asoslangan dizayn.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"/><path d="M2 17l5-5c1.5-1.5 4-1.5 5.5 0L17 17"/></svg> },
  { title: 'Brend Identifikatsiya', desc: "Vizual identifikatsiyangizni belgilaydigan keng qamrovli brending — logotiplar, rang tizimlari, tipografiya va brend ko'rsatmalari.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
  { title: 'SEO', desc: "Ko'rinishingizni yaxshilaydigan, organik trafikni oshiradigan va doimiy onlayn obro'ni quradigan ma'lumotlarga asoslangan qidiruv tizimi optimizatsiyasi.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg> },
  { title: 'Xosting', desc: "99.9% uptime, avtomatlashtirilgan zaxira nusxalar va kundalik monitoring bilan xavfsiz, kengaytiriladigan bulutli xosting infratuzilmasi.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg> },
  { title: "Qo'llab-quvvatlash", desc: "Raqamli mahsulotlaringiz doimo eng yaxshi ishlashini ta'minlash uchun doimiy texnik qo'llab-quvvatlash, xizmat ko'rsatish va optimallashtirish.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z"/></svg> },
]

export default function Services() {
  const sectionRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc__header > *', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } })
      gsap.fromTo('.svc__card', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.svc__grid', start: 'top 80%' } })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="svc section" ref={sectionRef}>
      <div className="container">
        <div className="svc__header">
          <span className="badge"><span className="badge__dot" />Nima Qilamiz</span>
          <h2 className="heading-1">Biznesingiz <span className="text-gradient">O'sishi Uchun</span> Zarur Hamma Narsa</h2>
          <p className="text-secondary svc__desc">Konsepsiyadan ishga tushirishgacha, biz aniqlik, tezlik va jahon darajasidagi sifat bilan raqamli yechimlarni taqdim etamiz.</p>
        </div>
        <div className="svc__grid">
          {services.map((svc, i) => (
            <motion.article key={svc.title} className="svc__card glass-card" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} animate={{ scale: hoveredIdx === i ? 1.03 : 1, zIndex: hoveredIdx === i ? 10 : 1 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <div className="svc__card-icon">{svc.icon}</div>
              <h3 className="svc__card-title">{svc.title}</h3>
              <p className="svc__card-desc">{svc.desc}</p>
              <div className="svc__card-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
