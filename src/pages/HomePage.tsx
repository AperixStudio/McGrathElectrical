import { SectionTitle } from '../components/SectionTitle'
import { processSteps, services } from '../lib/siteData'

export function HomePage() {
  return (
    <main>
      <section id="home" className="hero">
        <p className="eyebrow">Licensed Electricians • Melbourne</p>
        <h1>Powering Homes and Businesses with Safe, Reliable Electrical Work.</h1>
        <p>
          McGrath Electrical delivers clean workmanship, transparent pricing, and dependable turnaround for
          residential and commercial projects.
        </p>
        <div className="hero-actions">
          <a href="tel:+61390000000">Call 03 9000 0000</a>
          <a className="secondary" href="mailto:hello@mcgrathelectrical.com.au">
            Request Quote
          </a>
        </div>
      </section>

      <section id="services" className="panel">
        <SectionTitle
          eyebrow="Core Services"
          title="Electrical Services Built for Compliance and Longevity"
          subtitle="Practical solutions backed by clear communication and tidy execution."
        />
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.name} className="service-card">
              <h3>{service.name}</h3>
              <p>{service.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="panel alt">
        <SectionTitle
          eyebrow="How We Work"
          title="A Straightforward Delivery Process"
          subtitle="Every project follows the same safety-first, no-surprises workflow."
        />
        <ol className="process-list">
          {processSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section id="contact" className="cta">
        <h2>Need a trusted electrician this week?</h2>
        <p>Tell us what you need and we will send a scope and quote within one business day.</p>
        <a href="mailto:hello@mcgrathelectrical.com.au">Start Your Project</a>
      </section>
    </main>
  )
}
