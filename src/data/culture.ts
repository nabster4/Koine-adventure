import type { QuizQuestion } from './wordStudies';

export interface CultureCard {
  id: string;
  title: string;
  era: string;
  icon: string;
  story: string;
  /** Why this matters when reading the New Testament. */
  lightOnText: string;
  refs: string[];
  quiz: QuizQuestion;
}

export const CULTURE: CultureCard[] = [
  {
    id: 'alexander',
    title: 'Why Greek? Alexander\'s legacy',
    era: '336–323 BC',
    icon: '🏛️',
    story:
      'Alexander the Great conquered from Greece to Egypt to the edge of India. Wherever his armies and settlers went, Greek went too. A simplified, international form of Greek developed — ἡ κοινὴ διάλεκτος, "the common dialect". By Jesus\' day, Koine was the language of trade, government, and travel across the eastern Mediterranean, even under Roman rule.',
    lightOnText:
      'Because of Koine, a Jewish tentmaker from Tarsus could write to churches in Rome, Corinth, and Galatia in one language they all understood. The New Testament was written in the everyday language of ordinary people, not a sacred or scholarly dialect.',
    refs: ['Acts 21:37', 'John 19:20'],
    quiz: {
      prompt: 'What does "Koine" mean?',
      options: ['Ancient', 'Common', 'Holy', 'Royal'],
      answer: 1,
      explain: 'κοινή means "common" — the shared language of the Hellenistic world.',
    },
  },
  {
    id: 'septuagint',
    title: 'The Septuagint: the Bible of the first Christians',
    era: '3rd–1st century BC',
    icon: '📜',
    story:
      'Jews living in Alexandria, Egypt, increasingly spoke Greek rather than Hebrew. So the Hebrew Scriptures were translated into Greek, beginning with the Torah. Legend says 72 scholars did it in 72 days, giving the name "Septuagint" (Latin for seventy, abbreviated LXX).',
    lightOnText:
      'Most Old Testament quotations in the New Testament follow the Septuagint. Words like κύριος, δόξα, and ἐκκλησία carry meaning they gained in the Septuagint. Reading the LXX is one of the best ways to understand New Testament vocabulary.',
    refs: ['Hebrews 10:5', 'Matthew 1:23'],
    quiz: {
      prompt: 'The Septuagint is…',
      options: ['A Roman law code', 'A Greek translation of the Hebrew Scriptures', 'A Gospel', 'A Greek philosophy book'],
      answer: 1,
      explain: 'The LXX is the Greek translation of the Hebrew Bible, widely used by early Christians.',
    },
  },
  {
    id: 'papyri',
    title: 'Treasure in the trash heaps',
    era: 'Discovered 1890s onward',
    icon: '🏺',
    story:
      'At Oxyrhynchus in Egypt, archaeologists Grenfell and Hunt dug through ancient rubbish mounds and found hundreds of thousands of papyrus fragments: letters, receipts, contracts, school exercises, and early Christian texts. Scholar Adolf Deissmann then showed that New Testament Greek closely matched these everyday documents.',
    lightOnText:
      'Before these finds, some thought New Testament Greek was a special "Holy Ghost Greek". The papyri showed it was the language of the street and the market. Words that puzzled scholars suddenly had clear everyday meanings — like ἀρραβών (Ephesians 1:14), used in papyri for a down payment.',
    refs: ['Ephesians 1:14', '2 Corinthians 1:22'],
    quiz: {
      prompt: 'What did the papyri reveal about New Testament Greek?',
      options: ['It was a secret language', 'It was everyday language of ordinary people', 'It was invented by Paul', 'It was only spoken by priests'],
      answer: 1,
      explain: 'The papyri showed NT Greek matched the ordinary written Greek of the time.',
    },
  },
  {
    id: 'letters',
    title: 'How to write an ancient letter',
    era: '1st century',
    icon: '✉️',
    story:
      'Greek letters followed a pattern: "Sender, to Recipient, χαίρειν (greetings)." Then came a wish for health, the body, and a closing farewell. Letters were usually dictated to a scribe (an amanuensis) and carried by a trusted messenger who might also explain them.',
    lightOnText:
      'Paul follows the form but transforms it: instead of χαίρειν he writes χάρις ὑμῖν καὶ εἰρήνη — "grace to you and peace" — blending the Greek greeting (charis) with the Hebrew greeting (shalom). We even know one of his scribes by name: Tertius (Romans 16:22). Paul sometimes added a note in his own hand (Galatians 6:11).',
    refs: ['Romans 16:22', 'Galatians 6:11', 'James 1:1'],
    quiz: {
      prompt: 'Paul replaced the usual greeting χαίρειν with…',
      options: ['χάρις καὶ εἰρήνη', 'ἀγάπη καὶ ζωή', 'δόξα καὶ τιμή', 'πίστις καὶ ἐλπίς'],
      answer: 0,
      explain: '"Grace and peace" — a play on χαίρειν that combines Greek and Hebrew greetings. (James 1:1 keeps the ordinary χαίρειν!)',
    },
  },
  {
    id: 'manuscripts',
    title: 'NOSPACESNOLOWERCASE',
    era: '2nd–9th century',
    icon: '🖋️',
    story:
      'Early Greek manuscripts were written in capital letters (uncials) with no spaces between words, very little punctuation, and no accents. This is called scriptio continua. Scribes also abbreviated sacred names with a line above them — ΘΣ for θεός, ΙΣ for Ἰησοῦς, ΧΣ for Χριστός. These are called nomina sacra.',
    lightOnText:
      'Spaces, punctuation, chapter numbers, and verse numbers were all added later. Sometimes where you break the words or place a comma changes the meaning — which is why footnotes in your Bible sometimes say "or…". Thousands of manuscripts let scholars compare copies and recover the original text with remarkable confidence.',
    refs: ['Luke 23:43', 'Romans 9:5'],
    quiz: {
      prompt: 'What is "scriptio continua"?',
      options: ['Writing with no spaces between words', 'A type of scroll', 'A Roman legal document', 'A musical chant'],
      answer: 0,
      explain: 'Ancient scribes wrote words continuously without spaces.',
    },
  },
  {
    id: 'roads',
    title: 'All roads… lead out from Rome',
    era: '1st century',
    icon: '🛣️',
    story:
      'The Pax Romana ("Roman Peace") brought relative stability. Over 50,000 miles of paved Roman roads, such as the Via Egnatia across Macedonia, plus shipping lanes cleared of pirates, made travel faster and safer than ever before.',
    lightOnText:
      'Paul travelled the Via Egnatia through Philippi and Thessalonica (Acts 16–17). Christians spoke of the "fullness of time" (Galatians 4:4): a common language, a connected empire, and scattered Jewish communities with synagogues gave the good news a road network to travel.',
    refs: ['Acts 16:12', 'Galatians 4:4'],
    quiz: {
      prompt: 'Which Roman road ran through Philippi and Thessalonica?',
      options: ['Via Appia', 'Via Egnatia', 'Via Dolorosa', 'Via Maris'],
      answer: 1,
      explain: 'The Via Egnatia crossed Macedonia, linking these cities Paul visited.',
    },
  },
  {
    id: 'honor',
    title: 'Honor, shame, and the cross',
    era: '1st century',
    icon: '⚖️',
    story:
      'Mediterranean society cared deeply about honor (τιμή) — your public reputation — and avoiding shame (αἰσχύνη). Crucifixion was designed to be the most shameful death possible: public, naked, reserved for slaves and rebels. Roman writers like Cicero thought the very word "cross" should be kept far from a Roman citizen\'s ears.',
    lightOnText:
      'This makes Hebrews 12:2 stunning: Jesus "endured the cross, despising the shame". And Philippians 2:5–11 traces the path of Jesus from the highest honor to the lowest shame — "even death on a cross" — and back to the highest honor of all.',
    refs: ['Hebrews 12:2', 'Philippians 2:8', '1 Corinthians 1:18'],
    quiz: {
      prompt: 'Why was the cross called "foolishness" to Greeks (1 Cor 1:23)?',
      options: ['It was too expensive', 'Crucifixion was the most shameful death', 'It was a Greek symbol', 'It was a new invention'],
      answer: 1,
      explain: 'A crucified savior seemed absurd in a culture where crucifixion meant the deepest shame.',
    },
  },
  {
    id: 'ephesus',
    title: 'Ephesus and the great Artemis',
    era: '1st century',
    icon: '🗿',
    story:
      'Ephesus was one of the largest cities in the Roman East, home to the Temple of Artemis, one of the Seven Wonders of the ancient world. Pilgrims came from everywhere, and silversmiths made a living selling small shrines of the goddess. Its theater held around 20,000–25,000 people and still stands today.',
    lightOnText:
      'In Acts 19, when people turned from idols, the silversmith Demetrius started a riot because business was suffering. The crowd rushed into the theater and shouted "Great is Artemis of the Ephesians!" for two hours. The gospel had economic and social consequences.',
    refs: ['Acts 19:23–41', 'Ephesians 2:19–22'],
    quiz: {
      prompt: 'Why did Demetrius start a riot in Ephesus?',
      options: ['A tax increase', 'His shrine-making business was suffering', 'A sports result', 'A famine'],
      answer: 1,
      explain: 'Fewer people bought silver shrines of Artemis as the gospel spread.',
    },
  },
  {
    id: 'meals',
    title: 'Who you eat with',
    era: '1st century',
    icon: '🍞',
    story:
      'In the ancient world, meals displayed social rank. Guests reclined on couches around a low table (the triclinium), and seating showed status. Sharing a table meant acceptance and friendship, so many pious Jews avoided eating with "sinners" and Gentiles.',
    lightOnText:
      'Jesus\' habit of eating with tax collectors and sinners (Mark 2:16) was a public statement of welcome. At the Last Supper the disciples reclined, so one could lean back against Jesus (John 13:23–25). In Corinth, the rich ate first while the poor went hungry at the Lord\'s Supper, and Paul rebukes them strongly (1 Corinthians 11:20–22).',
    refs: ['Mark 2:16', 'Luke 14:7–11', 'John 13:23'],
    quiz: {
      prompt: 'How did people usually eat at a formal ancient meal?',
      options: ['Standing up', 'Reclining on couches', 'Sitting on chairs at tall tables', 'Kneeling'],
      answer: 1,
      explain: 'Guests reclined on couches — which explains John leaning against Jesus.',
    },
  },
  {
    id: 'temple',
    title: 'Herod\'s Temple',
    era: '20 BC – AD 70',
    icon: '🕍',
    story:
      'Herod the Great began a massive rebuilding of the Jerusalem Temple around 20/19 BC; work continued for decades (John 2:20 mentions 46 years). Its courts covered about 35 acres. A stone barrier separated the Court of the Gentiles from the inner courts, with Greek inscriptions warning foreigners not to pass on pain of death — one of them was discovered in 1871. The Romans destroyed the Temple in AD 70.',
    lightOnText:
      'Paul says Christ "broke down the dividing wall of hostility" between Jew and Gentile (Ephesians 2:14) — readers would picture that very barrier. Jesus\' prediction that "not one stone will be left on another" (Mark 13:2) came true within a generation. The massive retaining stones of the Western Wall still stand today.',
    refs: ['Mark 13:1–2', 'John 2:19–21', 'Ephesians 2:14', 'Acts 21:28–29'],
    quiz: {
      prompt: 'What did the Greek warning inscriptions in the Temple forbid?',
      options: ['Selling animals', 'Gentiles entering the inner courts', 'Speaking Greek', 'Bringing scrolls'],
      answer: 1,
      explain: 'Foreigners were warned not to pass the barrier on pain of death — compare Acts 21:28 and Ephesians 2:14.',
    },
  },
  {
    id: 'synagogue',
    title: 'The synagogue: gathering place',
    era: '1st century',
    icon: '📖',
    story:
      'συναγωγή simply means "a gathering". Synagogues were places for reading and teaching Scripture, prayer, and community life wherever Jews lived — from Galilee to Rome. On the Sabbath, readings came from the Law and the Prophets, and visiting teachers might be invited to speak. A first-century inscription from Jerusalem (the Theodotus inscription) records a synagogue built "for the reading of the Law and the teaching of the commandments".',
    lightOnText:
      'This is why Jesus could stand up in Nazareth, read from the Isaiah scroll, and teach (Luke 4:16–21). Paul\'s strategy in each new city was to go first to the synagogue (Acts 17:2), where he found Jews and "God-fearing" Gentiles who already knew the Scriptures.',
    refs: ['Luke 4:16–21', 'Acts 13:14–16', 'Acts 17:1–4'],
    quiz: {
      prompt: 'What does συναγωγή mean?',
      options: ['A temple', 'A gathering', 'A school', 'A priest'],
      answer: 1,
      explain: 'συναγωγή means "a gathering" — like ἐκκλησία, it first described people, not buildings.',
    },
  },
  {
    id: 'sects',
    title: 'Pharisees, Sadducees & the Dead Sea Scrolls',
    era: '2nd century BC – 1st century AD',
    icon: '🧔',
    story:
      'The historian Josephus describes several Jewish groups. Pharisees were popular teachers devoted to careful obedience and the traditions of the elders; they believed in resurrection and angels. Sadducees were linked to the priestly aristocracy and the Temple; they rejected resurrection. Essenes lived disciplined, separate lives — many scholars connect them with Qumran, where the Dead Sea Scrolls were found in 1947, including a complete Isaiah scroll about 1,000 years older than the oldest Hebrew Bible manuscripts known before.',
    lightOnText:
      'Paul cleverly uses these divisions on trial: "I am a Pharisee… on trial concerning the hope of the resurrection" — and the council splits (Acts 23:6–8). Jesus\' debates with Pharisees are often in-house arguments about how best to obey God, which is why they were so intense.',
    refs: ['Acts 23:6–8', 'Mark 12:18', 'Philippians 3:5'],
    quiz: {
      prompt: 'Which group denied the resurrection?',
      options: ['Pharisees', 'Sadducees', 'Disciples', 'Samaritans'],
      answer: 1,
      explain: 'The Sadducees said there is no resurrection (Acts 23:8; Mark 12:18).',
    },
  },
  {
    id: 'citizenship',
    title: 'Civis Romanus sum: Roman citizenship',
    era: '1st century',
    icon: '🦅',
    story:
      'Roman citizenship was a prized status, held by a minority in the eastern provinces. Citizens could not be flogged or crucified without trial and had the right to appeal to the emperor. Some bought citizenship; others, like Paul, were born citizens. Philippi was a Roman colony — a little Rome abroad, proud of its status.',
    lightOnText:
      'After being beaten in Philippi, Paul reveals he is a citizen and the officials panic (Acts 16:37–39). Later he appeals to Caesar (Acts 25:11). And to the proud Philippians, Paul writes: "our citizenship (πολίτευμα) is in heaven" (Philippians 3:20) — a colony of heaven living on earth.',
    refs: ['Acts 16:37–39', 'Acts 22:25–28', 'Philippians 3:20'],
    quiz: {
      prompt: 'Why were the officials at Philippi afraid after beating Paul?',
      options: ['He was a priest', 'He was a Roman citizen', 'He was rich', 'He was a soldier'],
      answer: 1,
      explain: 'Beating an uncondemned Roman citizen was illegal (Acts 16:37–38).',
    },
  },
  {
    id: 'passover',
    title: 'Passover and the Lamb of God',
    era: 'From the Exodus to the 1st century',
    icon: '🐑',
    story:
      'Passover (πάσχα) remembered Israel\'s rescue from Egypt, when the blood of a lamb on the doorposts meant the LORD "passed over" the house (Exodus 12). In Jesus\' day, pilgrims crowded Jerusalem, lambs were sacrificed at the Temple, and families ate the meal together with unleavened bread, bitter herbs, and wine.',
    lightOnText:
      'John the Baptist calls Jesus "the Lamb of God" (John 1:29). John\'s Gospel notes Jesus was condemned on the "day of Preparation" of the Passover (19:14), and that none of his bones were broken (19:36) — echoing the rule for the Passover lamb (Exodus 12:46). Paul says plainly: "Christ, our πάσχα, has been sacrificed" (1 Corinthians 5:7).',
    refs: ['Exodus 12', 'John 1:29', 'John 19:36', '1 Corinthians 5:7'],
    quiz: {
      prompt: 'Which Passover rule does John 19:36 echo?',
      options: ['Eat it quickly', 'None of its bones shall be broken', 'Use bitter herbs', 'Eat it at night'],
      answer: 1,
      explain: 'Exodus 12:46 says no bone of the Passover lamb may be broken.',
    },
  },
  {
    id: 'corinth',
    title: 'Corinth: status city',
    era: '1st century',
    icon: '⚱️',
    story:
      'Destroyed in 146 BC and refounded as a Roman colony by Julius Caesar in 44 BC, Corinth was a booming port city full of upwardly mobile people. Public honor was everything: inscriptions advertised benefactors\' generosity. One pavement inscription credits an Erastus who laid it at his own expense as aedile — many scholars link him with the Erastus of Romans 16:23, though this is debated. The city also hosted the Isthmian Games.',
    lightOnText:
      'This background explains 1 Corinthians: boasting about favorite teachers (1:12), status divisions at the Lord\'s Supper (11:21–22), pride in impressive spiritual gifts (chapters 12–14). Paul counters with the foolishness of the cross and the "more excellent way" of love — and borrows athletic imagery from the Games: "run so as to win" (9:24–27).',
    refs: ['1 Corinthians 1:26–29', '1 Corinthians 9:24–27', 'Romans 16:23'],
    quiz: {
      prompt: 'Paul\'s running and boxing imagery in 1 Corinthians 9 fits Corinth because…',
      options: ['It hosted the Isthmian Games', 'It had no roads', 'It was in Egypt', 'Paul was an athlete'],
      answer: 0,
      explain: 'The Isthmian Games were held near Corinth.',
    },
  },
];
