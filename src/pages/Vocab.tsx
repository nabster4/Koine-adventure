import { useMemo, useState } from 'react';
import { VOCAB, type VocabWord } from '../data/vocab';
import { newCard, pickSession, review } from '../lib/srs';
import { choices } from '../lib/random';
import type { ProgressApi } from '../lib/progress';
import { Back } from '../components/Back';

const SESSION = 10;

export function Vocab({ api }: { api: ProgressApi }) {
  const [session, setSession] = useState<VocabWord[] | null>(null);
  const cards = api.progress.cards;
  const learned = VOCAB.filter((w) => (cards[w.id]?.box ?? 0) >= 2);
  const coverage = learned.reduce((s, w) => s + w.freq, 0);
  const total = 138000; // approx. words in the Greek New Testament

  if (session) {
    return <Session words={session} api={api} onDone={() => setSession(null)} />;
  }

  return (
    <div>
      <Back />
      <h2>Vocabulary</h2>
      <p className="muted">
        Words are ordered by how often they appear in the New Testament. Learn the most common ones first, and you'll recognize
        most of the text quickly.
      </p>
      <div className="card coverage">
        <div className="big-num">{Math.min(100, Math.round((coverage / total) * 100))}%</div>
        <div>
          of all the words in the Greek New Testament are words you've learned.
          <div className="xpbar wide"><span style={{ width: `${Math.min(100, (coverage / total) * 100)}%` }} /></div>
        </div>
      </div>
      <button className="primary block" onClick={() => setSession(pickSession(VOCAB, cards, SESSION))}>
        Start a session ({SESSION} cards)
      </button>
      <h3>Your word list</h3>
      <ul className="word-list">
        {VOCAB.map((w) => {
          const box = cards[w.id]?.box;
          return (
            <li key={w.id}>
              <span className="greek">{w.greek}</span>
              <span className="gloss">{w.gloss}</span>
              <span className="freq">×{w.freq.toLocaleString()}</span>
              <span className={`pips b${box ?? -1}`} title={box === undefined ? 'New' : `Box ${box} of 5`}>
                {[1, 2, 3, 4, 5].map((i) => <i key={i} className={box !== undefined && box >= i ? 'on' : ''} />)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Session({ words, api, onDone }: { words: VocabWord[]; api: ProgressApi; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const word = words[i];
  const opts = useMemo(() => (word ? choices(word, VOCAB, 4, (w) => w.gloss) : []), [word]);

  if (!word) {
    return (
      <div className="card center">
        <h3>Session complete!</h3>
        <p className="score">{correctCount} / {words.length}</p>
        <p>Words you missed will come back soon. Words you knew will return in a few days.</p>
        <button className="primary" onClick={onDone}>Done</button>
      </div>
    );
  }

  const pick = (gloss: string) => {
    if (picked) return;
    setPicked(gloss);
    const ok = gloss === word.gloss;
    if (ok) setCorrectCount((c) => c + 1);
    api.update((p) => ({
      ...p,
      xp: p.xp + (ok ? 5 : 1),
      cards: { ...p.cards, [word.id]: review(p.cards[word.id] ?? newCard(), ok) },
    }));
  };

  return (
    <div>
      <button className="back" onClick={onDone}>← End session</button>
      <div className="progress-dots">
        {words.map((w, k) => <i key={w.id} className={k < i ? 'done' : k === i ? 'now' : ''} />)}
      </div>
      <div className="card center flash">
        <div className="greek huge">{word.greek}</div>
        <p className="muted">{word.translit} · {word.pos}</p>
        <div className="options">
          {opts.map((o) => {
            let cls = 'option';
            if (picked) {
              if (o.gloss === word.gloss) cls += ' correct';
              else if (o.gloss === picked) cls += ' wrong';
            }
            return (
              <button key={o.id} className={cls} onClick={() => pick(o.gloss)} disabled={!!picked}>
                {o.gloss}
              </button>
            );
          })}
        </div>
        {picked && (
          <>
            {word.insight && (
              <p className="insight">
                <strong>💡 Light on the text:</strong> {word.insight}
              </p>
            )}
            <p className="muted">Appears about {word.freq.toLocaleString()} times in the New Testament.</p>
            {word.studyId && <a href={`#/light/${word.studyId}`}>Read the full word study →</a>}
            <button className="primary" onClick={() => { setI(i + 1); setPicked(null); }}>Next →</button>
          </>
        )}
      </div>
    </div>
  );
}
