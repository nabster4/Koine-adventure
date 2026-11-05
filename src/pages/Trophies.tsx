import { BADGES } from '../lib/badges';
import { dayKey, levelFor, LEVEL_TITLES, LEVELS, type ProgressApi } from '../lib/progress';
import { VOCAB } from '../data/vocab';
import { Back } from '../components/Back';

const WEEKS = 12;

function Heatmap({ xpByDay }: { xpByDay: Record<string, number> }) {
  const today = new Date();
  // Start on a Sunday, WEEKS weeks ago, so each column is one week.
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - (WEEKS - 1) * 7);
  const days: { key: string; xp: number; future: boolean }[] = [];
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = dayKey(d);
    days.push({ key, xp: xpByDay[key] ?? 0, future: d > today });
  }
  const level = (xp: number) => (xp === 0 ? 0 : xp < 20 ? 1 : xp < 50 ? 2 : xp < 100 ? 3 : 4);
  const active = Object.values(xpByDay).filter((x) => x > 0).length;
  return (
    <div className="card">
      <h3>Study calendar</h3>
      <div className="heatmap" role="img" aria-label={`${active} active days recently`}>
        {days.map((d) => (
          <i key={d.key} className={d.future ? 'future' : `h${level(d.xp)}`} title={`${d.key}: ${d.xp} XP`} />
        ))}
      </div>
      <p className="muted small">Last {WEEKS} weeks · {active} active day{active === 1 ? '' : 's'}</p>
    </div>
  );
}

export function Trophies({ api }: { api: ProgressApi }) {
  const { progress } = api;
  const lvl = levelFor(progress.xp);
  const learned = VOCAB.filter((w) => (progress.cards[w.id]?.box ?? 0) >= 2).length;
  const reviews = Object.values(progress.cards).reduce((s, c) => s + c.seen, 0);
  const correct = Object.values(progress.cards).reduce((s, c) => s + c.correct, 0);
  const earned = BADGES.filter((b) => b.earned(progress)).length;

  return (
    <div>
      <Back />
      <div className="me-head">
        <h2>Your Journey</h2>
        <a className="secondary small-btn" href="#/settings">⚙️ Settings</a>
      </div>
      <div className="card center">
        <p className="eyebrow">Level {lvl.level}</p>
        <h3>{lvl.title}</h3>
        <p>{progress.xp} XP · 🔥 {progress.streak}-day streak</p>
        {lvl.needed && (
          <>
            <div className="xpbar wide"><span style={{ width: `${(lvl.current / lvl.needed) * 100}%` }} /></div>
            <p className="muted">{lvl.needed - lvl.current} XP to {LEVEL_TITLES[lvl.level]} ({LEVELS[lvl.level]} XP)</p>
          </>
        )}
      </div>

      <div className="stat-grid">
        <div><strong>{learned}</strong><small>words learned</small></div>
        <div><strong>{reviews ? Math.round((correct / reviews) * 100) : 0}%</strong><small>flashcard accuracy</small></div>
        <div><strong>{progress.versesRead.length}</strong><small>verses read</small></div>
        <div><strong>{progress.lessonsDone.length}</strong><small>lessons done</small></div>
        <div><strong>{progress.studiesRead.length}</strong><small>word studies</small></div>
        <div><strong>{progress.cultureRead.length}</strong><small>history cards</small></div>
      </div>

      <Heatmap xpByDay={progress.xpByDay} />

      <h3 className="section-title">Badges · {earned}/{BADGES.length}</h3>
      <div className="badge-grid">
        {BADGES.map((b) => {
          const got = b.earned(progress);
          return (
            <div key={b.id} className={`badge ${got ? 'got' : ''}`}>
              <span className="badge-icon" aria-hidden="true">{got ? b.icon : '🔒'}</span>
              <strong>{b.name}</strong>
              <small>{b.description}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
