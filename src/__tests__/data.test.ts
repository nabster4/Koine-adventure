import { describe, expect, it } from 'vitest';
import { ALPHABET } from '../data/alphabet';
import { VOCAB } from '../data/vocab';
import { WORD_STUDIES } from '../data/wordStudies';
import { CULTURE } from '../data/culture';
import { VERSES } from '../data/verses';
import { NOUN_FORMS, VERB_FORMS } from '../data/grammar';

const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe('content integrity', () => {
  it('has all 24 letters', () => expect(ALPHABET).toHaveLength(24));

  it('has unique ids and glosses in vocab', () => {
    expect(unique(VOCAB.map((v) => v.id))).toBe(true);
    expect(unique(VOCAB.map((v) => v.gloss))).toBe(true);
  });

  it('links vocab to existing word studies', () => {
    const ids = new Set(WORD_STUDIES.map((s) => s.id));
    for (const v of VOCAB) if (v.studyId) expect(ids.has(v.studyId), v.id).toBe(true);
  });

  it('has valid quiz answers', () => {
    for (const q of [...WORD_STUDIES, ...CULTURE].map((x) => x.quiz)) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
    }
  });

  it('has unique ids for studies, culture and verses', () => {
    expect(unique(WORD_STUDIES.map((s) => s.id))).toBe(true);
    expect(unique(CULTURE.map((s) => s.id))).toBe(true);
    expect(unique(VERSES.map((s) => s.id))).toBe(true);
  });

  it('merges ambiguous noun forms into one item with several parses', () => {
    const erga = NOUN_FORMS.find((f) => f.form === 'τὰ ἔργα');
    expect(erga?.parses.map((p) => p.case).sort()).toEqual(['accusative', 'nominative']);
    expect(NOUN_FORMS.find((f) => f.form === 'τοῦ λόγου')?.parses).toHaveLength(1);
  });

  it('builds a verb form for every stem and ending', () => {
    expect(VERB_FORMS).toHaveLength(24);
    expect(VERB_FORMS.find((v) => v.form === 'πιστεύομεν')?.person).toBe('1st');
  });
});
