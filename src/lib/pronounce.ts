/**
 * Converts polytonic Greek into an English-friendly respelling using the Erasmian
 * pronunciation taught in most Biblical Greek classrooms, e.g. λόγος → "LOH-gohs".
 * The respelling is shown to learners and can be read aloud by any English voice.
 */

const VOWELS = 'αεηιουω';

/** Strips accents and breathings, keeping base letters; reports rough breathing and stress per vowel. */
function analyse(word: string) {
  const letters: { ch: string; rough: boolean; stress: boolean }[] = [];
  for (const raw of word.normalize('NFD')) {
    const code = raw.codePointAt(0)!;
    if (code >= 0x300 && code <= 0x36f) {
      const last = letters[letters.length - 1];
      if (!last) continue;
      if (code === 0x314) last.rough = true; // rough breathing
      if (code === 0x301 || code === 0x300 || code === 0x342) last.stress = true; // acute, grave, circumflex
      continue;
    }
    const ch = raw.toLowerCase() === 'ς' ? 'σ' : raw.toLowerCase();
    letters.push({ ch, rough: false, stress: false });
  }
  return letters;
}

const DIPHTHONGS: Record<string, string> = {
  αι: 'eye', ει: 'ay', οι: 'oy', ου: 'oo', υι: 'wee', αυ: 'ow', ευ: 'yoo', ηυ: 'ay-oo',
};
const SINGLE_VOWELS: Record<string, string> = {
  α: 'ah', ε: 'eh', η: 'ay', ι: 'ee', ο: 'oh', υ: 'oo', ω: 'oh',
};
const CONSONANTS: Record<string, string> = {
  β: 'b', γ: 'g', δ: 'd', ζ: 'dz', θ: 'th', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'ks',
  π: 'p', ρ: 'r', σ: 's', τ: 't', φ: 'f', χ: 'kh', ψ: 'ps',
};

interface Syllable { onset: string; nucleus: string; coda: string; stress: boolean }

export function respellWord(word: string): string {
  const L = analyse(word).filter((l) => VOWELS.includes(l.ch) || l.ch in CONSONANTS);
  if (!L.length) return '';
  const syllables: Syllable[] = [];
  let onset = '';
  let i = 0;
  while (i < L.length) {
    const l = L[i];
    if (VOWELS.includes(l.ch)) {
      const pair = l.ch + (L[i + 1]?.ch ?? '');
      // A diaeresis would split a diphthong, but it is rare enough to ignore here.
      const isDiph = pair in DIPHTHONGS && L[i + 1] && VOWELS.includes(L[i + 1].ch);
      const rough = l.rough || (isDiph && L[i + 1].rough);
      const stress = l.stress || (isDiph && L[i + 1].stress);
      const nucleus = isDiph ? DIPHTHONGS[pair] : SINGLE_VOWELS[l.ch];
      syllables.push({ onset: (rough ? 'h' : '') + onset, nucleus, coda: '', stress });
      onset = '';
      i += isDiph ? 2 : 1;
    } else {
      // γ before a velar (γ, κ, ξ, χ) is a nasal "n", as in ἄγγελος → "AHN-geh-lohs".
      let sound = CONSONANTS[l.ch];
      if (l.ch === 'γ' && 'γκξχ'.includes(L[i + 1]?.ch ?? '')) sound = 'n';
      if (l.ch === 'ρ' && l.rough) sound = 'rh';
      onset += sound;
      i++;
    }
  }
  // Trailing consonants belong to the last syllable.
  if (onset && syllables.length) syllables[syllables.length - 1].coda += onset;
  // Split consonant clusters: keep one consonant sound as the onset, move the rest to the previous coda.
  for (let s = 1; s < syllables.length; s++) {
    const on = syllables[s].onset;
    // A stop + λ/ρ cluster (e.g. "kl", "thr") stays together at the start of a syllable.
    const m = on.match(/^(.*?)(h?(?:(?:th|kh|[kgpbtdf])[lr]|th|kh|ps|ks|dz|rh|[a-z]))$/);
    if (m && m[1] && m[1] !== 'h') {
      syllables[s - 1].coda += m[1];
      syllables[s].onset = m[2];
    }
  }
  return syllables
    .map((s) => {
      const text = s.onset + s.nucleus + s.coda;
      return s.stress && syllables.length > 1 ? text.toUpperCase() : text;
    })
    .join('-');
}

export function respell(text: string): string {
  return text
    .split(/\s+/)
    .map((w) => respellWord(w))
    .filter(Boolean)
    .join(' ');
}
