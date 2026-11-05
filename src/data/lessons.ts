import type { QuizQuestion } from './wordStudies';

export interface LessonExample {
  greek: string;
  english: string;
  note?: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  summary: string;
  sections: { heading: string; body: string; examples?: LessonExample[] }[];
  quiz: QuizQuestion[];
}

export const LESSONS: Lesson[] = [
  {
    id: 'reading',
    title: 'Reading Greek text',
    icon: '👁️',
    summary: 'Breathings, accents and punctuation — the little marks that make Greek look scary.',
    sections: [
      {
        heading: 'Breathing marks',
        body: 'Every word beginning with a vowel (or ρ) has a breathing mark. The rough breathing ( ῾ ) adds an "h" sound; the smooth breathing ( ᾿ ) adds nothing. That is why we say "hamartia" and "hagios" but "agapē".',
        examples: [
          { greek: 'ἁμαρτία', english: 'hamartia — sin', note: 'Rough breathing → "h".' },
          { greek: 'ἀγάπη', english: 'agapē — love', note: 'Smooth breathing → no "h".' },
        ],
      },
      {
        heading: 'Accents',
        body: 'Greek has three accents: acute ( ´ ), grave ( ` ) and circumflex ( ῀ ). For reading, just stress the syllable that has the accent. Accents were added to manuscripts centuries later, but they occasionally help tell words apart.',
        examples: [
          { greek: 'ἡ / ἤ', english: '"the" (feminine) vs. "or"', note: 'Only the accent and breathing tell these apart.' },
        ],
      },
      {
        heading: 'Iota subscript',
        body: 'A tiny ι written under a vowel (ᾳ, ῃ, ῳ) is called an iota subscript. It is not pronounced, but it is very important for grammar — it often marks the dative case.',
        examples: [{ greek: 'τῷ λόγῳ', english: 'to the word', note: 'Dative singular.' }],
      },
      {
        heading: 'Punctuation',
        body: 'A Greek period and comma look like English ones. But a raised dot ( · ) is like a semicolon or colon, and ( ; ) is a question mark!',
        examples: [{ greek: 'τίς ἐστιν;', english: 'Who is it?' }],
      },
    ],
    quiz: [
      { prompt: 'What does a rough breathing ( ῾ ) add to a word?', options: ['An "h" sound', 'A "y" sound', 'Nothing', 'A pause'], answer: 0, explain: 'ἁ = "ha".' },
      { prompt: 'What does ( ; ) mean in Greek?', options: ['Semicolon', 'Question mark', 'Exclamation mark', 'End of a book'], answer: 1, explain: 'The Greek question mark looks like an English semicolon.' },
      { prompt: 'The small iota under a vowel (ῳ) is called…', options: ['A diaeresis', 'An iota subscript', 'A breathing', 'A circumflex'], answer: 1, explain: 'It is silent but grammatically important.' },
    ],
  },
  {
    id: 'article',
    title: 'The article: "the"',
    icon: '🔑',
    summary: 'The most common word in the New Testament, and your best parsing friend.',
    sections: [
      {
        heading: 'One word, many forms',
        body: 'Greek has a word for "the" (ὁ, ἡ, τό) that changes to match its noun in case, number and gender. Because it is so regular, spotting the article tells you most of what you need to know about the noun.',
        examples: [
          { greek: 'ὁ λόγος', english: 'the word (subject)' },
          { greek: 'τοῦ λόγου', english: 'of the word' },
          { greek: 'τὸν λόγον', english: 'the word (object)' },
        ],
      },
      {
        heading: 'No word for "a"',
        body: 'Greek has no indefinite article. When there is no ὁ, English translators decide whether to add "a" — or nothing at all. Sometimes a missing article stresses quality: "what kind of thing" rather than "which thing".',
        examples: [{ greek: 'θεὸς ἦν ὁ λόγος', english: 'the Word was God (John 1:1)', note: 'θεός without the article describes what the Word was.' }],
      },
      {
        heading: 'The article can make anything a noun',
        body: 'Put ὁ in front of an adjective, participle, or even a phrase, and it becomes "the one who…". This is everywhere in the New Testament.',
        examples: [
          { greek: 'ὁ πιστεύων', english: 'the one who believes (John 3:16)' },
          { greek: 'οἱ πτωχοί', english: 'the poor (Matthew 5:3)' },
        ],
      },
    ],
    quiz: [
      { prompt: 'How do you say "a" (indefinite article) in Greek?', options: ['ὁ', 'τις', 'There is no indefinite article', 'εἷς always'], answer: 2, explain: 'Greek has no "a"; translators supply it when needed.' },
      { prompt: 'ὁ πιστεύων means…', options: ['The faith', 'The one who believes', 'He believed', 'Believe!'], answer: 1, explain: 'Article + participle = "the one who…".' },
      { prompt: 'The article agrees with its noun in…', options: ['Case, number and gender', 'Tense', 'Person', 'Mood'], answer: 0, explain: 'Like an adjective, it matches the noun\'s case, number and gender.' },
    ],
  },
  {
    id: 'cases',
    title: 'The four cases',
    icon: '🧩',
    summary: 'Why Greek word order can be so free: endings show each word\'s job.',
    sections: [
      {
        heading: 'Endings, not order',
        body: 'In English, "God loved the world" and "the world loved God" mean different things because of word order. In Greek, endings (cases) mark who does what, so words can move around for emphasis.',
      },
      {
        heading: 'Nominative — the subject',
        body: 'The one doing the action, or what something "is".',
        examples: [{ greek: 'ἠγάπησεν ὁ θεός', english: 'God loved', note: 'ὁ θεός is nominative: God does the loving.' }],
      },
      {
        heading: 'Genitive — "of"',
        body: 'Shows possession, source or description. Often translated "of".',
        examples: [{ greek: 'τὸ φῶς τοῦ κόσμου', english: 'the light of the world' }],
      },
      {
        heading: 'Dative — "to, for, by, in"',
        body: 'The indirect object, or the means or location of something.',
        examples: [{ greek: 'τῇ χάριτι', english: 'by grace (Ephesians 2:8)' }],
      },
      {
        heading: 'Accusative — the direct object',
        body: 'The thing that receives the action.',
        examples: [{ greek: 'ἠγάπησεν ὁ θεὸς τὸν κόσμον', english: 'God loved the world', note: 'τὸν κόσμον is accusative: the world is loved.' }],
      },
    ],
    quiz: [
      { prompt: 'In τὸ φῶς τοῦ κόσμου, which case is τοῦ κόσμου?', options: ['Nominative', 'Genitive', 'Dative', 'Accusative'], answer: 1, explain: 'Genitive — "of the world".' },
      { prompt: 'Which case marks the direct object?', options: ['Nominative', 'Genitive', 'Dative', 'Accusative'], answer: 3, explain: 'The accusative receives the action.' },
      { prompt: 'Why can Greek word order be flexible?', options: ['Because endings show each word\'s role', 'Because it has no verbs', 'Because it is poetry', 'It cannot'], answer: 0, explain: 'Case endings carry the grammar, freeing word order for emphasis.' },
    ],
  },
  {
    id: 'verbs',
    title: 'Verbs: who is acting?',
    icon: '🏃',
    summary: 'A Greek verb packs the subject into its ending.',
    sections: [
      {
        heading: 'Person and number',
        body: 'The ending of a Greek verb tells you who is doing the action: I, you, he/she/it, we, you (plural), or they. So πιστεύω is a complete sentence: "I believe."',
        examples: [
          { greek: 'πιστεύω', english: 'I believe' },
          { greek: 'πιστεύεις', english: 'you believe' },
          { greek: 'πιστεύομεν', english: 'we believe' },
        ],
      },
      {
        heading: 'Emphatic pronouns',
        body: 'Since the ending already shows the subject, adding a pronoun like ἐγώ or σύ adds emphasis or contrast.',
        examples: [{ greek: 'ἐγώ εἰμι ἡ ὁδός', english: 'I (myself) am the way' }],
      },
      {
        heading: 'The augment',
        body: 'Past-time verbs in the indicative usually start with an extra ε- called the augment. Spotting it is a quick clue that the action is in the past.',
        examples: [
          { greek: 'ἐδάκρυσεν', english: 'he wept (John 11:35)' },
          { greek: 'ἔδωκεν', english: 'he gave (John 3:16)' },
        ],
      },
    ],
    quiz: [
      { prompt: 'πιστεύομεν means…', options: ['I believe', 'You believe', 'We believe', 'They believe'], answer: 2, explain: '-ομεν = "we".' },
      { prompt: 'What does an initial ε- (augment) usually signal?', options: ['A question', 'Past time', 'A command', 'A plural'], answer: 1, explain: 'The augment marks past-time indicative verbs.' },
      { prompt: 'Why is ἐγώ in ἐγώ εἰμι emphatic?', options: ['εἰμι already means "I am"', 'It is plural', 'It is a title', 'It is past tense'], answer: 0, explain: 'The pronoun is not needed for meaning, so it adds emphasis.' },
    ],
  },
  {
    id: 'aspect',
    title: 'Tense and aspect',
    icon: '🎥',
    summary: 'Greek "tenses" are more about how you view an action than when it happened.',
    sections: [
      {
        heading: 'Aspect: the camera angle',
        body: 'Think of a camera. The present and imperfect are like a video from inside the action — ongoing, in progress. The aorist is like a snapshot from outside — the action as a whole. The perfect shows a completed action whose results still stand.',
      },
      {
        heading: 'Present: ongoing',
        body: 'Often describes continuing or habitual action.',
        examples: [{ greek: 'ὁ πιστεύων', english: 'the one who (keeps on) believing (John 3:16)' }],
      },
      {
        heading: 'Aorist: the whole event',
        body: 'Presents the action simply, as a whole. It is the "default" storytelling tense.',
        examples: [{ greek: 'ἠγάπησεν', english: 'he loved (John 3:16)' }],
      },
      {
        heading: 'Perfect: done, and still true',
        body: 'A completed action with present, lasting results.',
        examples: [
          { greek: 'τετέλεσται', english: 'it is finished (John 19:30)' },
          { greek: 'γέγραπται', english: 'it stands written (Matthew 4:4)' },
        ],
      },
      {
        heading: 'A word of caution',
        body: 'Aspect is a real and helpful feature, but don\'t over-read it. An aorist doesn\'t mean "once for all", and a present doesn\'t always mean "continually". Context always decides.',
      },
    ],
    quiz: [
      { prompt: 'Which tense presents a completed action with lasting results?', options: ['Present', 'Aorist', 'Perfect', 'Future'], answer: 2, explain: 'The perfect — like τετέλεσται.' },
      { prompt: 'The aorist is best pictured as…', options: ['A snapshot of the whole action', 'A video in progress', 'A future plan', 'A command'], answer: 0, explain: 'It views the action as a whole, from outside.' },
      { prompt: 'Does an aorist always mean "once for all"?', options: ['Yes, always', 'No — context decides', 'Only in Paul', 'Only with ὁ'], answer: 1, explain: 'This is a common over-reading. Context matters most.' },
    ],
  },
  {
    id: 'voice',
    title: 'Active, middle and passive',
    icon: '🔄',
    summary: 'Who does the action — and the surprising "divine passive".',
    sections: [
      {
        heading: 'Three voices',
        body: 'Active: the subject acts ("I wash"). Passive: the subject receives the action ("I am washed"). Middle: the subject acts with special involvement, often for itself ("I wash myself" / "I get washed").',
      },
      {
        heading: 'Deponent verbs',
        body: 'Some verbs look middle or passive but have active meaning — like ἔρχομαι, "I come". Just learn them as they are.',
        examples: [{ greek: 'οὐδεὶς ἔρχεται πρὸς τὸν πατέρα', english: 'no one comes to the Father (John 14:6)' }],
      },
      {
        heading: 'The "divine passive"',
        body: 'Jewish writers often used the passive to describe God\'s action without naming him, out of reverence. When you see a passive with no agent, ask: is God the one acting?',
        examples: [
          { greek: 'μακάριοι οἱ πενθοῦντες, ὅτι αὐτοὶ παρακληθήσονται', english: 'Blessed are those who mourn, for they will be comforted (Matthew 5:4)', note: 'Comforted by whom? By God.' },
          { greek: 'ἠγέρθη', english: 'he has been raised (Mark 16:6)', note: 'Raised by God the Father.' },
        ],
      },
    ],
    quiz: [
      { prompt: 'In the passive voice, the subject…', options: ['Does the action', 'Receives the action', 'Gives a command', 'Asks a question'], answer: 1, explain: 'Passive: the subject is acted upon.' },
      { prompt: 'A "deponent" verb like ἔρχομαι…', options: ['Looks middle/passive but means something active', 'Is always plural', 'Is always past tense', 'Has no ending'], answer: 0, explain: 'ἔρχομαι means "I come", despite its middle form.' },
      { prompt: 'The "divine passive" implies who is acting?', options: ['The reader', 'God', 'An angel', 'No one'], answer: 1, explain: 'A reverent way of describing God\'s action.' },
    ],
  },
  {
    id: 'participles',
    title: 'Participles: verbal adjectives',
    icon: '🌉',
    summary: 'The "-ing" words that make Greek so rich and compact.',
    sections: [
      {
        heading: 'Half verb, half adjective',
        body: 'A participle has tense and voice like a verb, but case, number and gender like an adjective. English "-ing" and "-ed" forms are participles too ("the running water", "having finished").',
      },
      {
        heading: 'As a noun (with the article)',
        body: 'With ὁ, a participle becomes "the one who…". This is one of the most common constructions in John.',
        examples: [
          { greek: 'ὁ μὴ ἀγαπῶν', english: 'the one who does not love (1 John 4:8)' },
          { greek: 'ὁ πιστεύων εἰς αὐτόν', english: 'the one who believes in him (John 3:16)' },
        ],
      },
      {
        heading: 'Describing an action',
        body: 'Without the article, a participle often describes circumstances: when, after, because, while.',
        examples: [{ greek: 'κλίνας τὴν κεφαλὴν παρέδωκεν τὸ πνεῦμα', english: 'having bowed his head, he gave up his spirit (John 19:30)' }],
      },
    ],
    quiz: [
      { prompt: 'A participle combines features of…', options: ['A verb and an adjective', 'A noun and a preposition', 'Two verbs', 'An article and a pronoun'], answer: 0, explain: 'It is a "verbal adjective".' },
      { prompt: 'ὁ ἀγαπῶν means…', options: ['Love', 'The one who loves', 'He loved', 'Beloved'], answer: 1, explain: 'Article + participle = "the one who…".' },
      { prompt: 'In John 19:30, κλίνας is best translated…', options: ['He will bow', 'Having bowed', 'Bow!', 'A bow'], answer: 1, explain: 'An aorist participle describing the action before the main verb.' },
    ],
  },
  {
    id: 'moods',
    title: 'Moods: fact, possibility, command',
    icon: '🎭',
    summary: 'Indicative, subjunctive and imperative — how a verb relates to reality.',
    sections: [
      {
        heading: 'Indicative: what is',
        body: 'States facts or asks factual questions. Most verbs in narratives are indicative.',
        examples: [{ greek: 'ὁ θεὸς ἀγάπη ἐστίν', english: 'God is love' }],
      },
      {
        heading: 'Subjunctive: what may be',
        body: 'Used for purpose, possibility, and conditions — often after ἵνα ("so that") or ἐάν ("if"). Its endings usually lengthen the vowel (ο→ω, ε→η).',
        examples: [{ greek: 'ἵνα πᾶς ὁ πιστεύων… μὴ ἀπόληται ἀλλ᾽ ἔχῃ ζωήν', english: 'so that everyone who believes… may not perish but may have life' }],
      },
      {
        heading: 'Imperative: commands',
        body: 'Gives commands and requests — including prayer, as in the Lord\'s Prayer.',
        examples: [
          { greek: 'ἀκολούθει μοι', english: 'Follow me!' },
          { greek: 'ἐλθέτω ἡ βασιλεία σου', english: 'Let your kingdom come (Matthew 6:10)' },
        ],
      },
    ],
    quiz: [
      { prompt: 'Which mood usually follows ἵνα ("so that")?', options: ['Indicative', 'Subjunctive', 'Imperative', 'Infinitive'], answer: 1, explain: 'ἵνα + subjunctive expresses purpose.' },
      { prompt: 'ἀκολούθει μοι is in which mood?', options: ['Indicative', 'Subjunctive', 'Imperative', 'Participle'], answer: 2, explain: 'A command: "Follow me!"' },
      { prompt: 'Which mood states facts?', options: ['Indicative', 'Subjunctive', 'Imperative', 'None'], answer: 0, explain: 'The indicative is the mood of reality.' },
    ],
  },
];
