import { useState } from 'react';
import { CULTURE } from '../data/culture';
import { addUnique, type ProgressApi } from '../lib/progress';
import { Quiz } from '../components/Quiz';
import { Back } from '../components/Back';

export function World({ api }: { api: ProgressApi }) {
  const read = api.progress.cultureRead;
  return (
    <div>
      <Back />
      <h2>The Ancient World</h2>
      <p className="muted">
        The New Testament was written in a real world of emperors, roads, letters, meals, and marketplaces. Step into that world
        to see the text more clearly.
      </p>
      <div className="list">
        {CULTURE.map((c) => (
          <a key={c.id} className="list-item" href={`#/world/${c.id}`}>
            <span className="li-icon">{c.icon}</span>
            <span className="li-main">
              <strong>{c.title}</strong>
              <span className="muted small">{c.era}</span>
            </span>
            {read.includes(c.id) && <span className="check">✓</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

export function CultureDetail({ id, api }: { id: string; api: ProgressApi }) {
  const card = CULTURE.find((c) => c.id === id);
  const [answered, setAnswered] = useState(false);
  if (!card) return <p>Not found. <Back to="world" /></p>;
  const next = CULTURE[(CULTURE.indexOf(card) + 1) % CULTURE.length];

  const onAnswer = (correct: boolean) => {
    setAnswered(true);
    api.update((p) => ({
      ...p,
      xp: p.xp + (p.cultureRead.includes(card.id) ? 2 : correct ? 25 : 12),
      cultureRead: addUnique(p.cultureRead, card.id),
      quizzesPassed: correct ? addUnique(p.quizzesPassed, `world:${card.id}`) : p.quizzesPassed,
    }));
  };

  return (
    <article className="study" key={card.id}>
      <Back to="world" label="Ancient World" />
      <header className="study-head">
        <div className="huge">{card.icon}</div>
        <h2>{card.title}</h2>
        <p className="muted">{card.era}</p>
      </header>
      <section className="card">
        <h3>📜 The story</h3>
        <p>{card.story}</p>
      </section>
      <section className="card light-card">
        <h3>💡 Light on the text</h3>
        <p>{card.lightOnText}</p>
        <p className="refs">Read: {card.refs.join(' · ')}</p>
      </section>
      <section className="card">
        <h3>Check your understanding</h3>
        <Quiz question={card.quiz} onAnswer={onAnswer} />
      </section>
      {answered && (
        <a className="primary block" href={`#/world/${next.id}`}>Next: {next.title} →</a>
      )}
    </article>
  );
}
