import { useEffect, useState } from 'react';
import { useProgress } from './lib/progress';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Alphabet } from './pages/Alphabet';
import { Vocab } from './pages/Vocab';
import { Parse } from './pages/Parse';
import { Verses, VerseReader } from './pages/Verses';
import { WordLight, StudyDetail } from './pages/WordLight';
import { World, CultureDetail } from './pages/World';
import { Trophies } from './pages/Trophies';

function useHashRoute(): string[] {
  const read = () => window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
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

export function App() {
  const api = useProgress();
  const [page, id] = useHashRoute();

  let content;
  switch (page) {
    case 'alphabet': content = <Alphabet api={api} />; break;
    case 'vocab': content = <Vocab api={api} />; break;
    case 'parse': content = <Parse api={api} />; break;
    case 'verses': content = id ? <VerseReader key={id} id={id} api={api} /> : <Verses api={api} />; break;
    case 'light': content = id ? <StudyDetail key={id} id={id} api={api} /> : <WordLight api={api} />; break;
    case 'world': content = id ? <CultureDetail key={id} id={id} api={api} /> : <World api={api} />; break;
    case 'trophies': content = <Trophies api={api} />; break;
    default: content = <Home api={api} />;
  }

  return (
    <div className="app">
      <Header progress={api.progress} onHome={() => (window.location.hash = '#/')} />
      <main className="main">{content}</main>
      <footer className="footer">
        Greek text: NA28 / SBLGNT tradition · Made for learners of the Greek New Testament
      </footer>
    </div>
  );
}
