import { useState } from 'react';
import { ALPHABET, type Letter } from '../data/alphabet';
import { addUnique, type ProgressApi } from '../lib/progress';
import { choices, sample } from '../lib/random';
import { Back } from '../components/Back';
import { Speak } from '../components/Speak';
import { sfx, speakEnglish, speechSupported } from '../lib/audio';
import { respellWord } from '../lib/pronounce';

const ROUNDS = 10;

export function Alphabet({ api }: { api: ProgressApi }) {
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [selected, setSelected] = useState<Letter | null>(null);
  const learned = api.progress.lettersLearned;

  const open = (l: Letter) => {
    setSelected(l);
    if (!learned.includes(l.name)) {
      api.update((p) => ({ ...p, xp: p.xp + 5, lettersLearned: addUnique(p.lettersLearned, l.name) }));
    }
  };

  return (
    <div>
      <Back to="learn" label="Learn" />
      <h2>The Alphabet</h2>
      <p className="muted">
        Greek gave us the word "alphabet" — from its first two letters, ἄλφα and βῆτα. Tap a letter to learn it, then test yourself.
      </p>
      <div className="seg">
        <button className={mode === 'learn' ? 'on' : ''} onClick={() => setMode('learn')}>Learn</button>
        <button className={mode === 'quiz' ? 'on' : ''} onClick={() => setMode('quiz')}>Quiz</button>
      </div>

      {mode === 'learn' ? (
        <>
          {selected && (
            <div className="card letter-detail">
              <div className="greek huge">{selected.upper} {selected.lower}</div>
              <h3>
                {selected.name}{' '}
                {speechSupported() && (
                  <button className="speak" aria-label={`Say ${selected.name}`} onClick={() => speakEnglish(selected.name)}>🔊</button>
                )}
              </h3>
              <p><strong>Transliteration:</strong> {selected.translit}</p>
              <p><strong>Sounds like:</strong> {selected.sound}</p>
              <p>
                <strong>Example:</strong> <span className="greek">{selected.example.greek}</span> <Speak text={selected.example.greek} /> ({selected.example.translit}) — {selected.example.meaning}
              </p>
              <p className="muted small">Say it: {respellWord(selected.example.greek)}</p>
            </div>
          )}
          <div className="letter-grid">
            {ALPHABET.map((l) => (
              <button
                key={l.name}
                className={`letter ${learned.includes(l.name) ? 'done' : ''} ${selected?.name === l.name ? 'sel' : ''}`}
                onClick={() => open(l)}
              >
                <span className="greek">{l.upper}{l.lower.split(' ')[0]}</span>
                <small>{l.name}</small>
              </button>
            ))}
          </div>
          <div className="card tip">
            <strong>Breathing marks:</strong> every word that starts with a vowel has one. A rough breathing (ἁ) adds an "h" sound — so
            ἁμαρτία is "hamartia". A smooth breathing (ἀ) adds nothing.
          </div>
        </>
      ) : (
        <LetterQuiz api={api} />
      )}
    </div>
  );
}

function LetterQuiz({ api }: { api: ProgressApi }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(() => sample(ALPHABET, ROUNDS));
  const [picked, setPicked] = useState<string | null>(null);
  const [opts, setOpts] = useState(() => choices(questions[0], ALPHABET, 4, (l) => l.name));

  if (round >= ROUNDS) {
    return (
      <div className="card center">
        <h3>Quiz complete!</h3>
        <p className="score">{score} / {ROUNDS}</p>
        <p>{score === ROUNDS ? 'Perfect! τέλειος!' : 'Keep practicing — every scribe started here.'}</p>
        <button
          className="primary"
          onClick={() => {
            const q = sample(ALPHABET, ROUNDS);
            setQuestions(q);
            setOpts(choices(q[0], ALPHABET, 4, (l) => l.name));
            setRound(0);
            setScore(0);
            setPicked(null);
          }}
        >
          Play again
        </button>
      </div>
    );
  }

  const q = questions[round];
  const pick = (name: string) => {
    if (picked) return;
    setPicked(name);
    if (name === q.name) {
      setScore((s) => s + 1);
      api.addXp(2);
      sfx('correct');
    } else sfx('wrong');
  };
  const next = () => {
    const r = round + 1;
    setRound(r);
    setPicked(null);
    if (r < ROUNDS) setOpts(choices(questions[r], ALPHABET, 4, (l) => l.name));
    if (r === ROUNDS) {
      api.addXp(10);
      sfx('complete');
    }
  };

  return (
    <div className="card center">
      <p className="muted">Question {round + 1} of {ROUNDS}</p>
      <div className="greek huge">{q.lower.split(' ')[0]}</div>
      <p>What is this letter called?</p>
      <div className="options">
        {opts.map((o) => {
          let cls = 'option';
          if (picked) {
            if (o.name === q.name) cls += ' correct';
            else if (o.name === picked) cls += ' wrong';
          }
          return (
            <button key={o.name} className={cls} onClick={() => pick(o.name)} disabled={!!picked}>
              {o.name}
            </button>
          );
        })}
      </div>
      {picked && (
        <>
          <p className="feedback">
            {q.name} sounds like {q.sound}. Example: <span className="greek">{q.example.greek}</span> <Speak text={q.example.greek} /> — {q.example.meaning}
          </p>
          <button className="primary" onClick={next}>Next →</button>
        </>
      )}
    </div>
  );
}
