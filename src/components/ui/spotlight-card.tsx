'use client'

import { useRef } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  /** Warna dasar kartu */
  color?: string
  /** Warna garis tepi yang menyala mengikuti kursor */
  glow?: string
}

export function SpotlightCard({ children, className, color = '#efe9df', glow = '#ff4829' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current

    if (!element) return

    const rect = element.getBoundingClientRect()

    element.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    element.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn('group relative isolate overflow-hidden rounded-2xl', className)}
      style={{ backgroundColor: color, '--mx': '50%', '--my': '0%', '--glow': glow } as CSSProperties}
    >
      {/* Cahaya lembut di bawah teks */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={{
          background: 'radial-gradient(320px circle at var(--mx) var(--my), rgb(255 255 255 / 0.55), transparent 70%)',
        }}
      />

      {/* Garis tepi yang menyala */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 rounded-[inherit] p-[1.5px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={
          {
            background: 'radial-gradient(200px circle at var(--mx) var(--my), var(--glow), transparent 70%)',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
          } as CSSProperties
        }
      />

      {children}
    </div>
  )
}