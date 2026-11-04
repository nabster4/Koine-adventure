# Koine Adventure 🏛️

Learn Biblical (Koine) Greek in a fun, game-like way — and discover how the language and world of the New Testament
bring Scripture into the light.

## What's inside

| Area | What you do |
| --- | --- |
| **Alphabet** (Αα) | Meet all 24 letters with sounds and biblical example words, then take a quick-fire quiz. |
| **Vocabulary** 🃏 | Spaced-repetition flashcards, ordered by New Testament frequency. A coverage meter shows what % of the NT text you can now recognize. Each word comes with a "light on the text" insight. |
| **Parse It!** 🎯 | A 60-second challenge: identify case/number/gender of nouns or person/number of verbs. Build streaks. |
| **Read Scripture** 📜 | Tap through real verses (John 1:1, John 3:16, 1 John 4:8, Mark 1:1, John 11:35, John 19:30) word by word with parsing, then reveal what the Greek uncovers. Play "Find the word". |
| **Word Light** 💡 | In-depth word studies (λόγος, ἀγάπη, ἐκκλησία, εὐαγγέλιον, κύριος, χάρις, πίστις, παρουσία, …): everyday usage in the ancient world → usage in Scripture → passages it lights up → reflection → quiz. |
| **Ancient World** 🗺️ | History and culture behind the text: Alexander and Koine, the Septuagint, the papyri, ancient letters, manuscripts, Roman roads, honor and shame, Ephesus, meals. |
| **Badges & levels** 🏆 | XP, levels (Seeker → Master of Koine), daily streaks, and 14 badges. |

Progress is saved in the browser (localStorage) — no account needed.

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

`npm test` checks content integrity (unique ids, valid quiz answers, links between words and studies).

## Notes on sources

Greek text follows the standard critical text (NA28 / SBLGNT). Word frequencies are rounded approximations.
Where scholars disagree (e.g. ἀγαπάω/φιλέω in John 21, πίστις Χριστοῦ, μονογενής), the app says so rather than
presenting one view as settled.
