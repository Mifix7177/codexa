import { useRef, Fragment } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCounter } from '../hooks/useAnimations'
import './Numbers.css'

const stats = [
  { value: 100, suffix: '+', label: 'Bajarilgan Loyihalar', color: '#4f7df5' },
  { value: 98, suffix: '%', label: 'Mijozlar Mamnuniyati', color: '#06b6d4' },
  { value: 24, suffix: '/7', label: "Maxsus Qo'llab-quvvatlash", color: '#4f7df5' },
  { value: 10, suffix: '+', label: 'Qamrab Olingan Sohalar', color: '#4f7df5' },
]

function StatItem({ stat, index }) {
  const [ref, count] = useCounter(stat.value, 2000)

  return (
    <motion.div ref={ref} className="num__item" initial={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}>
      <div className="num__value">
        <span style={{ color: stat.color }}>{count}</span>
        <span style={{ color: stat.color }}>{stat.suffix}</span>
      </div>
      <div className="num__label">{stat.label}</div>
    </motion.div>
  )
}

export default function Numbers() {
  return (
    <section className="num section">
      <div className="container">
        <div className="num__grid">
          {stats.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && <div className="num__divider" />}
              <StatItem stat={stat} index={i} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
