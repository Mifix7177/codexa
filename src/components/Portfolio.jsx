import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'GastroHub', category: 'Restoran', desc: "To'liq raqamli ekotizim — onlayn buyurtma, stollarni band qilish, sodiqlik dasturi va oshxonani boshqarish paneli.", tags: ['Web App', 'Mobile', 'CRM'], color: '#f97316', gradient: 'linear-gradient(135deg, #f97316, #ea580c)' },
  { title: 'MedConnect', category: "Sog'liqni saqlash", desc: 'Qabulni rejalashtirish, telemeditsina, elektron sog\'liqni saqlash yozuvlari va tahlillariga ega bemorlarni boshqarish platformasi.', tags: ['Platform', 'AI', 'HIPAA'], color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
  { title: 'EduFlow', category: "Ta'lim", desc: "Kurs yaratuvchisi, muvaffaqiyatni kuzatish, virtual sinflar va talabalar tahliliga ega o'quvni boshqarish tizimi.", tags: ['LMS', 'Mobile', 'Analytics'], color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { title: 'BuildPro', category: 'Qurilish', desc: 'Resurslarni taqsimlash, vaqt jadvalini kuzatish, byudjetni boshqarish va haqiqiy vaqtda hisobot berish kabi loyihalarni boshqarish to\'plami.', tags: ['ERP', 'Dashboard', 'Automation'], color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { title: 'StyleStudio', category: "Go'zallik", desc: 'Onlayn band qilish, mijozlar profillari, inventarni boshqarish va avtomatlashtirilgan marketing kampaniyalari bilan salon boshqaruvi.', tags: ['Booking', 'CRM', 'Marketing'], color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' },
  { title: 'LogiTrack', category: 'Logistika', desc: 'Haqiqiy vaqtda kuzatish, marshrutni optimallashtirish va avtomatlashtirilgan jo\'natishga ega parklarni boshqarish va logistika platformasi.', tags: ['IoT', 'AI', 'Mobile'], color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)' },
]

const filters = ['Barchasi', ...new Set(projects.map((p) => p.category))]

export default function Portfolio() {
  const sectionRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('Barchasi')
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const filtered = activeFilter === 'Barchasi' ? projects : projects.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.port__header > *', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="portfolio" className="port section" ref={sectionRef}>
      <div className="container">
        <div className="port__header">
          <span className="badge"><span className="badge__dot" />Bizning Ishlarimiz</span>
          <h2 className="heading-1">O'z-o'zidan <span className="text-gradient">So'zlaydigan Loyihalar</span></h2>
          <p className="text-secondary port__desc">Turli sohalardagi bizneslar uchun yaratgan raqamli mahsulotlarimizning saralangan to'plami.</p>
        </div>
        <div className="port__filters">
          {filters.map((f) => (
            <button key={f} className={`port__filter ${f === activeFilter ? 'port__filter--active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>
        <motion.div className="port__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article key={project.title} className="port__card glass-card" layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <div className="port__card-preview" style={{ background: project.gradient }}>
                  <div className="port__card-mockup">
                    <div className="port__card-mockup-bar"><span /><span /><span /></div>
                    <div className="port__card-mockup-content">
                      <div className="port__card-mockup-sidebar" />
                      <div className="port__card-mockup-main">
                        <div className="port__card-mockup-line" style={{ width: '70%' }} />
                        <div className="port__card-mockup-line" style={{ width: '50%' }} />
                        <div className="port__card-mockup-line" style={{ width: '85%' }} />
                        <div className="port__card-mockup-grid"><div /><div /><div /></div>
                      </div>
                    </div>
                  </div>
                  <div className="port__card-reflection" />
                </div>
                <div className="port__card-info">
                  <div className="port__card-meta">
                    <span className="port__card-category" style={{ color: project.color }}>{project.category}</span>
                    <div className="port__card-dot" />
                    <span className="port__card-year">2024</span>
                  </div>
                  <h3 className="port__card-title">{project.title}</h3>
                  <p className="port__card-desc">{project.desc}</p>
                  <div className="port__card-tags">{project.tags.map((tag) => <span key={tag} className="port__card-tag">{tag}</span>)}</div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
