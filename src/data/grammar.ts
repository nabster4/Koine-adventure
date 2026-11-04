export type Case = 'nominative' | 'genitive' | 'dative' | 'accusative';
export type GNumber = 'singular' | 'plural';
export type Gender = 'masculine' | 'feminine' | 'neuter';
export type Person = '1st' | '2nd' | '3rd';

export interface NounForm {
  form: string;
  gloss: string;
  parses: { case: Case; number: GNumber; gender: Gender }[];
}

export interface VerbForm {
  form: string;
  gloss: string;
  person: Person;
  number: GNumber;
}

export const CASE_HINTS: Record<Case, string> = {
  nominative: 'Subject — who does the action',
  genitive: 'Possession — "of"',
  dative: 'Indirect object — "to / for / in"',
  accusative: 'Direct object — receives the action',
};

interface Paradigm {
  gender: Gender;
  gloss: [string, string];
  sg: [string, string, string, string];
  pl: [string, string, string, string];
}

const ARTICLE: Record<Gender, { sg: string[]; pl: string[] }> = {
  masculine: { sg: ['ὁ', 'τοῦ', 'τῷ', 'τὸν'], pl: ['οἱ', 'τῶν', 'τοῖς', 'τοὺς'] },
  feminine: { sg: ['ἡ', 'τῆς', 'τῇ', 'τὴν'], pl: ['αἱ', 'τῶν', 'ταῖς', 'τὰς'] },
  neuter: { sg: ['τὸ', 'τοῦ', 'τῷ', 'τὸ'], pl: ['τὰ', 'τῶν', 'τοῖς', 'τὰ'] },
};

const PARADIGMS: Paradigm[] = [
  { gender: 'masculine', gloss: ['word', 'words'], sg: ['λόγος', 'λόγου', 'λόγῳ', 'λόγον'], pl: ['λόγοι', 'λόγων', 'λόγοις', 'λόγους'] },
  { gender: 'masculine', gloss: ['God', 'gods'], sg: ['θεός', 'θεοῦ', 'θεῷ', 'θεόν'], pl: ['θεοί', 'θεῶν', 'θεοῖς', 'θεούς'] },
  { gender: 'feminine', gloss: ['beginning', 'beginnings'], sg: ['ἀρχή', 'ἀρχῆς', 'ἀρχῇ', 'ἀρχήν'], pl: ['ἀρχαί', 'ἀρχῶν', 'ἀρχαῖς', 'ἀρχάς'] },
  { gender: 'feminine', gloss: ['heart', 'hearts'], sg: ['καρδία', 'καρδίας', 'καρδίᾳ', 'καρδίαν'], pl: ['καρδίαι', 'καρδιῶν', 'καρδίαις', 'καρδίας'] },
  { gender: 'neuter', gloss: ['work', 'works'], sg: ['ἔργον', 'ἔργου', 'ἔργῳ', 'ἔργον'], pl: ['ἔργα', 'ἔργων', 'ἔργοις', 'ἔργα'] },
  { gender: 'neuter', gloss: ['child', 'children'], sg: ['τέκνον', 'τέκνου', 'τέκνῳ', 'τέκνον'], pl: ['τέκνα', 'τέκνων', 'τέκνοις', 'τέκνα'] },
];

const CASES: Case[] = ['nominative', 'genitive', 'dative', 'accusative'];
const GLOSS_PREFIX: Record<Case, string> = { nominative: 'the', genitive: 'of the', dative: 'to the', accusative: 'the' };

/** Every article + noun form, with all valid parses merged (e.g. τὰ ἔργα is nominative OR accusative). */
export function buildNounForms(): NounForm[] {
  const byForm = new Map<string, NounForm>();
  for (const p of PARADIGMS) {
    (['singular', 'plural'] as GNumber[]).forEach((number) => {
      const nouns = number === 'singular' ? p.sg : p.pl;
      const arts = number === 'singular' ? ARTICLE[p.gender].sg : ARTICLE[p.gender].pl;
      CASES.forEach((c, i) => {
        // Articles are written with a grave accent, as they appear before a noun.
        const form = `${arts[i]} ${nouns[i]}`;
        const glossWord = number === 'singular' ? p.gloss[0] : p.gloss[1];
        const existing = byForm.get(form);
        const parse = { case: c, number, gender: p.gender };
        if (existing) {
          existing.parses.push(parse);
        } else {
          byForm.set(form, { form, gloss: `${GLOSS_PREFIX[c]} ${glossWord}`, parses: [parse] });
        }
      });
    });
  }
  return [...byForm.values()];
}

export const NOUN_FORMS = buildNounForms();

// Present active indicative of λύω ("I loose, release") and πιστεύω ("I believe").
const VERB_ENDINGS: { ending: string; person: Person; number: GNumber; en: string; enVerbS: boolean }[] = [
  { ending: 'ω', person: '1st', number: 'singular', en: 'I', enVerbS: false },
  { ending: 'εις', person: '2nd', number: 'singular', en: 'you', enVerbS: false },
  { ending: 'ει', person: '3rd', number: 'singular', en: 'he/she/it', enVerbS: true },
  { ending: 'ομεν', person: '1st', number: 'plural', en: 'we', enVerbS: false },
  { ending: 'ετε', person: '2nd', number: 'plural', en: 'you (all)', enVerbS: false },
  { ending: 'ουσι(ν)', person: '3rd', number: 'plural', en: 'they', enVerbS: false },
];

const VERB_STEMS = [
  { stem: 'λύ', en: 'release', en3: 'releases' },
  { stem: 'πιστεύ', en: 'believe', en3: 'believes' },
  { stem: 'ἀκού', en: 'hear', en3: 'hears' },
  { stem: 'γινώσκ', en: 'know', en3: 'knows' },
];

export const VERB_FORMS: VerbForm[] = VERB_STEMS.flatMap((v) =>
  VERB_ENDINGS.map((e) => ({
    form: v.stem + e.ending,
    gloss: `${e.en} ${e.enVerbS ? v.en3 : v.en}`,
    person: e.person,
    number: e.number,
  })),
);

export const VERB_ENDING_TABLE = VERB_ENDINGS;
