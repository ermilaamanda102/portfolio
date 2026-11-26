import { Elias } from '@/components/ui/elias-author-hero'

export default function Hero() {
  return (
    <Elias
      brand={{ name: 'Ermila', href: '#top' }}
      navLinks={{
        left: [
          { label: 'Case study', href: '#case-study' },
          { label: 'Experience', href: '#experience' },
        ],
        right: [
          { label: 'How I work', href: '#how-i-work' },
          { label: 'Skills', href: '#skills' },
        ],
      }}
      navCta={{ label: 'Contact', href: '#contact' }}
      navStatus={{ label: 'Open to work', detail: 'Bogor' }}
      name={{ first: 'Ermila', last: 'Amanda' }}
      intro={{
        roles: ['Software Engineer', 'QA', 'Web & ML'],
        headline: ['Building reliable,', 'user-focused', 'software that', 'works as intended.'],
        description: 'Informatics graduate (GPA 3.67) building full-stack apps, testing and ML.',
      }}
      // Pakai src, width, dan height portrait yang sudah kamu pakai sebelumnya
      portrait={{ src: '/ermila.webp', alt: 'Ermila Amanda', width: 1000, height: 1500 }}
      books={[
        {
          label: 'Thesis project',
          title: 'Real or Fake?',
          coverLines: ['Real', 'or', 'Fake?'],
          topics: ['EfficientNetB0', 'Flask'],
          art: 'path',
          colors: { cover: '#e2daf0', type: '#171412', spine: '#ff4829' },
          chapter: 'Chapter one',
          chapterTitle: 'The problem',
          text: 'AI-generated faces are getting hard to tell apart from real ones. This web app classifies them.',
        },
        {
          label: 'Mobile + AI',
          title: 'Mango Leaf Doctor',
          coverLines: ['Mango', 'Leaf', 'Dr.'],
          topics: ['YOLO', 'Android'],
          art: 'days',
          colors: { cover: '#d3e6f1', type: '#171412', spine: '#ff4829' },
          chapter: 'Chapter one',
          chapterTitle: 'The problem',
          text: 'Pests and diseases on mango leaves are hard to spot early. This Android app detects them.',
        },
        {
          label: 'QA + Dev',
          title: 'E-Raport',
          coverLines: ['E-', 'Raport'],
          topics: ['CodeIgniter 4', 'Playwright'],
          art: 'lamp',
          colors: { cover: '#d3e3d2', type: '#171412', spine: '#ff4829' },
          chapter: 'Chapter one',
          chapterTitle: 'The problem',
          text: 'Student assessment needed a secure digital process that could be verified reliably.',
        },
        {
          label: 'Full-stack',
          title: 'AutoDrive',
          coverLines: ['Auto', 'Drive'],
          topics: ['Next.js', 'Go'],
          art: 'sunrise',
          colors: { cover: '#f8dccb', type: '#171412', spine: '#ff4829' },
          chapter: 'Chapter one',
          chapterTitle: 'The problem',
          text: 'Showroom buyers need help choosing a vehicle, and staff need one place for stock and enquiries.',
        },
      ]}
      bookCard={{
        href: '#case-study',
        open: 'Open',
        close: 'Close and show the next project',
        folio: '1',
      }}
      letter={{
        eyebrow: 'A note to tomorrow',
        greeting: 'Dear tomorrow,',
        stamp: 'Ship it',
        postmark: 'Shipped',
        seal: 'EA',
        sealing: 'Sealed for release',
        counter: 'Note',
        messages: [
          'I will write the test before I trust the code.',
          'I will ask what the user needs before I open the editor.',
          'I will write every bug report so anyone can reproduce it.',
          'I will keep shipping small and learn from every release.',
        ],
      }}
      socialLinks={[
        // Ganti URL LinkedIn dengan punyamu
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ermila-amanda-661695299' },
        { label: 'Canva Portfolio', href: 'https://canva.link/hxhyaug3mhiuima' },
        { label: 'Email', href: 'mailto:ermila.amanda102@gmail.com' },
      ]}
    />
  )
}