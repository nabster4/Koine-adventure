import { describe, expect, it } from 'vitest';
import { newCard, pickSession, review, INTERVALS, MAX_BOX } from '../lib/srs';

const DAY = 86400000;

describe('srs', () => {
  it('moves up a box on a correct answer and schedules further out', () => {
    const c = review(newCard(0), true, 0);
    expect(c.box).toBe(1);
    expect(c.due).toBe(INTERVALS[1] * DAY);
  });

  it('resets to box 0 on a miss', () => {
    let c = newCard(0);
    for (let i = 0; i < 3; i++) c = review(c, true, 0);
    expect(review(c, false, 0).box).toBe(0);
  });

  it('caps at the max box', () => {
    let c = newCard(0);
    for (let i = 0; i < 10; i++) c = review(c, true, 0);
    expect(c.box).toBe(MAX_BOX);
  });

  it('shows due cards before new ones, then new cards in order', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
    const cards = { c: { box: 1, due: 0, seen: 1, correct: 1 }, a: { box: 3, due: 10 * DAY, seen: 3, correct: 3 } };
    expect(pickSession(items, cards, 3, DAY).map((i) => i.id)).toEqual(['c', 'b', 'd']);
  });
});
