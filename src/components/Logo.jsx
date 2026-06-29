import './Logo.css'

export function BrandName() {
  return (
    <span className="brand-name">
      Code<span className="brand-name__x">x</span>a
    </span>
  )
}

export default function Logo({ className = '' }) {
  return (
    <div className={`brand-logo ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src="/logo.png" 
        alt="Codexa" 
        style={{ 
          height: 'clamp(40px, 6vw, 60px)', 
          mixBlendMode: 'screen', 
          objectFit: 'contain' 
        }} 
      />
    </div>
  )
}
