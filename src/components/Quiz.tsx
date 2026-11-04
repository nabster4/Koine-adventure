import { useMemo, useState } from 'react';
import type { QuizQuestion } from '../data/wordStudies';

interface Props {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
}

/** A single multiple-choice question with instant feedback and an explanation. */
export function Quiz({ question, onAnswer }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const order = useMemo(() => question.options.map((_, i) => i), [question]);

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    onAnswer(i === question.answer);
  };

  return (
    <div className="quiz">
      <p className="quiz-prompt">{question.prompt}</p>
      <div className="options">
        {order.map((i) => {
          let cls = 'option';
          if (picked !== null) {
            if (i === question.answer) cls += ' correct';
            else if (i === picked) cls += ' wrong';
          }
          return (
            <button key={i} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
              {question.options[i]}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className={`feedback ${picked === question.answer ? 'good' : 'bad'}`}>
          {picked === question.answer ? '✓ Correct! ' : '✗ Not quite. '}
          {question.explain}
        </p>
      )}
    </div>
  );
}
