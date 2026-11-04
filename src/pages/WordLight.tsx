import { useState } from 'react';
import { WORD_STUDIES } from '../data/wordStudies';
import { addUnique, type ProgressApi } from '../lib/progress';
import { Quiz } from '../components/Quiz';
import { Back } from '../components/Back';
import { Speak } from '../components/Speak';
import { respell } from '../lib/pronounce';

export function WordLight({ api }: { api: ProgressApi }) {
  const read = api.progress.studiesRead;
  return (
    <div>
      <Back to="discover" label="Discover" />
      <h2>Word Light</h2>
      <p className="muted">
        Some words carry a whole world inside them. These studies explore how a Greek word was used in everyday life, how
        Scripture uses it, and how it brings key passages into sharper focus.
      </p>
      <div className="study-grid">
        {WORD_STUDIES.map((s) => (
          <a key={s.id} className={`study-tile ${read.includes(s.id) ? 'done' : ''}`} href={`#/light/${s.id}`}>
            <span className="greek big">{s.greek}</span>
            <span className="study-gloss">{s.gloss}</span>
            <span className="study-tag">{s.tagline}</span>
            {read.includes(s.id) && <span className="check">✓</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

export function StudyDetail({ id, api }: { id: string; api: ProgressApi }) {
  const study = WORD_STUDIES.find((s) => s.id === id);
  const [answered, setAnswered] = useState(false);
  if (!study) return <p>Study not found. <Back to="light" /></p>;

  const idx = WORD_STUDIES.indexOf(study);
  const next = WORD_STUDIES[(idx + 1) % WORD_STUDIES.length];

  const onAnswer = (correct: boolean) => {
    setAnswered(true);
    api.update((p) => ({
      ...p,
      xp: p.xp + (p.studiesRead.includes(study.id) ? 2 : correct ? 30 : 15),
      studiesRead: addUnique(p.studiesRead, study.id),
      quizzesPassed: correct ? addUnique(p.quizzesPassed, `study:${study.id}`) : p.quizzesPassed,
    }));
  };

  return (
    <article className="study" key={study.id}>
      <Back to="light" label="Word Light" />
      <header className="study-head">
        <div className="greek huge">{study.greek} <Speak text={study.greek.replace(' / ', ' ')} /></div>
        <p className="translit">{study.translit} — <em>{study.gloss}</em></p>
        <p className="muted small">Say it: {respell(study.greek.replace(' / ', ' '))}</p>
        <p className="tagline">{study.tagline}</p>
      </header>

      <section className="card">
        <h3>🏛️ In the ancient world</h3>
        <p>{study.world}</p>
      </section>

      <section className="card">
        <h3>📖 In Scripture</h3>
        <p>{study.scripture}</p>
      </section>

      <section className="card">
        <h3>💡 Passages it lights up</h3>
        <ul className="passages">
          {study.passages.map((p) => (
            <li key={p.ref}>
              <strong>{p.ref}</strong>
              {p.greek && <span className="greek"> {p.greek} <Speak text={p.greek} /></span>}
              <p>{p.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="card reflect">
        <h3>🕯️ Reflect</h3>
        <p>{study.reflect}</p>
      </section>

      <section className="card">
        <h3>Check your understanding</h3>
        <Quiz question={study.quiz} onAnswer={onAnswer} />
      </section>

      {answered && (
        <a className="primary block" href={`#/light/${next.id}`}>
          Next study: <span className="greek">{next.greek}</span> →
        </a>
      )}
    </article>
  );
}
