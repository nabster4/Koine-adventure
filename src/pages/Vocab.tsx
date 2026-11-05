import { useEffect, useMemo, useState } from 'react';
import { VOCAB, type VocabWord } from '../data/vocab';
import { newCard, pickSession, review } from '../lib/srs';
import { choices, shuffle } from '../lib/random';
import { getSettings } from '../lib/settings';
import { sfx, speakGreek, speechSupported } from '../lib/audio';
import { respell } from '../lib/pronounce';
import type { ProgressApi } from '../lib/progress';
import { Back } from '../components/Back';
import { Speak } from '../components/Speak';

const SESSION = 10;
const NT_WORDS = 138000; // approx. number of words in the Greek New Testament

type Mode = 'meaning' | 'reverse' | 'listen' | 'mistakes';

const MODES: { id: Mode; icon: string; title: string; desc: string }[] = [
  { id: 'meaning', icon: '🇬🇷→🇬🇧', title: 'Greek → English', desc: 'See the Greek, pick the meaning' },
  { id: 'reverse', icon: '🇬🇧→🇬🇷', title: 'English → Greek', desc: 'See the meaning, pick the Greek' },
  { id: 'listen', icon: '🎧', title: 'Listening', desc: 'Hear the word, pick the meaning' },
  { id: 'mistakes', icon: '🔁', title: 'Review mistakes', desc: 'Practice words you missed' },
];

export function Vocab({ api }: { api: ProgressApi }) {
  const [session, setSession] = useState<{ words: VocabWord[]; mode: Mode } | null>(null);
  const [filter, setFilter] = useState<'all' | VocabWord['pos']>('all');
  const cards = api.progress.cards;
  const learned = VOCAB.filter((w) => (cards[w.id]?.box ?? 0) >= 2);
  const coverage = Math.min(100, (learned.reduce((s, w) => s + w.freq, 0) / NT_WORDS) * 100);
  const due = VOCAB.filter((w) => cards[w.id] && cards[w.id].due <= Date.now()).length;
  const mistakes = api.progress.mistakes.map((id) => VOCAB.find((w) => w.id === id)).filter(Boolean) as VocabWord[];

  if (session) {
    return <Session words={session.words} mode={session.mode} api={api} onDone={() => setSession(null)} />;
  }

  const start = (mode: Mode) => {
    const words = mode === 'mistakes' ? shuffle(mistakes).slice(0, SESSION) : pickSession(VOCAB, cards, SESSION);
    if (words.length) setSession({ words, mode });
  };

  const list = filter === 'all' ? VOCAB : VOCAB.filter((w) => w.pos === filter);
  const posList = [...new Set(VOCAB.map((w) => w.pos))];

  return (
    <div>
      <Back to="learn" label="Learn" />
      <h2>Vocabulary</h2>
      <p className="muted">
        Words are ordered by how often they appear in the New Testament, so you learn the most useful ones first. Words you
        know come back less often; words you miss come back soon.
      </p>
      <div className="card coverage">
        <div className="big-num">{Math.round(coverage)}%</div>
        <div>
          of all the words in the Greek New Testament are words you've learned.
          <div className="xpbar wide"><span style={{ width: `${coverage}%` }} /></div>
          <small className="muted">{learned.length} of {VOCAB.length} words learned · {due} due for review</small>
        </div>
      </div>

      <div className="mode-grid">
        {MODES.map((m) => {
          const disabled = (m.id === 'listen' && !speechSupported()) || (m.id === 'mistakes' && mistakes.length === 0);
          return (
            <button key={m.id} className="mode" onClick={() => start(m.id)} disabled={disabled}>
              <span className="mode-icon" aria-hidden="true">{m.icon}</span>
              <strong>{m.title}</strong>
              <small>{m.id === 'mistakes' ? (mistakes.length ? `${mistakes.length} word${mistakes.length === 1 ? '' : 's'} to review` : 'No mistakes yet!') : m.desc}</small>
            </button>
          );
        })}
      </div>

      <h3 className="section-title">Your word list</h3>
      <div className="chips filter">
        <button className={`chip ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>all</button>
        {posList.map((p) => (
          <button key={p} className={`chip ${filter === p ? 'on' : ''}`} onClick={() => setFilter(p)}>{p}</button>
        ))}
      </div>
      <ul className="word-list">
        {list.map((w) => {
          const box = cards[w.id]?.box;
          return (
            <li key={w.id}>
              <span className="greek">{w.greek} <Speak text={w.greek} /></span>
              <span className="gloss">{w.gloss}</span>
              <span className="freq">×{w.freq.toLocaleString()}</span>
              <span className="pips" title={box === undefined ? 'New' : `Strength ${box} of 5`} aria-label={box === undefined ? 'New word' : `Strength ${box} of 5`}>
                {[1, 2, 3, 4, 5].map((i) => <i key={i} className={box !== undefined && box >= i ? 'on' : ''} />)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Session({ words, mode, api, onDone }: { words: VocabWord[]; mode: Mode; api: ProgressApi; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const word = words[i];
  const reverse = mode === 'reverse';
  const listen = mode === 'listen';
  const opts = useMemo(() => (word ? choices(word, VOCAB, 4, (w) => w.id) : []), [word]);

  // In listening mode (or with auto-speak on in Greek→English), play the word as it appears.
  useEffect(() => {
    if (!word) return;
    if (listen || (mode !== 'reverse' && getSettings().autoSpeak)) speakGreek(word.greek);
  }, [word, listen, mode]);

  useEffect(() => {
    if (!word) sfx('complete');
  }, [word]);

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

  const pick = (id: string) => {
    if (picked) return;
    setPicked(id);
    const ok = id === word.id;
    sfx(ok ? 'correct' : 'wrong');
    if (ok) setCorrectCount((c) => c + 1);
    if (reverse && ok) speakGreek(word.greek);
    api.update((p) => ({
      ...p,
      xp: p.xp + (ok ? 5 : 1),
      cards: { ...p.cards, [word.id]: review(p.cards[word.id] ?? newCard(), ok) },
      mistakes: ok ? p.mistakes.filter((m) => m !== word.id) : [word.id, ...p.mistakes.filter((m) => m !== word.id)].slice(0, 50),
    }));
  };

  return (
    <div>
      <button className="back" onClick={onDone}>← End session</button>
      <div className="progress-dots" aria-label={`Card ${i + 1} of ${words.length}`}>
        {words.map((w, k) => <i key={w.id} className={k < i ? 'done' : k === i ? 'now' : ''} />)}
      </div>
      <div className="card center flash">
        {reverse ? (
          <>
            <p className="muted">Which Greek word means…</p>
            <div className="prompt-en">{word.gloss}</div>
          </>
        ) : listen && !picked ? (
          <>
            <button className="big-speak" onClick={() => speakGreek(word.greek)} aria-label="Play the word again">🔊</button>
            <p className="muted">Tap to hear it again</p>
          </>
        ) : (
          <>
            <div className="greek huge">{word.greek} <Speak text={word.greek} /></div>
            <p className="muted">{word.translit} · <span className="say">{respell(word.greek.split(',')[0])}</span> · {word.pos}</p>
          </>
        )}
        <div className="options">
          {opts.map((o) => {
            let cls = 'option';
            if (reverse) cls += ' greek';
            if (picked) {
              if (o.id === word.id) cls += ' correct';
              else if (o.id === picked) cls += ' wrong';
            }
            return (
              <button key={o.id} className={cls} onClick={() => pick(o.id)} disabled={!!picked}>
                {reverse ? o.greek : o.gloss}
              </button>
            );
          })}
        </div>
        {picked && (
          <>
            {reverse && <p className="greek big">{word.greek} <Speak text={word.greek} /> <span className="muted small">({word.translit})</span></p>}
            {word.insight && (
              <p className="insight">
                <strong>💡 Light on the text:</strong> {word.insight}
              </p>
            )}
            <p className="muted">Appears about {word.freq.toLocaleString()} times in the New Testament.</p>
            {word.studyId && <a href={`#/light/${word.studyId}`}>Read the full word study →</a>}
            <button className="primary" onClick={() => { setI(i + 1); setPicked(null); }} autoFocus>Next →</button>
          </>
        )}
      </div>
    </div>
  );
}
