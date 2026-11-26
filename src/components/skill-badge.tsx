'use client'

import { useState } from 'react'

// Nama skill (persis seperti di data.ts) -> slug logo di Simple Icons (simpleicons.org).
// Skill yang tidak ada di sini (mis. "Manual Testing", "RBAC") tetap tampil sebagai teks.
const SLUGS: Record<string, string> = {
  Go: 'go',
  PHP: 'php',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  Dart: 'dart',
  Python: 'python',
  'Next.js': 'nextdotjs',
  React: 'react',
  'Tailwind CSS': 'tailwindcss',
  'CodeIgniter 4': 'codeigniter',
  Laravel: 'laravel',
  JWT: 'jsonwebtokens',
  Flutter: 'flutter',
  'Android Studio': 'androidstudio',
  Figma: 'figma',
  Canva: 'canva',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  Oracle: 'oracle',
  Neon: 'neon',
  Playwright: 'playwright',
  'Jira Cloud': 'jira',
  'TensorFlow/Keras': 'tensorflow',
  Git: 'git',
  GitHub: 'github',
  Cloudinary: 'cloudinary',
  'VS Code': 'visualstudiocode',
  'Google Workspace': 'googleworkspace',
}

const CHIP =
  'text-ea-ink rounded-full border border-[#171412]/25 px-3 py-1 text-[13px] leading-5'

type SkillBadgeProps = { name: string }

/**
 * Logo skill dalam kotak kecil. Kalau skill tidak punya logo, atau gambarnya gagal dimuat
 * (mis. slug tidak ada atau offline), otomatis kembali ke chip teks.
 */
export const SkillBadge = ({ name }: SkillBadgeProps) => {
  const [failed, setFailed] = useState(false)
  const slug = SLUGS[name]

  if (!slug || failed) return <li className={CHIP}>{name}</li>

  return (
    <li title={name}>
      <span className='grid size-12 place-items-center rounded-xl border border-[#171412]/15 bg-[#fbf9f5] p-2.5 transition-colors hover:border-[#ff4829]'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={name}
          loading='lazy'
          draggable={false}
          onError={() => setFailed(true)}
          className='size-full object-contain'
        />
      </span>
    </li>
  )
}