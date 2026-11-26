'use client'

import { useState } from 'react'
import { ArrowUpRightIcon } from 'lucide-react'
import { certificates } from '@/lib/data'

// Label tab dipendekkan supaya muat satu baris
const SHORT: Record<string, string> = {
  'Professional Certification': 'Professional',
  'Cloud Computing': 'Cloud',
  'Programming & Application Development': 'Programming',
  'Artificial Intelligence & Data': 'AI & Data',
  'Seminars & Events': 'Events',
}

// Jumlah sertifikat yang tampil di tab All sebelum "Show all"
const PREVIEW = 6

export const Certificates = () => {
  const [active, setActive] = useState('All')
  const [expanded, setExpanded] = useState(false)

  const all = certificates.flatMap(group => group.items)

  const tabs = [
    { key: 'All', label: 'All', count: all.length },
    ...certificates.map(group => ({
      key: group.group,
      label: SHORT[group.group] ?? group.group,
      count: group.items.length,
    })),
  ]

  const current = active === 'All' ? all : (certificates.find(group => group.group === active)?.items ?? [])
  const collapsed = active === 'All' && !expanded && current.length > PREVIEW
  const visible = collapsed ? current.slice(0, PREVIEW) : current

  return (
    <section id='certificates' className='mx-auto w-full max-w-[1440px] scroll-mt-4 px-4 py-16 sm:px-6 lg:px-10 lg:py-24'>
      <h2 className='font-ea-display text-ea-ink mb-8 text-[clamp(40px,7vw,88px)] leading-[0.9] font-black tracking-[-0.03em]'>
        Certificates
      </h2>

      {/* Tab filter */}
      <div className='mb-8 flex flex-wrap gap-2'>
        {tabs.map(tab => {
          const isActive = tab.key === active

          return (
            <button
              key={tab.key}
              type='button'
              aria-pressed={isActive}
              onClick={() => setActive(tab.key)}
              className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4829] ${
                isActive
                  ? 'bg-ea-ink text-ea-page border-[#171412]'
                  : 'text-ea-ink border-[#171412]/25 hover:border-[#171412]'
              }`}
            >
              {tab.label}
              <span className={isActive ? 'text-[#f6f4f0]/60' : 'text-ea-muted'}>{tab.count}</span>
            </button>
          )
        })}
      </div>

      {/* Daftar sertifikat */}
      <ul className='border-t border-[#171412]/20'>
        {visible.map(cert => {
          const rowClass =
            'grid gap-1 border-b border-[#171412]/20 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8'

          const row = (
            <>
              <div>
                <p className='text-ea-ink text-[16px] leading-snug font-medium'>{cert.title}</p>
                <p className='text-ea-muted mt-1 flex items-center gap-2 text-[14px]'>
                  {cert.issuer}
                  {cert.file && (
                    <ArrowUpRightIcon
                      aria-hidden
                      className='text-ea-accent size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    />
                  )}
                </p>
              </div>
              {cert.year && <p className='text-ea-accent text-[15px] font-medium'>{cert.year}</p>}
            </>
          )

          return (
            <li key={cert.title}>
              {cert.file ? (
                <a
                  href={cert.file}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={`Open certificate: ${cert.title}`}
                  className={`${rowClass} group transition-colors hover:bg-[#171412]/[0.04] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#ff4829]`}
                >
                  {row}
                </a>
              ) : (
                <div className={rowClass}>{row}</div>
              )}
            </li>
          )
        })}
      </ul>

      {/* Tombol buka/tutup, hanya di tab All */}
      {active === 'All' && current.length > PREVIEW && (
        <button
          type='button'
          onClick={() => setExpanded(value => !value)}
          className='text-ea-ink mt-6 inline-flex h-11 items-center rounded-full border border-[#171412]/40 px-6 text-[14px] font-semibold transition-colors hover:bg-[#171412] hover:text-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4829]'
        >
          {expanded ? 'Show less' : `Show all ${current.length}`}
        </button>
      )}
    </section>
  )
}