import { useState, useRef } from 'react'
import {
  motion, useTransform, animate, AnimatePresence,
  motionValue as createMotionValue,
  type MotionValue,
} from 'framer-motion'

export interface Review {
  name: string
  text: string
  date: string
}

const OFFSETS_DESKTOP = [
  { rotate: 0,    x: 0,   y: 0,  scale: 1    },
  { rotate: -7,   x: -44, y: 22, scale: 0.94 },
  { rotate:  7,   x:  44, y: 22, scale: 0.94 },
  { rotate: -13,  x: -76, y: 44, scale: 0.86 },
]

const OFFSETS_MOBILE = [
  { rotate: 0,   x: 0,   y: 0,  scale: 1    },
  { rotate: -4,  x: -20, y: 14, scale: 0.96 },
  { rotate:  4,  x:  20, y: 14, scale: 0.96 },
  { rotate: -7,  x: -36, y: 28, scale: 0.90 },
]

function getOffsets() {
  return typeof window !== 'undefined' && window.innerWidth < 540
    ? OFFSETS_MOBILE
    : OFFSETS_DESKTOP
}

function Card({
  review,
  index,
  x,
  onSwipe,
}: {
  review: Review
  index: number
  x: MotionValue<number>
  onSwipe: (dir: 1 | -1) => void
}) {
  const isTop = index === 0
  const OFFSETS = getOffsets()
  const off   = OFFSETS[Math.min(index, OFFSETS.length - 1)]

  const rotate      = useTransform(x, [-300, 300], [-25, 25])
  const cardOpacity = useTransform(x, [-380, -160, 0, 160, 380], [0, 1, 1, 1, 0])
  const leftHint    = useTransform(x, [-140, -50], [1, 0])
  const rightHint   = useTransform(x,  [50,  140], [0, 1])

  async function handleDragEnd(_: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    const SWIPE_DIST = 90
    const SWIPE_VEL  = 450

    if (Math.abs(info.offset.x) > SWIPE_DIST || Math.abs(info.velocity.x) > SWIPE_VEL) {
      const dir = info.offset.x > 0 ? 1 : -1
      await animate(x, dir * 650, {
        type: 'spring',
        stiffness: 600,
        damping: 40,
        velocity: info.velocity.x,
      })
      onSwipe(dir)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 600, damping: 40 })
    }
  }

  return (
    <motion.article
      className={`rstack-card${isTop ? ' rstack-card--top' : ''}`}
      style={{
        x,                                    // always the MotionValue — no jump on index change
        rotate:  isTop ? rotate : off.rotate, // transform for top, static for others
        opacity: isTop ? cardOpacity : 1,
        zIndex:  OFFSETS.length - index,
        position: 'absolute',
        top: 0, left: 0, right: 0,
        transformOrigin: 'bottom center',
      }}
      animate={{
        x:      off.x,       // springs the MotionValue to the fan position (0 for top)
        scale:  off.scale,
        y:      off.y,
        rotate: isTop ? 0 : off.rotate,
      }}
      initial={false}        // no jump on mount — animate from wherever the value already is
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      drag={isTop ? 'x' : false}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
    >
      {isTop && (
        <>
          <motion.div className="rstack-label rstack-label--left"  style={{ opacity: leftHint  }}>← Next</motion.div>
          <motion.div className="rstack-label rstack-label--right" style={{ opacity: rightHint }}>Next →</motion.div>
        </>
      )}
      <div className="rstack-card__stars">★★★★★</div>
      <p className="rstack-card__text">"{review.text}"</p>
      <div className="rstack-card__author">
        <div className="rstack-card__avatar">{review.name.charAt(0)}</div>
        <div>
          <strong>{review.name}</strong>
          <span>{review.date} · Google</span>
        </div>
      </div>
    </motion.article>
  )
}

export function ReviewStack({ reviews }: { reviews: Review[] }) {
  const [deck, setDeck] = useState(reviews)

  // Stable MotionValues per review name — survive re-renders and index changes
  const xMap = useRef<Map<string, MotionValue<number>>>(new Map())
  function getX(name: string) {
    if (!xMap.current.has(name)) xMap.current.set(name, createMotionValue(0))
    return xMap.current.get(name)!
  }

  const swipe = (_dir: 1 | -1) => {
    setDeck(prev => {
      const [, ...rest] = prev
      return rest.length === 0 ? reviews : rest
    })
  }

  const visible = deck.slice(0, 4)

  return (
    <div className="rstack-wrapper">
      <div className="rstack-stage">
        <AnimatePresence mode="sync">
          {[...visible].reverse().map((r, i) => {
            const trueIndex = visible.length - 1 - i
            return (
              <Card
                key={r.name}
                review={r}
                index={trueIndex}
                x={getX(r.name)}
                onSwipe={swipe}
              />
            )
          })}
        </AnimatePresence>
      </div>
      <div className="rstack-meta">
        <span className="rstack-count">{deck.length} of {reviews.length}</span>
      </div>
    </div>
  )
}
