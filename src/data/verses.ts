export interface VerseWord {
  text: string;
  lemma: string;
  gloss: string;
  parse: string;
  note?: string;
}

export interface Verse {
  id: string;
  ref: string;
  english: string;
  words: VerseWord[];
  /** The "aha" moment that the Greek brings to light. */
  light: string;
  level: 1 | 2 | 3;
}

const art = (text: string, parse: string): VerseWord => ({ text, lemma: 'ὁ', gloss: 'the', parse: `article, ${parse}` });

// Greek text follows the standard critical text (NA28 / SBLGNT). Brackets mark a textual variant.
export const VERSES: Verse[] = [
  {
    id: 'john11-35',
    ref: 'John 11:35',
    english: 'Jesus wept.',
    level: 1,
    words: [
      { text: 'ἐδάκρυσεν', lemma: 'δακρύω', gloss: 'wept, burst into tears', parse: 'verb, aorist active indicative, 3rd singular', note: 'The ε- at the front (augment) marks past time.' },
      art('ὁ', 'nominative singular masculine'),
      { text: 'Ἰησοῦς', lemma: 'Ἰησοῦς', gloss: 'Jesus', parse: 'noun, nominative singular masculine', note: 'Nominative = the subject. Greek word order is flexible: the verb comes first here.' },
    ],
    light:
      'Two verses earlier, Mary and the mourners are κλαίοντας — loudly lamenting, as was customary at ancient funerals. But Jesus ἐδάκρυσεν: he shed tears, quietly. This is the only place this verb appears in the New Testament. The Son of God, about to raise Lazarus, still weeps with those who weep.',
  },
  {
    id: 'john1-1',
    ref: 'John 1:1',
    english: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    level: 1,
    words: [
      { text: 'Ἐν', lemma: 'ἐν', gloss: 'in', parse: 'preposition (+ dative)' },
      { text: 'ἀρχῇ', lemma: 'ἀρχή', gloss: 'beginning', parse: 'noun, dative singular feminine', note: 'Ἐν ἀρχῇ are also the first words of Genesis in the Greek Old Testament.' },
      { text: 'ἦν', lemma: 'εἰμί', gloss: 'was', parse: 'verb, imperfect active indicative, 3rd singular', note: 'The imperfect pictures ongoing existence: when the beginning began, the Word already was.' },
      art('ὁ', 'nominative singular masculine'),
      { text: 'λόγος,', lemma: 'λόγος', gloss: 'Word', parse: 'noun, nominative singular masculine' },
      { text: 'καὶ', lemma: 'καί', gloss: 'and', parse: 'conjunction' },
      art('ὁ', 'nominative singular masculine'),
      { text: 'λόγος', lemma: 'λόγος', gloss: 'Word', parse: 'noun, nominative singular masculine' },
      { text: 'ἦν', lemma: 'εἰμί', gloss: 'was', parse: 'verb, imperfect active indicative, 3rd singular' },
      { text: 'πρὸς', lemma: 'πρός', gloss: 'with, toward', parse: 'preposition (+ accusative)', note: 'πρός often means "toward" — suggesting face-to-face relationship.' },
      art('τὸν', 'accusative singular masculine'),
      { text: 'θεόν,', lemma: 'θεός', gloss: 'God', parse: 'noun, accusative singular masculine' },
      { text: 'καὶ', lemma: 'καί', gloss: 'and', parse: 'conjunction' },
      { text: 'θεὸς', lemma: 'θεός', gloss: 'God', parse: 'noun, nominative singular masculine', note: 'Placed first for emphasis, without the article — this marks it as the predicate.' },
      { text: 'ἦν', lemma: 'εἰμί', gloss: 'was', parse: 'verb, imperfect active indicative, 3rd singular' },
      art('ὁ', 'nominative singular masculine'),
      { text: 'λόγος.', lemma: 'λόγος', gloss: 'Word', parse: 'noun, nominative singular masculine', note: 'Has the article, so "the Word" is the subject.' },
    ],
    light:
      'Look at the last clause: καὶ θεὸς ἦν ὁ λόγος. The article ὁ marks λόγος as the subject. θεός comes first for emphasis and has no article. If John had written ὁ θεὸς ἦν ὁ λόγος, it would mean the Word and "the God" (the Father) are identical. As written, it says the Word fully shares God\'s nature while remaining distinct from the Father: "what God was, the Word was."',
  },
  {
    id: '1john4-8',
    ref: '1 John 4:8',
    english: 'Whoever does not love does not know God, because God is love.',
    level: 2,
    words: [
      art('ὁ', 'nominative singular masculine'),
      { text: 'μὴ', lemma: 'μή', gloss: 'not', parse: 'negative particle', note: 'μή is the negative used with participles.' },
      { text: 'ἀγαπῶν', lemma: 'ἀγαπάω', gloss: 'loving', parse: 'verb, present active participle, nominative singular masculine', note: 'ὁ + participle = "the one who…". Present tense: someone whose life is characterized by not loving.' },
      { text: 'οὐκ', lemma: 'οὐ', gloss: 'not', parse: 'negative adverb' },
      { text: 'ἔγνω', lemma: 'γινώσκω', gloss: 'knew, has known', parse: 'verb, aorist active indicative, 3rd singular' },
      art('τὸν', 'accusative singular masculine'),
      { text: 'θεόν,', lemma: 'θεός', gloss: 'God', parse: 'noun, accusative singular masculine' },
      { text: 'ὅτι', lemma: 'ὅτι', gloss: 'because', parse: 'conjunction' },
      art('ὁ', 'nominative singular masculine'),
      { text: 'θεὸς', lemma: 'θεός', gloss: 'God', parse: 'noun, nominative singular masculine' },
      { text: 'ἀγάπη', lemma: 'ἀγάπη', gloss: 'love', parse: 'noun, nominative singular feminine', note: 'No article — love describes what God is; you can\'t reverse it to "love is God".' },
      { text: 'ἐστίν.', lemma: 'εἰμί', gloss: 'is', parse: 'verb, present active indicative, 3rd singular' },
    ],
    light:
      'Same grammar trick as John 1:1! ὁ θεός has the article, so God is the subject; ἀγάπη has none, so it\'s the description. The sentence says God is love — not that love is God. And because love is God\'s very nature, knowing God and loving people are inseparable.',
  },
  {
    id: 'mark1-1',
    ref: 'Mark 1:1',
    english: 'The beginning of the gospel of Jesus Christ, the Son of God.',
    level: 2,
    words: [
      { text: 'Ἀρχὴ', lemma: 'ἀρχή', gloss: 'beginning', parse: 'noun, nominative singular feminine' },
      art('τοῦ', 'genitive singular neuter'),
      { text: 'εὐαγγελίου', lemma: 'εὐαγγέλιον', gloss: 'good news, gospel', parse: 'noun, genitive singular neuter', note: 'Genitive = "of". The "good news" announcement of a new ruler.' },
      { text: 'Ἰησοῦ', lemma: 'Ἰησοῦς', gloss: 'Jesus', parse: 'noun, genitive singular masculine' },
      { text: 'Χριστοῦ', lemma: 'Χριστός', gloss: 'Christ, Messiah', parse: 'noun, genitive singular masculine' },
      { text: '[υἱοῦ', lemma: 'υἱός', gloss: 'son', parse: 'noun, genitive singular masculine', note: 'Brackets: a few early manuscripts lack "Son of God". Most include it.' },
      { text: 'θεοῦ].', lemma: 'θεός', gloss: 'God', parse: 'noun, genitive singular masculine' },
    ],
    light:
      'A Roman reader would know this language. Inscriptions hailed Augustus as a "son of god" (his adoptive father Julius Caesar had been deified) and his birthday as the "beginning of good news" for the world. Mark announces a different King and a different gospel. The center of Mark (8:29) and its climax (15:39) echo these titles: Peter confesses "You are the Christ", and a Roman centurion says "Truly this man was the Son of God."',
  },
  {
    id: 'john3-16',
    ref: 'John 3:16',
    english: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.',
    level: 3,
    words: [
      { text: 'Οὕτως', lemma: 'οὕτως', gloss: 'in this way, so', parse: 'adverb', note: 'Usually means "in this way" — describing HOW God loved (by giving), not just how much.' },
      { text: 'γὰρ', lemma: 'γάρ', gloss: 'for', parse: 'conjunction (postpositive)' },
      { text: 'ἠγάπησεν', lemma: 'ἀγαπάω', gloss: 'loved', parse: 'verb, aorist active indicative, 3rd singular' },
      art('ὁ', 'nominative singular masculine'),
      { text: 'θεὸς', lemma: 'θεός', gloss: 'God', parse: 'noun, nominative singular masculine' },
      art('τὸν', 'accusative singular masculine'),
      { text: 'κόσμον,', lemma: 'κόσμος', gloss: 'world', parse: 'noun, accusative singular masculine', note: 'In John, κόσμος is often the world in rebellion against God. God loves it anyway.' },
      { text: 'ὥστε', lemma: 'ὥστε', gloss: 'that, so that', parse: 'conjunction (result)' },
      art('τὸν', 'accusative singular masculine'),
      { text: 'υἱὸν', lemma: 'υἱός', gloss: 'son', parse: 'noun, accusative singular masculine' },
      art('τὸν', 'accusative singular masculine'),
      { text: 'μονογενῆ', lemma: 'μονογενής', gloss: 'one and only, unique', parse: 'adjective, accusative singular masculine', note: 'Traditionally "only begotten"; many scholars now prefer "one and only, unique" (compare Hebrews 11:17, of Isaac).' },
      { text: 'ἔδωκεν,', lemma: 'δίδωμι', gloss: 'he gave', parse: 'verb, aorist active indicative, 3rd singular' },
      { text: 'ἵνα', lemma: 'ἵνα', gloss: 'so that', parse: 'conjunction (purpose)' },
      { text: 'πᾶς', lemma: 'πᾶς', gloss: 'everyone', parse: 'adjective, nominative singular masculine' },
      art('ὁ', 'nominative singular masculine'),
      { text: 'πιστεύων', lemma: 'πιστεύω', gloss: 'believing', parse: 'verb, present active participle, nominative singular masculine', note: 'Present tense: "the one who keeps on believing".' },
      { text: 'εἰς', lemma: 'εἰς', gloss: 'into, in', parse: 'preposition (+ accusative)' },
      { text: 'αὐτὸν', lemma: 'αὐτός', gloss: 'him', parse: 'pronoun, accusative singular masculine' },
      { text: 'μὴ', lemma: 'μή', gloss: 'not', parse: 'negative particle' },
      { text: 'ἀπόληται', lemma: 'ἀπόλλυμι', gloss: 'perish', parse: 'verb, aorist middle subjunctive, 3rd singular' },
      { text: 'ἀλλ᾽', lemma: 'ἀλλά', gloss: 'but', parse: 'conjunction' },
      { text: 'ἔχῃ', lemma: 'ἔχω', gloss: 'have', parse: 'verb, present active subjunctive, 3rd singular' },
      { text: 'ζωὴν', lemma: 'ζωή', gloss: 'life', parse: 'noun, accusative singular feminine' },
      { text: 'αἰώνιον.', lemma: 'αἰώνιος', gloss: 'eternal', parse: 'adjective, accusative singular feminine', note: '"Life of the age" — the life of God\'s new age, which John says believers have now (John 5:24).' },
    ],
    light:
      'Οὕτως doesn\'t mainly mean "so much"; it means "in this way". The verse explains HOW God loved the world: he gave his Son. Notice also the present participle ὁ πιστεύων — faith in John is ongoing trust — and that ἔχῃ ("have") is present tense: eternal life begins now, not only after death.',
  },
  {
    id: 'john19-30',
    ref: 'John 19:30',
    english: 'He said, "It is finished," and he bowed his head and gave up his spirit.',
    level: 3,
    words: [
      { text: 'εἶπεν·', lemma: 'λέγω', gloss: 'he said', parse: 'verb, aorist active indicative, 3rd singular' },
      { text: 'τετέλεσται,', lemma: 'τελέω', gloss: 'it is finished', parse: 'verb, perfect passive indicative, 3rd singular', note: 'Perfect tense: completed, with lasting results.' },
      { text: 'καὶ', lemma: 'καί', gloss: 'and', parse: 'conjunction' },
      { text: 'κλίνας', lemma: 'κλίνω', gloss: 'having bowed', parse: 'verb, aorist active participle, nominative singular masculine', note: 'Jesus uses this verb in Matthew 8:20 / Luke 9:58: the Son of Man has nowhere to "lay" (κλίνῃ) his head.' },
      art('τὴν', 'accusative singular feminine'),
      { text: 'κεφαλὴν', lemma: 'κεφαλή', gloss: 'head', parse: 'noun, accusative singular feminine' },
      { text: 'παρέδωκεν', lemma: 'παραδίδωμι', gloss: 'he handed over', parse: 'verb, aorist active indicative, 3rd singular', note: 'Active voice: he gave up his spirit — no one took it from him (John 10:18).' },
      art('τὸ', 'accusative singular neuter'),
      { text: 'πνεῦμα.', lemma: 'πνεῦμα', gloss: 'spirit', parse: 'noun, accusative singular neuter' },
    ],
    light:
      'παραδίδωμι, "to hand over", echoes through John\'s Passion: Judas hands Jesus over (18:2), the leaders hand him to Pilate (18:30), Pilate hands him over to be crucified (19:16). Now, at the end, Jesus is the one who hands over his own spirit. Many readers notice the poignancy of κλίνας: the one who had nowhere to lay his head finally lays it down when his work is finished.',
  },
];
