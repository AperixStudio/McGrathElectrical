import { useEffect, useState } from 'react'
import { BeforeAfter } from '../components/BeforeAfter'
import auraPhoto1 from '../assets/AuraPhoto1.webp'
import auraPhoto2 from '../assets/AuraPhoto2.webp'
import auraPhoto3 from '../assets/AuraPhoto3.webp'
import kitchenAfter from '../assets/KitchenAfter.webp'
import kitchenBefore from '../assets/KitchenBefore.webp'
import logo from '../assets/MGElecLogo.png'
import mcGrathLadder from '../assets/McGrathHimselfLadder.webp'
import mcGrathSawing from '../assets/McGrathHimselfSawing.webp'
import newSwitchBoard from '../assets/NewSwitchBoard.webp'
import oldSwitchboard from '../assets/OldSwitchboard.webp'

const heroPhotos = [auraPhoto1, auraPhoto2, auraPhoto3]
const footerLinks = ['Home', 'Services', 'Proof', 'About', 'Contact']

export function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroFading, setHeroFading] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setHeroFading(true)
      setTimeout(() => {
        setHeroIndex((i) => (i + 1) % heroPhotos.length)
        setHeroFading(false)
      }, 600)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <main>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        id="home"
        className={`hero hero-layout hero-with-photo-bg${heroFading ? ' hero-bg-fade' : ''}`}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10,15,20,0.74), rgba(22,32,44,0.62)), url(${heroPhotos[heroIndex]})`,
        }}
      >
        <div className="hero-copy">
          <h1>Melbourne's Best Local Electrician.</h1>
          <p className="lead">
            Switchboard upgrades, fault finding, and kitchen rewires. Licensed, insured, on time.
          </p>
          <div className="hero-actions">
            <a href="tel:+61390000000">Call Now</a>
            <a className="secondary" href="#contact">Get a Quote</a>
          </div>
        </div>

        <div className="hero-visual">
          {heroPhotos.map((photo, i) => (
            <div
              key={photo}
              className={`hero-slide${i === heroIndex ? ' hero-slide--active' : ''}`}
            >
              <img src={photo} alt={`Project photo ${i + 1}`} className="hero-image" />
            </div>
          ))}
          <div className="hero-slide-dots">
            {heroPhotos.map((_, i) => (
              <button
                key={i}
                className={`hero-dot${i === heroIndex ? ' hero-dot--active' : ''}`}
                onClick={() => setHeroIndex(i)}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section id="services" className="panel services-panel">
        <div className="section-heading">
          <p className="eyebrow">What we do</p>
          <h2>Electrical services for homes &amp; businesses.</h2>
        </div>
        <div className="service-grid service-grid-three">
          <article className="service-card">
            <div className="service-card__num">01</div>
            <h3>Switchboard Upgrades</h3>
            <p>Replace old fuse boxes with a modern board — safety switches fitted as standard, fully compliant with Australian standards.</p>
          </article>
          <article className="service-card">
            <div className="service-card__num">02</div>
            <h3>Lighting &amp; Power</h3>
            <p>Power points, LED downlights, outdoor lighting, and smart switches. Clean installs, no mess left behind.</p>
          </article>
          <article className="service-card">
            <div className="service-card__num">03</div>
            <h3>Fault Finding &amp; Repairs</h3>
            <p>Tripping circuits, dead outlets, flickering lights — diagnosed and fixed. Same-day callouts available.</p>
          </article>
        </div>
      </section>

      {/* ── PROOF ─────────────────────────────────────────────────── */}
      <section id="proof" className="panel proof-panel">
        <div className="section-heading">
          <p className="eyebrow">Recent work</p>
          <h2>Before &amp; after.</h2>
        </div>
        <div className="ba-pair">
          <BeforeAfter
            slides={[{
              label: 'Kitchen rewire',
              before: kitchenBefore,
              after: kitchenAfter,
              beforeAlt: 'Kitchen before',
              afterAlt: 'Kitchen after',
            }]}
          />
          <BeforeAfter
            slides={[{
              label: 'Switchboard upgrade',
              before: oldSwitchboard,
              after: newSwitchBoard,
              beforeAlt: 'Old switchboard',
              afterAlt: 'New switchboard',
            }]}
          />
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section id="about" className="panel about-panel">
        <div className="about-layout">
          <div className="about-photos">
            <article className="about-card about-card--primary">
              <img src={mcGrathLadder} alt="McGrath on site" />
            </article>
            <article className="about-card about-card--secondary">
              <img src={mcGrathSawing} alt="McGrath working" />
            </article>
          </div>
          <div className="about-copy">
            <p className="eyebrow">About</p>
            <h2>The sparky behind the work.</h2>
            <p>
              Liam McGrath and McGrath Electric Services is a Melbourne-based electrical contractor. All work is carried out by a licensed electrician.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <section id="contact" className="cta contact-panel">
        <div className="contact-intro">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2>Request a quote.</h2>
            <p>Fill out the form and we'll get back to you shortly.</p>
          </div>
        </div>
        <form className="quote-form">
          <label>
            <span>Your Name</span>
            <input type="text" name="name" placeholder="Full name" />
          </label>
          <label>
            <span>Phone Number</span>
            <input type="tel" name="phone" placeholder="04xx xxx xxx" />
          </label>
          <label>
            <span>Email Address</span>
            <input type="email" name="email" placeholder="you@email.com" />
          </label>
          <label>
            <span>Service Needed</span>
            <select name="service">
              <option value="">Select a service…</option>
              <option>Switchboard Upgrade</option>
              <option>Fault Finding / Repair</option>
              <option>Lighting &amp; Power Points</option>
              <option>Kitchen / Bathroom Rewire</option>
              <option>Safety Switch Installation</option>
              <option>Other</option>
            </select>
          </label>
          <label className="quote-form__message">
            <span>Job details</span>
            <textarea name="details" rows={4} placeholder="Brief description of the work needed…" />
          </label>
          <button type="submit">Send Enquiry →</button>
        </form>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <img src={logo} alt="McGrath Electric Services" className="site-footer__logo" />
            <strong>McGrath Electric Services</strong>
            <p>Licensed electrical contractor<br />Melbourne, VIC</p>
          </div>

          <div className="site-footer__col">
            <span className="site-footer__col-heading">Services</span>
            <a href="#services">Switchboard Upgrades</a>
            <a href="#services">Lighting &amp; Power</a>
            <a href="#services">Fault Finding &amp; Repairs</a>
          </div>

          <div className="site-footer__col">
            <span className="site-footer__col-heading">Navigate</span>
            {footerLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
            ))}
          </div>

          <div className="site-footer__col">
            <span className="site-footer__col-heading">Contact</span>
            <a href="tel:+61390000000">Call us</a>
            <a href="#contact">Request a quote</a>
          </div>
        </div>

        <div className="site-footer__sub">
          <span>© {new Date().getFullYear()} McGrath Electric Services</span>
          <span>Website by <a href="https://aperixstudio.com.au" target="_blank" rel="noreferrer">Aperix Studio</a></span>
        </div>
      </footer>

      {/* ── FAB ───────────────────────────────────────────────────── */}
      <div className="contact-fab" aria-label="Quick contact actions">
        <a className="contact-fab__call" href="tel:+61390000000">Call Now</a>
        <a className="contact-fab__quote" href="#contact">Free Quote</a>
      </div>
    </main>
  )
}
