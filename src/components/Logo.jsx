import './Logo.css'

export function BrandName() {
  return (
    <span className="brand-name">
      Code<span className="brand-name__xa">xa</span>
    </span>
  )
}

export default function Logo({ className = '' }) {
  return (
    <div className={`brand-logo ${className}`}>
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo__icon">
        {/* Blue gradients */}
        <defs>
          <linearGradient id="blueGrad" x1="15" y1="5" x2="65" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B4DB" />
            <stop offset="1" stopColor="#0088FF" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="35" y1="75" x2="85" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9D00FF" />
            <stop offset="1" stopColor="#C026D3" />
          </linearGradient>
        </defs>

        {/* Left angle bracket < */}
        <path d="M 35 25 L 15 50 L 35 75" stroke="url(#blueGrad)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Right angle bracket > */}
        <path d="M 65 25 L 85 50 L 65 75" stroke="url(#purpleGrad)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* X left leg \ */}
        <path d="M 35 25 L 65 75" stroke="url(#blueGrad)" strokeWidth="14" strokeLinecap="round" />
        
        {/* X right leg / */}
        <path d="M 65 25 L 35 75" stroke="url(#purpleGrad)" strokeWidth="14" strokeLinecap="round" />
      </svg>
      <span className="brand-logo__text">
        Code<span className="brand-logo__xa">xa</span>
      </span>
    </div>
  )
}
