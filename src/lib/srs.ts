/**
 * A simple Leitner-box spaced-repetition scheduler.
 * Box 0 = new/forgotten, box 5 = mastered. Each correct answer moves a card up a box
 * and pushes its next review further out; a miss sends it back to box 0.
 */
export interface CardState {
  box: number;
  due: number; // epoch ms
  seen: number;
  correct: number;
}

export const MAX_BOX = 5;
const DAY = 24 * 60 * 60 * 1000;
// Review intervals per box, in days. Box 0 cards come back the same session.
export const INTERVALS = [0, 1, 2, 4, 8, 16];

export function newCard(now = Date.now()): CardState {
  return { box: 0, due: now, seen: 0, correct: 0 };
}

export function review(card: CardState, correct: boolean, now = Date.now()): CardState {
  const box = correct ? Math.min(card.box + 1, MAX_BOX) : 0;
  return {
    box,
    due: now + INTERVALS[box] * DAY,
    seen: card.seen + 1,
    correct: card.correct + (correct ? 1 : 0),
  };
}

export function isDue(card: CardState | undefined, now = Date.now()): boolean {
  return !card || card.due <= now;
}

/**
 * Picks the next batch to study: due cards first (lowest box first), then new cards in
 * frequency order, so learners always meet the most common words first.
 */
export function pickSession<T extends { id: string }>(
  items: T[],
  cards: Record<string, CardState>,
  size: number,
  now = Date.now(),
): T[] {
  const due = items
    .filter((i) => cards[i.id] && isDue(cards[i.id], now))
    .sort((a, b) => cards[a.id].box - cards[b.id].box);
  const fresh = items.filter((i) => !cards[i.id]);
  return [...due, ...fresh].slice(0, size);
}
