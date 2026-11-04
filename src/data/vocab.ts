export interface VocabWord {
  id: string;
  greek: string;
  translit: string;
  gloss: string;
  /** Approximate number of New Testament occurrences. */
  freq: number;
  pos: 'noun' | 'verb' | 'adjective' | 'pronoun' | 'preposition' | 'conjunction' | 'article' | 'adverb' | 'particle';
  /** A short note on what this word brings to light in the text. */
  insight?: string;
  /** Links to a deep-dive in Word Light, if one exists. */
  studyId?: string;
}

// Frequencies are rounded counts for the Greek New Testament and vary slightly between editions.
export const VOCAB: VocabWord[] = [
  { id: 'ho', greek: 'ὁ, ἡ, τό', translit: 'ho, hē, to', gloss: 'the', freq: 19800, pos: 'article', insight: 'Greek has no word for "a". When the article is missing, translators must decide whether to supply "a" — which is why John 1:1c is debated so carefully.' },
  { id: 'kai', greek: 'καί', translit: 'kai', gloss: 'and, also, even', freq: 9100, pos: 'conjunction', insight: 'Mark strings stories together with καί again and again, giving his Gospel its breathless, fast-paced feel.' },
  { id: 'autos', greek: 'αὐτός', translit: 'autos', gloss: 'he, she, it; self, same', freq: 5600, pos: 'pronoun' },
  { id: 'de', greek: 'δέ', translit: 'de', gloss: 'but, and, now', freq: 2800, pos: 'conjunction', insight: 'δέ never stands first in its clause. It gently marks a new step in a story, often untranslated.' },
  { id: 'en', greek: 'ἐν', translit: 'en', gloss: 'in, on, among', freq: 2750, pos: 'preposition', insight: 'Paul\'s phrase ἐν Χριστῷ ("in Christ") appears dozens of times and describes the believer\'s new location and identity.' },
  { id: 'eimi', greek: 'εἰμί', translit: 'eimi', gloss: 'I am, exist', freq: 2460, pos: 'verb', insight: 'Jesus\' "I am" sayings in John (ἐγώ εἰμι) echo the divine name of Exodus 3:14 in the Greek Old Testament.' },
  { id: 'lego', greek: 'λέγω', translit: 'legō', gloss: 'I say, speak', freq: 2350, pos: 'verb' },
  { id: 'eis', greek: 'εἰς', translit: 'eis', gloss: 'into, to, for', freq: 1770, pos: 'preposition', insight: 'John often says people believe εἰς Jesus — literally "into" him — a picture of trust that moves toward a person.' },
  { id: 'ou', greek: 'οὐ, οὐκ, οὐχ', translit: 'ou', gloss: 'not', freq: 1620, pos: 'adverb' },
  { id: 'theos', greek: 'θεός', translit: 'theos', gloss: 'God, god', freq: 1317, pos: 'noun', insight: 'The same word was used for the gods of Olympus. The New Testament fills it with the meaning of Israel\'s one God.' },
  { id: 'hoti', greek: 'ὅτι', translit: 'hoti', gloss: 'that, because', freq: 1296, pos: 'conjunction' },
  { id: 'pas', greek: 'πᾶς', translit: 'pas', gloss: 'all, every', freq: 1240, pos: 'adjective' },
  { id: 'gar', greek: 'γάρ', translit: 'gar', gloss: 'for, because', freq: 1041, pos: 'conjunction', insight: 'Paul\'s arguments are held together by γάρ. Following each "for" is a great way to trace his logic in Romans.' },
  { id: 'iesous', greek: 'Ἰησοῦς', translit: 'Iēsous', gloss: 'Jesus, Joshua', freq: 917, pos: 'noun', insight: 'The Greek form of the Hebrew Yeshua/Joshua, "the LORD saves" — the reason given in Matthew 1:21.' },
  { id: 'ek', greek: 'ἐκ, ἐξ', translit: 'ek', gloss: 'from, out of', freq: 914, pos: 'preposition' },
  { id: 'kyrios', greek: 'κύριος', translit: 'kyrios', gloss: 'Lord, master, sir', freq: 717, pos: 'noun', studyId: 'kyrios', insight: 'Used in the Greek Old Testament to stand for God\'s personal name — and claimed by Roman emperors too.' },
  { id: 'echo', greek: 'ἔχω', translit: 'echō', gloss: 'I have, hold', freq: 708, pos: 'verb' },
  { id: 'ginomai', greek: 'γίνομαι', translit: 'ginomai', gloss: 'I become, happen, am', freq: 669, pos: 'verb', insight: 'John 1:14: "the Word became (ἐγένετο) flesh" — the eternal one stepping into history.' },
  { id: 'hina', greek: 'ἵνα', translit: 'hina', gloss: 'in order that, so that', freq: 663, pos: 'conjunction' },
  { id: 'erchomai', greek: 'ἔρχομαι', translit: 'erchomai', gloss: 'I come, go', freq: 634, pos: 'verb' },
  { id: 'poieo', greek: 'ποιέω', translit: 'poieō', gloss: 'I do, make', freq: 568, pos: 'verb', insight: 'Its noun ποίημα ("something made") appears in Ephesians 2:10: "we are his workmanship" — the root of our word "poem".' },
  { id: 'anthropos', greek: 'ἄνθρωπος', translit: 'anthrōpos', gloss: 'person, human being', freq: 550, pos: 'noun' },
  { id: 'christos', greek: 'Χριστός', translit: 'Christos', gloss: 'Christ, Anointed One, Messiah', freq: 529, pos: 'noun', insight: 'Not a surname but a title: the Greek translation of the Hebrew "Messiah", the anointed king.' },
  { id: 'horao', greek: 'ὁράω', translit: 'horaō', gloss: 'I see', freq: 454, pos: 'verb' },
  { id: 'akouo', greek: 'ἀκούω', translit: 'akouō', gloss: 'I hear, listen, obey', freq: 428, pos: 'verb', insight: 'In the biblical world, truly "hearing" meant obeying — like the Hebrew Shema, "Hear, O Israel".' },
  { id: 'didomi', greek: 'δίδωμι', translit: 'didōmi', gloss: 'I give', freq: 415, pos: 'verb' },
  { id: 'pater', greek: 'πατήρ', translit: 'patēr', gloss: 'father', freq: 413, pos: 'noun' },
  { id: 'hemera', greek: 'ἡμέρα', translit: 'hēmera', gloss: 'day', freq: 389, pos: 'noun' },
  { id: 'pneuma', greek: 'πνεῦμα', translit: 'pneuma', gloss: 'spirit, wind, breath', freq: 379, pos: 'noun', insight: 'Jesus plays on its double meaning in John 3:8: the πνεῦμα (wind / Spirit) blows where it wills.' },
  { id: 'huios', greek: 'υἱός', translit: 'huios', gloss: 'son', freq: 377, pos: 'noun' },
  { id: 'adelphos', greek: 'ἀδελφός', translit: 'adelphos', gloss: 'brother, fellow believer', freq: 343, pos: 'noun', insight: 'Calling unrelated people "brothers and sisters" created a new family across class and ethnic lines — striking in Roman society.' },
  { id: 'logos', greek: 'λόγος', translit: 'logos', gloss: 'word, message, reason', freq: 330, pos: 'noun', studyId: 'logos' },
  { id: 'oida', greek: 'οἶδα', translit: 'oida', gloss: 'I know', freq: 318, pos: 'verb' },
  { id: 'laleo', greek: 'λαλέω', translit: 'laleō', gloss: 'I speak', freq: 296, pos: 'verb' },
  { id: 'ouranos', greek: 'οὐρανός', translit: 'ouranos', gloss: 'heaven, sky', freq: 273, pos: 'noun' },
  { id: 'mathetes', greek: 'μαθητής', translit: 'mathētēs', gloss: 'disciple, learner', freq: 261, pos: 'noun', insight: 'A μαθητής was an apprentice who followed a teacher to learn a whole way of life, not just information.' },
  { id: 'lambano', greek: 'λαμβάνω', translit: 'lambanō', gloss: 'I take, receive', freq: 258, pos: 'verb' },
  { id: 'pistis', greek: 'πίστις', translit: 'pistis', gloss: 'faith, trust, faithfulness', freq: 243, pos: 'noun', studyId: 'pistis' },
  { id: 'pisteuo', greek: 'πιστεύω', translit: 'pisteuō', gloss: 'I believe, trust', freq: 241, pos: 'verb', insight: 'John never uses the noun "faith" in his Gospel, but uses the verb about 98 times. For John, faith is something you do.' },
  { id: 'hagios', greek: 'ἅγιος', translit: 'hagios', gloss: 'holy; saints (plural)', freq: 233, pos: 'adjective', insight: 'Paul calls ordinary believers οἱ ἅγιοι, "the holy ones" — set apart by God, not by their own achievement.' },
  { id: 'onoma', greek: 'ὄνομα', translit: 'onoma', gloss: 'name', freq: 231, pos: 'noun' },
  { id: 'ginosko', greek: 'γινώσκω', translit: 'ginōskō', gloss: 'I know, understand', freq: 222, pos: 'verb', insight: 'Often relational knowing — knowing a person, not just facts (John 17:3).' },
  { id: 'hamartia', greek: 'ἁμαρτία', translit: 'hamartia', gloss: 'sin', freq: 173, pos: 'noun', studyId: 'hamartia' },
  { id: 'doxa', greek: 'δόξα', translit: 'doxa', gloss: 'glory, splendor', freq: 166, pos: 'noun', insight: 'In the Greek Old Testament δόξα translates the Hebrew kavod, the "weight" of God\'s visible presence.' },
  { id: 'basileia', greek: 'βασιλεία', translit: 'basileia', gloss: 'kingdom, reign', freq: 162, pos: 'noun', insight: 'Better understood as God\'s active "reign" than a place on a map — the heart of Jesus\' preaching.' },
  { id: 'kardia', greek: 'καρδία', translit: 'kardia', gloss: 'heart', freq: 156, pos: 'noun', insight: 'The "heart" was the center of thinking and choosing, not just feelings.' },
  { id: 'charis', greek: 'χάρις', translit: 'charis', gloss: 'grace, favor, gift', freq: 155, pos: 'noun', studyId: 'charis' },
  { id: 'sarx', greek: 'σάρξ', translit: 'sarx', gloss: 'flesh, body, human nature', freq: 147, pos: 'noun', insight: 'Can mean simple physical flesh (John 1:14) or, in Paul, humanity living apart from God (Romans 8).' },
  { id: 'agapao', greek: 'ἀγαπάω', translit: 'agapaō', gloss: 'I love', freq: 143, pos: 'verb', studyId: 'agape' },
  { id: 'zoe', greek: 'ζωή', translit: 'zōē', gloss: 'life', freq: 135, pos: 'noun', insight: 'ζωὴ αἰώνιος, "eternal life", is literally "life of the age" — the life of God\'s coming age, begun now.' },
  { id: 'agape', greek: 'ἀγάπη', translit: 'agapē', gloss: 'love', freq: 116, pos: 'noun', studyId: 'agape' },
  { id: 'ekklesia', greek: 'ἐκκλησία', translit: 'ekklēsia', gloss: 'assembly, church', freq: 114, pos: 'noun', studyId: 'ekklesia' },
  { id: 'aletheia', greek: 'ἀλήθεια', translit: 'alētheia', gloss: 'truth', freq: 109, pos: 'noun' },
  { id: 'sozo', greek: 'σῴζω', translit: 'sōzō', gloss: 'I save, heal, rescue', freq: 106, pos: 'verb', insight: 'The same verb is used for healing a body (Mark 5:34) and rescuing a soul — wholeness in every sense.' },
  { id: 'psyche', greek: 'ψυχή', translit: 'psychē', gloss: 'soul, life, self', freq: 103, pos: 'noun' },
  { id: 'eirene', greek: 'εἰρήνη', translit: 'eirēnē', gloss: 'peace', freq: 92, pos: 'noun', insight: 'Carries the rich meaning of the Hebrew shalom — wholeness and right relationships, not merely the absence of war. Contrast the Roman "Pax Romana", kept by legions.' },
  { id: 'euangelion', greek: 'εὐαγγέλιον', translit: 'euangelion', gloss: 'good news, gospel', freq: 76, pos: 'noun', studyId: 'euangelion' },
  { id: 'phos', greek: 'φῶς', translit: 'phōs', gloss: 'light', freq: 73, pos: 'noun', insight: 'Gives us "photo". Jesus says ἐγώ εἰμι τὸ φῶς τοῦ κόσμου — possibly during the Feast of Tabernacles, when huge lamps lit the Temple courts (John 8:12).' },
  { id: 'metanoia', greek: 'μετάνοια', translit: 'metanoia', gloss: 'repentance, change of mind', freq: 22, pos: 'noun', studyId: 'metanoia' },
];
