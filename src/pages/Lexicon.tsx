import { useMemo, useState } from 'react';
import { VOCAB } from '../data/vocab';
import { VERSES } from '../data/verses';
import { WORD_STUDIES } from '../data/wordStudies';
import { fold, latinToGreek } from '../lib/search';
import { respell } from '../lib/pronounce';
import { Back } from '../components/Back';
import { Speak } from '../components/Speak';

interface Entry {
  lemma: string;
  gloss: string;
  translit?: string;
  freq?: number;
  pos?: string;
  insight?: string;
  studyId?: string;
  verses: { id: string; ref: string }[];
}

function buildIndex(): Entry[] {
  const byLemma = new Map<string, Entry>();
  for (const v of VOCAB) {
    const lemma = v.greek.split(',')[0].trim();
    byLemma.set(fold(lemma), { lemma, gloss: v.gloss, translit: v.translit, freq: v.freq, pos: v.pos, insight: v.insight, studyId: v.studyId, verses: [] });
  }
  for (const verse of VERSES) {
    for (const w of verse.words) {
      const key = fold(w.lemma);
      let e = byLemma.get(key);
      if (!e) {
        e = { lemma: w.lemma, gloss: w.gloss, verses: [] };
        byLemma.set(key, e);
      }
      if (!e.verses.some((x) => x.id === verse.id)) e.verses.push({ id: verse.id, ref: verse.ref });
    }
  }
  for (const s of WORD_STUDIES) {
    const e = byLemma.get(fold(s.greek.split(' / ')[0]));
    if (e && !e.studyId) e.studyId = s.id;
  }
  return [...byLemma.values()].sort((a, b) => (b.freq ?? 0) - (a.freq ?? 0));
}

export function Lexicon() {
  const index = useMemo(buildIndex, []);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const f = fold(q);
    if (!f) return index;
    const g = latinToGreek(f);
    return index.filter(
      (e) =>
        fold(e.lemma).includes(f) ||
        fold(e.lemma).includes(g) ||
        fold(e.gloss).includes(f) ||
        (e.translit && fold(e.translit).includes(f)),
    );
  }, [q, index]);

  return (
    <div>
      <Back to="discover" label="Discover" />
      <h2>Lexicon</h2>
      <p className="muted">Search every word in Koine Adventure — in Greek, in English, or by typing Greek with English letters (try "logos" or "love").</p>
      <input
        className="search"
        type="search"
        placeholder="Search words…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search the lexicon"
        autoFocus
      />
      <p className="muted small">{results.length} word{results.length === 1 ? '' : 's'}</p>
      <ul className="lexicon">
        {results.slice(0, 200).map((e) => {
          const isOpen = open === e.lemma;
          return (
            <li key={e.lemma} className={isOpen ? 'open' : ''}>
              <button className="lex-row" onClick={() => setOpen(isOpen ? null : e.lemma)} aria-expanded={isOpen}>
                <span className="greek lex-lemma">{e.lemma}</span>
                <span className="lex-gloss">{e.gloss}</span>
                {e.freq && <span className="freq">×{e.freq.toLocaleString()}</span>}
              </button>
              {isOpen && (
                <div className="lex-detail">
                  <p>
                    <Speak text={e.lemma} /> <span className="muted">{e.translit ? `${e.translit} · ` : ''}say it: {respell(e.lemma)}{e.pos ? ` · ${e.pos}` : ''}</span>
                  </p>
                  {e.insight && <p className="insight">💡 {e.insight}</p>}
                  {e.studyId && <p><a href={`#/light/${e.studyId}`}>Read the Word Light study →</a></p>}
                  {e.verses.length > 0 && (
                    <p>
                      Appears in: {e.verses.map((v, i) => (
                        <span key={v.id}>{i > 0 && ' · '}<a href={`#/verses/${v.id}`}>{v.ref}</a></span>
                      ))}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
