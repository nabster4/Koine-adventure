/** Normalizes Greek or Latin text for forgiving search: no accents, breathings, case or final-sigma differences. */
export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ς/g, 'σ')
    .toLowerCase()
    .trim();
}

/** Lets learners type Greek with Latin letters, e.g. "logos" → "λογοσ". */
const LATIN_TO_GREEK: [string, string][] = [
  ['th', 'θ'], ['ch', 'χ'], ['ph', 'φ'], ['ps', 'ψ'], ['ks', 'ξ'], ['x', 'ξ'],
  ['a', 'α'], ['b', 'β'], ['g', 'γ'], ['d', 'δ'], ['e', 'ε'], ['z', 'ζ'], ['ē', 'η'], ['i', 'ι'], ['k', 'κ'], ['l', 'λ'],
  ['m', 'μ'], ['n', 'ν'], ['o', 'ο'], ['p', 'π'], ['r', 'ρ'], ['s', 'σ'], ['t', 'τ'], ['u', 'υ'], ['y', 'υ'], ['ō', 'ω'], ['h', ''],
];

export function latinToGreek(text: string): string {
  let out = '';
  let i = 0;
  const t = text.toLowerCase();
  while (i < t.length) {
    const pair = LATIN_TO_GREEK.find(([lat]) => t.startsWith(lat, i));
    if (pair) {
      out += pair[1];
      i += pair[0].length;
    } else {
      out += t[i];
      i++;
    }
  }
  return out;
}
