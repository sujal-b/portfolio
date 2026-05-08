const LEETCODE_USER = 'KaiSuke';
const API_BASE = 'https://alfa-leetcode-api.onrender.com';

export interface LeetcodeProfile {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

export async function fetchLeetcodeProfile(): Promise<LeetcodeProfile> {
  try {
    const res = await fetch(`${API_BASE}/userProfile/${LEETCODE_USER}`);
    if (!res.ok) throw new Error(`LeetCode API returned ${res.status}`);
    const data = await res.json();
    return {
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      totalEasy: data.totalEasy || 1000,
      totalMedium: data.totalMedium || 1500,
      totalHard: data.totalHard || 500,
    };
  } catch (e) {
    console.error('Failed to fetch LeetCode profile:', e);
    return {
      totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0,
      totalEasy: 1000, totalMedium: 1500, totalHard: 500
    };
  }
}
