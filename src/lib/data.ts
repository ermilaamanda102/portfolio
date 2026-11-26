export const links = {
  github: 'https://github.com/ermilaamanda102?tab=repositories',
  canva: 'https://canva.link/hxhyaug3mhiuima',
}

export type CaseStudy = {
  tag: string
  title: string
  color: string
  problem: string
  approach: string
  stack: string[]
  /** Link repo GitHub project ini (opsional) */
  github?: string
  /** Link dokumentasi, mis. halaman Canva (opsional) */
  docs?: string
}

export const caseStudies: CaseStudy[] = [
  { tag: 'Full-stack', title: 'AutoDrive', color: '#f8dccb',
    problem: 'Showroom buyers need help choosing among many vehicles, and staff need one place for stock and enquiries.',
    approach: 'Built a showroom app with SAW-based recommendations, RESTful APIs, JWT authentication, role-based dashboards, inventory management and customer inquiry tracking.',
    stack: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL'] },
  { tag: 'QA + Dev', title: 'E-Raport', color: '#d3e3d2',
    problem: 'Student assessment needed a structured, secure digital process that could be verified reliably.',
    approach: 'Built with CodeIgniter 4 (MVC + authentication). Wrote test cases, ran smoke, exploratory and regression tests, reported bugs, automated with Playwright using Page Object Model, tracked work in Jira Cloud.',
    stack: ['CodeIgniter 4', 'Playwright', 'POM', 'Jira Cloud'] },
  { tag: 'Machine Learning', title: 'AI Face Detection', color: '#e2daf0',
    problem: 'AI-generated faces are getting hard to tell apart from real ones.',
    approach: 'Thesis project: a web app that classifies AI-generated vs real faces, trained with TensorFlow/Keras (EfficientNetB0) and served with Flask.',
    stack: ['EfficientNetB0', 'TensorFlow/Keras', 'Flask'] },
  { tag: 'Mobile + AI', title: 'Mango Leaf Doctor', color: '#d3e6f1',
    problem: 'Pests and diseases on mango leaves are hard to spot early.',
    approach: 'Android app that detects pests and diseases, covering data annotation, model training and evaluation.',
    stack: ['YOLO', 'CNN', 'Android'] },
]

export type MoreProject = {
  title: string
  text: string
  stack: string[]
  github?: string
  docs?: string
}

// Isi dengan project lainnya, contoh:
// { title: 'Nama project', text: 'Satu kalimat tentang project ini.', stack: ['Laravel', 'MySQL'], github: 'https://github.com/ermilamanda102/nama-repo' },
export const moreProjects: MoreProject[] = [
  { title: 'UI Design of MangaPlus Reading App', text: 'Mobile UI design in Figma, from wireframes to interactive prototype.', stack: ['Figma'] },
  { title: 'Restaurant Ordering Website', text: 'Ordering website for customers and admin, with authentication and role management.', stack: ['PHP'] },
  { title: 'E-Commerce Skincare Website', text: 'E-commerce site with RESTful API and database integration.', stack: ['Go', 'RESTful API'] },
]

export type ExperienceItem = {
  period: string
  role: string
  org: string
  points: string[]
  /** Foto di panel carousel. Kosong = pakai warna gradasi */
  image?: string
  /** Tombol di bawah teks */
  link?: { label: string; href: string }
}

export const experience: ExperienceItem[] = [
  { period: '2025', role: 'Helpdesk Intern', org: 'Ministry of Foreign Affairs of the Republic of Indonesia',
    image: '/Magang_kemenlu.webp',
    points: ['First-level support for hardware, software and network issues.', 'Managed helpdesk tickets: documentation, follow-up and resolution tracking.', 'Assisted device maintenance, software installation and routine technical checks.'],
    link: { label: 'View certificate', href: '/Sertif_Magang_Kemenlu.webp' } },
  { period: '2024 – 2025', role: 'Secretary, Public Relations Division', org: 'HIMTI (Informatics Engineering Student Association)',
    image: '/Himti.webp',
    points: ['Managed 30+ official documents and correspondence, plus meeting minutes and event documentation.', 'Coordinated with internal and external stakeholders.'] },
  { period: '2025', role: 'Sponsorship Team', org: 'HIMTIFEST',
    image: '/Sponshorship_BTN.webp',
    points: ['Built communication with sponsors (incl. Bank BTN) and helped prepare proposals.'] },
  { period: '2025', role: 'Liaison Officer', org: 'Campus Hiring Event 2025',
    image: '/campushiring.webp',
    points: ['Assisted company representatives and coordinated with 10+ committees on schedule, venue and logistics.'] },
  { period: '2024', role: 'Volunteer Elementary School Teacher', org: 'HIMTI',
    image: '/Volunteer.webp',
    points: ['Taught reading, writing and math to 20+ students using games and discussions.'] },
  { period: '2022 – 2026', role: 'Bachelor of Informatics (GPA 3.67/4.00)', org: 'Universitas Gunadarma',
    image: '/Lulus.webp',
    points: ['Interests: Human-Computer Interaction, Web Programming, Software Engineering.'] },
]

export const process = [
  { title: 'Understand', text: 'Clarify the user, the goal and the acceptance criteria before touching code.' },
  { title: 'Design', text: 'Sketch flows and UI in Figma; plan MVC structure, data and API contracts.' },
  { title: 'Build', text: 'Ship in small steps with Git, RESTful APIs, JWT/RBAC and clean, maintainable code.' },
  { title: 'Test', text: 'Test cases, smoke, exploratory and regression checks; Playwright with Page Object Model.' },
  { title: 'Document', text: 'Clear bug reports and test docs in Jira so the team can reproduce and follow up.' },
]

export const skills: Record<string, string[]> = {
  Languages: ['Go', 'PHP', 'TypeScript', 'JavaScript', 'Dart', 'Python', 'SQL'],
  'Web & Frontend': ['Next.js', 'React', 'Tailwind CSS', 'CodeIgniter 4', 'Laravel', 'HTML', 'CSS', 'RESTful API', 'MVC', 'JWT', 'RBAC'],
  'Mobile & Design': ['Flutter', 'Android Studio', 'Figma', 'Canva'],
  Databases: ['PostgreSQL', 'MySQL', 'Oracle', 'Neon'],
  'Testing & QA': ['Manual Testing', 'Test Case Design', 'Smoke', 'Exploratory', 'Regression', 'Unit Testing', 'Bug Reporting', 'Playwright', 'Node.js', 'Page Object Model', 'Playwright HTML Reporter', 'Jira Cloud'],
  'AI & Vision': ['YOLO', 'CNN', 'EfficientNetB0', 'TensorFlow/Keras', 'Data Annotation'],
  Tools: ['Git', 'GitHub', 'Cloudinary', 'VS Code', 'Microsoft Office', 'Google Workspace'],
  'Soft Skills': ['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Coordination'],
  'Spoken Languages': ['Indonesian (Native)', 'English (Intermediate)'],
}

export type Certificate = { year?: string; title: string; issuer: string; file?: string }
export type CertificateGroup = { group: string; items: Certificate[] }

export const certificates: CertificateGroup[] = [
  {
    group: 'Professional Certification',
    items: [
      { year: '2026', title: 'Certificate of Competence: Programmer (Okupasi Pemrogram)', issuer: 'BNSP, LSP Universitas Gunadarma', file: '/Sertifikat_BNSP_Programmer_ErmilaAmanda.webp' },
    ],
  },
  {
    group: 'Cloud Computing',
    items: [
      { year: '2024', title: 'Alibaba Cloud Certified Associate (ACA) Cloud Computing', issuer: 'Alibaba Cloud', file: '/Alibaba_Cloud_Certification.webp' },
      { year: '2024', title: 'Micro Credential Kominfo: Fundamentals of Cloud Computing and Networking Administration', issuer: 'Kementerian Komdigi x Alibaba Cloud (Digital Talent Scholarship)', file: '/Fundamentals-of-Cloud-Computing-and-Networking-Administration.webp' },
      { year: '2024', title: 'Apsara Clouder Certificates (5): Operate and Manage a Cloud Server; Using ECS to Construct a Dynamic Website; Operate and Manage Object Storage on the Cloud; Using OSS to Publish a Static Website; MySQL for Beginners', issuer: 'Alibaba Cloud Academy' },
    ],
  },
    {
    group: 'Programming & Application Development',
    items: [
      { year: '2026', title: 'Intro to Software Engineering (Coding Camp, certificate of attendance)', issuer: 'RevoU', file: '/Revou.webp' },
      { year: '2026', title: 'Implementasi dan Pengembangan Aplikasi', issuer: 'Lepkomputer Universitas Gunadarma', file: '/Application_Implementation_and_Development.webp' },
      { year: '2025', title: 'Desain Pengembangan Aplikasi', issuer: 'Lepkomputer Universitas Gunadarma', file: '/Application_Development_Design.webp' },
    ],
  },
  {
    group: 'Database',
    items: [
      { year: '2025', title: 'Oracle for Intermediate', issuer: 'Lepkomputer Universitas Gunadarma', file: '/ORACLE_FOR_INTERMEDIATE.webp' },
      { year: '2025', title: 'SQL Server for Intermediate', issuer: 'Lepkomputer Universitas Gunadarma', file: '/SQL_SERVER_FOR_INTERMEDIATE.webp' },
      { year: '2024', title: 'Oracle for Beginner', issuer: 'Lepkomputer Universitas Gunadarma', file: '/ORACLE_FOR_BEGINNER.webp' },
      { year: '2024', title: 'SQL Server for Beginner', issuer: 'Lepkomputer Universitas Gunadarma', file: '/SQL_SERVER_FOR_BEGINNER.webp' },
      { year: '2023', title: 'Fundamental DBMS (MySQL, SQL Server, Oracle)', issuer: 'Lepkomputer Universitas Gunadarma', file: '/FUNDAMENTAL_DBMS.webp' },
    ],
  },
  {
    group: 'Networking',
    items: [
      { year: '2024', title: 'Instalasi LAN Nirkabel (Wireless LAN Installation)', issuer: 'Universitas Gunadarma', file: '/Introduction_to_wireless_LAN_installation.webp' },
      { year: '2023', title: 'Fundamental Networking (OSI, TCP/IP, Cisco, Mikrotik, Juniper)', issuer: 'Lepkomputer Universitas Gunadarma', file: '/FUNDAMENTAL_NETWORKING.webp' },
    ],
  },
  {
    group: 'Artificial Intelligence & Data',
    items: [
      { year: '2025', title: 'AI Productivity and AI API Integration for Developers (Maju Bareng AI)', issuer: 'Hacktiv8 Indonesia', file: '/Maju_Bareng_AI_ErmilaAmanda.webp' },
      { year: '2025', title: 'Data Classification and Summarization Using IBM Granite', issuer: 'IBM SkillsBuild x Hacktiv8', file: '/Data_Classification_and_Summarization-Ermila%20Amanda.webp' },
      { year: '2024', title: 'Samsung Innovation Campus AI in Everyday Life, Batch 6 (Logic Test)', issuer: 'Samsung x Hacktiv8', file: '/samsung-innovation-campus.webp' },
      { year: '2024', title: 'International Seminar "Innovative Artificial Intelligence (AI) Based Solution for Industry"', issuer: 'Universitas Gunadarma' },
    ],
  },
  {
    group: 'Seminars & Events',
    items: [
      { title: 'Company Visit "Threat and Trends on Cyber"', issuer: 'PT Datacomm Diangraha x HIMTI Universitas Gunadarma' },
      { title: 'Volunteer, Teknik Informatika Mengabdi 5.0', issuer: 'HIMTI Universitas Gunadarma' },
    ],
  },
]