import { useMemo, useState } from 'react';
import { VERSES, type VerseWord } from '../data/verses';
import { addUnique, type ProgressApi } from '../lib/progress';
import { sample } from '../lib/random';
import { Back } from '../components/Back';
import { Speak } from '../components/Speak';
import { sfx, speakGreek } from '../lib/audio';
import { getSettings } from '../lib/settings';
import { respell } from '../lib/pronounce';

const LEVEL_NAMES = ['', 'Beginner', 'Intermediate', 'Advanced'];

export function Verses({ api }: { api: ProgressApi }) {
  const read = api.progress.versesRead;
  return (
    <div>
      <Back />
      <h2>Read Scripture</h2>
      <p className="muted">
        Read real verses in the original Greek. Tap any word to see what it means and how it works, then find the insight the
        Greek brings to light.
      </p>
      <div className="list">
        {[...VERSES].sort((a, b) => a.level - b.level).map((v) => (
          <a key={v.id} className="list-item" href={`#/verses/${v.id}`}>
            <span className="li-main">
              <strong>{v.ref}</strong>
              <span className="greek small">{v.words.map((w) => w.text).join(' ')}</span>
            </span>
            <span className={`level l${v.level}`}>{LEVEL_NAMES[v.level]}</span>
            {read.includes(v.id) && <span className="check">✓</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

export function VerseReader({ id, api }: { id: string; api: ProgressApi }) {
  const verse = VERSES.find((v) => v.id === id);
  const [active, setActive] = useState<number | null>(null);
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [showGloss, setShowGloss] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [game, setGame] = useState<null | { targets: number[]; round: number; score: number; result: null | boolean }>(null);

  // Words with a unique gloss make good "find the word" targets.
  const targetPool = useMemo(() => {
    if (!verse) return [];
    const counts = new Map<string, number>();
    verse.words.forEach((w) => counts.set(w.gloss, (counts.get(w.gloss) ?? 0) + 1));
    return verse.words.map((w, i) => ({ w, i })).filter(({ w }) => w.lemma !== 'ὁ' && counts.get(w.gloss) === 1).map(({ i }) => i);
  }, [verse]);

  if (!verse) return <p>Verse not found. <Back to="verses" /></p>;

  const tap = (i: number) => {
    if (game && game.result === null) {
      const target = verse.words[game.targets[game.round]];
      const ok = verse.words[i].gloss === target.gloss;
      setGame({ ...game, score: game.score + (ok ? 1 : 0), result: ok });
      sfx(ok ? 'correct' : 'wrong');
      if (ok) api.addXp(5);
      setActive(i);
      if (game.round + 1 >= game.targets.length) setTimeout(() => sfx('complete'), 400);
      return;
    }
    setActive(i);
    setTapped((t) => new Set(t).add(i));
    if (getSettings().autoSpeak) speakGreek(verse.words[i].text);
  };

  const reveal = () => {
    setRevealed(true);
    sfx('complete');
    if (!api.progress.versesRead.includes(verse.id)) {
      api.update((p) => ({ ...p, xp: p.xp + 20, versesRead: addUnique(p.versesRead, verse.id) }));
    }
  };

  const startGame = () => {
    setGame({ targets: sample(targetPool, Math.min(3, targetPool.length)), round: 0, score: 0, result: null });
    setShowGloss(false);
    setActive(null);
  };

  const word: VerseWord | null = active !== null ? verse.words[active] : null;
  const allTapped = tapped.size >= verse.words.length;
  const gameOver = game && game.round >= game.targets.length;

  return (
    <div>
      <Back to="verses" label="All verses" />
      <h2>{verse.ref}</h2>
      <div className="verse-actions">
        <Speak text={verse.words.map((w) => w.text).join(' ')} label="Listen to the whole verse" className="with-label" />
        <span className="muted small">Listen to the whole verse</span>
      </div>

      <div className="card verse-card">
        <div className="verse">
          {verse.words.map((w, i) => (
            <button
              key={i}
              className={`vword ${active === i ? 'active' : ''} ${tapped.has(i) ? 'seen' : ''}`}
              onClick={() => tap(i)}
            >
              <span className="greek">{w.text}</span>
              {showGloss && <small>{w.gloss}</small>}
            </button>
          ))}
        </div>
        <label className="toggle">
          <input type="checkbox" checked={showGloss} onChange={(e) => setShowGloss(e.target.checked)} disabled={!!game && !gameOver} />
          Show word meanings
        </label>
        <p className="english">"{verse.english}"</p>
      </div>

      {game && !gameOver ? (
        <div className="card center">
          <p className="muted">Find the word · {game.round + 1} of {game.targets.length}</p>
          <p className="quiz-prompt">Tap the Greek word that means "{verse.words[game.targets[game.round]].gloss}"</p>
          {game.result !== null && (
            <>
              <p className={`feedback ${game.result ? 'good' : 'bad'}`}>
                {game.result ? '✓ Yes!' : `✗ It was ${verse.words[game.targets[game.round]].text}`}
              </p>
              <button className="primary" onClick={() => { setGame({ ...game, round: game.round + 1, result: null }); setActive(null); }}>
                Next →
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {word && (
            <div className="card word-panel">
              <div className="greek big">
                {word.text.replace(/[,.·[\]]/g, '')} <Speak text={word.text} />
              </div>
              <p className="muted small">Say it: {respell(word.text)}</p>
              <p><strong>Dictionary form:</strong> <span className="greek">{word.lemma}</span></p>
              <p><strong>Meaning:</strong> {word.gloss}</p>
              <p><strong>Parsing:</strong> {word.parse}</p>
              {word.note && <p className="insight">💡 {word.note}</p>}
            </div>
          )}
          {gameOver && (
            <div className="card center">
              <h3>Found {game.score} of {game.targets.length}!</h3>
            </div>
          )}
          {!revealed ? (
            <button className="primary block" onClick={reveal}>
              {allTapped ? '✨ Reveal the light on this verse' : `Tap each word (${tapped.size}/${verse.words.length}) or reveal the insight now`}
            </button>
          ) : (
            <div className="card light-card">
              <h3>💡 Light on the text</h3>
              <p>{verse.light}</p>
            </div>
          )}
          {targetPool.length > 0 && (
            <button className="secondary block" onClick={startGame}>🎯 Play "Find the word"</button>
          )}
        </>
      )}
    </div>
  );
}
