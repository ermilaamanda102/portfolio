import { ArrowUpRightIcon, DownloadIcon } from 'lucide-react'
import { SqueezeCarousel, type SqueezeSlide } from '@/components/ui/carousel-squeeze'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { caseStudies, experience, links, moreProjects, process as steps, skills } from '@/lib/data'

// Certificates ada di file sendiri karena butuh tab (client component)
export { Certificates } from './certificates'

const DISPLAY = 'font-ea-display font-black tracking-[-0.03em] leading-[0.9]'

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className='mx-auto w-full max-w-[1440px] scroll-mt-4 px-4 py-16 sm:px-6 lg:px-10 lg:py-24'>
    <h2 className={`${DISPLAY} text-ea-ink mb-10 text-[clamp(40px,7vw,88px)] lg:mb-14`}>{title}</h2>
    {children}
  </section>
)

const Chip = ({ children }: { children: React.ReactNode }) => (
  <li className='text-ea-ink rounded-full border border-[#171412]/25 px-3 py-1 text-[13px] leading-5'>{children}</li>
)

const LINK_CLASS =
  'text-ea-ink text-[14px] font-medium underline underline-offset-4 transition-colors hover:text-ea-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff4829]'

const PILL_LINK_CLASS =
  'text-ea-ink inline-flex h-11 items-center gap-2 rounded-full border border-[#171412]/40 px-6 text-[14px] font-semibold transition-colors hover:bg-[#171412] hover:text-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4829]'

// Tautan "Code" dan "Docs"; tidak tampil kalau keduanya kosong
const ProjectLinks = ({ github, docs }: { github?: string; docs?: string }) => {
  if (!github && !docs) return null

  return (
    <div className='relative z-20 flex gap-5'>
      {github && (
        <a href={github} target='_blank' rel='noreferrer' className={LINK_CLASS}>
          Code
        </a>
      )}
      {docs && (
        <a href={docs} target='_blank' rel='noreferrer' className={LINK_CLASS}>
          Docs
        </a>
      )}
    </div>
  )
}

/* ----------------------------- Case study ----------------------------- */

export const CaseStudies = () => (
  <Section id='case-study' title='Case study'>
    <ul className='grid gap-5 md:grid-cols-2'>
      {caseStudies.map(item => (
        <li key={item.title} className='flex'>
          <SpotlightCard color={item.color} className='flex w-full flex-col p-6 sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <h3 className={`${DISPLAY} text-ea-ink text-[clamp(30px,4vw,52px)]`}>{item.title}</h3>
              <span className='bg-ea-ink text-ea-page shrink-0 rounded-full px-3 py-1 text-[12px] font-medium'>
                {item.tag}
              </span>
            </div>

            <dl className='mt-8 grid gap-5 text-[15px] leading-[1.6] text-[#171412]/80'>
              <div>
                <dt className='text-ea-accent mb-1 text-[13px] font-semibold'>Problem</dt>
                <dd>{item.problem}</dd>
              </div>
              <div>
                <dt className='text-ea-accent mb-1 text-[13px] font-semibold'>Approach</dt>
                <dd>{item.approach}</dd>
              </div>
            </dl>

            <ul className='mt-auto flex flex-wrap gap-2 pt-6'>
              {item.stack.map(tech => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </ul>

            {(item.github || item.docs) && (
              <div className='mt-5'>
                <ProjectLinks github={item.github} docs={item.docs} />
              </div>
            )}
          </SpotlightCard>
        </li>
      ))}
    </ul>
  </Section>
)

/* ----------------------------- More projects ----------------------------- */

export const MoreProjects = () => (
  <Section id='more-projects' title='More projects'>
    {moreProjects.length > 0 && (
      <ul className='mb-8 border-t border-[#171412]/20'>
        {moreProjects.map(project => (
          <li
            key={project.title}
            className='grid gap-3 border-b border-[#171412]/20 py-6 lg:grid-cols-[260px_1fr_auto] lg:items-start lg:gap-10'
          >
            <h3 className='text-ea-ink text-[17px] font-semibold'>{project.title}</h3>
            <div>
              <p className='text-ea-muted text-[15px] leading-[1.6]'>{project.text}</p>
              <ul className='mt-3 flex flex-wrap gap-2'>
                {project.stack.map(tech => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </ul>
            </div>
            <ProjectLinks github={project.github} docs={project.docs} />
          </li>
        ))}
      </ul>
    )}

    <div className='flex flex-wrap gap-3'>
      <a href={links.canva} target='_blank' rel='noreferrer' className={PILL_LINK_CLASS}>
        All documentation on Canva
        <ArrowUpRightIcon aria-hidden className='size-4' />
      </a>
      <a href={links.github} target='_blank' rel='noreferrer' className={PILL_LINK_CLASS}>
        All repositories on GitHub
        <ArrowUpRightIcon aria-hidden className='size-4' />
      </a>
    </div>
  </Section>
)

/* ----------------------------- Experience ----------------------------- */

// Warna panel kalau belum ada foto (diambil dari palet website)
const EXPERIENCE_BACKGROUNDS = [
  'linear-gradient(135deg, #ff4829 0%, #ff9f80 100%)',
  'linear-gradient(135deg, #171412 0%, #4a413c 100%)',
  'linear-gradient(135deg, #8fb59a 0%, #d3e3d2 100%)',
  'linear-gradient(135deg, #b4a6d8 0%, #e2daf0 100%)',
  'linear-gradient(135deg, #a3c8de 0%, #d3e6f1 100%)',
  'linear-gradient(135deg, #171412 0%, #ff4829 100%)',
]

const experienceSlides: SqueezeSlide[] = experience.map((item, index) => ({
  id: `${item.role}-${item.period}`,
  title: `${item.role}, ${item.org}.`,
  description: item.points.join(' '),
  image: item.image,
  imageAlt: item.image ? `${item.role}, ${item.org}` : undefined,
  background: EXPERIENCE_BACKGROUNDS[index % EXPERIENCE_BACKGROUNDS.length],
  overlay: <span className='text-sm font-medium tracking-tight text-white'>{item.period}</span>,
  action: item.link?.label,
  href: item.link?.href,
  target: item.link ? '_blank' : undefined,
}))

export const Experience = () => (
  <Section id='experience' title='Experience'>
    <SqueezeCarousel
      slides={experienceSlides}
      label='Experience'
      height='clamp(130px, 26cqi, 320px)'
      radius={12}
      duration={900}
      accent='#ff4829'
      accentForeground='#f6f4f0'
      style={{ fontFamily: 'var(--font-figtree), ui-sans-serif, system-ui, sans-serif' }}
    />
  </Section>
)

/* ----------------------------- How I work ----------------------------- */

export const HowIWork = () => (
  <Section id='how-i-work' title='How I work'>
    <ol className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className='flex flex-col gap-4 rounded-2xl border border-[#171412]/15 bg-[#fbf9f5] p-6 transition-colors hover:border-[#ff4829]'
        >
          <span className={`${DISPLAY} text-ea-accent text-[44px]`}>{index + 1}</span>
          <h3 className='text-ea-ink text-[18px] font-semibold'>{step.title}</h3>
          <p className='text-ea-muted text-[15px] leading-[1.6]'>{step.text}</p>
        </li>
      ))}
    </ol>
  </Section>
)

/* ----------------------------- Skills ----------------------------- */

export const Skills = () => (
  <Section id='skills' title='Skills'>
    <dl className='border-t border-[#171412]/20'>
      {Object.entries(skills).map(([group, items]) => (
        <div key={group} className='grid gap-3 border-b border-[#171412]/20 py-6 lg:grid-cols-[260px_1fr] lg:gap-10'>
          <dt className='text-ea-ink text-[17px] font-semibold'>{group}</dt>
          <dd>
            <ul className='flex flex-wrap gap-2'>
              {items.map(skill => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  </Section>
)

/* ------------------------------ Contact ------------------------------ */

const EMAIL = 'ermila.amanda102@gmail.com'

export const Contact = () => (
  <section id='contact' className='bg-ea-ink text-ea-page scroll-mt-4'>
    <div className='mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-32'>
      <h2 className={`${DISPLAY} text-[clamp(44px,9vw,128px)]`}>
        Let&rsquo;s build
        <br />
        <span className='text-ea-accent'>something good.</span>
      </h2>

      <p className='mt-8 max-w-[460px] text-[17px] leading-[1.6] text-[#f6f4f0]/70'>
        I&rsquo;m open to software engineer and QA roles and internships. Send me a message and I&rsquo;ll reply soon.
      </p>

      <div className='mt-10 flex flex-wrap items-center gap-4'>
        <a
          href='/cv-ermila-amanda.pdf'
          download='CV-Ermila-Amanda.pdf'
          className='bg-ea-accent text-ea-ink inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors hover:bg-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f6f4f0]'
        >
          Download CV
          <DownloadIcon aria-hidden className='size-4' />
        </a>

        <a
          href={`mailto:${EMAIL}`}
          className='inline-flex h-12 items-center gap-2 rounded-full border border-[#f6f4f0]/40 px-6 text-[15px] font-medium transition-colors hover:border-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff4829]'
        >
          {EMAIL}
          <ArrowUpRightIcon aria-hidden className='size-4' />
        </a>

        <a
          href='https://github.com/ermilaamanda102?tab=repositories'
          target='_blank'
          rel='noreferrer'
          className='inline-flex h-12 items-center gap-2 rounded-full border border-[#f6f4f0]/40 px-6 text-[15px] font-medium transition-colors hover:border-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff4829]'
        >
          GitHub
          <ArrowUpRightIcon aria-hidden className='size-4' />
        </a>
      </div>
    </div>
  </section>
)

