import SectionReveal from '../ui/SectionReveal';
import SplitHeading from '../ui/SplitHeading';

const certifications = [
  {
    title: 'IBM RAG and Agentic AI Professional',
    issuer: 'Coursera',
    year: '2026, Current',
    sub: 'Multi-agent Systems, Agentic RAG, Chroma DB',
    dot: 'bg-emerald',
  },
  {
    title: 'Data Science with AI',
    issuer: 'Internshala',
    year: '2025',
    sub: 'SQL, Machine Learning, Tableau, Predictive Modeling, Scikit-learn',
    dot: 'bg-blue',
  },
  {
    title: 'National Science Olympiad',
    issuer: 'IIT Bombay',
    year: '2018',
    sub: 'International Rank: 5435 | Zonal Rank: 993',
    dot: 'bg-amber',
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionReveal>
          <SplitHeading
            text="Certifications"
            className="mb-12 text-4xl font-bold tracking-tight text-white md:text-5xl"
          />

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center gap-4 rounded-xl border border-white/[0.09] bg-white/[0.04] p-5 backdrop-blur-xl transition-colors hover:border-white/[0.15] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                <span className={`h-3 w-3 flex-shrink-0 rounded-full ${cert.dot}`} />
                <div>
                  <p className="font-semibold text-white">{cert.title}</p>
                  <p className="text-sm text-text-secondary">
                    {cert.issuer} ({cert.year})
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">{cert.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
