import type { ProgressApi } from '../lib/progress';
import { ALPHABET } from '../data/alphabet';
import { VOCAB } from '../data/vocab';
import { LESSONS } from '../data/lessons';
import { WORD_STUDIES } from '../data/wordStudies';
import { CULTURE } from '../data/culture';

interface Tile { href: string; icon: string; title: string; desc: string; meta?: string }

export function TileGrid({ tiles }: { tiles: Tile[] }) {
  return (
    <section className="tiles">
      {tiles.map((t) => (
        <a key={t.href} className="tile" href={`#/${t.href}`}>
          <span className="tile-icon" aria-hidden="true">{t.icon}</span>
          <span className="tile-title">{t.title}</span>
          <span className="tile-desc">{t.desc}</span>
          {t.meta && <span className="tile-meta">{t.meta}</span>}
        </a>
      ))}
    </section>
  );
}

export function Learn({ api }: { api: ProgressApi }) {
  const p = api.progress;
  const learned = Object.values(p.cards).filter((c) => c.box >= 2).length;
  const due = Object.values(p.cards).filter((c) => c.due <= Date.now()).length;
  return (
    <div>
      <h2>Learn</h2>
      <p className="muted">Build your Greek step by step: letters, words, grammar, and quick-fire games.</p>
      <TileGrid
        tiles={[
          { href: 'alphabet', icon: 'Αα', title: 'Alphabet', desc: 'Letters, sounds and a quiz', meta: `${p.lettersLearned.length}/${ALPHABET.length} learned` },
          { href: 'vocab', icon: '🃏', title: 'Vocabulary', desc: 'Flashcards that remember what you know', meta: due ? `${due} due for review` : `${learned}/${VOCAB.length} learned` },
          { href: 'lessons', icon: '📘', title: 'Grammar Lessons', desc: 'Short lessons with real verses', meta: `${p.lessonsDone.length}/${LESSONS.length} complete` },
          { href: 'parse', icon: '🎯', title: 'Parse It!', desc: 'Beat the clock on word endings', meta: `Best streak: ${p.bestParseStreak}` },
          { href: 'match', icon: '🧠', title: 'Word Match', desc: 'Pair Greek words with meanings', meta: p.bestMatchTime ? `Best: ${p.bestMatchTime}s` : 'Race the clock' },
        ]}
      />
    </div>
  );
}

export function Discover({ api }: { api: ProgressApi }) {
  const p = api.progress;
  return (
    <div>
      <h2>Discover</h2>
      <p className="muted">Explore how Greek words and the ancient world bring Scripture into the light.</p>
      <TileGrid
        tiles={[
          { href: 'light', icon: '💡', title: 'Word Light', desc: 'Word studies that illuminate the Bible', meta: `${p.studiesRead.length}/${WORD_STUDIES.length} studies` },
          { href: 'world', icon: '🏛️', title: 'Ancient World', desc: 'History and culture behind the text', meta: `${p.cultureRead.length}/${CULTURE.length} explored` },
          { href: 'lexicon', icon: '🔎', title: 'Lexicon', desc: 'Search every word in the app' },
        ]}
      />
    </div>
  );
}
