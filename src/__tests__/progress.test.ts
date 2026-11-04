import { describe, expect, it } from 'vitest';
import { EMPTY_PROGRESS, levelFor, touchStreak } from '../lib/progress';

describe('streaks', () => {
  it('starts a streak on first activity', () => {
    expect(touchStreak(EMPTY_PROGRESS, '2026-01-01').streak).toBe(1);
  });
  it('extends on consecutive days, including across months', () => {
    const p = { ...EMPTY_PROGRESS, streak: 4, lastActiveDay: '2026-01-31' };
    expect(touchStreak(p, '2026-02-01').streak).toBe(5);
  });
  it('keeps the streak on the same day', () => {
    const p = { ...EMPTY_PROGRESS, streak: 4, lastActiveDay: '2026-01-31' };
    expect(touchStreak(p, '2026-01-31').streak).toBe(4);
  });
  it('resets after a missed day', () => {
    const p = { ...EMPTY_PROGRESS, streak: 4, lastActiveDay: '2026-01-01' };
    expect(touchStreak(p, '2026-01-03').streak).toBe(1);
  });
});

describe('levels', () => {
  it('computes level from xp', () => {
    expect(levelFor(0).level).toBe(1);
    expect(levelFor(100).level).toBe(2);
    expect(levelFor(99999).needed).toBeNull();
  });
});
