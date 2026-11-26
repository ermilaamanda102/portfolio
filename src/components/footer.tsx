'use client'

import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { ArrowUpIcon, DownloadIcon, MailIcon } from 'lucide-react'

const EMAIL = 'ermila.amanda102@gmail.com'
const GITHUB = 'https://github.com/ermilaamanda102?tab=repositories'
const LINKEDIN = 'https://www.linkedin.com/in/ermila-amanda-661695299' // GANTI dengan link LinkedIn kamu
const CV = '/cv-ermila-amanda.pdf'

// Tinggi footer harus sama untuk pembungkus dan footer yang menempel di layar
const FRAME = 'h-[90svh] min-h-[680px] w-full'

const NAV = [
  { label: 'Case study', href: '#case-study' },
  { label: 'Experience', href: '#experience' },
  { label: 'How I work', href: '#how-i-work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
]

const MARQUEE = ['Software Engineer', 'Quality Assurance', 'Web & ML', 'Next.js', 'Go', 'Playwright', 'TensorFlow']

const CSS = `
@keyframes ea-footer-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.ea-footer-marquee {
  animation: ea-footer-marquee 40s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .ea-footer-marquee { animation: none; }
}
`

/* ------------------------------ Ikon ------------------------------ */

const GithubIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
  </svg>
)

const LinkedinIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect x='2' y='9' width='4' height='12' />
    <circle cx='4' cy='4' r='2' />
  </svg>
)

/* --------------------------- Pill magnetik --------------------------- */

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 }

const PILL =
  'inline-flex items-center gap-2 rounded-full border border-[#171412]/30 bg-[#f6f4f0]/10 px-5 py-2.5 text-[14px] font-semibold text-[#171412] backdrop-blur-sm transition-colors hover:bg-[#171412] hover:text-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171412]'

type MagneticProps = {
  children: ReactNode
  className?: string
  href?: string
  label?: string
  onClick?: () => void
}

// Pill yang sedikit ikut tertarik ke arah kursor (hanya untuk mouse)
const MagneticPill = ({ children, className = PILL, href, label, onClick }: MagneticProps) => {
  const reduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== 'mouse') return

    const rect = event.currentTarget.getBoundingClientRect()

    rawX.set((event.clientX - rect.left - rect.width / 2) * 0.3)
    rawY.set((event.clientY - rect.top - rect.height / 2) * 0.3)
  }

  const reset = () => {
    rawX.set(0)
    rawY.set(0)
  }

  if (href) {
    return (
      <motion.a href={href} aria-label={label} className={className} style={{ x, y }} onPointerMove={handleMove} onPointerLeave={reset}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type='button' aria-label={label} className={className} style={{ x, y }} onClick={onClick} onPointerMove={handleMove} onPointerLeave={reset}>
      {children}
    </motion.button>
  )
}

/* ------------------------------- Dock ------------------------------- */

type DockItem = { label: string; href: string; icon: ReactNode; external?: boolean; download?: string }

const DOCK: DockItem[] = [
  { label: 'GitHub', href: GITHUB, icon: <GithubIcon />, external: true },
  { label: 'LinkedIn', href: LINKEDIN, icon: <LinkedinIcon />, external: true },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: <MailIcon aria-hidden className='size-6' /> },
  { label: 'Download CV', href: CV, icon: <DownloadIcon aria-hidden className='size-6' />, download: 'CV-Ermila-Amanda.pdf' },
]

// Ikon yang membesar saat kursor mendekat, seperti dock di macOS
const DockIcon = ({ item, mouseX }: { item: DockItem; mouseX: MotionValue<number> }) => {
  const ref = useRef<HTMLAnchorElement>(null)

  const distance = useTransform(mouseX, value => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return value - bounds.x - bounds.width / 2
  })

  const size = useTransform(distance, [-140, 0, 140], [48, 72, 48])
  const width = useSpring(size, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.a
      ref={ref}
      href={item.href}
      aria-label={item.label}
      download={item.download}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noreferrer' : undefined}
      style={{ width, height: width }}
      className='group relative grid shrink-0 place-items-center rounded-full bg-[#171412] text-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171412]'
    >
      {item.icon}
      <span
        aria-hidden
        className='pointer-events-none absolute -top-9 rounded-md bg-[#171412] px-2 py-1 text-[12px] font-medium whitespace-nowrap text-[#f6f4f0] opacity-0 transition-opacity group-hover:opacity-100'
      >
        {item.label}
      </span>
    </motion.a>
  )
}

const Dock = () => {
  const mouseX = useMotionValue(Infinity)

  return (
    <div
      onMouseMove={event => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className='flex h-[84px] items-end gap-3 rounded-2xl bg-[#171412]/10 px-3 pb-3'
    >
      {DOCK.map(item => (
        <DockIcon key={item.label} item={item} mouseX={mouseX} />
      ))}
    </div>
  )
}

/* ------------------------------ Marquee ------------------------------ */

const MarqueeRow = () => (
  <div className='flex items-center gap-10 pr-10'>
    {MARQUEE.map(word => (
      <span key={word} className='flex items-center gap-10'>
        <span>{word}</span>
        <span className='text-[#ff4829]'>✦</span>
      </span>
    ))}
  </div>
)

/* ------------------------------ Footer ------------------------------ */

/**
 * Footer "tirai": footernya menempel di bawah layar dan baru terbuka saat halaman di-scroll ke ujung,
 * karena pembungkusnya meng-clip isinya. Teks raksasa dan kontennya naik pelan-pelan mengikuti scroll.
 */
export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start 0.8', 'end end'] })

  const giantY = useTransform(scrollYProgress, [0, 1], ['10vh', '0vh'])
  const giantScale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const giantOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const lift = useTransform(scrollYProgress, [0.3, 0.85], [40, 0])
  const fade = useTransform(scrollYProgress, [0.3, 0.85], [0, 1])

  return (
    <div ref={wrapperRef} className={`relative ${FRAME}`} style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}>
      <style>{CSS}</style>

      <footer className={`fixed bottom-0 left-0 flex flex-col justify-between overflow-hidden bg-[#ff4829] ${FRAME}`}>
        {/* Teks raksasa di belakang */}
        <div aria-hidden className='pointer-events-none absolute -bottom-[4vw] left-1/2 z-0 -translate-x-1/2 select-none'>
          <motion.div
            className='font-ea-display text-[22vw] leading-[0.75] font-black tracking-[-0.05em] whitespace-nowrap'
            style={{
              WebkitTextStroke: '2px rgb(246 244 240 / 0.6)',
              color: 'transparent',
              ...(reduce ? {} : { y: giantY, scale: giantScale, opacity: giantOpacity }),
            }}
          >
            ERMILA
          </motion.div>
        </div>

        {/* Pita marquee miring di atas */}
        <div aria-hidden className='absolute top-10 left-0 z-10 w-full -rotate-2 scale-110 overflow-hidden bg-[#171412] py-4 text-[#f6f4f0]'>
          <div className='ea-footer-marquee flex w-max text-[clamp(16px,2vw,24px)] font-semibold'>
            <MarqueeRow />
            <MarqueeRow />
          </div>
        </div>

        {/* Konten tengah */}
        <motion.div
          className='relative z-10 mx-auto mt-28 flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 px-6'
          style={reduce ? undefined : { y: lift, opacity: fade }}
        >
          <h2 className='font-ea-display text-center text-[clamp(40px,8vw,112px)] leading-[0.9] font-black tracking-[-0.04em] text-[#171412]'>
            Thanks for
            <br />
            stopping by.
          </h2>

          <nav aria-label='Footer' className='flex flex-wrap justify-center gap-3'>
            {NAV.map(item => (
              <MagneticPill key={item.label} href={item.href}>
                {item.label}
              </MagneticPill>
            ))}
          </nav>

          <Dock />
        </motion.div>

        {/* Baris bawah */}
        <div className='relative z-20 flex flex-col items-center justify-between gap-4 px-6 pb-8 text-[13px] font-medium text-[#171412] md:flex-row md:px-12'>
          <p>&copy; 2026 Ermila Amanda</p>
          <p>Built with Next.js and Motion</p>
          <MagneticPill
            label='Back to top'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='grid size-12 place-items-center rounded-full border border-[#171412]/30 bg-[#f6f4f0]/10 text-[#171412] transition-colors hover:bg-[#171412] hover:text-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171412]'
          >
            <ArrowUpIcon aria-hidden className='size-5' />
          </MagneticPill>
        </div>
      </footer>
    </div>
  )
}