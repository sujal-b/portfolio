export const GITHUB_USER = 'sujal-b';

export interface GitHubProfile {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface WeeklyContributions {
  week: string;
  count: number;
}

export interface GitHubEvent {
  type: string;
  repo: string;
  message: string;
  time: string;
  url: string;
  date?: string;
}

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
  if (!res.ok) throw new Error('GitHub API error');
  const data = await res.json();
  return {
    login: data.login,
    name: data.name || data.login,
    public_repos: data.public_repos,
    followers: data.followers,
  };
}

export async function fetchGitHubContributions(): Promise<{ days: ContributionDay[], total: number }> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`
    );
    if (!res.ok) throw new Error(`GitHub contributions API returned ${res.status}`);
    const data = await res.json();
    const raw = data.contributions || [];
    
    // Sort chronologically (ascending)
    raw.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Get total from all years
    const total = Object.values(data.total || {}).reduce((a: any, b: any) => a + b, 0) as number;

    // Filter out future dates
    const todayStr = new Date().toISOString().split('T')[0];
    const days = raw
      .filter((d: any) => d.date <= todayStr)
      .map((d: { date: string; count: number; level: number }) => ({
        date: d.date,
        count: d.count,
        level: Math.min(d.level, 4) as 0 | 1 | 2 | 3 | 4,
      }));

    return { days, total };
  } catch (e) {
    console.error('Failed to fetch GitHub contributions:', e);
    return { days: [], total: 0 };
  }
}

export function computeWeeklyContributions(days: ContributionDay[]): WeeklyContributions[] {
  if (days.length === 0) return [];
  
  const weekly: WeeklyContributions[] = [];
  const today = new Date();
  
  // Create 12 weeks of data
  for (let i = 0; i < 12; i++) {
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() - i * 7);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);
    
    const startStr = weekStart.toISOString().split('T')[0];
    const endStr = weekEnd.toISOString().split('T')[0];
    
    const count = days
      .filter(d => d.date >= startStr && d.date <= endStr)
      .reduce((sum, d) => sum + d.count, 0);
      
    weekly.unshift({
      week: startStr,
      count
    });
  }
  
  return weekly;
}

// Event Caching System
let cachedEvents: GitHubEvent[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const dateCache: Record<string, GitHubEvent[]> = {};

export async function fetchGitHubEvents(date: string): Promise<GitHubEvent[]> {
  // Check date-specific cache first
  if (dateCache[date]) return dateCache[date];

  try {
    const now = Date.now();
    
    // 1. Refresh general events feed if expired
    if (now - lastFetchTime > CACHE_DURATION || cachedEvents.length === 0) {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events?per_page=100`);
      if (res.ok) {
        const data = await res.json();
        cachedEvents = data.map((event: any) => {
          let message = '';
          let url = '';
          const type = event.type.replace('Event', '').toLowerCase();
          const repo = event.repo.name;
          const created_at = event.created_at;
          
          if (event.type === 'PushEvent') {
            message = event.payload.commits?.[0]?.message || 'Pushed commits';
            url = `https://github.com/${repo}/commit/${event.payload.commits?.[0]?.sha}`;
          } else if (event.type === 'CreateEvent') {
            message = `Created ${event.payload.ref_type} ${event.payload.ref || ''}`;
            url = `https://github.com/${repo}`;
          } else if (event.type === 'PullRequestEvent') {
            message = `${event.payload.action} PR: ${event.payload.pull_request.title}`;
            url = event.payload.pull_request.html_url;
          } else if (event.type === 'IssuesEvent') {
            message = `${event.payload.action} issue: ${event.payload.issue.title}`;
            url = event.payload.issue.html_url;
          } else {
            message = `${type} in ${repo}`;
            url = `https://github.com/${repo}`;
          }

          return {
            type,
            repo,
            message,
            url,
            date: created_at.split('T')[0],
            time: new Date(created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        });
        lastFetchTime = now;
      }
    }

    // Check if we have events for this date in the general feed
    const fromFeed = cachedEvents.filter(e => e.date === date);
    if (fromFeed.length > 0) {
      dateCache[date] = fromFeed;
      return fromFeed;
    }

    // 2. Fallback: Search API for precision (Handles >90 days and missing events)
    // We only call this if we have no feed data for this date to save rate limits
    const searchRes = await fetch(
      `https://api.github.com/search/commits?q=author:${GITHUB_USER}+author-date:${date}`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const searchEvents: GitHubEvent[] = searchData.items.map((item: any) => ({
        type: 'commit',
        repo: item.repository.full_name,
        message: item.commit.message?.split('\n')[0] || 'Update',
        url: item.html_url,
        time: new Date(item.commit.author.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));

      if (searchEvents.length > 0) {
        dateCache[date] = searchEvents;
        return searchEvents;
      }
    }

    return [];
  } catch (e) {
    console.error('Failed to fetch events:', e);
    return [];
  }
}
