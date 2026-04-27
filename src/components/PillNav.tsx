import { useState } from 'react'
import logo from '../assets/MGElecLogo.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Proof', href: '#proof' },
  { label: 'Contact', href: '#contact' },
]

export function PillNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClose = () => setMenuOpen(false)

  return (
    <nav className="top-nav" aria-label="Main navigation">
      <div className="top-nav-shell">
        <a className="brand" href="#home" onClick={handleClose}>
          <img src={logo} alt="" className="brand-logo" />
          McGrath Electric Services
        </a>

        <div className="nav-actions">
          <div className="nav-links" role="list">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={handleClose}>
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            className="mobile-menu"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-panel">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={handleClose}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
