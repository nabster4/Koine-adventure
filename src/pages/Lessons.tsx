import { useState } from 'react';
import { LESSONS } from '../data/lessons';
import { addUnique, type ProgressApi } from '../lib/progress';
import { Quiz } from '../components/Quiz';
import { Back } from '../components/Back';
import { Speak } from '../components/Speak';

export function Lessons({ api }: { api: ProgressApi }) {
  const done = api.progress.lessonsDone;
  return (
    <div>
      <Back to="learn" label="Learn" />
      <h2>Grammar Lessons</h2>
      <p className="muted">
        Short, friendly lessons on how Greek works, each illustrated with real New Testament verses. Pass the 3-question check
        to complete a lesson.
      </p>
      <ol className="list lesson-list">
        {LESSONS.map((l, i) => (
          <li key={l.id}>
            <a className="list-item" href={`#/lessons/${l.id}`}>
              <span className="li-icon" aria-hidden="true">{l.icon}</span>
              <span className="li-main">
                <strong>{i + 1}. {l.title}</strong>
                <span className="muted small">{l.summary}</span>
              </span>
              {done.includes(l.id) && <span className="check" aria-label="Completed">✓</span>}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function LessonDetail({ id, api }: { id: string; api: ProgressApi }) {
  const lesson = LESSONS.find((l) => l.id === id);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [attempt, setAttempt] = useState(0);
  if (!lesson) return <p>Lesson not found. <Back to="lessons" /></p>;

  const idx = LESSONS.indexOf(lesson);
  const next = LESSONS[idx + 1];
  const finished = answers.length === lesson.quiz.length;
  const score = answers.filter(Boolean).length;
  const passed = finished && score >= lesson.quiz.length - 1;

  const onAnswer = (correct: boolean) => {
    const all = [...answers, correct];
    setAnswers(all);
    if (all.length === lesson.quiz.length) {
      const ok = all.filter(Boolean).length >= lesson.quiz.length - 1;
      const first = !api.progress.lessonsDone.includes(lesson.id);
      api.update((p) => ({
        ...p,
        xp: p.xp + (ok ? (first ? 40 : 5) : 5),
        lessonsDone: ok ? addUnique(p.lessonsDone, lesson.id) : p.lessonsDone,
      }));
    }
  };

  return (
    <article className="study">
      <Back to="lessons" label="All lessons" />
      <header className="study-head">
        <div className="huge" aria-hidden="true">{lesson.icon}</div>
        <p className="eyebrow">Lesson {idx + 1} of {LESSONS.length}</p>
        <h2>{lesson.title}</h2>
        <p className="tagline">{lesson.summary}</p>
      </header>

      {lesson.sections.map((sec) => (
        <section key={sec.heading} className="card">
          <h3>{sec.heading}</h3>
          <p>{sec.body}</p>
          {sec.examples && (
            <ul className="examples">
              {sec.examples.map((ex) => (
                <li key={ex.greek}>
                  <span className="greek ex-greek">{ex.greek} <Speak text={ex.greek.split(' / ')[0]} /></span>
                  <span className="ex-en">{ex.english}</span>
                  {ex.note && <small className="muted">{ex.note}</small>}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="card">
        <h3>Check your understanding</h3>
        {lesson.quiz.slice(0, answers.length + 1).map((q, i) => (
          <Quiz key={`${attempt}-${i}`} question={q} onAnswer={onAnswer} />
        ))}
        {finished && (
          <p className={`feedback ${passed ? 'good' : 'bad'}`}>
            {passed ? `🎉 Lesson complete! ${score}/${lesson.quiz.length}` : `${score}/${lesson.quiz.length} — review the lesson and try again to complete it.`}
          </p>
        )}
        {finished && !passed && (
          <button className="secondary" onClick={() => { setAnswers([]); setAttempt((a) => a + 1); }}>Try again</button>
        )}
      </section>

      {passed && next && (
        <a className="primary block" href={`#/lessons/${next.id}`}>Next lesson: {next.title} →</a>
      )}
      {passed && !next && (
        <a className="primary block" href="#/verses">You've finished every lesson! Put it to work: read Scripture →</a>
      )}
    </article>
  );
}
