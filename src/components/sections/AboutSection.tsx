import SectionReveal from '../ui/SectionReveal';
import SplitHeading from '../ui/SplitHeading';

const pills = ['ML Pipelines', 'Data Infrastructure', 'Full-Stack Development'];

const stats = [
  { value: '9.26', label: 'CGPA', gradient: true },
  { value: '250+', label: 'Students Mentored', color: 'text-emerald' },
  { value: '9', label: 'Projects Shipped', color: 'text-purple' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionReveal>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
            <div className="space-y-8 md:col-span-3">
              <SplitHeading
                text="About Me"
                className="text-4xl font-bold tracking-tight text-white md:text-5xl"
              />
              <p className="text-lg leading-relaxed text-text-secondary">
                Driven technologist with a proven track record of turning complex
                problems into elegant, scalable solutions. Combines strong
                analytical thinking with hands-on execution. I thrive at the
                intersection of innovation and pragmatism, consistently
                delivering results that balance technical excellence with
                real-world constraints.
              </p>
              <div className="flex flex-wrap gap-3">
                {pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-text-secondary transition-colors hover:border-blue/50 hover:bg-white/[0.08] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="relative rounded-2xl border border-white/[0.09] bg-white/[0.04] p-8 backdrop-blur-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue/10 via-purple/10 to-transparent opacity-50" />
                <div className="relative space-y-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p
                        className={`text-3xl font-bold ${
                          stat.gradient
                            ? 'text-gradient'
                            : stat.color
                        }`}
                      >
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
