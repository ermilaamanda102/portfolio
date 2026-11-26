import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ermila Amanda — Software Engineer & QA',
  description: 'Portfolio of Ermila Amanda: full-stack development, software quality assurance, and machine learning.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}