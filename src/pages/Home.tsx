import type { ProgressApi } from '../lib/progress';
import { levelFor } from '../lib/progress';
import { WORD_STUDIES } from '../data/wordStudies';
import { CULTURE } from '../data/culture';
import { VERSES } from '../data/verses';
import { ALPHABET } from '../data/alphabet';
import { VOCAB } from '../data/vocab';
import { BADGES } from '../lib/badges';

const dayIndex = () => Math.floor(Date.now() / 86400000);

export function Home({ api }: { api: ProgressApi }) {
  const { progress } = api;
  const lvl = levelFor(progress.xp);
  const wotd = WORD_STUDIES[dayIndex() % WORD_STUDIES.length];
  const learned = Object.values(progress.cards).filter((c) => c.box >= 2).length;
  const due = Object.values(progress.cards).filter((c) => c.due <= Date.now()).length;
  const earned = BADGES.filter((b) => b.earned(progress)).length;

  const tiles = [
    { href: 'alphabet', icon: 'Αα', title: 'Alphabet', desc: 'Meet the 24 letters', meta: `${progress.lettersLearned.length}/${ALPHABET.length} learned` },
    { href: 'vocab', icon: '🃏', title: 'Vocabulary', desc: 'Most common words first', meta: due ? `${due} due for review` : `${learned}/${VOCAB.length} learned` },
    { href: 'parse', icon: '🎯', title: 'Parse It!', desc: 'Beat the clock on case and person', meta: `Best streak: ${progress.bestParseStreak}` },
    { href: 'verses', icon: '📜', title: 'Read Scripture', desc: 'Tap through real verses', meta: `${progress.versesRead.length}/${VERSES.length} verses` },
    { href: 'light', icon: '💡', title: 'Word Light', desc: 'Words that illuminate the Bible', meta: `${progress.studiesRead.length}/${WORD_STUDIES.length} studies` },
    { href: 'world', icon: '🏛️', title: 'Ancient World', desc: 'History and culture behind the text', meta: `${progress.cultureRead.length}/${CULTURE.length} explored` },
  ];

  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">Level {lvl.level} · {lvl.title}</p>
        <h1>
          Χαίρετε! <span className="sub">Welcome, traveller.</span>
        </h1>
        <p className="lede">
          Learn the language of the New Testament, and discover how its words and world bring Scripture into the light.
        </p>
      </section>

      <a className="wotd" href={`#/light/${wotd.id}`}>
        <span className="wotd-label">Word of the day</span>
        <span className="greek big">{wotd.greek}</span>
        <span className="wotd-gloss">{wotd.translit} — {wotd.gloss}</span>
        <span className="wotd-tag">{wotd.tagline}</span>
      </a>

      <section className="tiles">
        {tiles.map((t) => (
          <a key={t.href} className="tile" href={`#/${t.href}`}>
            <span className="tile-icon">{t.icon}</span>
            <span className="tile-title">{t.title}</span>
            <span className="tile-desc">{t.desc}</span>
            <span className="tile-meta">{t.meta}</span>
          </a>
        ))}
      </section>

      <a className="trophy-link" href="#/trophies">
        🏆 Badges: {earned}/{BADGES.length} earned · {progress.xp} XP
      </a>
    </div>
  );
}
