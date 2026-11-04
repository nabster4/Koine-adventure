import type { Progress } from './progress';
import { ALPHABET } from '../data/alphabet';
import { WORD_STUDIES } from '../data/wordStudies';
import { CULTURE } from '../data/culture';
import { VERSES } from '../data/verses';

export interface Badge {
  id: string;
  icon: string;
  name: string;
  description: string;
  earned: (p: Progress) => boolean;
}

const learnedWords = (p: Progress) => Object.values(p.cards).filter((c) => c.box >= 2).length;

export const BADGES: Badge[] = [
  { id: 'alpha', icon: 'Α', name: 'Alpha', description: 'Learn your first Greek letter', earned: (p) => p.lettersLearned.length >= 1 },
  { id: 'omega', icon: 'Ω', name: 'Alpha to Omega', description: 'Learn all 24 letters', earned: (p) => p.lettersLearned.length >= ALPHABET.length },
  { id: 'words10', icon: '📖', name: 'First Words', description: 'Learn 10 vocabulary words', earned: (p) => learnedWords(p) >= 10 },
  { id: 'words50', icon: '📚', name: 'Word Hoard', description: 'Learn 50 vocabulary words', earned: (p) => learnedWords(p) >= 50 },
  { id: 'light1', icon: '💡', name: 'Lamp Lit', description: 'Finish your first Word Light study', earned: (p) => p.studiesRead.length >= 1 },
  { id: 'lightAll', icon: '🔆', name: 'Light of the World', description: 'Finish every Word Light study', earned: (p) => p.studiesRead.length >= WORD_STUDIES.length },
  { id: 'world1', icon: '🧭', name: 'Time Traveller', description: 'Explore an Ancient World card', earned: (p) => p.cultureRead.length >= 1 },
  { id: 'worldAll', icon: '🗺️', name: 'Citizen of the Empire', description: 'Explore every Ancient World card', earned: (p) => p.cultureRead.length >= CULTURE.length },
  { id: 'verse1', icon: '✨', name: 'First Verse', description: 'Read your first verse in Greek', earned: (p) => p.versesRead.length >= 1 },
  { id: 'verseAll', icon: '📜', name: 'Scroll Reader', description: 'Read every verse in Greek', earned: (p) => p.versesRead.length >= VERSES.length },
  { id: 'parse10', icon: '🎯', name: 'Sharp Parser', description: 'Get a 10-in-a-row parsing streak', earned: (p) => p.bestParseStreak >= 10 },
  { id: 'streak3', icon: '🔥', name: 'Kindled', description: 'Study 3 days in a row', earned: (p) => p.streak >= 3 },
  { id: 'streak7', icon: '🕯️', name: 'Faithful', description: 'Study 7 days in a row', earned: (p) => p.streak >= 7 },
  { id: 'xp1000', icon: '🏆', name: 'Diligent Scribe', description: 'Earn 1,000 XP', earned: (p) => p.xp >= 1000 },
];
