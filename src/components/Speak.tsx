import { useState } from 'react';
import { speakGreek, speechSupported } from '../lib/audio';

/** A small speaker button that reads Greek aloud. */
export function Speak({ text, label, className = '' }: { text: string; label?: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  if (!speechSupported()) return null;
  return (
    <button
      type="button"
      className={`speak ${playing ? 'playing' : ''} ${className}`}
      aria-label={label ?? `Listen to ${text}`}
      title="Listen"
      onClick={(e) => {
        e.stopPropagation();
        setPlaying(true);
        speakGreek(text, { onEnd: () => setPlaying(false) });
        setTimeout(() => setPlaying(false), 4000);
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
      </svg>
    </button>
  );
}
