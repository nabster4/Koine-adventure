# Koine Adventure 🏛️

Learn Biblical (Koine) Greek in a fun, game-like way — and discover how the language and world of the New Testament
bring Scripture into the light.

## What's inside

**Learn**
- **Alphabet** (Αα): all 24 letters with sounds, example words and a quiz.
- **Vocabulary** 🃏: over 150 of the most frequent New Testament words, with flashcards that bring each word back at the right time. Four modes: Greek → English, English → Greek, Listening, and Review mistakes. A coverage meter shows how much of the NT text you can recognize.
- **Grammar Lessons** 📘: 8 short lessons (reading marks, the article, cases, verbs, tense and aspect, voice, participles, moods), each illustrated with real verses and a quick quiz.
- **Parse It!** 🎯: a 60-second challenge on noun and verb endings.
- **Word Match** 🧠: a timed memory game pairing Greek words with their meanings.

**Read**
- **Read Scripture** 📜: 12 verses (including John 1:1, 3:16, 8:12, 14:6, Matthew 5:3, Ephesians 2:8, Romans 6:23 and 1 Corinthians 13:13) with every word parsed. Tap any word to hear it and see what it means, listen to the whole verse, reveal the "light on the text", and play "Find the word".

**Discover**
- **Word Light** 💡: 16 in-depth word studies (λόγος, ἀγάπη, ἐκκλησία, εὐαγγέλιον, κύριος, χάρις, πίστις, ἐγώ εἰμι, σωτήρ, παράκλητος, ἱλαστήριον…) that move from everyday ancient usage → Scripture → the key passages each word lights up → a reflection question → a quiz.
- **Ancient World** 🏛️: 15 history and culture cards: Alexander and Koine, the Septuagint, the papyri, letters, manuscripts, Roman roads, honor and shame, Ephesus, meals, Herod's Temple, synagogues, Pharisees and Sadducees, Roman citizenship, Passover, and Corinth.
- **Lexicon** 🔎: search every word in Greek, English, or Greek typed with English letters ("logos").

**Audio** 🔊
- A speaker button on every Greek word, phrase and verse.
- **Classroom (Erasmian)** pronunciation, used by most Bible colleges, works on every device: Greek is respelled phonetically (λόγος → "LOH-gohs") and read aloud by the device's voice. The respelling is also shown as a "Say it" guide.
- Optionally, use your device's **Modern Greek voice** instead.
- Sound effects for right and wrong answers and for level-ups (can be turned off).

**Motivation and progress**
- XP, 10 levels, daily streaks, a daily XP goal ring, 21 badges, and level-up and badge celebrations.
- An "Up next" path on the Home screen suggesting the next steps in language, reading and discovery.
- Stats and a 12-week study calendar.

**App features**
- Installable on phones and works offline (web app manifest and service worker).
- Light, dark and automatic themes; mobile bottom navigation; keyboard and screen-reader friendly.
- Progress is saved on the device, with backup and restore to move it to another device.

## Running locally

```bash
npm install
npm run dev     # start dev server
npm test        # run unit tests
npm run build   # production build into dist/
```

## Deploying

A GitHub Actions workflow (`.github/workflows/deploy.yml`) tests, builds and publishes to GitHub Pages on every push to
`main`. Enable it once in **Settings → Pages → Source: GitHub Actions**.

## Adding content

All learning content lives in plain TypeScript files in `src/data/`:

- `vocab.ts` — vocabulary words (with optional `insight` and link to a word study)
- `wordStudies.ts` — Word Light deep dives
- `culture.ts` — Ancient World cards
- `verses.ts` — verses with word-by-word parsing
- `grammar.ts` — noun and verb paradigms for the parsing game
- `lessons.ts` — grammar lessons

`npm test` checks content integrity (unique ids, valid quiz answers, links between words and studies).

## Notes on sources

Greek text follows the standard critical text (NA28 / SBLGNT). Word frequencies are rounded approximations.
Where scholars disagree (e.g. ἀγαπάω/φιλέω in John 21, πίστις Χριστοῦ, μονογενής), the app says so rather than
presenting one view as settled.
