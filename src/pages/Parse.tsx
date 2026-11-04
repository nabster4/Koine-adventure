import { useEffect, useRef, useState } from 'react';
import {
  CASE_HINTS, NOUN_FORMS, VERB_ENDING_TABLE, VERB_FORMS,
  type Case, type Gender, type GNumber, type NounForm, type Person, type VerbForm,
} from '../data/grammar';
import type { ProgressApi } from '../lib/progress';
import { Back } from '../components/Back';

const SECONDS = 60;
type Mode = 'noun' | 'verb';
type Item = { kind: 'noun'; f: NounForm } | { kind: 'verb'; f: VerbForm };

const randomItem = (mode: Mode): Item =>
  mode === 'noun'
    ? { kind: 'noun', f: NOUN_FORMS[Math.floor(Math.random() * NOUN_FORMS.length)] }
    : { kind: 'verb', f: VERB_FORMS[Math.floor(Math.random() * VERB_FORMS.length)] };

export function Parse({ api }: { api: ProgressApi }) {
  const [mode, setMode] = useState<Mode>('noun');
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SECONDS);
  const [item, setItem] = useState<Item>(() => randomItem('noun'));
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sel, setSel] = useState<{ case?: Case; number?: GNumber; gender?: Gender; person?: Person }>({});
  const [flash, setFlash] = useState<null | { ok: boolean; text: string }>(null);
  const scoreRef = useRef(0);
  scoreRef.current = score;
  const { addXp } = api;

  useEffect(() => {
    if (!playing) return;
    if (timeLeft <= 0) {
      setPlaying(false);
      addXp(scoreRef.current * 3);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [playing, timeLeft, addXp]);

  const start = () => {
    setPlaying(true);
    setTimeLeft(SECONDS);
    setScore(0);
    setStreak(0);
    setSel({});
    setFlash(null);
    setItem(randomItem(mode));
  };

  const answerText = (it: Item) =>
    it.kind === 'noun'
      ? it.f.parses.map((p) => `${p.case} ${p.number} ${p.gender}`).join(' or ')
      : `${it.f.person} person ${it.f.number}`;

  const choose = (patch: typeof sel) => {
    const next = { ...sel, ...patch };
    const complete = item.kind === 'noun' ? next.case && next.number && next.gender : next.person && next.number;
    if (!complete) {
      setSel(next);
      return;
    }
    const ok =
      item.kind === 'noun'
        ? item.f.parses.some((p) => p.case === next.case && p.number === next.number && p.gender === next.gender)
        : item.f.person === next.person && item.f.number === next.number;
    const newStreak = ok ? streak + 1 : 0;
    setStreak(newStreak);
    if (ok) setScore((s) => s + 1);
    if (newStreak > api.progress.bestParseStreak) {
      api.update((p) => ({ ...p, bestParseStreak: Math.max(p.bestParseStreak, newStreak) }));
    }
    setFlash({ ok, text: `${item.f.form} = "${item.f.gloss}" (${answerText(item)})` });
    setSel({});
    setItem(randomItem(mode));
  };

  const row = <T extends string>(label: string, key: keyof typeof sel, values: T[]) => (
    <div className="parse-row">
      <span className="parse-label">{label}</span>
      <div className="chips">
        {values.map((v) => (
          <button key={v} className={`chip ${sel[key] === v ? 'on' : ''}`} onClick={() => choose({ [key]: v })}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Back />
      <h2>Parse It!</h2>
      <p className="muted">
        Greek shows a word's job in the sentence through its ending. "Parsing" means identifying those endings. How many can you get in {SECONDS} seconds?
      </p>

      {!playing ? (
        <>
          <div className="seg">
            <button className={mode === 'noun' ? 'on' : ''} onClick={() => setMode('noun')}>Nouns</button>
            <button className={mode === 'verb' ? 'on' : ''} onClick={() => setMode('verb')}>Verbs</button>
          </div>
          {timeLeft <= 0 && (
            <div className="card center">
              <h3>Time!</h3>
              <p className="score">{score} correct</p>
              <p>+{score * 3} XP · Best streak ever: {api.progress.bestParseStreak}</p>
            </div>
          )}
          {mode === 'noun' ? (
            <div className="card">
              <h3>The four cases</h3>
              <ul className="hint-list">
                {(Object.keys(CASE_HINTS) as Case[]).map((c) => (
                  <li key={c}><strong>{c}</strong> — {CASE_HINTS[c]}</li>
                ))}
              </ul>
              <p className="muted">
                Tip: the article (ὁ, τοῦ, τῷ, τόν…) is your best friend — it usually tells you the case, number, and gender at a glance.
              </p>
            </div>
          ) : (
            <div className="card">
              <h3>Present active endings</h3>
              <table className="paradigm">
                <tbody>
                  {VERB_ENDING_TABLE.map((e) => (
                    <tr key={e.ending}>
                      <td className="greek">λύ<strong>{e.ending}</strong></td>
                      <td>{e.person} {e.number}</td>
                      <td>{e.en}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="muted">Greek verbs don't need a pronoun — the ending tells you who is acting.</p>
            </div>
          )}
          <button className="primary block" onClick={start}>Start ▶</button>
        </>
      ) : (
        <div className="card center">
          <div className="timer-row">
            <span>⏱ {timeLeft}s</span>
            <span>✓ {score}</span>
            <span>🔥 {streak}</span>
          </div>
          <div className="timer"><span style={{ width: `${(timeLeft / SECONDS) * 100}%` }} /></div>
          <div className="greek huge">{item.f.form}</div>
          {item.kind === 'noun' ? (
            <>
              {row('Case', 'case', ['nominative', 'genitive', 'dative', 'accusative'] as Case[])}
              {row('Number', 'number', ['singular', 'plural'] as GNumber[])}
              {row('Gender', 'gender', ['masculine', 'feminine', 'neuter'] as Gender[])}
            </>
          ) : (
            <>
              {row('Person', 'person', ['1st', '2nd', '3rd'] as Person[])}
              {row('Number', 'number', ['singular', 'plural'] as GNumber[])}
            </>
          )}
          {flash && <p className={`feedback ${flash.ok ? 'good' : 'bad'}`}>{flash.ok ? '✓' : '✗'} {flash.text}</p>}
        </div>
      )}
    </div>
  );
}
