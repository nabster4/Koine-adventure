import { useEffect, useRef, useState } from 'react';
import { VOCAB, type VocabWord } from '../data/vocab';
import { sample, shuffle } from '../lib/random';
import { sfx, speakGreek } from '../lib/audio';
import type { ProgressApi } from '../lib/progress';
import { Back } from '../components/Back';

const PAIRS = 6;

interface Tile { key: string; wordId: string; text: string; greek: boolean }

function deal(pool: VocabWord[]): Tile[] {
  const words = sample(pool, PAIRS);
  return shuffle(
    words.flatMap((w) => [
      { key: `${w.id}-g`, wordId: w.id, text: w.greek, greek: true },
      { key: `${w.id}-e`, wordId: w.id, text: w.gloss, greek: false },
    ]),
  );
}

export function Match({ api }: { api: ProgressApi }) {
  const [deck, setDeck] = useState<'common' | 'all' | 'learned'>('common');
  const [tiles, setTiles] = useState<Tile[] | null>(null);
  const [selected, setSelected] = useState<Tile | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string[]>([]);
  const [misses, setMisses] = useState(0);
  const [start, setStart] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<number>();

  const learnedPool = VOCAB.filter((w) => (api.progress.cards[w.id]?.box ?? 0) >= 1);
  const pool = deck === 'common' ? VOCAB.slice(0, 40) : deck === 'learned' && learnedPool.length >= PAIRS ? learnedPool : VOCAB;
  const done = tiles !== null && matched.size === PAIRS;

  useEffect(() => {
    if (!tiles || done) return;
    timer.current = window.setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 250);
    return () => window.clearInterval(timer.current);
  }, [tiles, done, start]);

  useEffect(() => {
    if (!done) return;
    sfx('complete');
    const time = Math.floor((Date.now() - start) / 1000);
    setElapsed(time);
    api.update((p) => ({
      ...p,
      xp: p.xp + Math.max(10, 40 - misses * 3),
      bestMatchTime: p.bestMatchTime === null ? time : Math.min(p.bestMatchTime, time),
    }));
    // Only run once per finished game.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const play = () => {
    setTiles(deal(pool));
    setMatched(new Set());
    setSelected(null);
    setMisses(0);
    setWrong([]);
    setStart(Date.now());
    setElapsed(0);
  };

  const tap = (t: Tile) => {
    if (matched.has(t.wordId) || wrong.length) return;
    if (t.greek) speakGreek(t.text);
    if (!selected) return setSelected(t);
    if (selected.key === t.key) return setSelected(null);
    if (selected.greek === t.greek) return setSelected(t);
    if (selected.wordId === t.wordId) {
      sfx('correct');
      setMatched((m) => new Set(m).add(t.wordId));
      setSelected(null);
    } else {
      sfx('wrong');
      setMisses((m) => m + 1);
      setWrong([selected.key, t.key]);
      setTimeout(() => {
        setWrong([]);
        setSelected(null);
      }, 700);
    }
  };

  return (
    <div>
      <Back to="learn" label="Learn" />
      <h2>Word Match</h2>
      <p className="muted">Match each Greek word with its meaning as fast as you can.</p>

      {!tiles || done ? (
        <>
          {done && (
            <div className="card center">
              <h3>All matched! 🎉</h3>
              <p className="score">{elapsed}s</p>
              <p>{misses} miss{misses === 1 ? '' : 'es'} · Best time: {api.progress.bestMatchTime ?? elapsed}s</p>
            </div>
          )}
          <div className="seg" role="group" aria-label="Word deck">
            <button className={deck === 'common' ? 'on' : ''} onClick={() => setDeck('common')}>Top 40</button>
            <button className={deck === 'all' ? 'on' : ''} onClick={() => setDeck('all')}>All words</button>
            <button className={deck === 'learned' ? 'on' : ''} onClick={() => setDeck('learned')} disabled={learnedPool.length < PAIRS}>
              My words
            </button>
          </div>
          <button className="primary block" onClick={play}>{done ? 'Play again' : 'Start ▶'}</button>
        </>
      ) : (
        <>
          <div className="timer-row"><span>⏱ {elapsed}s</span><span>✓ {matched.size}/{PAIRS}</span><span>✗ {misses}</span></div>
          <div className="match-grid">
            {tiles.map((t) => {
              const isMatched = matched.has(t.wordId);
              const cls = ['match-tile', t.greek ? 'greek' : '', selected?.key === t.key ? 'sel' : '', isMatched ? 'matched' : '', wrong.includes(t.key) ? 'wrong' : ''].join(' ');
              return (
                <button key={t.key} className={cls} onClick={() => tap(t)} disabled={isMatched} aria-pressed={selected?.key === t.key}>
                  {t.text}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
