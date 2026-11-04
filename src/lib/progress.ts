import { useCallback, useEffect, useState } from 'react';
import type { CardState } from './srs';

export interface Progress {
  xp: number;
  streak: number;
  lastActiveDay: string | null;
  cards: Record<string, CardState>;
  lettersLearned: string[];
  studiesRead: string[];
  cultureRead: string[];
  versesRead: string[];
  quizzesPassed: string[];
  bestParseStreak: number;
  /** XP earned per day, keyed by YYYY-MM-DD (kept for the last ~120 days). */
  xpByDay: Record<string, number>;
  /** Vocab ids answered wrong recently, for the "Review mistakes" mode. */
  mistakes: string[];
  lessonsDone: string[];
  bestMatchTime: number | null;
}

const KEY = 'koine-adventure:progress:v1';

export const EMPTY_PROGRESS: Progress = {
  xp: 0,
  streak: 0,
  lastActiveDay: null,
  cards: {},
  lettersLearned: [],
  studiesRead: [],
  cultureRead: [],
  versesRead: [],
  quizzesPassed: [],
  bestParseStreak: 0,
  xpByDay: {},
  mistakes: [],
  lessonsDone: [],
  bestMatchTime: null,
};

export function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

/** Updates the daily streak: same day keeps it, next day extends it, a gap resets it to 1. */
export function touchStreak(p: Progress, today = dayKey()): Progress {
  if (p.lastActiveDay === today) return p;
  const gap = p.lastActiveDay ? daysBetween(p.lastActiveDay, today) : Infinity;
  return { ...p, lastActiveDay: today, streak: gap === 1 ? p.streak + 1 : 1 };
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY_PROGRESS, ...JSON.parse(raw) };
  } catch {
    /* storage unavailable — start fresh */
  }
  return EMPTY_PROGRESS;
}

function save(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export const LEVELS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000];
export const LEVEL_TITLES = [
  'Seeker', 'Scribe', 'Student', 'Reader', 'Translator',
  'Exegete', 'Scholar', 'Teacher', 'Apostle of Words', 'Master of Koine',
];

export function levelFor(xp: number) {
  let level = 0;
  while (level + 1 < LEVELS.length && xp >= LEVELS[level + 1]) level++;
  const next = LEVELS[level + 1];
  return {
    level: level + 1,
    title: LEVEL_TITLES[level],
    current: xp - LEVELS[level],
    needed: next === undefined ? null : next - LEVELS[level],
  };
}

function trimDays(days: Record<string, number>): Record<string, number> {
  const keys = Object.keys(days).sort();
  if (keys.length <= 120) return days;
  return Object.fromEntries(keys.slice(-120).map((k) => [k, days[k]]));
}

export const xpToday = (p: Progress) => p.xpByDay[dayKey()] ?? 0;

/** Validates and merges an imported progress file. Throws on malformed input. */
export function parseImport(json: string): Progress {
  const data = JSON.parse(json);
  if (typeof data !== 'object' || data === null || typeof data.xp !== 'number' || typeof data.cards !== 'object') {
    throw new Error('This does not look like a Koine Adventure progress file.');
  }
  return { ...EMPTY_PROGRESS, ...data };
}

export function addUnique(list: string[], id: string): string[] {
  return list.includes(id) ? list : [...list, id];
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load);

  useEffect(() => save(progress), [progress]);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((p) => {
      const next = touchStreak(fn(p));
      const gained = next.xp - p.xp;
      if (gained <= 0) return next;
      return { ...next, xpByDay: trimDays({ ...next.xpByDay, [dayKey()]: (next.xpByDay[dayKey()] ?? 0) + gained }) };
    });
  }, []);

  const addXp = useCallback((amount: number) => update((p) => ({ ...p, xp: p.xp + amount })), [update]);

  const reset = useCallback(() => setProgress(EMPTY_PROGRESS), []);
  const replace = useCallback((p: Progress) => setProgress(p), []);

  return { progress, update, addXp, reset, replace };
}

export type ProgressApi = ReturnType<typeof useProgress>;
