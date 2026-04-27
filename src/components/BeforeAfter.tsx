import { useRef, useState } from 'react'

interface Slide {
  before: string
  after: string
  label: string
  beforeAlt?: string
  afterAlt?: string
}

interface BeforeAfterProps {
  slides: Slide[]
}

function Slider({ before, after, beforeAlt = 'Before', afterAlt = 'After' }: Omit<Slide, 'label'>) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const calc = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect()
    return Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100))
  }

  const move = (clientX: number) => {
    if (dragging.current) setPos(calc(clientX))
  }

  return (
    <div
      ref={ref}
      className="ba-slider"
      onMouseMove={(e) => move(e.clientX)}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchEnd={() => { dragging.current = false }}
    >
      {/* After — base layer */}
      <img src={after} alt={afterAlt} className="ba-img" draggable={false} />

      {/* Before — clipped via clip-path so it's always full size */}
      <img
        src={before}
        alt={beforeAlt}
        className="ba-img ba-img--before"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      {/* Labels */}
      <span className="ba-tag ba-tag--before">Before</span>
      <span className="ba-tag ba-tag--after">After</span>

      {/* Divider + handle */}
      <div className="ba-line" style={{ left: `${pos}%` }}>
        <button
          className="ba-btn"
          onMouseDown={(e) => { e.preventDefault(); dragging.current = true; setPos(calc(e.clientX)) }}
          onTouchStart={(e) => { dragging.current = true; setPos(calc(e.touches[0].clientX)) }}
          aria-label="Drag to compare"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export function BeforeAfter({ slides }: BeforeAfterProps) {
  const [active, setActive] = useState(0)

  return (
    <div className="ba-carousel">
      <Slider key={active} {...slides[active]} />

      {slides.length > 1 && (
        <>
          <button
            className="ba-nav ba-nav--prev"
            onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="ba-nav ba-nav--next"
            onClick={() => setActive((i) => (i + 1) % slides.length)}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      <div className="ba-footer">
        <span className="ba-caption">{slides[active].label}</span>
        {slides.length > 1 && (
          <div className="ba-dots">
            {slides.map((s, i) => (
              <button
                key={i}
                className={`ba-dot${i === active ? ' ba-dot--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={s.label}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
