import { describe, expect, it } from 'vitest';
import { fold, latinToGreek } from '../lib/search';
import { LESSONS } from '../data/lessons';
import { VERSES } from '../data/verses';
import { EMPTY_PROGRESS, parseImport } from '../lib/progress';
import { nextSteps } from '../pages/Home';
import { ALPHABET } from '../data/alphabet';

describe('search', () => {
  it('folds accents, breathings and final sigma', () => {
    expect(fold('Λόγος')).toBe('λογοσ');
    expect(fold('ἁμαρτία')).toBe('αμαρτια');
  });
  it('maps Latin letters to Greek', () => {
    expect(latinToGreek('logos')).toBe('λογοσ');
    expect(latinToGreek('theos')).toBe('θεοσ');
    expect(latinToGreek('christos')).toBe('χριστοσ');
  });
});

describe('lessons', () => {
  it('have unique ids and valid quizzes', () => {
    expect(new Set(LESSONS.map((l) => l.id)).size).toBe(LESSONS.length);
    for (const l of LESSONS) {
      expect(l.quiz.length).toBeGreaterThanOrEqual(3);
      for (const q of l.quiz) expect(q.answer).toBeLessThan(q.options.length);
    }
  });
});

describe('verses', () => {
  it('give every word a lemma, gloss and parsing', () => {
    for (const v of VERSES) {
      for (const w of v.words) {
        expect(w.lemma, `${v.ref} ${w.text}`).toBeTruthy();
        expect(w.gloss, `${v.ref} ${w.text}`).toBeTruthy();
        expect(w.parse, `${v.ref} ${w.text}`).toBeTruthy();
      }
    }
  });
});

describe('import', () => {
  it('accepts a valid progress file and fills in missing fields', () => {
    const p = parseImport(JSON.stringify({ xp: 42, cards: {} }));
    expect(p.xp).toBe(42);
    expect(p.lessonsDone).toEqual([]);
  });
  it('rejects junk', () => {
    expect(() => parseImport('{"hello": 1}')).toThrow();
    expect(() => parseImport('not json')).toThrow();
  });
});

describe('learning path', () => {
  it('starts new learners on the alphabet', () => {
    expect(nextSteps(EMPTY_PROGRESS)[0].href).toBe('alphabet');
  });
  it('moves on to lessons once letters are learned', () => {
    const p = { ...EMPTY_PROGRESS, lettersLearned: ALPHABET.map((l) => l.name) };
    expect(nextSteps(p)[0].href).toBe(`lessons/${LESSONS[0].id}`);
  });
  it('always offers up to three steps', () => {
    expect(nextSteps(EMPTY_PROGRESS)).toHaveLength(3);
  });
});
