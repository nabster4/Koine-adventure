export interface Letter {
  upper: string;
  lower: string;
  name: string;
  translit: string;
  sound: string;
  example: { greek: string; translit: string; meaning: string };
}

// Pronunciation follows the Erasmian convention used in most seminary classrooms.
export const ALPHABET: Letter[] = [
  { upper: 'Α', lower: 'α', name: 'alpha', translit: 'a', sound: 'a as in "father"', example: { greek: 'ἀγάπη', translit: 'agapē', meaning: 'love' } },
  { upper: 'Β', lower: 'β', name: 'beta', translit: 'b', sound: 'b as in "bible"', example: { greek: 'βίβλος', translit: 'biblos', meaning: 'book' } },
  { upper: 'Γ', lower: 'γ', name: 'gamma', translit: 'g', sound: 'g as in "go" (γγ = "ng")', example: { greek: 'γραφή', translit: 'graphē', meaning: 'scripture, writing' } },
  { upper: 'Δ', lower: 'δ', name: 'delta', translit: 'd', sound: 'd as in "door"', example: { greek: 'δόξα', translit: 'doxa', meaning: 'glory' } },
  { upper: 'Ε', lower: 'ε', name: 'epsilon', translit: 'e', sound: 'e as in "met"', example: { greek: 'ἐκκλησία', translit: 'ekklēsia', meaning: 'assembly, church' } },
  { upper: 'Ζ', lower: 'ζ', name: 'zeta', translit: 'z', sound: 'dz as in "adze"', example: { greek: 'ζωή', translit: 'zōē', meaning: 'life' } },
  { upper: 'Η', lower: 'η', name: 'eta', translit: 'ē', sound: 'e as in "they"', example: { greek: 'ἡμέρα', translit: 'hēmera', meaning: 'day' } },
  { upper: 'Θ', lower: 'θ', name: 'theta', translit: 'th', sound: 'th as in "think"', example: { greek: 'θεός', translit: 'theos', meaning: 'God' } },
  { upper: 'Ι', lower: 'ι', name: 'iota', translit: 'i', sound: 'i as in "machine" or "it"', example: { greek: 'Ἰησοῦς', translit: 'Iēsous', meaning: 'Jesus' } },
  { upper: 'Κ', lower: 'κ', name: 'kappa', translit: 'k', sound: 'k as in "kite"', example: { greek: 'κύριος', translit: 'kyrios', meaning: 'Lord' } },
  { upper: 'Λ', lower: 'λ', name: 'lambda', translit: 'l', sound: 'l as in "light"', example: { greek: 'λόγος', translit: 'logos', meaning: 'word' } },
  { upper: 'Μ', lower: 'μ', name: 'mu', translit: 'm', sound: 'm as in "mother"', example: { greek: 'μαθητής', translit: 'mathētēs', meaning: 'disciple' } },
  { upper: 'Ν', lower: 'ν', name: 'nu', translit: 'n', sound: 'n as in "new"', example: { greek: 'νόμος', translit: 'nomos', meaning: 'law' } },
  { upper: 'Ξ', lower: 'ξ', name: 'xi', translit: 'x', sound: 'x as in "axe"', example: { greek: 'ξένος', translit: 'xenos', meaning: 'stranger' } },
  { upper: 'Ο', lower: 'ο', name: 'omicron', translit: 'o', sound: 'o as in "often"', example: { greek: 'οὐρανός', translit: 'ouranos', meaning: 'heaven' } },
  { upper: 'Π', lower: 'π', name: 'pi', translit: 'p', sound: 'p as in "peace"', example: { greek: 'πίστις', translit: 'pistis', meaning: 'faith, trust' } },
  { upper: 'Ρ', lower: 'ρ', name: 'rho', translit: 'r', sound: 'r (lightly rolled)', example: { greek: 'ῥῆμα', translit: 'rhēma', meaning: 'word, saying' } },
  { upper: 'Σ', lower: 'σ / ς', name: 'sigma', translit: 's', sound: 's as in "sing" (ς at the end of a word)', example: { greek: 'σωτηρία', translit: 'sōtēria', meaning: 'salvation' } },
  { upper: 'Τ', lower: 'τ', name: 'tau', translit: 't', sound: 't as in "time"', example: { greek: 'τέκνον', translit: 'teknon', meaning: 'child' } },
  { upper: 'Υ', lower: 'υ', name: 'upsilon', translit: 'u / y', sound: 'u as in French "lune"', example: { greek: 'υἱός', translit: 'huios', meaning: 'son' } },
  { upper: 'Φ', lower: 'φ', name: 'phi', translit: 'ph', sound: 'f as in "phone"', example: { greek: 'φῶς', translit: 'phōs', meaning: 'light' } },
  { upper: 'Χ', lower: 'χ', name: 'chi', translit: 'ch', sound: 'ch as in Scottish "loch"', example: { greek: 'Χριστός', translit: 'Christos', meaning: 'Christ, Anointed One' } },
  { upper: 'Ψ', lower: 'ψ', name: 'psi', translit: 'ps', sound: 'ps as in "lips"', example: { greek: 'ψυχή', translit: 'psychē', meaning: 'soul, life' } },
  { upper: 'Ω', lower: 'ω', name: 'omega', translit: 'ō', sound: 'o as in "tone"', example: { greek: 'ὥρα', translit: 'hōra', meaning: 'hour' } },
];
