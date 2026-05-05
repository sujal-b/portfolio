import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Copy, Check, ChevronUp } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle'
import ErrorBoundary from './components/ErrorBoundary'
import portfolioData from './data/portfolio.json'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`py-20 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  )
}

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  const { portfolio_config } = portfolioData
  const heroData = portfolioData.grid_layout.find(item => item.type === 'hero')

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const stats = [
    { value: '9.26', label: 'CGPA' },
    { value: '3', label: 'Projects' },
    { value: 'AI/ML', label: 'Focus' },
  ]

  return (
    <Section className="min-h-[90vh] flex items-center pt-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
        <AnimatedSection>
          <motion.div variants={fadeInUp} className="space-y-8">
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Available for opportunities
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Hi, I'm <span className="text-accent">Sujal</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-2 text-text-secondary font-medium">
                Building the future with AI & Data
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              {heroData?.subtitle}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 py-2">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-accent">{stat.value}</span>
                  <span className="text-text-secondary text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-accent text-zinc-900 font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 cursor-pointer hover:shadow-glow text-lg"
              >
                View Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 rounded-xl hover:border-accent hover:text-accent transition-colors cursor-pointer text-lg font-medium"
              >
                Let's Talk
              </button>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div 
            variants={fadeInUp}
            className="relative"
          >
            <div className="aspect-square max-w-lg mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-orange-500/20 to-amber-500/10 rounded-full blur-3xl"></div>
              <div className="relative bg-card-bg rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-gradient-to-br from-accent/20 to-orange-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="text-4xl mb-2">🤖</span>
                    <span className="font-semibold">AI/ML</span>
                    <span className="text-xs text-text-secondary">Lead</span>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="text-4xl mb-2">📊</span>
                    <span className="font-semibold">Data</span>
                    <span className="text-xs text-text-secondary">Analytics</span>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="text-4xl mb-2">🧠</span>
                    <span className="font-semibold">ML</span>
                    <span className="text-xs text-text-secondary">Models</span>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="text-4xl mb-2">🚀</span>
                    <span className="font-semibold">RAG</span>
                    <span className="text-xs text-text-secondary">Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </Section>
  )
}

function Experience() {
  const experienceData = portfolioData.grid_layout.find(item => item.type === 'experience')
  const [expandedId, setExpandedId] = useState(null)

  return (
    <Section id="experience">
      <AnimatedSection>
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-accent rounded"></div>
        </motion.div>

        <div className="space-y-8">
          {experienceData?.experiences?.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="neo-card p-8 hover:border-accent transition-colors cursor-pointer"
              onClick={() => setExpandedId(expandedId === index ? null : index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <p className="text-accent">{exp.organization}</p>
                </div>
                <span className="text-text-secondary text-sm px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full whitespace-nowrap">
                  {exp.date}
                </span>
              </div>
              
              <p className="text-text-secondary mb-4">{exp.short_desc}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags?.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <AnimatePresence>
                {expandedId === index && exp.detailed_content && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700"
                  >
                    <ul className="space-y-3">
                      {exp.detailed_content.map((item, i) => (
                        <li key={i} className="text-text-secondary flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {exp.detailed_content && (
                <button className="mt-4 text-accent text-sm font-medium flex items-center gap-1 cursor-pointer">
                  {expandedId === index ? 'Show less' : 'Show more'}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </Section>
  )
}

function Projects() {
  const projectsData = portfolioData.grid_layout.find(item => item.type === 'featured')
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <>
      <Section id="projects">
        <AnimatedSection>
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-accent rounded"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData?.projects?.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="neo-card p-6 group cursor-pointer hover:border-accent transition-all duration-300"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -8 }}
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 dark:from-zinc-800 dark:to-zinc-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-50">{['📊', '🧬', '🔍'][index]}</div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {project.short_desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags?.slice(0, 4).map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="neo-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 dark:from-zinc-800 dark:to-zinc-900 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-8xl opacity-50">
                  {selectedProject === projectsData?.projects?.[0] ? '📊' : selectedProject === projectsData?.projects?.[1] ? '🧬' : '🔍'}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              
              <p className="text-text-secondary mb-6">{selectedProject.short_desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags?.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              {selectedProject.detailed_content && (
                <div className="space-y-3">
                  {selectedProject.detailed_content.map((item, i) => (
                    <p key={i} className="text-text-secondary flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Skills() {
  const techStack = portfolioData.grid_layout.find(item => item.id === 'skill-tech')
  const certifications = portfolioData.grid_layout.find(item => item.type === 'list' && item.id === 'certifications')
  const education = portfolioData.grid_layout.find(item => item.type === 'list' && item.id === 'education')

  const allSkills = techStack?.items || []
  const [copied, setCopied] = useState(null)

  const skillCategories = {
    'AI & ML': ['PyTorch', 'Scikit-learn', 'RAG', 'MLOps', 'OpenCV'],
    'Data & Analytics': ['Python', 'SQL', 'Tableau', 'Pandas', 'NumPy'],
    'Backend & Infrastructure': ['FastAPI', 'Docker', 'Redis', 'Celery', 'Azure', 'OCI', 'Git'],
  }

  const copySkill = (skill) => {
    navigator.clipboard.writeText(skill)
    setCopied(skill)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <Section id="skills">
      <AnimatedSection>
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Credentials</h2>
          <div className="w-20 h-1 bg-accent rounded"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <motion.div key={category} variants={fadeInUp} className="neo-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-accent rounded-full"></span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <button 
                    key={index} 
                    onClick={() => copySkill(skill)}
                    className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-accent/20 hover:text-accent transition-colors cursor-pointer text-sm flex items-center gap-1.5 group"
                  >
                    {skill}
                    {copied === skill ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="neo-card p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                🎓
              </span>
              Education
            </h3>
            <div className="space-y-4">
              {education?.items?.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p key={index} className="text-text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="neo-card p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                🏆
              </span>
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications?.items?.map((item, index) => (
                <div key={index} className="mb-3 text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        </AnimatedSection>
    </Section>
  )
}

function Contact() {
  const contactData = portfolioData.grid_layout.find(item => item.type === 'social')

  return (
    <Section id="contact" className="pb-32">
      <AnimatedSection>
        <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
          <p className="text-text-secondary text-lg mb-8">
            I'm always open to discussing new opportunities, projects, or just having a chat about technology.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href={`https://${contactData?.links?.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={`https://${contactData?.links?.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={`https://${contactData?.links?.leetcode}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#FFA116] text-black font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
              LeetCode
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={`mailto:${contactData?.links?.email}`}
              className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={`tel:${contactData?.links?.phone}`}
              className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call
            </a>
          </div>
        </motion.div>
      </AnimatedSection>
    </Section>
  )
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = ['experience', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-card-bg/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' })}}
            className="text-lg font-bold cursor-pointer hover:text-accent transition-colors"
          >
            Sujal Barwad
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.href.replace('#', '') 
                    ? 'text-accent' 
                    : 'text-text-secondary hover:text-accent'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="md:hidden p-2 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-current ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-card-bg pt-20 px-4 md:hidden"
          >
            <div className="space-y-4">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="block text-2xl font-bold py-4 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-accent text-zinc-900 rounded-full shadow-lg hover:shadow-glow transition-all cursor-pointer"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <BackToTop />
        
        <footer className="py-8 text-center text-text-secondary text-sm border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-text-secondary text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App
