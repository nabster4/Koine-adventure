import { useCallback, useEffect, useState } from 'react';

export type Theme = 'system' | 'light' | 'dark';
export type VoiceMode = 'erasmian' | 'modern';

export interface Settings {
  theme: Theme;
  sound: boolean;
  voiceMode: VoiceMode;
  rate: number;
  dailyGoal: number;
  autoSpeak: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  sound: true,
  voiceMode: 'erasmian',
  rate: 0.8,
  dailyGoal: 50,
  autoSpeak: true,
};

const KEY = 'koine-adventure:settings:v1';

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

// A module-level copy lets non-React helpers (audio, sound effects) read current settings.
let current = loadSettings();
export const getSettings = () => current;

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(current);

  useEffect(() => {
    current = settings;
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
    const root = document.documentElement;
    if (settings.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', settings.theme);
  }, [settings]);

  const set = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  }, []);

  return { settings, set };
}

export type SettingsApi = ReturnType<typeof useSettings>;
