import { describe, expect, it } from 'vitest';
import { respell, respellWord } from '../lib/pronounce';

describe('Erasmian respelling', () => {
  it.each([
    ['λόγος', 'LOH-gohs'],
    ['θεός', 'theh-OHS'],
    ['ἀγάπη', 'ah-GAH-pay'],
    ['ἁμαρτία', 'hah-mahr-TEE-ah'],
    ['ἄγγελος', 'AHN-geh-lohs'],
    ['Ἰησοῦς', 'ee-ay-SOOS'],
    ['εὐαγγέλιον', 'yoo-ahn-GEH-lee-ohn'],
    ['υἱός', 'hwee-OHS'],
    ['Χριστός', 'khrees-TOHS'],
    ['ψυχή', 'psoo-KHAY'],
    ['ἐκκλησία', 'ehk-klay-SEE-ah'],
  ])('%s → %s', (greek, expected) => {
    expect(respellWord(greek)).toBe(expected);
  });

  it('handles phrases and one-syllable words', () => {
    expect(respell('ὁ λόγος')).toBe('hoh LOH-gohs');
  });
});
