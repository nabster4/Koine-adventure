import type { ProgressApi, Progress } from '../lib/progress';
import { levelFor, xpToday } from '../lib/progress';
import { WORD_STUDIES } from '../data/wordStudies';
import { CULTURE } from '../data/culture';
import { VERSES } from '../data/verses';
import { ALPHABET } from '../data/alphabet';
import { LESSONS } from '../data/lessons';
import { BADGES } from '../lib/badges';
import { Speak } from '../components/Speak';
import { TileGrid } from './Hubs';

const dayIndex = () => Math.floor(Date.now() / 86400000);

interface Step { href: string; icon: string; title: string; why: string }

/** Suggests a balanced path: one language step, one reading step, one discovery step. */
export function nextSteps(p: Progress): Step[] {
  const steps: Step[] = [];
  const due = Object.values(p.cards).filter((c) => c.due <= Date.now()).length;
  const lesson = LESSONS.find((l) => !p.lessonsDone.includes(l.id));

  if (p.lettersLearned.length < ALPHABET.length) {
    steps.push({ href: 'alphabet', icon: 'Αα', title: 'Learn the alphabet', why: `${ALPHABET.length - p.lettersLearned.length} letters to go` });
  } else if (due > 0) {
    steps.push({ href: 'vocab', icon: '🃏', title: `Review ${due} word${due === 1 ? '' : 's'}`, why: 'Reviewing at the right time locks words into memory' });
  } else if (lesson) {
    steps.push({ href: `lessons/${lesson.id}`, icon: lesson.icon, title: lesson.title, why: 'Next grammar lesson' });
  } else {
    steps.push({ href: 'vocab', icon: '🃏', title: 'Learn new words', why: 'Grow your vocabulary' });
  }

  const verse = [...VERSES].sort((a, b) => a.level - b.level).find((v) => !p.versesRead.includes(v.id));
  if (verse) steps.push({ href: `verses/${verse.id}`, icon: '📜', title: `Read ${verse.ref}`, why: 'Read Scripture in Greek' });
  else if (lesson && steps[0].href !== `lessons/${lesson.id}`) steps.push({ href: `lessons/${lesson.id}`, icon: lesson.icon, title: lesson.title, why: 'Next grammar lesson' });

  const study = WORD_STUDIES.find((s) => !p.studiesRead.includes(s.id));
  const card = CULTURE.find((c) => !p.cultureRead.includes(c.id));
  const discover = (p.studiesRead.length <= p.cultureRead.length ? study ?? card : card ?? study);
  if (discover) {
    if ('greek' in discover) steps.push({ href: `light/${discover.id}`, icon: '💡', title: `Word Light: ${discover.translit}`, why: discover.tagline });
    else steps.push({ href: `world/${discover.id}`, icon: discover.icon, title: discover.title, why: 'Step into the ancient world' });
  }
  return steps;
}

function GoalRing({ value, goal }: { value: number; goal: number }) {
  const pct = Math.min(1, value / goal);
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ring" viewBox="0 0 80 80" width="80" height="80" role="img" aria-label={`${value} of ${goal} XP today`}>
      <circle cx="40" cy="40" r={r} className="ring-bg" />
      <circle cx="40" cy="40" r={r} className="ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 40 40)" />
      <text x="40" y="38" textAnchor="middle" className="ring-num">{pct >= 1 ? '✓' : value}</text>
      <text x="40" y="54" textAnchor="middle" className="ring-sub">/ {goal} XP</text>
    </svg>
  );
}

export function Home({ api, dailyGoal }: { api: ProgressApi; dailyGoal: number }) {
  const { progress } = api;
  const lvl = levelFor(progress.xp);
  const wotd = WORD_STUDIES[dayIndex() % WORD_STUDIES.length];
  const earned = BADGES.filter((b) => b.earned(progress)).length;
  const today = xpToday(progress);
  const steps = nextSteps(progress);
  const firstVisit = progress.xp === 0;

  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">Level {lvl.level} · {lvl.title}</p>
        <h1>
          Χαίρετε! <Speak text="Χαίρετε" /> <span className="sub">{firstVisit ? 'Welcome, traveller.' : 'Welcome back.'}</span>
        </h1>
        <p className="lede">
          Learn the language of the New Testament, and discover how its words and world bring Scripture into the light.
        </p>
      </section>

      <section className="card goal-card">
        <GoalRing value={today} goal={dailyGoal} />
        <div>
          <h3>{today >= dailyGoal ? 'Daily goal reached! 🎉' : 'Today\'s goal'}</h3>
          <p className="muted">
            🔥 {progress.streak}-day streak. {today >= dailyGoal ? 'Keep going, or come back tomorrow.' : 'Earn XP in any activity to fill the ring.'}
          </p>
        </div>
      </section>

      <h3 className="section-title">Up next</h3>
      <ol className="path">
        {steps.map((s, i) => (
          <li key={s.href}>
            <a href={`#/${s.href}`} className="path-step">
              <span className="path-num">{i + 1}</span>
              <span className="path-icon" aria-hidden="true">{s.icon}</span>
              <span className="path-text">
                <strong>{s.title}</strong>
                <small>{s.why}</small>
              </span>
              <span aria-hidden="true">›</span>
            </a>
          </li>
        ))}
      </ol>

      <a className="wotd" href={`#/light/${wotd.id}`}>
        <span className="wotd-label">Word of the day</span>
        <span className="greek big">{wotd.greek}</span>
        <span className="wotd-gloss">{wotd.translit} — {wotd.gloss}</span>
        <span className="wotd-tag">{wotd.tagline}</span>
      </a>

      <h3 className="section-title">Explore</h3>
      <TileGrid
        tiles={[
          { href: 'learn', icon: '🎓', title: 'Learn', desc: 'Alphabet, vocabulary, grammar, games' },
          { href: 'verses', icon: '📜', title: 'Read Scripture', desc: 'Real verses, word by word', meta: `${progress.versesRead.length}/${VERSES.length} verses` },
          { href: 'discover', icon: '💡', title: 'Discover', desc: 'Word studies and the ancient world' },
        ]}
      />

      <a className="trophy-link" href="#/trophies">
        🏆 Badges: {earned}/{BADGES.length} earned · {progress.xp} XP
      </a>
    </div>
  );
}
