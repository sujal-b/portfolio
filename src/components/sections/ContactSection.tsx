import { Mail, Phone } from 'lucide-react';
import SplitHeading from '../ui/SplitHeading';
import SectionReveal from '../ui/SectionReveal';
import MagneticWrapper from '../ui/MagneticWrapper';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sujal-barwad',
    icon: LinkedInIcon,
    color: 'hover:border-[#0077B5]/50 hover:shadow-[0_0_20px_rgba(0,119,181,0.3)]',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/sujal-b',
    icon: GitHubIcon,
    color: 'hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/KaiSuke/',
    icon: LeetCodeIcon,
    color: 'hover:border-[#FFA116]/50 hover:shadow-[0_0_20px_rgba(255,161,22,0.3)]',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <SectionReveal>
          <SplitHeading text="Let's Work Together" className="mb-6" />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            I'm always open to discussing new opportunities, collaborations, or just having a
            conversation about technology and innovation.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <MagneticWrapper>
              <a
                href="mailto:sujal.barwad27@gmail.com"
                data-cursor="pointer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue to-purple text-white font-semibold text-base transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a
                href="tel:+919075619050"
                aria-label="Call +91 9075619050"
                data-cursor="pointer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/80 font-medium text-base transition-all hover:border-emerald/50 hover:text-emerald hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                <Phone className="w-5 h-5" />
                +91 9075619050
              </a>
            </MagneticWrapper>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="flex items-center justify-center gap-4">
            {socials.map((social) => (
              <MagneticWrapper key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className={`p-4 rounded-xl glass border border-white/10 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              </MagneticWrapper>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
