export interface QuizQuestion {
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface WordStudy {
  id: string;
  greek: string;
  translit: string;
  gloss: string;
  tagline: string;
  /** How the word was used in everyday Greek and the wider ancient world. */
  world: string;
  /** How the word works in Scripture. */
  scripture: string;
  /** Key passages where knowing the Greek lights up the text. */
  passages: { ref: string; greek?: string; note: string }[];
  /** A reflection prompt to help connect it to life. */
  reflect: string;
  quiz: QuizQuestion;
}

export const WORD_STUDIES: WordStudy[] = [
  {
    id: 'logos',
    greek: 'λόγος',
    translit: 'logos',
    gloss: 'word, message, reason',
    tagline: 'The Word who was with God — and was God.',
    world:
      'For Greek philosophers like Heraclitus and the Stoics, the Logos was the rational principle holding the universe together. The Jewish writer Philo of Alexandria, a contemporary of Jesus, used Logos for God\'s agent in creation. Meanwhile, Jewish readers would hear echoes of Genesis 1 ("And God said…") and of Wisdom, who was "beside God" at creation (Proverbs 8).',
    scripture:
      'John deliberately picks a word that speaks to both worlds. To Greeks: the reason behind the universe is not an abstract idea but a person. To Jews: the creative Word of God has now "become flesh and pitched his tent among us" (John 1:14).',
    passages: [
      { ref: 'John 1:1', greek: 'Ἐν ἀρχῇ ἦν ὁ λόγος', note: '"In the beginning" deliberately echoes the first words of Genesis in the Greek Old Testament: Ἐν ἀρχῇ.' },
      { ref: 'John 1:14', greek: 'ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν', note: 'ἐσκήνωσεν means "tabernacled" or "pitched a tent", recalling God\'s presence dwelling in the wilderness Tabernacle.' },
      { ref: 'Hebrews 4:12', note: 'Here λόγος is the spoken message of God — living, active, sharper than a sword.' },
    ],
    reflect: 'If the reason behind all things is a person who became flesh, how does that change the way you see the world?',
    quiz: {
      prompt: 'Which Greek word in John 1:14 pictures the Word "pitching a tent" among us?',
      options: ['ἐγένετο', 'ἐσκήνωσεν', 'ἀρχῇ', 'σάρξ'],
      answer: 1,
      explain: 'ἐσκήνωσεν comes from σκηνή, "tent" — the same word used for the Tabernacle.',
    },
  },
  {
    id: 'agape',
    greek: 'ἀγάπη / ἀγαπάω',
    translit: 'agapē / agapaō',
    gloss: 'love',
    tagline: 'A rare word the early Christians filled with new meaning.',
    world:
      'Greek had several words for love: ἔρως (romantic desire — never used in the NT), φιλία / φιλέω (friendship and affection), στοργή (family affection). The noun ἀγάπη was relatively uncommon in classical Greek, but the Greek Old Testament used it, and the early Christians made it their signature word.',
    scripture:
      'The New Testament defines ἀγάπη by what God does: "God so loved the world that he gave…" (John 3:16). It is love measured by self-giving, seen most clearly at the cross (1 John 3:16). Be careful, though: ἀγαπάω and φιλέω overlap a lot, and sometimes they are used interchangeably (compare John 3:35 and 5:20).',
    passages: [
      { ref: '1 John 4:8', greek: 'ὁ θεὸς ἀγάπη ἐστίν', note: 'Not just "God loves", but "God IS love" — love is God\'s very nature.' },
      { ref: 'John 21:15–17', note: 'Jesus asks Peter "Do you ἀγαπᾷς me?" twice, then switches to φιλεῖς. Scholars debate whether the switch is meaningful or just stylistic variety — but the threefold question clearly mirrors Peter\'s threefold denial.' },
      { ref: '1 Corinthians 13', note: 'Paul\'s portrait of ἀγάπη is all verbs: love is patient, is kind, does not envy… Love is something done.' },
    ],
    reflect: 'Love in the New Testament is defined by action. Who could you show self-giving love to this week?',
    quiz: {
      prompt: 'Which Greek love-word never appears in the New Testament?',
      options: ['ἀγάπη', 'φιλέω', 'ἔρως', 'ἀγαπάω'],
      answer: 2,
      explain: 'ἔρως (romantic/passionate desire) is absent from the New Testament, though it was common in Greek literature.',
    },
  },
  {
    id: 'ekklesia',
    greek: 'ἐκκλησία',
    translit: 'ekklēsia',
    gloss: 'assembly, church',
    tagline: 'Not a building — a people called together.',
    world:
      'In Greek cities, the ἐκκλησία was the citizens\' assembly that met to make decisions (you can see one in action in the riot at Ephesus, Acts 19:32, 39). In the Greek Old Testament, ἐκκλησία also describes Israel gathered before God, as at Mount Sinai.',
    scripture:
      'Early Christians chose a political and biblical word, not a religious-cult word. The church was a new public assembly — God\'s people, gathered under a different Lord. It almost always refers to people, never a building; Christians met in homes for the first few centuries.',
    passages: [
      { ref: 'Matthew 16:18', greek: 'οἰκοδομήσω μου τὴν ἐκκλησίαν', note: 'Jesus speaks of "my assembly" — a people he builds.' },
      { ref: 'Acts 19:39', note: 'Here ἐκκλησία is the city assembly of Ephesus — the same word, used in its everyday civic sense.' },
      { ref: 'Romans 16:5', note: '"The church in their house" — believers gathered in the home of Prisca and Aquila.' },
    ],
    reflect: 'If "church" means a gathered people rather than a place, what does it mean to "be" the church today?',
    quiz: {
      prompt: 'In everyday Greek cities, an ἐκκλησία was…',
      options: ['A temple', 'A citizens\' assembly', 'A school', 'A marketplace'],
      answer: 1,
      explain: 'It was the civic assembly of citizens — Acts 19 even uses the word for the town meeting in Ephesus.',
    },
  },
  {
    id: 'euangelion',
    greek: 'εὐαγγέλιον',
    translit: 'euangelion',
    gloss: 'good news, gospel',
    tagline: 'Royal announcement language — with a different king.',
    world:
      'εὐ- ("good") + ἀγγελ- ("message"). In the Roman world, "good news" announced victories and imperial events. A famous inscription from Priene (9 BC) celebrates the birthday of Augustus as "the beginning of the good tidings (εὐαγγέλια) for the world" and calls him a "savior" who brought peace.',
    scripture:
      'Isaiah used "good news" language for the announcement that God reigns (Isaiah 52:7). Mark opens: "The beginning of the gospel of Jesus Christ, Son of God" — words that any Roman would recognize as royal proclamation, but now about a crucified Jewish Messiah.',
    passages: [
      { ref: 'Mark 1:1', greek: 'Ἀρχὴ τοῦ εὐαγγελίου Ἰησοῦ Χριστοῦ', note: 'Compare the Priene inscription\'s "beginning of the good news" for Augustus.' },
      { ref: 'Isaiah 52:7', note: '"How beautiful… the feet of him who brings good news… who says to Zion, \'Your God reigns.\'"' },
      { ref: 'Romans 1:16', note: 'Paul is "not ashamed of the gospel" — even though it centered on a crucified man, which sounded shameful to Romans.' },
    ],
    reflect: 'The gospel is an announcement about who truly reigns. What difference does that announcement make to you?',
    quiz: {
      prompt: 'The Priene inscription used "good news" to celebrate…',
      options: ['A military defeat', 'The birthday of Caesar Augustus', 'The building of the Temple', 'A harvest festival'],
      answer: 1,
      explain: 'It celebrated Augustus\' birthday as the beginning of "good tidings" for the world.',
    },
  },
  {
    id: 'kyrios',
    greek: 'κύριος',
    translit: 'kyrios',
    gloss: 'Lord, master, sir',
    tagline: 'A word that could cost you your life.',
    world:
      'κύριος could mean a polite "sir", the master of a household or slave, or a ruler. Roman emperors were increasingly hailed as κύριος. Later, Christians like Polycarp (2nd century) were pressed to say "Caesar is Lord" and offer incense — and refused.',
    scripture:
      'When Jewish scholars translated the Hebrew Scriptures into Greek (the Septuagint), they usually rendered God\'s personal name (YHWH) as κύριος. So when early Christians confessed "Jesus is κύριος", they were applying the language of Israel\'s God to Jesus — and also making a statement about who outranked Caesar.',
    passages: [
      { ref: 'Romans 10:9', greek: 'κύριον Ἰησοῦν', note: 'The earliest Christian confession: "Jesus is Lord".' },
      { ref: 'Philippians 2:11', note: 'Every tongue will confess Jesus Christ is κύριος — Paul is echoing Isaiah 45:23, where every knee bows to YHWH.' },
      { ref: 'John 20:28', note: 'Thomas: "My κύριος and my God!"' },
    ],
    reflect: 'To call Jesus "Lord" was a public allegiance. Where does that allegiance shape your choices?',
    quiz: {
      prompt: 'In the Greek Old Testament, κύριος usually stands for…',
      options: ['Moses', 'The king of Israel', 'God\'s personal name, YHWH', 'An angel'],
      answer: 2,
      explain: 'The Septuagint typically renders the divine name YHWH as κύριος.',
    },
  },
  {
    id: 'charis',
    greek: 'χάρις',
    translit: 'charis',
    gloss: 'grace, favor, gift',
    tagline: 'The language of gifts in a world run on patronage.',
    world:
      'The Roman world ran on patronage. Wealthy patrons gave gifts and favors (χάρις), and clients returned loyalty, praise, and honor (also called χάρις — "thanks"). Writers like Seneca wrote whole books on how to give and receive benefits well.',
    scripture:
      'Paul uses this everyday word for God\'s astonishing generosity. Grace is a gift that can\'t be earned — yet, as in the ancient world, it creates a relationship and calls for a grateful, loyal response (Romans 12:1). Even "thank you" in Greek, χάρις, shares the root: grace received becomes thanks given.',
    passages: [
      { ref: 'Ephesians 2:8', greek: 'τῇ γὰρ χάριτί ἐστε σεσῳσμένοι', note: '"By grace you have been saved" — the perfect tense suggests a rescue with lasting results.' },
      { ref: '2 Corinthians 9:15', note: '"χάρις to God for his indescribable gift" — here χάρις means "thanks".' },
      { ref: 'John 1:16', note: '"Grace upon grace" — wave after wave of God\'s generosity.' },
    ],
    reflect: 'In the ancient world, a gift created a relationship. How might grace call you into gratitude rather than earning?',
    quiz: {
      prompt: 'In the patronage system, χάρις could mean both the gift and…',
      options: ['The price', 'The thanks returned for it', 'A legal contract', 'A tax'],
      answer: 1,
      explain: 'χάρις named both the favor given and the gratitude returned.',
    },
  },
  {
    id: 'pistis',
    greek: 'πίστις',
    translit: 'pistis',
    gloss: 'faith, trust, faithfulness, loyalty',
    tagline: 'More than believing facts — trust and loyalty.',
    world:
      'In everyday Greek, πίστις meant trust, reliability, a pledge, or proof. It was used for loyalty between friends, allies, and between subjects and rulers. A πιστός person was dependable.',
    scripture:
      'Biblical faith is not just agreeing that something is true; it is trusting a person and remaining loyal to him. The same word can mean "faithfulness" (Galatians 5:22 lists it as fruit of the Spirit). Scholars debate whether phrases like πίστις Χριστοῦ mean "faith in Christ" or "the faithfulness of Christ" — a fascinating example of how Greek grammar shapes theology.',
    passages: [
      { ref: 'Hebrews 11:1', note: 'Faith is the ὑπόστασις — the "substance" or "assurance" — of things hoped for.' },
      { ref: 'Galatians 2:16', greek: 'διὰ πίστεως Ἰησοῦ Χριστοῦ', note: '"Faith in Jesus Christ" or "the faithfulness of Jesus Christ"? The genitive can be read either way.' },
      { ref: 'Galatians 5:22', note: 'Here πίστις is "faithfulness" — a character trait the Spirit grows in us.' },
    ],
    reflect: 'If faith is loyal trust in a person, what does it look like to be faithful today?',
    quiz: {
      prompt: 'Besides "faith", πίστις can also mean…',
      options: ['Hope', 'Faithfulness or loyalty', 'Knowledge', 'Fear'],
      answer: 1,
      explain: 'πίστις covers trust, faith, and faithfulness — as in Galatians 5:22.',
    },
  },
  {
    id: 'hamartia',
    greek: 'ἁμαρτία',
    translit: 'hamartia',
    gloss: 'sin',
    tagline: 'Often explained as "missing the mark" — but there\'s more.',
    world:
      'The related verb ἁμαρτάνω can mean to miss a target or to fail. In Greek tragedy (e.g. Aristotle\'s Poetics), ἁμαρτία is the hero\'s fatal error or flaw.',
    scripture:
      'Preachers often say sin means "missing the mark", and that picture has some basis. But in the New Testament, ἁμαρτία is much more than an honest miss: Paul pictures Sin as a power that enslaves (Romans 6), and John calls it lawlessness (1 John 3:4). Word origins help, but how a word is used matters most — a key lesson for all word study!',
    passages: [
      { ref: 'Romans 3:23', note: '"All have sinned (ἥμαρτον) and fall short of the glory of God."' },
      { ref: 'Romans 6:23', note: 'Sin pays wages (ὀψώνια — a soldier\'s ration-pay): death. But God\'s free gift (χάρισμα) is eternal life.' },
      { ref: 'John 1:29', note: 'The Lamb of God takes away the ἁμαρτίαν (singular!) of the world.' },
    ],
    reflect: 'Paul pictures sin as a master and grace as a gift. What does freedom look like for you?',
    quiz: {
      prompt: 'What important lesson about word study does ἁμαρτία teach?',
      options: ['Etymology always gives the meaning', 'Usage in context matters most', 'Greek words have one meaning only', 'Translations are always wrong'],
      answer: 1,
      explain: 'A word\'s origin can help, but its meaning is set by how authors actually use it.',
    },
  },
  {
    id: 'metanoia',
    greek: 'μετάνοια',
    translit: 'metanoia',
    gloss: 'repentance, change of mind',
    tagline: 'A turnaround of the whole person.',
    world:
      'μετά ("after/change") + νοῦς ("mind"). In ordinary Greek it could mean changing one\'s mind or feeling regret.',
    scripture:
      'In the Bible, the idea draws on the Hebrew prophets\' call to שׁוּב (shuv) — "turn back" to God. Repentance is not just feeling sorry but a reorientation of mind and life. John the Baptist demands "fruit worthy of repentance" (Luke 3:8) and gives practical examples: share your coat, don\'t extort.',
    passages: [
      { ref: 'Mark 1:15', greek: 'μετανοεῖτε καὶ πιστεύετε ἐν τῷ εὐαγγελίῳ', note: 'Jesus\' first words in Mark: "Repent and believe in the good news."' },
      { ref: 'Luke 3:8–14', note: 'Repentance shows up in generosity and honesty.' },
      { ref: 'Romans 2:4', note: 'It is God\'s kindness that leads us to repentance.' },
    ],
    reflect: 'Romans 2:4 says kindness leads to repentance. Where is God inviting you to turn around?',
    quiz: {
      prompt: 'μετάνοια combines "change" with which word?',
      options: ['νοῦς — mind', 'νόμος — law', 'νύξ — night', 'ναός — temple'],
      answer: 0,
      explain: 'μετά + νοῦς: a change of mind that leads to a change of life.',
    },
  },
  {
    id: 'parousia',
    greek: 'παρουσία',
    translit: 'parousia',
    gloss: 'coming, presence, arrival',
    tagline: 'When the king comes to town.',
    world:
      'παρουσία simply means "presence" or "arrival". But it was also a technical term for the official visit of a ruler or emperor to a city. Citizens would go out to meet him (ἀπάντησις) and escort him back into the city with celebration.',
    scripture:
      'Paul uses the word for Christ\'s return. In 1 Thessalonians 4:17 believers go out "to meet" (εἰς ἀπάντησιν) the Lord — the same word used for citizens greeting a visiting dignitary and escorting him home. The picture is of welcoming the true King as he arrives to reign.',
    passages: [
      { ref: '1 Thessalonians 4:15–17', note: 'παρουσία + ἀπάντησις: royal-visit language.' },
      { ref: 'Matthew 24:27', note: 'The παρουσία of the Son of Man will be as visible as lightning.' },
      { ref: 'Philippians 1:26', note: 'An ordinary use: Paul\'s own "presence" with the Philippians again.' },
    ],
    reflect: 'If Christ\'s coming is like a king\'s arrival, how would you prepare to welcome him?',
    quiz: {
      prompt: 'In the Roman world, a παρουσία was often…',
      options: ['A funeral', 'The official visit of a ruler', 'A sacrifice', 'A trial'],
      answer: 1,
      explain: 'It described the arrival of a ruler or dignitary, met by citizens who went out to escort him.',
    },
  },
  {
    id: 'koinonia',
    greek: 'κοινωνία',
    translit: 'koinōnia',
    gloss: 'fellowship, sharing, partnership',
    tagline: 'Fellowship is more than coffee after church.',
    world:
      'From κοινός, "common" — the root of the name "Koine" Greek, the common language! κοινωνία was used for business partnerships, shared ownership, and close relationships.',
    scripture:
      'The early church "devoted themselves… to the κοινωνία" (Acts 2:42), which included sharing possessions (2:44). Paul thanks the Philippians for their κοινωνία in the gospel — their financial partnership in his mission (Philippians 1:5). It\'s also used for a financial collection for the poor (Romans 15:26).',
    passages: [
      { ref: 'Acts 2:42', note: 'Teaching, fellowship, breaking bread, prayer.' },
      { ref: 'Philippians 1:5', note: '"Your partnership in the gospel" — likely including financial support.' },
      { ref: '1 John 1:3', note: 'Our κοινωνία is with the Father and with his Son.' },
    ],
    reflect: 'κοινωνία meant sharing real life and resources. Who are you in partnership with?',
    quiz: {
      prompt: 'κοινωνία shares a root with which famous word?',
      options: ['Koine (common) Greek', 'Kosmos', 'Kyrios', 'Kardia'],
      answer: 0,
      explain: 'Both come from κοινός, "common". Koine Greek was the "common" language.',
    },
  },
  {
    id: 'tetelestai',
    greek: 'τετέλεσται',
    translit: 'tetelestai',
    gloss: 'it is finished, completed',
    tagline: 'One word from the cross.',
    world:
      'From τελέω, "to complete, fulfill, pay". Forms of this verb appear in papyrus documents for completing obligations, including paying taxes. (You may hear that "τετέλεσται" was stamped on receipts meaning "paid in full" — the verb is used in such contexts, but that popular claim is often overstated.)',
    scripture:
      'The perfect tense describes a completed action with continuing results: the work is done and stays done. In John\'s Gospel, Jesus has come to "complete" (τελειόω) the Father\'s work (John 4:34; 17:4), and the Scriptures are "fulfilled" (19:28). His final cry announces that mission accomplished.',
    passages: [
      { ref: 'John 19:30', greek: 'τετέλεσται', note: 'One word in Greek; three in English.' },
      { ref: 'John 17:4', note: '"I have completed the work you gave me to do."' },
      { ref: 'John 13:1', note: 'He loved them εἰς τέλος — "to the end" or "to the uttermost".' },
    ],
    reflect: 'The perfect tense says it is done and stays done. What rest does that offer you?',
    quiz: {
      prompt: 'What does the perfect tense of τετέλεσται emphasize?',
      options: ['An action that might happen', 'A completed action with lasting results', 'A repeated action', 'A command'],
      answer: 1,
      explain: 'The Greek perfect stresses a completed action whose results continue.',
    },
  },
];
