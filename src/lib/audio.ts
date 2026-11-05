import { getSettings } from './settings';
import { respell } from './pronounce';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;

export const speechSupported = () => !!synth;

function voices(): SpeechSynthesisVoice[] {
  return synth?.getVoices() ?? [];
}

export function greekVoice(): SpeechSynthesisVoice | undefined {
  return voices().find((v) => v.lang?.toLowerCase().startsWith('el'));
}

function englishVoice(): SpeechSynthesisVoice | undefined {
  const all = voices();
  return all.find((v) => v.lang === 'en-US' && /natural|google|samantha/i.test(v.name)) ?? all.find((v) => v.lang?.startsWith('en'));
}

/** Readies the voice list (some browsers load voices asynchronously). */
export function warmUpVoices(onReady?: () => void) {
  if (!synth) return;
  if (voices().length) onReady?.();
  synth.addEventListener?.('voiceschanged', () => onReady?.());
}

/** Clean Greek for speech: remove brackets, editorial marks and elision marks. */
const clean = (greek: string) => greek.replace(/[[\]()·,.;:᾽’/]/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Speaks Greek text. In "erasmian" mode the text is respelled and read by an English
 * voice (works everywhere); in "modern" mode a Greek voice reads it with modern pronunciation.
 */
export function speakGreek(greek: string, opts: { rate?: number; onEnd?: () => void } = {}) {
  if (!synth) return;
  const s = getSettings();
  synth.cancel();
  const gv = greekVoice();
  const useModern = s.voiceMode === 'modern' && gv;
  const u = new SpeechSynthesisUtterance(useModern ? clean(greek) : respell(clean(greek)).toLowerCase());
  if (useModern) {
    u.voice = gv!;
    u.lang = gv!.lang;
  } else {
    const ev = englishVoice();
    if (ev) u.voice = ev;
    u.lang = 'en-US';
  }
  u.rate = opts.rate ?? s.rate;
  if (opts.onEnd) u.onend = opts.onEnd;
  synth.speak(u);
}

export function speakEnglish(text: string) {
  if (!synth) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const ev = englishVoice();
  if (ev) u.voice = ev;
  u.rate = getSettings().rate + 0.1;
  synth.speak(u);
}

export function stopSpeaking() {
  synth?.cancel();
}

/* ---------- Sound effects (Web Audio, no files needed) ---------- */

let ctx: AudioContext | null = null;
function audioCtx() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.12) {
  const c = audioCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t = c.currentTime + start;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export type Sfx = 'correct' | 'wrong' | 'complete' | 'levelup' | 'tap';

export function sfx(kind: Sfx) {
  if (!getSettings().sound) return;
  try {
    switch (kind) {
      case 'correct': tone(660, 0, 0.12); tone(880, 0.08, 0.18); break;
      case 'wrong': tone(220, 0, 0.22, 'triangle', 0.1); break;
      case 'tap': tone(520, 0, 0.05, 'sine', 0.05); break;
      case 'complete': [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.25)); break;
      case 'levelup': [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.08, 0.3, 'triangle', 0.1)); break;
    }
  } catch {
    /* audio blocked — ignore */
  }
}
