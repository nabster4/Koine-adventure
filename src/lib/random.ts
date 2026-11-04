export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/** Returns `correct` plus `n - 1` distinct distractors, shuffled. */
export function choices<T>(correct: T, pool: readonly T[], n: number, key: (t: T) => string = String): T[] {
  const others = shuffle(pool.filter((p) => key(p) !== key(correct)));
  const unique: T[] = [];
  const seen = new Set([key(correct)]);
  for (const o of others) {
    if (unique.length >= n - 1) break;
    if (!seen.has(key(o))) {
      seen.add(key(o));
      unique.push(o);
    }
  }
  return shuffle([correct, ...unique]);
}
