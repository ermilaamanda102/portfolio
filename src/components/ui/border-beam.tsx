'use client'

/**
 * BeamBorder: border berputar dengan cahaya warna-warni (versi ringkas dari komponen 21st.dev / Hyperiux Vault).
 * Hanya memuat ukuran "md" (border yang berputar). Varian pulse, line dan sm sengaja dibuang
 * karena tidak dipakai di portofolio ini.
 *
 * Gradien, mask dan keyframe dibuat per instance (CSS di-generate), jadi tidak bisa diganti utility Tailwind.
 */

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type AnimationEvent,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from 'react'

type ColorVariant = 'colorful' | 'mono' | 'ocean' | 'sunset'
type Theme = 'dark' | 'light'

type Blob = { color: string; pos: string; size: string }

/* ------------------------------ Palet warna ------------------------------ */

const PALETTES: Record<ColorVariant, Blob[]> = {
  colorful: [
    { color: 'rgb(40, 140, 255)', pos: '12% 1%', size: '130px 65px' },
    { color: 'rgb(255, 50, 100)', pos: '33% 0%', size: '150px 75px' },
    { color: 'rgb(50, 200, 80)', pos: '2.1% 68.3%', size: '46px 130px' },
    { color: 'rgb(30, 185, 170)', pos: '2.1% 68.3%', size: '24px 68px' },
    { color: 'rgb(100, 70, 255)', pos: '74.4% 100%', size: '280px 56px' },
    { color: 'rgb(40, 140, 255)', pos: '55% 100%', size: '150px 50px' },
    { color: 'rgb(255, 120, 40)', pos: '93.9% 1%', size: '150px 82px' },
    { color: 'rgb(240, 50, 180)', pos: '100% 27.1%', size: '30px 80px' },
    { color: 'rgb(180, 40, 240)', pos: '100% 27.1%', size: '56px 92px' },
  ],
  mono: [
    { color: 'rgb(180, 180, 180)', pos: '33% -7.4%', size: '70px 40px' },
    { color: 'rgb(140, 140, 140)', pos: '12% -5%', size: '60px 35px' },
    { color: 'rgb(160, 160, 160)', pos: '2.1% 68.3%', size: '40px 70px' },
    { color: 'rgb(130, 130, 130)', pos: '2.1% 68.3%', size: '20px 35px' },
    { color: 'rgb(170, 170, 170)', pos: '74.4% 100%', size: '180px 32px' },
    { color: 'rgb(150, 150, 150)', pos: '55% 100%', size: '85px 26px' },
    { color: 'rgb(190, 190, 190)', pos: '93.9% 0%', size: '74px 32px' },
    { color: 'rgb(145, 145, 145)', pos: '100% 27.1%', size: '26px 42px' },
    { color: 'rgb(165, 165, 165)', pos: '100% 27.1%', size: '52px 48px' },
  ],
  ocean: [
    { color: 'rgb(100, 80, 220)', pos: '33% -7.4%', size: '70px 40px' },
    { color: 'rgb(60, 120, 255)', pos: '12% -5%', size: '60px 35px' },
    { color: 'rgb(80, 100, 200)', pos: '2.1% 68.3%', size: '40px 70px' },
    { color: 'rgb(50, 140, 220)', pos: '2.1% 68.3%', size: '20px 35px' },
    { color: 'rgb(120, 80, 255)', pos: '74.4% 100%', size: '180px 32px' },
    { color: 'rgb(70, 130, 255)', pos: '55% 100%', size: '85px 26px' },
    { color: 'rgb(140, 100, 240)', pos: '93.9% 0%', size: '74px 32px' },
    { color: 'rgb(90, 110, 230)', pos: '100% 27.1%', size: '26px 42px' },
    { color: 'rgb(130, 70, 255)', pos: '100% 27.1%', size: '52px 48px' },
  ],
  sunset: [
    { color: 'rgb(255, 80, 50)', pos: '33% -7.4%', size: '70px 40px' },
    { color: 'rgb(255, 160, 40)', pos: '12% -5%', size: '60px 35px' },
    { color: 'rgb(255, 120, 60)', pos: '2.1% 68.3%', size: '40px 70px' },
    { color: 'rgb(255, 200, 50)', pos: '2.1% 68.3%', size: '20px 35px' },
    { color: 'rgb(255, 100, 80)', pos: '74.4% 100%', size: '180px 32px' },
    { color: 'rgb(255, 180, 60)', pos: '55% 100%', size: '85px 26px' },
    { color: 'rgb(255, 60, 60)', pos: '93.9% 0%', size: '74px 32px' },
    { color: 'rgb(255, 140, 50)', pos: '100% 27.1%', size: '26px 42px' },
    { color: 'rgb(255, 90, 70)', pos: '100% 27.1%', size: '52px 48px' },
  ],
}

const JOIN = ',\n    '

// Lapisan warna di tepi (garis border)
const edgeLayer = (variant: ColorVariant) =>
  PALETTES[variant].map(c => `radial-gradient(ellipse ${c.size} at ${c.pos}, ${c.color}, transparent)`).join(JOIN)

// Lapisan warna di dalam (cahaya lembut yang masuk ke kartu)
const coreLayer = (variant: ColorVariant) => {
  const alpha = variant === 'mono' ? 0.225 : 0.45

  return PALETTES[variant]
    .map(c => {
      const rgba = c.color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`)
      const smaller = c.size
        .split(' ')
        .map(value => `${Math.round(parseInt(value) * 0.9)}px`)
        .join(' ')

      return `radial-gradient(ellipse ${smaller} at ${c.pos}, ${rgba}, transparent)`
    })
    .join(JOIN)
}

/* ------------------------------ Preset tema ------------------------------ */

type Finish = {
  strokeOpacity: number
  innerOpacity: number
  bloomOpacity: number
  saturation: number
  brightness: number
}

const FINISH: Record<Theme, Finish> = {
  dark: { strokeOpacity: 0.26, innerOpacity: 0.42, bloomOpacity: 0.24, saturation: 1.2, brightness: 1.3 },
  light: { strokeOpacity: 0.8, innerOpacity: 0.85, bloomOpacity: 0.95, saturation: 2.0, brightness: 1.6 },
}

/* ------------------------------ Generator CSS ------------------------------ */

type CSSOptions = {
  id: string
  borderRadius: number
  borderWidth: number
  duration: number
  strokeOpacity: number
  innerOpacity: number
  bloomOpacity: number
  colorVariant: ColorVariant
  staticColors: boolean
  brightness: number
  saturation: number
  hueRange: number
  theme: Theme
}

// Dengan prefers-reduced-motion, animasi diperlambat (bukan dimatikan)
const REDUCED_MOTION_SCALE = 3

const motionDur = (seconds: number | string) => `calc(${seconds}s * var(--rim-motion-scale, 1))`

const buildCSS = (o: CSSOptions) => {
  const { id, borderRadius, borderWidth, duration, colorVariant, staticColors, brightness, saturation, hueRange, theme } = o
  const innerRadius = Math.max(0, borderRadius - borderWidth)
  const isDark = theme === 'dark'

  // Varian mono dibuat 50% lebih redup
  const mono = colorVariant === 'mono' ? 0.5 : 1
  const strokeOpacity = o.strokeOpacity * mono
  const innerOpacity = o.innerOpacity * mono
  const bloomOpacity = o.bloomOpacity * mono

  const b = brightness.toFixed(2)
  const s = saturation.toFixed(2)

  const hueAnimation = staticColors ? '' : `animation: rim-hue-shift-${id} ${motionDur(12)} ease-in-out infinite;`

  const hueKeyframes = staticColors
    ? ''
    : `
@keyframes rim-hue-shift-${id} {
  0% { filter: blur(9px) hue-rotate(calc(var(--rim-hue-base, 0deg) - ${hueRange}deg)) brightness(${b}) saturate(${s}); }
  50% { filter: blur(9px) hue-rotate(calc(var(--rim-hue-base, 0deg) + ${hueRange}deg)) brightness(${b}) saturate(${s}); }
  100% { filter: blur(9px) hue-rotate(calc(var(--rim-hue-base, 0deg) - ${hueRange}deg)) brightness(${b}) saturate(${s}); }
}`

  const whiteGradient = isDark
    ? `conic-gradient(
        from var(--rim-angle-${id}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )`
    : `conic-gradient(
        from var(--rim-angle-${id}),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`

  const bloomGradient = isDark
    ? `conic-gradient(
        from var(--rim-angle-${id}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )`
    : `conic-gradient(
        from var(--rim-angle-${id}),
        transparent 0%, transparent 50%,
        rgba(0, 0, 0, 0.02) 55%,
        rgba(0, 0, 0, 0.08) 60%,
        rgba(0, 0, 0, 0.2) 65%,
        rgba(0, 0, 0, 0.4) 68%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 71%,
        rgba(0, 0, 0, 0.4) 74%,
        rgba(0, 0, 0, 0.2) 78%,
        rgba(0, 0, 0, 0.08) 83%,
        rgba(0, 0, 0, 0.02) 88%,
        transparent 93%
      )`

  // Sudut cahaya yang mengikuti putaran
  const sweepMask = `conic-gradient(
      from var(--rim-angle-${id}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    )`

  return `
@property --rim-angle-${id} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --rim-opacity-${id} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-rim="${id}"] {
  position: relative;
  border-radius: ${borderRadius}px;
  overflow: hidden;
}

[data-rim="${id}"][data-active] {
  animation:
    rim-spin-${id} ${motionDur(duration)} linear infinite,
    rim-fade-in-${id} ${motionDur(0.6)} ease forwards;
}

[data-rim="${id}"][data-fading] {
  animation:
    rim-spin-${id} ${motionDur(duration)} linear infinite,
    rim-fade-out-${id} ${motionDur(0.5)} ease forwards;
}

[data-rim="${id}"][data-active]::after,
[data-rim="${id}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${innerRadius}px;
  padding: ${borderWidth}px;
  clip-path: inset(0 round ${borderRadius}px);
  background: ${whiteGradient},${edgeLayer(colorVariant)};
  -webkit-mask:
    ${sweepMask},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    ${sweepMask},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--rim-opacity-${id}) * ${strokeOpacity.toFixed(2)} * var(--rim-stroke-opacity, 1) * var(--rim-strength, 1));
  ${hueAnimation}
}

[data-rim="${id}"][data-active]::before,
[data-rim="${id}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${borderRadius}px;
  background: ${coreLayer(colorVariant)};
  -webkit-mask-image:
    ${sweepMask},
    linear-gradient(white, transparent 420px, transparent calc(100% - 420px), white),
    linear-gradient(to right, white, transparent 420px, transparent calc(100% - 420px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    ${sweepMask},
    linear-gradient(white, transparent 420px, transparent calc(100% - 420px), white),
    linear-gradient(to right, white, transparent 420px, transparent calc(100% - 420px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--rim-opacity-${id}) * ${innerOpacity.toFixed(2)} * var(--rim-inner-opacity, 1) * var(--rim-strength, 1));
  clip-path: inset(0 round ${borderRadius}px);
  ${hueAnimation}
}

[data-rim="${id}"] [data-rim-glow] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${innerRadius}px;
  clip-path: inset(0 round ${borderRadius}px);
  background: ${bloomGradient};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${borderWidth}px;
  filter: blur(20px) brightness(${b}) saturate(${s});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-rim="${id}"][data-active] [data-rim-glow],
[data-rim="${id}"][data-fading] [data-rim-glow] {
  display: block;
  opacity: calc(var(--rim-opacity-${id}) * ${bloomOpacity.toFixed(2)} * var(--rim-bloom-opacity, 1) * var(--rim-strength, 1));
}

@keyframes rim-spin-${id} {
  to { --rim-angle-${id}: 360deg; }
}

@keyframes rim-fade-in-${id} {
  to { --rim-opacity-${id}: 1; }
}

@keyframes rim-fade-out-${id} {
  from { --rim-opacity-${id}: 1; }
  to { --rim-opacity-${id}: 0; }
}
${hueKeyframes}

/* Berhenti menganimasikan kalau kartu sedang di luar layar */
[data-rim="${id}"][data-paused],
[data-rim="${id}"][data-paused]::after,
[data-rim="${id}"][data-paused]::before,
[data-rim="${id}"][data-paused] [data-rim-glow] {
  animation-play-state: paused !important;
}

@media (prefers-reduced-motion: reduce) {
  [data-rim="${id}"] {
    --rim-motion-scale: ${REDUCED_MOTION_SCALE};
  }
}
`
}

/* ------------------------------ Hooks ------------------------------ */

// Di server useLayoutEffect memberi peringatan, jadi pakai useEffect di sana
const useBrowserLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect

const usePreferredScheme = (): Theme => {
  const [scheme, setScheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event: MediaQueryListEvent) => setScheme(event.matches ? 'dark' : 'light')

    query.addEventListener('change', handler)

    return () => query.removeEventListener('change', handler)
  }, [])

  return scheme
}

/* ------------------------------ Komponen ------------------------------ */

export type BeamBorderProps = {
  children?: ReactNode
  /** Hanya "md" (border berputar) yang tersedia di versi ringkas ini */
  size?: 'md'
  colorVariant?: ColorVariant
  theme?: 'dark' | 'light' | 'auto'
  /** Detik per putaran penuh */
  duration?: number
  active?: boolean
  /** Radius sudut. Kosong = dibaca dari anak pertama (rounded-*) */
  borderRadius?: number
  brightness?: number
  saturation?: number
  /** 0 sampai 1 */
  strength?: number
  /** Ketebalan garis border, dalam px */
  beamWidth?: number
  className?: string
  style?: CSSProperties
  onActivate?: () => void
  onDeactivate?: () => void
  onAnimationEnd?: (event: AnimationEvent<HTMLDivElement>) => void
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'style' | 'className' | 'onAnimationEnd'>

export const BeamBorder = forwardRef<HTMLDivElement, BeamBorderProps>(function BeamBorder(
  {
    children,
    size: _size = 'md',
    colorVariant = 'sunset',
    theme = 'light',
    duration = 1.96,
    active = true,
    borderRadius: customRadius,
    brightness: brightnessProp,
    saturation: saturationProp,
    strength = 1,
    beamWidth = 1,
    className,
    style,
    onActivate,
    onDeactivate,
    onAnimationEnd: consumerOnAnimationEnd,
    ...props
  },
  ref
) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '-')
  const scheme = usePreferredScheme()
  const hostRef = useRef<HTMLDivElement | null>(null)

  const [isOn, setIsOn] = useState(active)
  const [isClosing, setIsClosing] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const [autoRadius, setAutoRadius] = useState<number | null>(null)

  // Baca radius dari anak pertama sebelum browser menggambar, supaya sudutnya tidak "loncat"
  useBrowserLayoutEffect(() => {
    if (customRadius != null) return

    const host = hostRef.current

    if (!host) return

    const detect = () => {
      const child = host.firstElementChild

      if (!child) return

      const radius = parseFloat(getComputedStyle(child).borderTopLeftRadius)

      if (!Number.isNaN(radius) && radius > 0) setAutoRadius(radius)
    }

    detect()

    const observer = new MutationObserver(detect)

    observer.observe(host, { childList: true })

    return () => observer.disconnect()
  }, [customRadius, children])

  // Ikuti prop active: nyala langsung, mati lewat animasi fade-out dulu
  if (active && !isOn && !isClosing) {
    setIsOn(true)
  } else if (!active && isOn && !isClosing) {
    setIsClosing(true)
  }

  // Hentikan animasi saat kartu di luar layar
  useEffect(() => {
    const host = hostRef.current

    if (!host || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(entries => entries.forEach(entry => setOnScreen(entry.isIntersecting)), {
      rootMargin: '256px',
    })

    observer.observe(host)

    return () => observer.disconnect()
  }, [])

  const handleAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLDivElement>) => {
      if (event.animationName.includes('fade-out')) {
        setIsOn(false)
        setIsClosing(false)
        onDeactivate?.()
      } else if (event.animationName.includes('fade-in')) {
        onActivate?.()
      }

      consumerOnAnimationEnd?.(event)
    },
    [onActivate, onDeactivate, consumerOnAnimationEnd]
  )

  const activeTheme: Theme = theme === 'auto' ? scheme : theme
  const finish = FINISH[activeTheme]
  const radius = customRadius ?? autoRadius ?? 0

  const css = useMemo(
    () =>
      buildCSS({
        id,
        borderRadius: radius,
        borderWidth: beamWidth,
        duration,
        strokeOpacity: finish.strokeOpacity,
        innerOpacity: finish.innerOpacity,
        bloomOpacity: finish.bloomOpacity,
        colorVariant,
        staticColors: colorVariant === 'mono',
        brightness: brightnessProp ?? finish.brightness,
        saturation: saturationProp ?? finish.saturation,
        hueRange: 30,
        theme: activeTheme,
      }),
    [id, radius, beamWidth, duration, finish, colorVariant, brightnessProp, saturationProp, activeTheme]
  )

  const assignRef = useCallback(
    (node: HTMLDivElement | null) => {
      hostRef.current = node

      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const rootStyle = {
    ...(style ?? {}),
    '--rim-strength': Math.max(0, Math.min(1, strength)),
  } as CSSProperties

  return (
    <>
      <style>{css}</style>
      <div
        {...props}
        ref={assignRef}
        data-rim={id}
        data-active={isOn && !isClosing ? '' : undefined}
        data-fading={isClosing ? '' : undefined}
        data-paused={isOn && !isClosing && !onScreen ? '' : undefined}
        className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
        style={rootStyle}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
        <div data-rim-glow className='pointer-events-none' />
      </div>
    </>
  )
})

export default BeamBorder
