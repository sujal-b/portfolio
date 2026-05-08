import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SplitHeading from '../ui/SplitHeading';
import SectionReveal from '../ui/SectionReveal';
import ContributionGrid from '../ui/ContributionGrid';
import WeeklyChart from '../ui/WeeklyChart';
import ProgressRing from '../ui/ProgressRing';
import StatCounter from '../ui/StatCounter';
import {
  fetchGitHubProfile,
  fetchGitHubContributions,
  computeWeeklyContributions,
  type GitHubProfile,
  type ContributionDay,
  type WeeklyContributions,
} from '../../lib/githubApi';
import {
  fetchLeetcodeProfile,
  type LeetcodeProfile,
} from '../../lib/leetcodeApi';

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/[0.04] rounded-lg ${className || ''}`} />
  );
}

function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

export default function ActivitySection() {
  const [ghProfile, setGhProfile] = useState<GitHubProfile | null>(null);
  const [ghContributions, setGhContributions] = useState<ContributionDay[]>([]);
  const [totalGhContributions, setTotalGhContributions] = useState(0);
  const [weeklyData, setWeeklyData] = useState<WeeklyContributions[]>([]);
  const [lcProfile, setLcProfile] = useState<LeetcodeProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [profile, ghData, lc] = await Promise.allSettled([
          fetchGitHubProfile(),
          fetchGitHubContributions(),
          fetchLeetcodeProfile(),
        ]);

        if (profile.status === 'fulfilled') setGhProfile(profile.value);
        if (ghData.status === 'fulfilled') {
          const { days, total } = ghData.value;
          setGhContributions(days);
          setTotalGhContributions(total);
          setWeeklyData(computeWeeklyContributions(days));
        }
        if (lc.status === 'fulfilled') setLcProfile(lc.value);
      } finally {
        setLoading(false);
      }
    }
    load();

    const interval = setInterval(async () => {
      const { days, total } = await fetchGitHubContributions();
      setGhContributions(days);
      setTotalGhContributions(total);
      setWeeklyData(computeWeeklyContributions(days));
      fetchLeetcodeProfile().then(setLcProfile);
    }, 60000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section id="activity" className="py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <SplitHeading text="Live Activity" className="mb-12" />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="glass p-6 md:p-8 rounded-2xl border border-white/[0.09] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
              {/* GitHub Side */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-white font-semibold">GitHub</span>
                  {ghProfile && (
                    <span className="text-sm text-text-secondary">@{ghProfile.login}</span>
                  )}
                </div>

                {loading ? (
                  <div className="space-y-3">
                    <SkeletonBlock className="h-20 w-full" />
                    <SkeletonBlock className="h-4 w-3/4" />
                  </div>
                ) : ghContributions.length > 0 ? (
                  <>
                    <ContributionGrid contributions={ghContributions} />
                    <WeeklyChart weeks={weeklyData} />
                  </>
                ) : (
                  <div className="text-center py-12 text-text-secondary text-sm">
                    <p>Contribution data unavailable</p>
                    <a
                      href={`https://github.com/${ghProfile?.login || 'sujal-b'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue mt-2 inline-block hover:underline"
                    >
                      View GitHub Profile →
                    </a>
                  </div>
                )}
              </div>

              {/* LeetCode Side */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <LeetCodeIcon className="w-6 h-6 text-[#FFA116]" />
                  <span className="text-white font-semibold">LeetCode</span>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    <SkeletonBlock className="h-20 w-full" />
                    <SkeletonBlock className="h-4 w-3/4" />
                  </div>
                ) : lcProfile ? (
                  <>
                    <div className="flex items-center justify-center gap-6 py-4">
                      <ProgressRing
                        value={lcProfile.easySolved}
                        total={lcProfile.totalEasy}
                        color="#10b981"
                        label="Easy"
                        size={90}
                        strokeWidth={7}
                      />
                      <ProgressRing
                        value={lcProfile.mediumSolved}
                        total={lcProfile.totalMedium}
                        color="#f59e0b"
                        label="Medium"
                        size={90}
                        strokeWidth={7}
                      />
                      <ProgressRing
                        value={lcProfile.hardSolved}
                        total={lcProfile.totalHard}
                        color="#f43f5e"
                        label="Hard"
                        size={90}
                        strokeWidth={7}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
                      <StatCounter value={lcProfile.totalSolved} label="Solved" color="#10b981" />
                      <StatCounter value={lcProfile.easySolved} label="Easy" color="#10b981" />
                      <StatCounter value={lcProfile.hardSolved} label="Hard" color="#f43f5e" />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-text-secondary text-sm">
                    LeetCode data unavailable
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Stats Row */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <StatCounter
                value={ghProfile?.public_repos || 0}
                label="Repositories"
                color="#3b82f6"
              />
              <StatCounter
                value={ghProfile?.followers || 0}
                label="Followers"
                color="#8b5cf6"
              />
              <StatCounter
                value={totalGhContributions}
                label="Contributions"
                color="#10b981"
              />
              <StatCounter
                value={lcProfile?.totalSolved || 0}
                label="Problems Solved"
                color="#f43f5e"
              />
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
