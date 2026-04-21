import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export function PillNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClose = () => setMenuOpen(false)

  return (
    <nav className="top-nav" aria-label="Main navigation">
      <div className="top-nav-shell">
        <a className="brand" href="#home" onClick={handleClose}>
          McGrath Electrical
        </a>

        <div className="nav-links" role="list">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={handleClose}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="desktop-cta" href="tel:+61390000000">
            03 9000 0000
          </a>
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
            <a href="tel:+61390000000" onClick={handleClose}>
              Call 03 9000 0000
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
