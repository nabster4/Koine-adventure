import { levelFor, type Progress } from '../lib/progress';

export function Header({ progress, onHome }: { progress: Progress; onHome: () => void }) {
  const lvl = levelFor(progress.xp);
  const pct = lvl.needed ? Math.round((lvl.current / lvl.needed) * 100) : 100;
  return (
    <header className="app-header">
      <button className="brand" onClick={onHome} aria-label="Koine Adventure — home">
        <span className="brand-mark">Κ</span>
        <span className="brand-name">Koine Adventure</span>
      </button>
      <nav className="top-nav" aria-label="Sections">
        <a href="#/learn">Learn</a>
        <a href="#/verses">Read</a>
        <a href="#/discover">Discover</a>
      </nav>
      <div className="stats">
        <span className="stat" title="Daily streak" aria-label={`${progress.streak} day streak`}>🔥 {progress.streak}</span>
        <a className="stat" href="#/trophies" title={`${progress.xp} XP total`} aria-label={`Level ${lvl.level}, ${progress.xp} XP`}>
          Lv {lvl.level}
          <span className="xpbar"><span style={{ width: `${pct}%` }} /></span>
        </a>
        <a className="stat icon-btn" href="#/settings" aria-label="Settings" title="Settings">⚙️</a>
      </div>
    </header>
  );
}
