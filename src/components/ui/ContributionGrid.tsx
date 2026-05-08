import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { ContributionDay, GitHubEvent } from '../../lib/githubApi';
import { fetchGitHubEvents, GITHUB_USER } from '../../lib/githubApi';

interface ContributionGridProps {
  contributions: ContributionDay[];
}

const LEVEL_COLORS = [
  'bg-white/[0.04]',
  'bg-blue/30',
  'bg-blue/50',
  'bg-purple/50',
  'bg-purple',
];

const LEVEL_GLOWS = [
  '',
  'shadow-[0_0_8px_rgba(59,130,246,0.2)]',
  'shadow-[0_0_10px_rgba(59,130,246,0.3)]',
  'shadow-[0_0_12px_rgba(139,92,246,0.3)]',
  'shadow-[0_0_16px_rgba(139,92,246,0.5)]',
];

const EVENT_ICONS: Record<string, string> = {
  commit: '●',
  create: '+',
  issue: '◆',
  pr: '◆',
  delete: '−',
  other: '○',
};

const EVENT_COLORS: Record<string, string> = {
  commit: 'text-emerald',
  create: 'text-blue',
  issue: 'text-purple',
  pr: 'text-amber',
  delete: 'text-rose',
  other: 'text-text-secondary',
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ContributionGrid({ contributions }: ContributionGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; day: ContributionDay } | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  // Align data to Sunday-start weeks for a proper grid
  const paddedContributions = [...contributions];
  const firstDate = new Date(contributions[0]?.date + 'T00:00:00');
  const dayOfWeek = firstDate.getDay(); // 0 = Sunday
  
  // Pad the beginning with "empty" days to align the first day to its column
  for (let i = 0; i < dayOfWeek; i++) {
    const d = new Date(firstDate);
    d.setDate(d.getDate() - (dayOfWeek - i));
    paddedContributions.unshift({
      date: d.toISOString().split('T')[0],
      count: 0,
      level: 0,
      isPadding: true
    } as any);
  }

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < paddedContributions.length; i += 7) {
    weeks.push(paddedContributions.slice(i, i + 7));
  }

  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0);

  // Month labels logic
  const monthLabels: { label: string; index: number }[] = [];
  let lastMonthIndex = -10;
  weeks.forEach((week, i) => {
    const firstDayOfWeek = new Date(week.find(d => ! (d as any).isPadding)?.date + 'T00:00:00');
    if (isNaN(firstDayOfWeek.getTime())) return;
    
    const month = firstDayOfWeek.toLocaleString('en-US', { month: 'short' });
    if (i - lastMonthIndex >= 3 && (monthLabels.length === 0 || monthLabels[monthLabels.length - 1].label !== month)) {
      monthLabels.push({ label: month, index: i });
      lastMonthIndex = i;
    }
  });

  // Robust focus on latest (right side)
  useEffect(() => {
    if (scrollRef.current) {
      const scroll = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      };
      // Multiple attempts to ensure it scrolls after rendering
      scroll();
      const timer = setTimeout(scroll, 100);
      const raf = requestAnimationFrame(scroll);
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(raf);
      };
    }
  }, [contributions]);

  const handleMouseEnter = (e: React.MouseEvent, day: ContributionDay) => {
    if ((day as any).isPadding) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = Math.min(Math.max(rect.left + rect.width / 2, 100), window.innerWidth - 100);
    const y = rect.top - 8;
    setTooltip({ x, y, day });
  };

  const handleDayClick = async (day: ContributionDay) => {
    if ((day as any).isPadding) return;
    if (selectedDay?.date === day.date) {
      setSelectedDay(null);
      setEvents([]);
      return;
    }

    setSelectedDay(day);
    setEventsLoading(true);
    setEvents([]);

    const dayEvents = await fetchGitHubEvents(day.date);
    setEvents(dayEvents);
    setEventsLoading(false);
  };

  const firstDateStr = contributions[0]?.date ? new Date(contributions[0].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
  const lastDateStr = contributions[contributions.length - 1]?.date ? new Date(contributions[contributions.length - 1].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">
            {totalContributions.toLocaleString()} contributions
          </span>
          <span className="text-xs text-text-secondary">
            {firstDateStr} — {lastDateStr}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-text-secondary uppercase tracking-wider">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-2.5 h-2.5 rounded-[2px] ${LEVEL_COLORS[level]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Grid container */}
      <div className="relative mb-2">
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col justify-between text-[9px] text-text-secondary pr-2 py-[14px] h-[102px]">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2"
          >
            {/* Month labels */}
            <div className="relative h-4 mb-1 text-[10px] text-text-secondary min-w-max">
              {monthLabels.map((m) => (
                <span
                  key={m.index + m.label}
                  className="absolute"
                  style={{ left: `${m.index * 15}px` }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            <div
              className="grid gap-[3px] min-w-max"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, 12px)` }}
            >
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => {
                    const isSelected = selectedDay?.date === day.date;
                    const isPadding = (day as any).isPadding;
                    
                    return (
                      <motion.div
                        key={day.date}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: isPadding ? 0.2 : 1 } : {}}
                        transition={{
                          delay: Math.min((wi * 7 + di) * 0.001, 1), // Cap delay for long charts
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                        className={`w-3 h-3 rounded-sm transition-all duration-200 ${isPadding ? 'pointer-events-none' : 'cursor-pointer hover:scale-150 hover:z-10'} ${LEVEL_COLORS[day.level]} ${!isPadding && LEVEL_GLOWS[day.level]} ${isSelected ? 'scale-150 z-20 brightness-150' : ''}`}
                        onMouseEnter={(e) => handleMouseEnter(e, day)}
                        onMouseLeave={() => setTooltip(null)}
                        onClick={() => handleDayClick(day)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && !selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="fixed z-[200] pointer-events-none px-3 py-2 rounded-lg bg-surface border border-white/10 text-sm text-white shadow-xl"
            style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}
          >
            <span className="font-semibold">{tooltip.day.count} contributions</span>
            <br />
            <span className="text-text-secondary text-xs">{formatDate(tooltip.day.date)}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mt-4 overflow-hidden"
          >
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-white font-medium">{formatDate(selectedDay.date)}</span>
                  <span className="text-text-secondary text-sm ml-2">
                    {selectedDay.count} contribution{selectedDay.count !== 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={() => { setSelectedDay(null); setEvents([]); }}
                  className="text-text-secondary hover:text-white transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {eventsLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-blue/30 border-t-blue rounded-full animate-spin mb-2" />
                  <span className="text-xs text-text-secondary italic">Fetching activity...</span>
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-secondary mb-3">Recent Activity</p>
                  {events.map((event, i) => (
                    <a
                      key={i}
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/[0.04] transition-colors group"
                    >
                      <span className={`text-xs mt-0.5 ${EVENT_COLORS[event.type]}`}>
                        {EVENT_ICONS[event.type]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white/80 truncate group-hover:text-white">
                          {event.message}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {event.repo.split('/').pop()}
                          {event.time && <span className="ml-1">at {event.time}</span>}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-text-secondary text-sm mb-2">
                    No events found for this day
                  </p>
                  <a
                    href={`https://github.com/${GITHUB_USER}?tab=overview&from=${selectedDay.date}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue text-sm hover:underline"
                  >
                    View on GitHub →
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
