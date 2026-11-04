import { BADGES } from '../lib/badges';
import { levelFor, LEVEL_TITLES, LEVELS, type ProgressApi } from '../lib/progress';
import { Back } from '../components/Back';

export function Trophies({ api }: { api: ProgressApi }) {
  const { progress } = api;
  const lvl = levelFor(progress.xp);
  return (
    <div>
      <Back />
      <h2>Your Journey</h2>
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
      <div className="badge-grid">
        {BADGES.map((b) => {
          const got = b.earned(progress);
          return (
            <div key={b.id} className={`badge ${got ? 'got' : ''}`}>
              <span className="badge-icon">{got ? b.icon : '🔒'}</span>
              <strong>{b.name}</strong>
              <small>{b.description}</small>
            </div>
          );
        })}
      </div>
      <button
        className="link danger"
        onClick={() => {
          if (confirm('Reset all progress? This cannot be undone.')) api.reset();
        }}
      >
        Reset progress
      </button>
    </div>
  );
}
