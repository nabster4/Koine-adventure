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
];
