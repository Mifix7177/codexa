import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Kashfiyot', desc: "Biz sizning biznesingizni chuqur o'rganamiz, maqsadlaringiz, auditoriyangiz, muammolaringiz va raqobat muhitini tushunib, muvaffaqiyat poydevorini yaratamiz.", accent: '#4f7df5' },
  { num: '02', title: 'Strategiya', desc: "Biz keng qamrovli raqamli strategiyani ishlab chiqamiz — to'g'ri texnologiyalarni tanlash, foydalanuvchi yo'llarini aniqlash va sizning qarashlaringizga mos keladigan yo'l xaritasini yaratish.", accent: '#8b5cf6' },
  { num: '03', title: 'Dizayn', desc: "Bizning dizayn jamoamiz estetika va qulaylikni o'zida mujassam etgan hayratlanarli, intuitiv interfeyslarni yaratadi va har bir pikselning o'z o'rni bo'lishini ta'minlaydi.", accent: '#06b6d4' },
  { num: '04', title: 'Ishlab chiqish', desc: "Ekspert muhandislarimiz toza, kengaytiriladigan kod bilan dizaynlarni hayotga tatbiq etadilar — har qanday sharoitda mukammal ishlaydigan kuchli tizimlarni quramiz.", accent: '#14b8a6' },
  { num: '05', title: 'Sinov', desc: "Qurilmalar, brauzerlar va maxsus holatlar bo'yicha qat'iy sifat nazorati. Biz hamma narsani ishga tushirishdan oldin ishlashi, xavfsizligi va qulayligini sinovdan o'tkazamiz.", accent: '#f59e0b' },
  { num: '06', title: 'Ishga tushirish', desc: "Uzilishlarsiz ehtiyotkorlik bilan rejalashtirilgan ishga tushirish. Biz migratsiya, DNS, SSL, monitoringni boshqaramiz va birinchi kundan hamma narsa muammosiz ishlashini ta'minlaymiz.", accent: '#ec4899' },
  { num: '07', title: "O'sish", desc: "Ishga tushirilgandan so'ng optimallashtirish, tahlil integratsiyasi, A/B testlari va biznesingizni rivojlantirish va kengaytirishga yordam beradigan doimiy yaxshilanishlar.", accent: '#f97316' },
]

export default function Process() {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.proc__header > *', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%' } })
      const stepEls = section.querySelectorAll('.proc__step')
      stepEls.forEach((step, i) => {
        ScrollTrigger.create({ trigger: step, start: 'top center', end: 'bottom center', onEnter: () => setActiveStep(i), onEnterBack: () => setActiveStep(i) })
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="proc section" ref={sectionRef}>
      <div className="container">
        <div className="proc__header">
          <span className="badge"><span className="badge__dot" />Qanday Ishlaymiz</span>
          <h2 className="heading-1">Mukammallik Uchun Qurilgan <span className="text-gradient">Jarayon</span></h2>
          <p className="text-secondary proc__desc">Sizning tasavvuringizni bozorga tayyor raqamli mahsulotga aylantiradigan yetti ehtiyotkorlik bilan ishlangan bosqich.</p>
        </div>
        <div className="proc__layout">
          <div className="proc__sticky">
            <div className="proc__sticky-card glass-card">
              <motion.div className="proc__sticky-num text-gradient" key={activeStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>{steps[activeStep].num}</motion.div>
              <motion.h3 className="proc__sticky-title" key={`t-${activeStep}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>{steps[activeStep].title}</motion.h3>
              <div className="proc__progress">
                {steps.map((_, i) => <div key={i} className={`proc__progress-dot ${i === activeStep ? 'proc__progress-dot--active' : ''} ${i < activeStep ? 'proc__progress-dot--done' : ''}`} />)}
              </div>
              <div className="proc__sticky-line" style={{ background: steps[activeStep].accent }} />
            </div>
          </div>
          <div className="proc__steps">
            {steps.map((step, i) => (
              <div key={step.num} className={`proc__step ${i === activeStep ? 'proc__step--active' : ''}`}>
                <div className="proc__step-num" style={{ color: step.accent }}>{step.num}</div>
                <h3 className="proc__step-title">{step.title}</h3>
                <p className="proc__step-desc">{step.desc}</p>
                <div className="proc__step-line" style={{ background: step.accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
