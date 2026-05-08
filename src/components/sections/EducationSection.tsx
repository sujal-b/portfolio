import SectionReveal from '../ui/SectionReveal';
import SplitHeading from '../ui/SplitHeading';

const education = [
  {
    degree: 'B.Tech Computer Science and Engineering (AI/ML)',
    school: 'Amity University Mumbai',
    year: '2023 – 2027',
    highlight: '9.26/10',
  },
  {
    degree: 'Higher Secondary (Class XII)',
    school: 'St. Paul School',
    year: '2023',
    highlight: null,
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionReveal>
          <SplitHeading
            text="Education"
            className="mb-12 text-4xl font-bold tracking-tight text-white md:text-5xl"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="rounded-xl border border-white/[0.09] bg-white/[0.04] p-6 backdrop-blur-xl transition-colors hover:border-blue/30 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                <h3 className="text-lg font-semibold text-white">
                  {edu.degree}
                </h3>
                <p className="mt-2 text-text-secondary">
                  {edu.school} | {edu.year}
                </p>
                {edu.highlight && (
                  <p className="mt-3 text-2xl font-bold text-emerald">
                    {edu.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
