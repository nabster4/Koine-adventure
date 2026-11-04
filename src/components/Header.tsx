import { levelFor, type Progress } from '../lib/progress';

export function Header({ progress, onHome }: { progress: Progress; onHome: () => void }) {
  const lvl = levelFor(progress.xp);
  const pct = lvl.needed ? Math.round((lvl.current / lvl.needed) * 100) : 100;
  return (
    <header className="app-header">
      <button className="brand" onClick={onHome} aria-label="Home">
        <span className="brand-mark">Κ</span>
        <span className="brand-name">Koine Adventure</span>
      </button>
      <div className="stats">
        <span className="stat" title="Daily streak">🔥 {progress.streak}</span>
        <span className="stat" title={`${progress.xp} XP total`}>
          Lv {lvl.level}
          <span className="xpbar"><span style={{ width: `${pct}%` }} /></span>
        </span>
      </div>
    </header>
  );
}
