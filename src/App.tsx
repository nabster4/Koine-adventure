import { useEffect, useRef, useState } from 'react';
import { levelFor, useProgress } from './lib/progress';
import { useSettings } from './lib/settings';
import { BADGES } from './lib/badges';
import { sfx, warmUpVoices } from './lib/audio';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { Alphabet } from './pages/Alphabet';
import { Vocab } from './pages/Vocab';
import { Parse } from './pages/Parse';
import { Verses, VerseReader } from './pages/Verses';
import { WordLight, StudyDetail } from './pages/WordLight';
import { World, CultureDetail } from './pages/World';
import { Trophies } from './pages/Trophies';
import { Lessons, LessonDetail } from './pages/Lessons';
import { Match } from './pages/Match';
import { Lexicon } from './pages/Lexicon';
import { SettingsPage } from './pages/Settings';
import { Learn, Discover } from './pages/Hubs';

function useHashRoute(): string[] {
  const read = () => window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

interface Toast { id: number; icon: string; title: string; text: string }

/** Watches progress for level-ups and new badges and celebrates them. */
function useCelebrations(progress: ReturnType<typeof useProgress>['progress']) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const prev = useRef({ level: levelFor(progress.xp).level, badges: new Set(BADGES.filter((b) => b.earned(progress)).map((b) => b.id)) });

  useEffect(() => {
    const level = levelFor(progress.xp);
    const earned = BADGES.filter((b) => b.earned(progress));
    const fresh: Toast[] = [];
    if (level.level > prev.current.level) {
      fresh.push({ id: Date.now(), icon: '⭐', title: `Level ${level.level}!`, text: `You are now a ${level.title}.` });
    }
    const newBadges = earned.filter((b) => !prev.current.badges.has(b.id));
    if (newBadges.length === 1) {
      fresh.push({ id: Date.now() + 1, icon: newBadges[0].icon, title: 'Badge earned!', text: newBadges[0].name });
    } else if (newBadges.length > 1) {
      fresh.push({ id: Date.now() + 1, icon: '🏆', title: `${newBadges.length} badges earned!`, text: newBadges.map((b) => b.name).join(', ') });
    }
    prev.current = { level: level.level, badges: new Set(earned.map((b) => b.id)) };
    if (fresh.length) {
      sfx('levelup');
      setToasts((t) => [...t, ...fresh].slice(-2));
      fresh.forEach((f) => setTimeout(() => setToasts((t) => t.filter((x) => x.id !== f.id)), 4000));
    }
  }, [progress]);

  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));
  return { toasts, dismiss };
}

export function App() {
  const api = useProgress();
  const settingsApi = useSettings();
  const [page, id] = useHashRoute();
  const { toasts, dismiss } = useCelebrations(api.progress);
  const [, forceRender] = useState(0);

  useEffect(() => warmUpVoices(() => forceRender((n) => n + 1)), []);

  let content;
  switch (page) {
    case 'learn': content = <Learn api={api} />; break;
    case 'discover': content = <Discover api={api} />; break;
    case 'alphabet': content = <Alphabet api={api} />; break;
    case 'vocab': content = <Vocab api={api} />; break;
    case 'parse': content = <Parse api={api} />; break;
    case 'match': content = <Match api={api} />; break;
    case 'lessons': content = id ? <LessonDetail key={id} id={id} api={api} /> : <Lessons api={api} />; break;
    case 'verses': content = id ? <VerseReader key={id} id={id} api={api} /> : <Verses api={api} />; break;
    case 'light': content = id ? <StudyDetail key={id} id={id} api={api} /> : <WordLight api={api} />; break;
    case 'world': content = id ? <CultureDetail key={id} id={id} api={api} /> : <World api={api} />; break;
    case 'lexicon': content = <Lexicon />; break;
    case 'trophies': content = <Trophies api={api} />; break;
    case 'settings': content = <SettingsPage api={api} settingsApi={settingsApi} />; break;
    default: content = <Home api={api} dailyGoal={settingsApi.settings.dailyGoal} />;
  }

  return (
    <div className="app">
      <a className="skip" href="#main">Skip to content</a>
      <Header progress={api.progress} onHome={() => (window.location.hash = '#/')} />
      <main className="main" id="main">{content}</main>
      <footer className="footer">
        Greek text: NA28 / SBLGNT tradition · Progress is stored on this device
      </footer>
      <BottomNav page={page ?? ''} />
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <button key={t.id} className="toast" onClick={() => dismiss(t.id)} aria-label={`${t.title} ${t.text}. Tap to dismiss.`}>
            <span className="toast-icon">{t.icon}</span>
            <span><strong>{t.title}</strong><br />{t.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
