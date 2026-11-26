import Hero from '@/components/hero'
import { CaseStudies, MoreProjects, Experience, HowIWork, Skills, Certificates, Contact } from '@/components/sections'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <>
      <Hero />
      <div className="bg-ea-page">
        <CaseStudies />
        <MoreProjects />
        <Experience />
        <HowIWork />
        <Skills />
        <Certificates />
      </div>
      <Contact />
      <Footer />
    </>
  )
}