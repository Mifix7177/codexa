import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

export default function Loader({ onComplete }) {
  const [show, setShow] = useState(true)
  const [text, setText] = useState('')
  const fullText = "INITIALIZING CODEXA OS..."

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onComplete, 600)
    }, 2800)
    
    return () => {
      clearInterval(typingInterval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="loader__terminal">
            <div className="loader__text">{text}<span className="loader__cursor" /></div>
          </div>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo className="loader__logo" />
          </motion.div>
          <motion.div
            className="loader__bar-track"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <div className="loader__bar" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
